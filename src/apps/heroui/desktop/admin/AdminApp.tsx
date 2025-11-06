'use client';

import React, { useState } from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader,
  Button,
  Input,
  Chip,
  Tabs,
  Tab,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Select,
  SelectItem,
  Avatar,
  Divider,
  Progress
} from '@heroui/react';
import { mockAdminUsers, mockAdminLogs, mockAdminSettings, mockAdminMetrics } from '@/lib/mock-data/admin';
import { 
  Search, 
  Users, 
  Activity, 
  Settings, 
  Download, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Shield, 
  Database, 
  Bell,
  UserCheck,
  TrendingUp,
  TrendingDown,
  BarChart3
} from 'lucide-react';

const HeroUIDesktopAdmin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedTab, setSelectedTab] = useState('users');

  const filteredUsers = mockAdminUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    const matchesDepartment = selectedDepartment === 'all' || user.department === selectedDepartment;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'default';
      case 'suspended': return 'danger';
      default: return 'default';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'solid';
      case 'inactive': return 'flat';
      case 'suspended': return 'solid';
      default: return 'flat';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-blue-100 text-sm">Manage users, settings, and system monitoring</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="bordered" size="sm" className="text-white border-white/30">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button color="primary" size="sm" className="bg-white text-blue-600 hover:bg-blue-50">
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockAdminMetrics.map((metric, index) => (
            <Card key={metric.id} className="hover:shadow-lg transition-shadow">
              <CardBody className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700">{metric.name}</h3>
                  <div className="relative">
                    {metric.changeType === 'increase' ? (
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {metric.value}
                  <span className="text-lg font-normal text-gray-600 ml-1">{metric.unit}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress 
                    value={Math.abs(metric.change)} 
                    color={metric.changeType === 'increase' ? 'success' : 'danger'}
                    className="flex-1"
                  />
                  <span className={`text-sm font-medium ${
                    metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.changeType === 'increase' ? '+' : '-'}{Math.abs(metric.change)}%
                  </span>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Card className="shadow-lg">
          <CardBody className="p-0">
            <Tabs 
              selectedKey={selectedTab} 
              onSelectionChange={setSelectedTab}
              variant="underlined"
              classNames={{
                tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                cursor: "w-full bg-transparent data-[hover=true]:bg-default-100",
                tab: "h-12 px-4 font-semibold text-gray-600 data-[hover=true]:text-gray-900 data-[selected=true]:text-blue-600",
                tabContent: "p-6"
              }}
            >
              <Tab key="users" title={
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Users
                </div>
              }>
                <div className="space-y-6">
                  {/* Filters */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        startContent={<Search className="w-4 h-4 text-gray-400" />}
                        className="max-w-xs"
                      />
                      <Select
                        placeholder="Status"
                        selectedKeys={[selectedStatus]}
                        onSelectionChange={(keys) => setSelectedStatus(Array.from(keys)[0] as string)}
                        className="max-w-xs"
                      >
                        <SelectItem key="all">All Status</SelectItem>
                        <SelectItem key="active">Active</SelectItem>
                        <SelectItem key="inactive">Inactive</SelectItem>
                        <SelectItem key="suspended">Suspended</SelectItem>
                      </Select>
                      <Select
                        placeholder="Department"
                        selectedKeys={[selectedDepartment]}
                        onSelectionChange={(keys) => setSelectedDepartment(Array.from(keys)[0] as string)}
                        className="max-w-xs"
                      >
                        <SelectItem key="all">All Departments</SelectItem>
                        <SelectItem key="Engineering">Engineering</SelectItem>
                        <SelectItem key="Product">Product</SelectItem>
                        <SelectItem key="Marketing">Marketing</SelectItem>
                        <SelectItem key="Sales">Sales</SelectItem>
                        <SelectItem key="Operations">Operations</SelectItem>
                      </Select>
                      <Button variant="bordered" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        More Filters
                      </Button>
                    </div>
                  </div>

                  {/* User Table */}
                  <Table aria-label="Users table" removeWrapper>
                    <TableHeader>
                      <TableColumn>USER</TableColumn>
                      <TableColumn>DEPARTMENT</TableColumn>
                      <TableColumn>ROLE</TableColumn>
                      <TableColumn>LAST LOGIN</TableColumn>
                      <TableColumn>STATUS</TableColumn>
                      <TableColumn>ACTIONS</TableColumn>
                    </TableHeader>
                    <TableBody items={filteredUsers}>
                      {(user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar src={user.avatar} size="sm" name={user.name} />
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-gray-600">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{user.department}</TableCell>
                          <TableCell>
                            <Chip variant="flat" size="sm">{user.role}</Chip>
                          </TableCell>
                          <TableCell>{user.lastLogin.toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Chip 
                              color={getStatusColor(user.status)}
                              variant={getStatusVariant(user.status)}
                              size="sm"
                            >
                              {user.status}
                            </Chip>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button isIconOnly variant="light" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button isIconOnly variant="light" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button isIconOnly variant="light" size="sm" className="text-danger hover:bg-danger/10">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </Tab>

              <Tab key="logs" title={
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Logs
                </div>
              }>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">System Logs</h2>
                    <Button variant="bordered" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export Logs
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {mockAdminLogs.map((log) => (
                      <Card key={log.id} className="max-w-full">
                        <CardBody className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full ${
                                log.status === 'success' ? 'bg-success' : 'bg-danger'
                              }`} />
                              <div>
                                <div className="font-semibold">{log.action}</div>
                                <div className="text-sm text-gray-600">{log.resource}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm">{log.timestamp.toLocaleString()}</div>
                              <div className="text-xs text-gray-600">{log.ip}</div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </div>
              </Tab>

              <Tab key="settings" title={
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </div>
              }>
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">System Settings</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {['General', 'Security', 'Notifications', 'Performance'].map((category) => (
                      <Card key={category}>
                        <CardHeader className="pb-3">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            {category === 'General' && <Settings className="w-5 h-5" />}
                            {category === 'Security' && <Shield className="w-5 h-5" />}
                            {category === 'Notifications' && <Bell className="w-5 h-5" />}
                            {category === 'Performance' && <Database className="w-5 h-5" />}
                            {category} Settings
                          </h3>
                        </CardHeader>
                        <CardBody className="space-y-4">
                          {mockAdminSettings
                            .filter(setting => setting.category === category)
                            .map((setting) => (
                              <div key={setting.id} className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="font-medium">{setting.key.replace('_', ' ').toUpperCase()}</div>
                                  <div className="text-sm text-gray-600">{setting.description}</div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {setting.type === 'boolean' && (
                                    <Button
                                      color={setting.value ? 'success' : 'default'}
                                      variant={setting.value ? 'solid' : 'bordered'}
                                      size="sm"
                                    >
                                      {setting.value ? 'ON' : 'OFF'}
                                    </Button>
                                  )}
                                  {setting.type === 'number' && (
                                    <Input
                                      type="number"
                                      value={setting.value as string}
                                      className="w-20"
                                    />
                                  )}
                                  {setting.type === 'string' && (
                                    <Input
                                      value={setting.value as string}
                                      className="w-40"
                                    />
                                  )}
                                  {setting.type === 'select' && (
                                    <Select
                                      selectedKeys={[setting.value as string]}
                                      className="w-32"
                                    >
                                      {setting.options?.map((option) => (
                                        <SelectItem key={option} value={option}>
                                          {option}
                                        </SelectItem>
                                      ))}
                                    </Select>
                                  )}
                                </div>
                              </div>
                            ))}
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </div>
              </Tab>

              <Tab key="security" title={
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Security
                </div>
              }>
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Security Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-success-200 bg-success-50">
                      <CardBody className="p-6">
                        <div className="flex items-center space-x-4">
                          <Shield className="w-10 h-10 text-success-600" />
                          <div>
                            <div className="font-semibold text-success-900">Authentication</div>
                            <div className="text-sm text-success-700">All systems secure</div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                    <Card className="border-warning-200 bg-warning-50">
                      <CardBody className="p-6">
                        <div className="flex items-center space-x-4">
                          <Bell className="w-10 h-10 text-warning-600" />
                          <div>
                            <div className="font-semibold text-warning-900">Updates Available</div>
                            <div className="text-sm text-warning-700">3 security patches</div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                    <Card className="border-primary-200 bg-primary-50">
                      <CardBody className="p-6">
                        <div className="flex items-center space-x-4">
                          <Database className="w-10 h-10 text-primary-600" />
                          <div>
                            <div className="font-semibold text-primary-900">Backup Status</div>
                            <div className="text-sm text-primary-700">Last backup: 2 hours ago</div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default HeroUIDesktopAdmin;
