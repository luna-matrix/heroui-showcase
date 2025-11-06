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
  Select,
  SelectItem,
  Avatar,
  Divider,
  Progress,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure
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
  BarChart3,
  Menu,
  X
} from 'lucide-react';

const HeroUIMobileAdmin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTab, setSelectedTab] = useState('users');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const filteredUsers = mockAdminUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
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
      <Card className="border-0 shadow-lg rounded-b-3xl">
        <CardHeader className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h1 className="text-lg font-bold">Admin</h1>
              <p className="text-xs text-blue-100">Mobile Dashboard</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button isIconOnly variant="light" size="sm" className="text-white">
                <Download className="w-4 h-4" />
              </Button>
              <Button isIconOnly color="primary" size="sm" className="bg-white text-blue-600">
                <Plus className="w-4 h-4" />
              </Button>
              <Button isIconOnly variant="light" size="sm" className="text-white" onPress={onOpen}>
                <Menu className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Navigation Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top">
        <ModalContent className="rounded-2xl">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Menu</ModalHeader>
              <ModalBody className="pb-6">
                <div className="space-y-2">
                  <Button
                    variant={selectedTab === 'users' ? 'solid' : 'light'}
                    color="primary"
                    className="w-full justify-start"
                    onPress={() => {
                      setSelectedTab('users');
                      onClose();
                    }}
                  >
                    <Users className="w-4 h-4 mr-3" />
                    Users
                  </Button>
                  <Button
                    variant={selectedTab === 'logs' ? 'solid' : 'light'}
                    color="primary"
                    className="w-full justify-start"
                    onPress={() => {
                      setSelectedTab('logs');
                      onClose();
                    }}
                  >
                    <Activity className="w-4 h-4 mr-3" />
                    Logs
                  </Button>
                  <Button
                    variant={selectedTab === 'settings' ? 'solid' : 'light'}
                    color="primary"
                    className="w-full justify-start"
                    onPress={() => {
                      setSelectedTab('settings');
                      onClose();
                    }}
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </Button>
                  <Button
                    variant={selectedTab === 'security' ? 'solid' : 'light'}
                    color="primary"
                    className="w-full justify-start"
                    onPress={() => {
                      setSelectedTab('security');
                      onClose();
                    }}
                  >
                    <Shield className="w-4 h-4 mr-3" />
                    Security
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="p-4 space-y-4">
        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3">
          {mockAdminMetrics.slice(0, 4).map((metric) => (
            <Card key={metric.id} className="hover:shadow-md transition-shadow">
              <CardBody className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-medium text-gray-700">{metric.name}</h3>
                  <div className="relative">
                    {metric.changeType === 'increase' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {metric.value}
                  <span className="text-xs font-normal text-gray-600 ml-1">{metric.unit}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress 
                    value={Math.abs(metric.change)} 
                    color={metric.changeType === 'increase' ? 'success' : 'danger'}
                    className="flex-1"
                    size="sm"
                  />
                  <span className={`text-xs font-medium ${
                    metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.changeType === 'increase' ? '+' : '-'}{Math.abs(metric.change)}%
                  </span>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Tab Navigation */}
        <Tabs 
          selectedKey={selectedTab} 
          onSelectionChange={setSelectedTab}
          variant="underlined"
          classNames={{
            tabList: "gap-2 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-transparent data-[hover=true]:bg-default-100",
            tab: "h-10 px-3 font-medium text-sm text-gray-600 data-[hover=true]:text-gray-900 data-[selected=true]:text-blue-600",
            tabContent: "p-0"
          }}
        >
          <Tab key="users" title={
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              Users
            </div>
          }>
            <div className="space-y-4 mt-4">
              {/* Search and Filter */}
              <Card className="rounded-2xl">
                <CardBody className="p-4 space-y-3">
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    startContent={<Search className="w-4 h-4 text-gray-400" />}
                    className="w-full"
                  />
                  <div className="flex space-x-2">
                    <Select
                      placeholder="Status"
                      selectedKeys={[selectedStatus]}
                      onSelectionChange={(keys) => setSelectedStatus(Array.from(keys)[0] as string)}
                      className="flex-1"
                    >
                      <SelectItem key="all">All Status</SelectItem>
                      <SelectItem key="active">Active</SelectItem>
                      <SelectItem key="inactive">Inactive</SelectItem>
                      <SelectItem key="suspended">Suspended</SelectItem>
                    </Select>
                    <Button variant="bordered" size="sm" className="flex-1">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </div>
                </CardBody>
              </Card>

              {/* User List */}
              <div className="space-y-3">
                {filteredUsers.slice(0, 5).map((user) => (
                  <Card key={user.id} className="rounded-2xl">
                    <CardBody className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Avatar src={user.avatar} size="sm" name={user.name} />
                          <div>
                            <div className="font-medium text-sm">{user.name}</div>
                            <div className="text-xs text-gray-600">{user.email}</div>
                          </div>
                        </div>
                        <Chip 
                          color={getStatusColor(user.status)}
                          variant={getStatusVariant(user.status)}
                          size="sm"
                        >
                          {user.status}
                        </Chip>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                        <span>{user.department}</span>
                        <Chip variant="flat" size="sm">{user.role}</Chip>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">
                          Last login: {user.lastLogin.toLocaleDateString()}
                        </span>
                        <div className="flex space-x-1">
                          <Button isIconOnly variant="light" size="sm">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button isIconOnly variant="light" size="sm">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button isIconOnly variant="light" size="sm" className="text-danger hover:bg-danger/10">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </Tab>

          <Tab key="logs" title={
            <div className="flex items-center gap-1">
              <Activity className="w-3 h-3" />
              Logs
            </div>
          }>
            <div className="space-y-4 mt-4">
              <div className="space-y-3">
                {mockAdminLogs.slice(0, 5).map((log) => (
                  <Card key={log.id} className="rounded-2xl">
                    <CardBody className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${
                            log.status === 'success' ? 'bg-success' : 'bg-danger'
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
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </Tab>

          <Tab key="settings" title={
            <div className="flex items-center gap-1">
              <Settings className="w-3 h-3" />
              Settings
            </div>
          }>
            <div className="space-y-4 mt-4">
              {['General', 'Security'].map((category) => (
                <Card key={category} className="rounded-2xl">
                  <CardHeader className="pb-3">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      {category === 'General' && <Settings className="w-5 h-5" />}
                      {category === 'Security' && <Shield className="w-5 h-5" />}
                      {category}
                    </h3>
                  </CardHeader>
                  <CardBody className="space-y-4">
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
                                className="w-16"
                                size="sm"
                              />
                            )}
                            {setting.type === 'string' && (
                              <Input
                                value={setting.value as string}
                                className="w-24"
                                size="sm"
                              />
                            )}
                          </div>
                        </div>
                      ))}
                  </CardBody>
                </Card>
              ))}
            </div>
          </Tab>

          <Tab key="security" title={
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Security
            </div>
          }>
            <div className="space-y-4 mt-4">
              <Card className="border-success-200 bg-success-50 rounded-2xl">
                <CardBody className="p-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-8 h-8 text-success-600" />
                    <div>
                      <div className="font-semibold text-success-900 text-sm">Authentication</div>
                      <div className="text-xs text-success-700">All systems secure</div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card className="border-warning-200 bg-warning-50 rounded-2xl">
                <CardBody className="p-4">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-8 h-8 text-warning-600" />
                    <div>
                      <div className="font-semibold text-warning-900 text-sm">Updates Available</div>
                      <div className="text-xs text-warning-700">3 security patches</div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card className="border-primary-200 bg-primary-50 rounded-2xl">
                <CardBody className="p-4">
                  <div className="flex items-center space-x-3">
                    <Database className="w-8 h-8 text-primary-600" />
                    <div>
                      <div className="font-semibold text-primary-900 text-sm">Backup Status</div>
                      <div className="text-xs text-primary-700">Last backup: 2 hours ago</div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default HeroUIMobileAdmin;
