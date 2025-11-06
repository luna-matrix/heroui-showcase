'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Activity, 
  Plus,
  Home,
  BarChart,
  User as UserIcon,
  Bell,
  Search
} from 'lucide-react';
import { mockDashboardData } from '@/lib/mock-data/dashboard';
import { cn } from '@/lib/utils/cn';

interface MobileMetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ElementType;
  color: string;
}

const MobileMetricCard: React.FC<MobileMetricCardProps> = ({ title, value, change, icon: Icon, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md p-4 border border-gray-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-gray-600">{title}</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{value}</p>
          {change !== undefined && (
            <p className={cn(
              "text-xs mt-1 flex items-center",
              change > 0 ? "text-green-600" : "text-red-600"
            )}>
              <TrendingUp className="w-3 h-3 mr-1" />
              {change > 0 ? '+' : ''}{change}%
            </p>
          )}
        </div>
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", color)}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

const MobileRevenueChart: React.FC = () => {
  const data = mockDashboardData.charts.revenue;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-xl shadow-md p-4 border border-gray-200"
    >
      <h3 className="text-base font-semibold text-gray-900 mb-3">Revenue Overview</h3>
      <div className="h-48 flex items-end justify-between gap-1">
        {data.slice(-6).map((item, index) => (
          <div key={item.name} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-blue-500 rounded-t"
              style={{ 
                height: `${(item.value / Math.max(...data.map(d => d.value))) * 100}%` 
              }}
            ></div>
            <p className="text-xs text-gray-600 mt-1">{item.name.slice(0, 3)}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const MobileActivityFeed: React.FC = () => {
  const activities = mockDashboardData.activities.slice(0, 4);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-xl shadow-md p-4 border border-gray-200"
    >
      <h3 className="text-base font-semibold text-gray-900 mb-3">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * index }}
            className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
              activity.type === 'user' ? 'bg-blue-100' :
              activity.type === 'sale' ? 'bg-green-100' :
              'bg-gray-100'
            )}>
              {activity.type === 'user' && <Users className="w-3 h-3 text-blue-600" />}
              {activity.type === 'sale' && <TrendingUp className="w-3 h-3 text-green-600" />}
              {activity.type === 'system' && <Activity className="w-3 h-3 text-gray-600" />}
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-900">{activity.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(activity.timestamp).toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export const ShadcnUIMobileDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const data = mockDashboardData;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'analytics', label: 'Analytics', icon: BarChart },
    { id: 'users', label: 'Users', icon: UserIcon },
    { id: 'profile', label: 'Profile', icon: UserIcon }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-gray-900">Dashboard</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search metrics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Mobile Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="px-4 py-4 space-y-4">
          {/* Tab Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors",
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <MobileMetricCard
              title="Revenue"
              value={`$${(data.metrics.revenue / 1000).toFixed(1)}K`}
              change={12.5}
              icon={TrendingUp}
              color="bg-blue-500"
            />
            <MobileMetricCard
              title="Users"
              value={`${(data.metrics.users / 1000).toFixed(1)}K`}
              change={8.2}
              icon={Users}
              color="bg-green-500"
            />
            <MobileMetricCard
              title="Conversion"
              value={`${data.metrics.conversion}%`}
              change={-2.1}
              icon={BarChart3}
              color="bg-purple-500"
            />
            <MobileMetricCard
              title="Engagement"
              value={`${data.metrics.engagement}%`}
              change={5.7}
              icon={Activity}
              color="bg-orange-500"
            />
          </div>

          {/* Charts and Activity */}
          <div className="space-y-4">
            <MobileRevenueChart />
            <MobileActivityFeed />
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-md p-4 border border-gray-200"
          >
            <h3 className="text-base font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center gap-2 px-3 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">New Report</span>
              </button>
              <button className="flex items-center gap-2 px-3 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm font-medium">Analytics</span>
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200">
        <div className="grid grid-cols-4">
          {[
            { icon: Home, label: 'Home', active: true },
            { icon: BarChart, label: 'Analytics', active: false },
            { icon: UserIcon, label: 'Profile', active: false },
            { icon: Activity, label: 'Activity', active: false },
          ].map((item, index) => (
            <button
              key={item.label}
              className={cn(
                "flex flex-col items-center gap-1 py-3 transition-colors",
                item.active 
                  ? "text-blue-600" 
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};
