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
import { Button, Card, CardBody, CardHeader, Input, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Chip, Progress, Divider } from '@heroui/react';

export const HeroUIDesktopDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const data = mockDashboardData;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'} bg-white shadow-lg transition-all duration-300`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
          </div>
          
          <nav className="space-y-2">
            {[
              { icon: BarChart3, label: 'Analytics', active: true },
              { icon: Users, label: 'Users', active: false },
              { icon: Calendar, label: 'Calendar', active: false },
              { icon: Settings, label: 'Settings', active: false },
            ].map((item) => (
              <Button
                key={item.label}
                className={`w-full justify-start h-12 ${item.active ? 'bg-primary text-primary-foreground' : 'bg-default-100 text-default-foreground'}`}
                variant={item.active ? 'solid' : 'light'}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium ml-3">{item.label}</span>
              </Button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-divider">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                isIconOnly
                variant="light"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startContent={<Search className="w-4 h-4 text-default-400" />}
                className="w-96"
                variant="bordered"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Button isIconOnly variant="light" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
              </Button>
              
              <Dropdown>
                <DropdownTrigger>
                  <div className="flex items-center gap-3">
                    <Avatar 
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=john" 
                      alt="John Developer"
                      size="sm"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">John Developer</p>
                      <p className="text-xs text-gray-500">Admin</p>
                    </div>
                  </div>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem key="profile" startContent={<User className="w-4 h-4" />}>
                    Profile
                  </DropdownItem>
                  <DropdownItem key="settings" startContent={<Settings className="w-4 h-4" />}>
                    Settings
                  </DropdownItem>
                  <DropdownItem key="logout" startContent={<LogOut className="w-4 h-4" />} className="text-danger">
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-lg text-gray-600">Monitor your business metrics and performance</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardBody className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      ${data.metrics.revenue.toLocaleString()}
                    </p>
                    <div className="flex items-center mt-2 text-success text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +12.5%
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {data.metrics.users.toLocaleString()}
                    </p>
                    <div className="flex items-center mt-2 text-success text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +8.2%
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-success-foreground" />
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {data.metrics.conversion}%
                    </p>
                    <div className="flex items-center mt-2 text-danger text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      -2.1%
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-secondary-foreground" />
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Engagement</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {data.metrics.engagement}%
                    </p>
                    <div className="flex items-center mt-2 text-success text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +5.7%
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-warning rounded-lg flex items-center justify-center">
                    <Activity className="w-6 h-6 text-warning-foreground" />
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Charts and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-0 pt-6 px-6">
                <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
              </CardHeader>
              <CardBody>
                <div className="h-64 flex items-end justify-between gap-2">
                  {data.charts.revenue.slice(-6).map((item) => (
                    <div key={item.name} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-primary rounded-t"
                        style={{ 
                          height: `${(item.value / Math.max(...data.charts.revenue.map(d => d.value))) * 100}%` 
                        }}
                      ></div>
                      <p className="text-xs text-gray-600 mt-2">{item.name}</p>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader className="pb-0 pt-6 px-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  {data.activities.slice(0, 5).map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-default-100 transition-colors"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.type === 'user' ? 'bg-primary-100' :
                        activity.type === 'sale' ? 'bg-success-100' :
                        'bg-default-100'
                      }`}>
                        {activity.type === 'user' && <Users className="w-4 h-4 text-primary" />}
                        {activity.type === 'sale' && <TrendingUp className="w-4 h-4 text-success" />}
                        {activity.type === 'system' && <Activity className="w-4 h-4 text-default-600" />}
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
              </CardBody>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};
