'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockAdminUsers, mockAdminLogs, mockAdminSettings, mockAdminMetrics } from '@/lib/mock-data/admin';
import { Search, Users, Activity, Settings, Download, Filter, Plus, Edit, Trash2, Eye, Shield, Database, Bell, Menu, X, Home, BarChart3, UserCheck, Lock, ChevronDown } from 'lucide-react';

const AdminApp: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTab, setSelectedTab] = useState('users');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredUsers = mockAdminUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Admin</h1>
            <p className="text-xs text-gray-600">Mobile Dashboard</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4" />
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
          <div className="bg-white w-64 h-full shadow-lg">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Menu</h2>
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <nav className="p-4 space-y-2">
              <Button
                variant={selectedTab === 'users' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => {
                  setSelectedTab('users');
                  setSidebarOpen(false);
                }}
              >
                <Users className="w-4 h-4 mr-3" />
                Users
              </Button>
              <Button
                variant={selectedTab === 'logs' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => {
                  setSelectedTab('logs');
                  setSidebarOpen(false);
                }}
              >
                <Activity className="w-4 h-4 mr-3" />
                Logs
              </Button>
              <Button
                variant={selectedTab === 'settings' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => {
                  setSelectedTab('settings');
                  setSidebarOpen(false);
                }}
              >
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </Button>
              <Button
                variant={selectedTab === 'security' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => {
                  setSelectedTab('security');
                  setSidebarOpen(false);
                }}
              >
                <Shield className="w-4 h-4 mr-3" />
                Security
              </Button>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Metrics */}
        <div className="p-4 grid grid-cols-2 gap-3">
          {mockAdminMetrics.slice(0, 4).map((metric) => (
            <Card key={metric.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-600">{metric.name}</span>
                  <div className={`w-3 h-3 rounded-full ${
                    metric.changeType === 'increase' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                </div>
                <div className="text-xl font-bold">
                  {metric.value}
                  <span className="text-xs font-normal text-gray-600 ml-1">{metric.unit}</span>
                </div>
                <p className={`text-xs ${
                  metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.changeType === 'increase' ? '↑' : '↓'} {Math.abs(metric.change)}%
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="px-4 pb-2">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <Button
              variant={selectedTab === 'users' ? 'default' : 'ghost'}
              size="sm"
              className="flex-1"
              onClick={() => setSelectedTab('users')}
            >
              <Users className="w-3 h-3 mr-1" />
              Users
            </Button>
            <Button
              variant={selectedTab === 'logs' ? 'default' : 'ghost'}
              size="sm"
              className="flex-1"
              onClick={() => setSelectedTab('logs')}
            >
              <Activity className="w-3 h-3 mr-1" />
              Logs
            </Button>
            <Button
              variant={selectedTab === 'settings' ? 'default' : 'ghost'}
              size="sm"
              className="flex-1"
              onClick={() => setSelectedTab('settings')}
            >
              <Settings className="w-3 h-3 mr-1" />
              Settings
            </Button>
            <Button
              variant={selectedTab === 'security' ? 'default' : 'ghost'}
              size="sm"
              className="flex-1"
              onClick={() => setSelectedTab('security')}
            >
              <Shield className="w-3 h-3 mr-1" />
              Security
            </Button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {/* Users Tab */}
          {selectedTab === 'users' && (
            <div className="space-y-4">
              {/* Search and Filter */}
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* User List */}
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {filteredUsers.slice(0, 5).map((user) => (
                      <div key={user.id} className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <div className="font-medium text-sm">{user.name}</div>
                              <div className="text-xs text-gray-600">{user.email}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(user.status)}>
                              {user.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>{user.department}</span>
                          <Badge variant="outline" className="text-xs">
                            {user.role}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">
                            Last login: {user.lastLogin.toLocaleDateString()}
                          </span>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Logs Tab */}
          {selectedTab === 'logs' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Logs</CardTitle>
                <CardDescription>Recent activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAdminLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            log.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                          }`} />
                          <div>
                            <div className="font-medium text-sm">{log.action}</div>
                            <div className="text-xs text-gray-600">{log.resource}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs">{log.timestamp.toLocaleString()}</div>
                          <div className="text-xs text-gray-600">{log.ip}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Settings Tab */}
          {selectedTab === 'settings' && (
            <div className="space-y-4">
              {['General', 'Security'].map((category) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {category === 'General' && <Settings className="w-4 h-4" />}
                      {category === 'Security' && <Shield className="w-4 h-4" />}
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockAdminSettings
                      .filter(setting => setting.category === category)
                      .map((setting) => (
                        <div key={setting.id} className="flex items-center justify-between py-2">
                          <div className="flex-1">
                            <div className="font-medium text-sm">{setting.key.replace('_', ' ').toUpperCase()}</div>
                            <div className="text-xs text-gray-600">{setting.description}</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {setting.type === 'boolean' && (
                              <Button
                                variant={setting.value ? 'default' : 'outline'}
                                size="sm"
                              >
                                {setting.value ? 'ON' : 'OFF'}
                              </Button>
                            )}
                            {setting.type === 'number' && (
                              <Input
                                type="number"
                                value={setting.value as string}
                                className="w-16"
                              />
                            )}
                            {setting.type === 'string' && (
                              <Input
                                value={setting.value as string}
                                className="w-24"
                              />
                            )}
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Security Tab */}
          {selectedTab === 'security' && (
            <div className="space-y-4">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-8 h-8 text-green-600" />
                    <div>
                      <div className="font-medium text-green-900">Authentication</div>
                      <div className="text-sm text-green-700">All systems secure</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-8 h-8 text-yellow-600" />
                    <div>
                      <div className="font-medium text-yellow-900">Updates Available</div>
                      <div className="text-sm text-yellow-700">3 security patches</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Database className="w-8 h-8 text-blue-600" />
                    <div>
                      <div className="font-medium text-blue-900">Backup Status</div>
                      <div className="text-sm text-blue-700">Last backup: 2 hours ago</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminApp;
