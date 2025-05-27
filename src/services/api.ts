
const API_BASE_URL = 'http://localhost:8080'; // Update this to your backend URL

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

interface AuthPayload {
  accessToken: string;
  user: {
    id: string;
    email: string;
  };
}

interface User {
  id: string;
  email: string;
  createdAt: string;
  downloadAlerts: boolean;
  expiryReminders: boolean;
}

class ApiService {
  private accessToken: string | null = null;

  constructor() {
    // Load token from localStorage on initialization
    this.accessToken = localStorage.getItem('accessToken');
  }

  private async makeGraphQLRequest<T>(query: string, variables?: any): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    const response = await fetch(`${API_BASE_URL}/graphql`, {
      method: 'POST',
      headers,
      credentials: 'include', // Important for refresh token cookies
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: GraphQLResponse<T> = await response.json();

    if (result.errors && result.errors.length > 0) {
      throw new Error(result.errors[0].message);
    }

    if (!result.data) {
      throw new Error('No data returned from server');
    }

    return result.data;
  }

  async register(email: string, password: string): Promise<AuthPayload> {
    const query = `
      mutation Register($email: String!, $password: String!) {
        register(email: $email, password: $password) {
          accessToken
          user {
            id
            email
          }
        }
      }
    `;

    const result = await this.makeGraphQLRequest<{ register: AuthPayload }>(query, {
      email,
      password,
    });

    // Store the access token
    this.accessToken = result.register.accessToken;
    localStorage.setItem('accessToken', this.accessToken);

    return result.register;
  }

  async login(email: string, password: string): Promise<AuthPayload> {
    const query = `
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          accessToken
          user {
            id
            email
          }
        }
      }
    `;

    const result = await this.makeGraphQLRequest<{ login: AuthPayload }>(query, {
      email,
      password,
    });

    // Store the access token
    this.accessToken = result.login.accessToken;
    localStorage.setItem('accessToken', this.accessToken);

    return result.login;
  }

  async me(): Promise<User> {
    const query = `
      query Me {
        me {
          id
          email
          createdAt
          downloadAlerts
          expiryReminders
        }
      }
    `;

    const result = await this.makeGraphQLRequest<{ me: User }>(query);
    return result.me;
  }

  async refreshToken(): Promise<AuthPayload> {
    const query = `
      mutation RefreshToken($token: String!) {
        refreshToken(token: $token) {
          accessToken
          user {
            id
            email
          }
        }
      }
    `;

    // The refresh token is handled via HTTP-only cookies, so we pass an empty string
    const result = await this.makeGraphQLRequest<{ refreshToken: AuthPayload }>(query, {
      token: "",
    });

    // Update the access token
    this.accessToken = result.refreshToken.accessToken;
    localStorage.setItem('accessToken', this.accessToken);

    return result.refreshToken;
  }

  logout(): void {
    this.accessToken = null;
    localStorage.removeItem('accessToken');
    // The refresh token cookie will be handled by the backend
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }
}

export const apiService = new ApiService();
export type { AuthPayload, User };
