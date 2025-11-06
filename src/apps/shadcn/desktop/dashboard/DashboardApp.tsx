'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Activity, 
  Calendar,
  Menu,
  X,
  Bell,
  Search,
  User,
  LogOut,
  Settings
} from 'lucide-react';
import { mockDashboardData } from '@/lib/mock-data/dashboard';
import { cn } from '@/lib/utils/cn';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ElementType;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon: Icon, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change !== undefined && (
            <p className={cn(
              "text-sm mt-2 flex items-center",
              change > 0 ? "text-green-600" : "text-red-600"
            )}>
              <TrendingUp className="w-4 h-4 mr-1" />
              {change > 0 ? '+' : ''}{change}%
            </p>
          )}
        </div>
        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", color)}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

const RevenueChart: React.FC = () => {
  const data = mockDashboardData.charts.revenue;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
      <div className="h-64 flex items-end justify-between gap-2">
        {data.slice(-6).map((item, index) => (
          <div key={item.name} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-blue-500 rounded-t"
              style={{ 
                height: `${(item.value / Math.max(...data.map(d => d.value))) * 100}%` 
              }}
            ></div>
            <p className="text-xs text-gray-600 mt-2">{item.name}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const ActivityFeed: React.FC = () => {
  const activities = mockDashboardData.activities.slice(0, 5);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * index }}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
              activity.type === 'user' ? 'bg-blue-100' :
              activity.type === 'sale' ? 'bg-green-100' :
              'bg-gray-100'
            )}>
              {activity.type === 'user' && <Users className="w-4 h-4 text-blue-600" />}
              {activity.type === 'sale' && <TrendingUp className="w-4 h-4 text-green-600" />}
              {activity.type === 'system' && <Activity className="w-4 h-4 text-gray-600" />}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">{activity.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(activity.timestamp).toLocaleTimeString()}
                {activity.user && ` • ${activity.user}`}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export const ShadcnUIDesktopDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const data = mockDashboardData;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={cn(
        "bg-white shadow-lg transition-all duration-300",
        sidebarOpen ? "w-64" : "w-0 overflow-hidden"
      )}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
          </div>
          
          <nav className="space-y-2">
            {[
              { icon: BarChart3, label: 'Analytics', active: true },
              { icon: Users, label: 'Users', active: false },
              { icon: Calendar, label: 'Calendar', active: false },
              { icon: Settings, label: 'Settings', active: false },
            ].map((item, index) => (
              <button
                key={item.label}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  item.active 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">John Developer</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              </div>
              
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Monitor your business metrics and performance</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Revenue"
              value={`$${data.metrics.revenue.toLocaleString()}`}
              change={12.5}
              icon={TrendingUp}
              color="bg-blue-500"
            />
            <MetricCard
              title="Active Users"
              value={data.metrics.users.toLocaleString()}
              change={8.2}
              icon={Users}
              color="bg-green-500"
            />
            <MetricCard
              title="Conversion Rate"
              value={`${data.metrics.conversion}%`}
              change={-2.1}
              icon={BarChart3}
              color="bg-purple-500"
            />
            <MetricCard
              title="Engagement"
              value={`${data.metrics.engagement}%`}
              change={5.7}
              icon={Activity}
              color="bg-orange-500"
            />
          </div>

          {/* Charts and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RevenueChart />
            </div>
            <div>
              <ActivityFeed />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
