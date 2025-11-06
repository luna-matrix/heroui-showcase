'use client';

import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Input, 
  Tag, 
  Tabs, 
  Select, 
  Avatar, 
  Space, 
  Divider,
  Badge,
  Statistic,
  Row,
  Col,
  Progress,
  Switch,
  InputNumber,
  Drawer,
  List
} from 'antd';
import { 
  SearchOutlined, 
  UserOutlined, 
  FileTextOutlined, 
  SettingOutlined, 
  DownloadOutlined, 
  FilterOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined, 
  SafetyOutlined, 
  DatabaseOutlined, 
  BellOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  BarChartOutlined,
  MenuOutlined,
  CloseOutlined
} from '@ant-design/icons';
import { mockAdminUsers, mockAdminLogs, mockAdminSettings, mockAdminMetrics } from '@/lib/mock-data/admin';

const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;

const AntDesignMobileAdmin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('users');
  const [drawerVisible, setDrawerVisible] = useState(false);

  const filteredUsers = mockAdminUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'inactive': return 'default';
      case 'suspended': return 'red';
      default: return 'default';
    }
  };

  const menuItems = [
    {
      key: 'users',
      icon: <UserOutlined />,
      text: 'Users'
    },
    {
      key: 'logs',
      icon: <FileTextOutlined />,
      text: 'Logs'
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      text: 'Settings'
    },
    {
      key: 'security',
      icon: <SafetyOutlined />,
      text: 'Security'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      {/* Header */}
      <Card 
        style={{ 
          borderRadius: '0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
        bodyStyle={{ padding: '16px', background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: 'white' }}>
            <h1 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Admin</h1>
            <p style={{ fontSize: '12px', opacity: 0.8, margin: '2px 0 0 0' }}>
              Mobile Dashboard
            </p>
          </div>
          <Space>
            <Button 
              type="text" 
              icon={<DownloadOutlined />} 
              size="small" 
              style={{ color: 'white' }}
            />
            <Button 
              type="text" 
              icon={<PlusOutlined />} 
              size="small" 
              style={{ color: 'white' }}
            />
            <Button 
              type="text" 
              icon={<MenuOutlined />} 
              size="small" 
              style={{ color: 'white' }}
              onClick={() => setDrawerVisible(true)}
            />
          </Space>
        </div>
      </Card>

      {/* Navigation Drawer */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        <List
          dataSource={menuItems}
          renderItem={(item) => (
            <List.Item
              onClick={() => {
                setActiveTab(item.key);
                setDrawerVisible(false);
              }}
              style={{
                cursor: 'pointer',
                backgroundColor: activeTab === item.key ? '#e6f7ff' : 'transparent'
              }}
            >
              <Space>
                {item.icon}
                <span>{item.text}</span>
              </Space>
            </List.Item>
          )}
        />
      </Drawer>

      <div style={{ padding: '16px' }}>
        {/* Metrics */}
        <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
          {mockAdminMetrics.slice(0, 4).map((metric) => (
            <Col span={12} key={metric.id}>
              <Card size="small" hoverable>
                <Statistic
                  title={metric.name}
                  value={metric.value}
                  suffix={metric.unit}
                  valueStyle={{ 
                    color: metric.changeType === 'increase' ? '#3f8600' : '#cf1322',
                    fontSize: '20px'
                  }}
                  prefix={
                    metric.changeType === 'increase' ? 
                    <ArrowUpOutlined style={{ color: '#3f8600' }} /> :
                    <ArrowDownOutlined style={{ color: '#cf1322' }} />
                  }
                />
                <div style={{ marginTop: '8px' }}>
                  <Progress 
                    percent={Math.abs(metric.change)} 
                    status={metric.changeType === 'increase' ? 'success' : 'exception'}
                    showInfo={false}
                    size="small"
                    strokeWidth={6}
                  />
                  <span style={{ 
                    marginLeft: '8px', 
                    fontSize: '12px',
                    color: metric.changeType === 'increase' ? '#3f8600' : '#cf1322'
                  }}>
                    {metric.changeType === 'increase' ? '+' : '-'}{Math.abs(metric.change)}%
                  </span>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Tab Navigation */}
        <Card style={{ marginBottom: '16px' }}>
          <Tabs activeKey={activeTab} onChange={setActiveTab} size="small">
            <TabPane 
              tab={
                <span>
                  <UserOutlined />
                  Users
                </span>
              } 
              key="users"
            />

            <TabPane 
              tab={
                <span>
                  <FileTextOutlined />
                  Logs
                </span>
              } 
              key="logs"
            />

            <TabPane 
              tab={
                <span>
                  <SettingOutlined />
                  Settings
                </span>
              } 
              key="settings"
            />

            <TabPane 
              tab={
                <span>
                  <SafetyOutlined />
                  Security
                </span>
              } 
              key="security"
            />
          </Tabs>
        </Card>

        {/* Tab Content */}
        {activeTab === 'users' && (
          <div>
            {/* Search and Filter */}
            <Card size="small" style={{ marginBottom: '16px' }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Search
                  placeholder="Search users..."
                  allowClear
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  prefix={<SearchOutlined />}
                />
                <Select
                  placeholder="Status"
                  value={selectedStatus}
                  onChange={setSelectedStatus}
                  style={{ width: '100%' }}
                >
                  <Option value="all">All Status</Option>
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                  <Option value="suspended">Suspended</Option>
                </Select>
              </Space>
            </Card>

            {/* User List */}
            <div style={{ marginBottom: '12px' }}>
              {filteredUsers.slice(0, 5).map((user) => (
                <Card key={user.id} size="small">
                  <div style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <Space>
                        <Avatar src={user.avatar} size="small" icon={<UserOutlined />} />
                        <div>
                          <div style={{ fontWeight: 500, fontSize: '14px' }}>{user.name}</div>
                          <div style={{ fontSize: '12px', color: '#666' }}>{user.email}</div>
                        </div>
                      </Space>
                      <Tag color={getStatusColor(user.status)}>
                        {user.status.toUpperCase()}
                      </Tag>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px', color: '#666' }}>{user.department}</span>
                      <Tag>{user.role}</Tag>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', color: '#666' }}>
                        Last login: {user.lastLogin.toLocaleDateString()}
                      </span>
                      <Space>
                        <Button type="text" icon={<EyeOutlined />} size="small" />
                        <Button type="text" icon={<EditOutlined />} size="small" />
                        <Button type="text" danger icon={<DeleteOutlined />} size="small" />
                      </Space>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 12px 0' }}>System Logs</h2>
            </div>
            <div style={{ marginBottom: '8px' }}>
              {mockAdminLogs.slice(0, 5).map((log) => (
                <Card key={log.id} size="small">
                  <div style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Space>
                        <div className={`w-2 h-2 rounded-full ${
                          log.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <div>
                          <div style={{ fontWeight: 500, fontSize: '14px' }}>{log.action}</div>
                          <div style={{ fontSize: '12px', color: '#666' }}>{log.resource}</div>
                        </div>
                      </Space>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '11px' }}>{log.timestamp.toLocaleString()}</div>
                        <div style={{ fontSize: '11px', color: '#666' }}>{log.ip}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div style={{ marginBottom: '12px' }}>
            {['General', 'Security'].map((category) => (
              <Card 
                key={category}
                title={
                  <span>
                    {category === 'General' && <SettingOutlined />}
                    {category === 'Security' && <SafetyOutlined />}
                    {' '}{category}
                  </span>
                }
                size="small"
                style={{ marginBottom: '12px' }}
              >
                <div style={{ marginBottom: '12px' }}>
                  {mockAdminSettings
                    .filter(setting => setting.category === category)
                    .map((setting) => (
                      <div key={setting.id} style={{ marginBottom: '12px' }}>
                        <Row align="middle" justify="space-between">
                          <Col flex="auto">
                            <div style={{ fontWeight: 500, fontSize: '14px', marginBottom: '2px' }}>
                              {setting.key.replace('_', ' ').toUpperCase()}
                            </div>
                            <div style={{ fontSize: '12px', color: '#666' }}>
                              {setting.description}
                            </div>
                          </Col>
                          <Col>
                            {setting.type === 'boolean' && (
                              <Switch 
                                checked={setting.value as boolean}
                                size="small"
                              />
                            )}
                            {setting.type === 'number' && (
                              <InputNumber
                                value={setting.value as number}
                                size="small"
                                style={{ width: 60 }}
                              />
                            )}
                            {setting.type === 'string' && (
                              <Input
                                value={setting.value as string}
                                size="small"
                                style={{ width: 80 }}
                              />
                            )}
                          </Col>
                        </Row>
                      </div>
                    ))}
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'security' && (
          <div style={{ marginBottom: '12px' }}>
            <Card size="small" style={{ borderColor: '#52c41a', backgroundColor: '#f6ffed', marginBottom: '12px' }}>
              <div style={{ padding: '12px' }}>
                <Space>
                  <SafetyOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#135200', fontSize: '14px' }}>Authentication</div>
                    <div style={{ fontSize: '12px', color: '#52c41a' }}>All systems secure</div>
                  </div>
                </Space>
              </div>
            </Card>
            <Card size="small" style={{ borderColor: '#faad14', backgroundColor: '#fffbe6', marginBottom: '12px' }}>
              <div style={{ padding: '12px' }}>
                <Space>
                  <BellOutlined style={{ fontSize: '24px', color: '#faad14' }} />
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#613400', fontSize: '14px' }}>Updates Available</div>
                    <div style={{ fontSize: '12px', color: '#faad14' }}>3 security patches</div>
                  </div>
                </Space>
              </div>
            </Card>
            <Card size="small" style={{ borderColor: '#1890ff', backgroundColor: '#e6f7ff' }}>
              <div style={{ padding: '12px' }}>
                <Space>
                  <DatabaseOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#002766', fontSize: '14px' }}>Backup Status</div>
                    <div style={{ fontSize: '12px', color: '#1890ff' }}>Last backup: 2 hours ago</div>
                  </div>
                </Space>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AntDesignMobileAdmin;
