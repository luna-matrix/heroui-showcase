import { DashboardData, ChartData, ProductData, ActivityItem } from '@/lib/types';

export const generateDashboardData = (): DashboardData => {
  // Generate mock chart data
  const revenueData: ChartData[] = Array.from({ length: 12 }, (_, i) => ({
    name: new Date(2024, i, 1).toLocaleDateString('en', { month: 'short' }),
    value: Math.floor(Math.random() * 50000) + 30000,
    date: `2024-${String(i + 1).padStart(2, '0')}-01`
  }));

  const userData: ChartData[] = Array.from({ length: 12 }, (_, i) => ({
    name: new Date(2024, i, 1).toLocaleDateString('en', { month: 'short' }),
    value: Math.floor(Math.random() * 5000) + 2000,
    date: `2024-${String(i + 1).padStart(2, '0')}-01`
  }));

  const productData: ProductData[] = [
    { id: '1', name: 'Premium Plan', sales: 1250, revenue: 125000, category: 'Subscription' },
    { id: '2', name: 'Basic Plan', sales: 3200, revenue: 96000, category: 'Subscription' },
    { id: '3', name: 'Enterprise Plan', sales: 180, revenue: 90000, category: 'Subscription' },
    { id: '4', name: 'API Credits', sales: 850, revenue: 42500, category: 'Usage' },
    { id: '5', name: 'Support Package', sales: 420, revenue: 21000, category: 'Service' },
    { id: '6', name: 'Training Course', sales: 150, revenue: 7500, category: 'Education' }
  ];

  const activities: ActivityItem[] = [
    { id: '1', type: 'user', message: 'New user registration: john@example.com', timestamp: new Date(Date.now() - 1000 * 60 * 5), user: 'John Developer' },
    { id: '2', type: 'sale', message: 'Premium Plan purchased by sarah@example.com', timestamp: new Date(Date.now() - 1000 * 60 * 15), user: 'Sarah Designer' },
    { id: '3', type: 'system', message: 'Daily backup completed successfully', timestamp: new Date(Date.now() - 1000 * 60 * 30) },
    { id: '4', type: 'user', message: 'Profile updated: admin@example.com', timestamp: new Date(Date.now() - 1000 * 60 * 45), user: 'Admin User' },
    { id: '5', type: 'sale', message: 'Enterprise Plan purchased by company@example.com', timestamp: new Date(Date.now() - 1000 * 60 * 60), user: 'Company Admin' },
    { id: '6', type: 'system', message: 'Database optimization completed', timestamp: new Date(Date.now() - 1000 * 60 * 120) },
    { id: '7', type: 'user', message: 'New user registration: mike@example.com', timestamp: new Date(Date.now() - 1000 * 60 * 180), user: 'Mike Developer' },
    { id: '8', type: 'sale', message: 'API Credits purchased by tech@example.com', timestamp: new Date(Date.now() - 1000 * 60 * 240), user: 'Tech Company' }
  ];

  return {
    metrics: {
      revenue: revenueData.reduce((sum, item) => sum + item.value, 0),
      users: userData.reduce((sum, item) => sum + item.value, 0),
      conversion: 3.2,
      engagement: 78.5
    },
    charts: {
      revenue: revenueData,
      users: userData,
      products: productData
    },
    activities
  };
};

export const mockDashboardData = generateDashboardData();
