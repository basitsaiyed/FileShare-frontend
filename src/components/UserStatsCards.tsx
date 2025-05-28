
import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/services/api";

interface UserStats {
  totalFiles: number;
  totalDownloads: number;
  storageUsed: string;
}

const UserStatsCards = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['userStats'],
    queryFn: async (): Promise<UserStats> => {
      const result = await apiService.getUserStats();
      return result;
    },
  });

  if (isLoading) {
    return (
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    console.error('Failed to fetch user stats:', error);
    return (
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Files</h3>
          <p className="text-3xl font-bold text-primary">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Downloads</h3>
          <p className="text-3xl font-bold text-primary">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Storage Used</h3>
          <p className="text-3xl font-bold text-primary">0 B</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Files</h3>
        <p className="text-3xl font-bold text-primary">{stats?.totalFiles || 0}</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Downloads</h3>
        <p className="text-3xl font-bold text-primary">{stats?.totalDownloads || 0}</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Storage Used</h3>
        <p className="text-3xl font-bold text-primary">{stats?.storageUsed || "0 B"}</p>
      </div>
    </div>
  );
};

export default UserStatsCards;
