'use client';

import React, { useState } from 'react';
import { 
  Card, 
  Table, 
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
  Form
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
  BarChartOutlined
} from '@ant-design/icons';
import { mockAdminUsers, mockAdminLogs, mockAdminSettings, mockAdminMetrics } from '@/lib/mock-data/admin';

const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;

const AntDesignDesktopAdmin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [activeTab, setActiveTab] = useState('users');

  const filteredUsers = mockAdminUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    const matchesDepartment = selectedDepartment === 'all' || user.department === selectedDepartment;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'inactive': return 'default';
      case 'suspended': return 'red';
      default: return 'default';
    }
  };

  const userColumns = [
    {
      title: 'User',
      key: 'user',
      render: (_: any, record: any) => (
        <Space>
          <Avatar src={record.avatar} size="small" icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 500 }}>{record.name}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => <Tag>{role}</Tag>,
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: (date: Date) => date.toLocaleDateString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button type="text" icon={<EyeOutlined />} size="small" />
          <Button type="text" icon={<EditOutlined />} size="small" />
          <Button type="text" danger icon={<DeleteOutlined />} size="small" />
        </Space>
      ),
    },
  ];

  const logColumns = [
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (action: string) => <span style={{ fontWeight: 500 }}>{action}</span>,
    },
    {
      title: 'Resource',
      dataIndex: 'resource',
      key: 'resource',
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (date: Date) => date.toLocaleString(),
    },
    {
      title: 'IP Address',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge 
          status={status === 'success' ? 'success' : 'error'} 
          text={status.toUpperCase()} 
        />
      ),
    },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      {/* Header */}
      <Card 
        style={{ 
          marginBottom: '24px', 
          borderRadius: '0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
        bodyStyle={{ padding: '24px', background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: 'white' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Admin Dashboard</h1>
            <p style={{ fontSize: '14px', opacity: 0.8, margin: '4px 0 0 0' }}>
              Manage users, settings, and system monitoring
            </p>
          </div>
          <Space>
            <Button icon={<DownloadOutlined />} style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
              Export
            </Button>
            <Button type="primary" icon={<PlusOutlined />} style={{ background: 'white', color: '#1890ff', border: 'none' }}>
              Add User
            </Button>
          </Space>
        </div>
      </Card>

      <div style={{ padding: '0 24px' }}>
        {/* Metrics */}
        <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
          {mockAdminMetrics.map((metric) => (
            <Col xs={24} sm={12} lg={6} key={metric.id}>
              <Card hoverable>
                <Statistic
                  title={metric.name}
                  value={metric.value}
                  suffix={metric.unit}
                  valueStyle={{ color: metric.changeType === 'increase' ? '#3f8600' : '#cf1322' }}
                  prefix={
                    metric.changeType === 'increase' ? 
                    <ArrowUpOutlined style={{ color: '#3f8600' }} /> :
                    <ArrowDownOutlined style={{ color: '#cf1322' }} />
                  }
                />
                <div style={{ marginTop: '12px' }}>
                  <Progress 
                    percent={Math.abs(metric.change)} 
                    status={metric.changeType === 'increase' ? 'success' : 'exception'}
                    showInfo={false}
                    size="small"
                  />
                  <span style={{ 
                    marginLeft: '12px', 
                    fontSize: '14px',
                    color: metric.changeType === 'increase' ? '#3f8600' : '#cf1322'
                  }}>
                    {metric.changeType === 'increase' ? '+' : '-'}{Math.abs(metric.change)}%
                  </span>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Main Content */}
        <Card>
          <Tabs activeKey={activeTab} onChange={setActiveTab} type="card">
            <TabPane 
              tab={
                <span>
                  <UserOutlined />
                  Users
                </span>
              } 
              key="users"
            >
              <div style={{ marginBottom: '16px' }}>
                <Row gutter={[16, 16]} align="middle">
                  <Col flex="auto">
                    <Search
                      placeholder="Search users..."
                      allowClear
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      prefix={<SearchOutlined />}
                      style={{ width: '100%' }}
                    />
                  </Col>
                  <Col>
                    <Select
                      placeholder="Status"
                      value={selectedStatus}
                      onChange={setSelectedStatus}
                      style={{ width: 120 }}
                    >
                      <Option value="all">All Status</Option>
                      <Option value="active">Active</Option>
                      <Option value="inactive">Inactive</Option>
                      <Option value="suspended">Suspended</Option>
                    </Select>
                  </Col>
                  <Col>
                    <Select
                      placeholder="Department"
                      value={selectedDepartment}
                      onChange={setSelectedDepartment}
                      style={{ width: 150 }}
                    >
                      <Option value="all">All Departments</Option>
                      <Option value="Engineering">Engineering</Option>
                      <Option value="Product">Product</Option>
                      <Option value="Marketing">Marketing</Option>
                      <Option value="Sales">Sales</Option>
                      <Option value="Operations">Operations</Option>
                    </Select>
                  </Col>
                  <Col>
                    <Button icon={<FilterOutlined />}>
                      More Filters
                    </Button>
                  </Col>
                </Row>
              </div>
              <Table
                columns={userColumns}
                dataSource={filteredUsers}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                scroll={{ x: 800 }}
              />
            </TabPane>

            <TabPane 
              tab={
                <span>
                  <FileTextOutlined />
                  Logs
                </span>
              } 
              key="logs"
            >
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>System Logs</h2>
                  <Button icon={<DownloadOutlined />}>
                    Export Logs
                  </Button>
                </div>
              </div>
              <Table
                columns={logColumns}
                dataSource={mockAdminLogs}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </TabPane>

            <TabPane 
              tab={
                <span>
                  <SettingOutlined />
                  Settings
                </span>
              } 
              key="settings"
            >
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px' }}>System Settings</h2>
              <Row gutter={[24, 24]}>
                {['General', 'Security', 'Notifications', 'Performance'].map((category) => (
                  <Col xs={24} lg={12} key={category}>
                    <Card 
                      title={
                        <span>
                          {category === 'General' && <SettingOutlined />}
                          {category === 'Security' && <SafetyOutlined />}
                          {category === 'Notifications' && <BellOutlined />}
                          {category === 'Performance' && <BarChartOutlined />}
                          {' '}{category} Settings
                        </span>
                      }
                      style={{ marginBottom: '24px' }}
                    >
                      <div style={{ space: '16px' }}>
                        {mockAdminSettings
                          .filter(setting => setting.category === category)
                          .map((setting) => (
                            <div key={setting.id} style={{ marginBottom: '16px' }}>
                              <Row align="middle" justify="space-between">
                                <Col>
                                  <div style={{ fontWeight: 500, marginBottom: '4px' }}>
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
                                      style={{ width: 80 }}
                                    />
                                  )}
                                  {setting.type === 'string' && (
                                    <Input
                                      value={setting.value as string}
                                      size="small"
                                      style={{ width: 120 }}
                                    />
                                  )}
                                  {setting.type === 'select' && (
                                    <Select
                                      value={setting.value as string}
                                      size="small"
                                      style={{ width: 120 }}
                                    >
                                      {setting.options?.map((option) => (
                                        <Option key={option} value={option}>
                                          {option}
                                        </Option>
                                      ))}
                                    </Select>
                                  )}
                                </Col>
                              </Row>
                            </div>
                          ))}
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </TabPane>

            <TabPane 
              tab={
                <span>
                  <SafetyOutlined />
                  Security
                </span>
              } 
              key="security"
            >
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '24px' }}>Security Overview</h2>
              <Row gutter={[24, 24]}>
                <Col xs={24} md={8}>
                  <Card style={{ borderColor: '#52c41a', backgroundColor: '#f6ffed' }}>
                    <div style={{ padding: '16px' }}>
                      <Space>
                        <SafetyOutlined style={{ fontSize: '32px', color: '#52c41a' }} />
                        <div>
                          <div style={{ fontWeight: 'bold', color: '#135200' }}>Authentication</div>
                          <div style={{ fontSize: '14px', color: '#52c41a' }}>All systems secure</div>
                        </div>
                      </Space>
                    </div>
                  </Card>
                </Col>
                <Col xs={24} md={8}>
                  <Card style={{ borderColor: '#faad14', backgroundColor: '#fffbe6' }}>
                    <div style={{ padding: '16px' }}>
                      <Space>
                        <BellOutlined style={{ fontSize: '32px', color: '#faad14' }} />
                        <div>
                          <div style={{ fontWeight: 'bold', color: '#613400' }}>Updates Available</div>
                          <div style={{ fontSize: '14px', color: '#faad14' }}>3 security patches</div>
                        </div>
                      </Space>
                    </div>
                  </Card>
                </Col>
                <Col xs={24} md={8}>
                  <Card style={{ borderColor: '#1890ff', backgroundColor: '#e6f7ff' }}>
                    <div style={{ padding: '16px' }}>
                      <Space>
                        <DatabaseOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
                        <div>
                          <div style={{ fontWeight: 'bold', color: '#002766' }}>Backup Status</div>
                          <div style={{ fontSize: '14px', color: '#1890ff' }}>Last backup: 2 hours ago</div>
                        </div>
                      </Space>
                    </div>
                  </Card>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default AntDesignDesktopAdmin;
