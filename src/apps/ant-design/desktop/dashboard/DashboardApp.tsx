'use client';

import React, { useState } from 'react';
import { 
  Layout, Card, Row, Col, Statistic, Typography, Table, Tag, 
  Progress, List, Avatar, Space, Divider, Button, Dropdown,
  Menu, Timeline, Alert, Badge, Tooltip
} from 'antd';
import {
  UserOutlined, ShoppingCartOutlined, DollarOutlined,
  TrendingUpOutlined, ArrowUpOutlined, ArrowDownOutlined,
  EllipsisOutlined, BellOutlined, SettingOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined,
  PlusOutlined, FilterOutlined, ExportOutlined,
  TeamOutlined, ProjectOutlined, FileTextOutlined,
  CalendarOutlined, MailOutlined, PhoneOutlined,
  MoreOutlined, EditOutlined, DeleteOutlined, EyeOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;
const { Meta } = Card;

export const AntDesignDesktopDashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  // Mock data from our existing system
  const stats = [
    {
      title: 'Total Revenue',
      value: '$48,574',
      precision: 0,
      valueStyle: { color: '#3f8600' },
      prefix: <DollarOutlined />,
      suffix: <span style={{ fontSize: 14, color: '#52c41a' }}>+12.5%</span>,
      trend: 'up'
    },
    {
      title: 'Active Users',
      value: 2476,
      valueStyle: { color: '#1890ff' },
      prefix: <UserOutlined />,
      suffix: <span style={{ fontSize: 14, color: '#1890ff' }}>+8.2%</span>,
      trend: 'up'
    },
    {
      title: 'Total Orders',
      value: 847,
      valueStyle: { color: '#722ed1' },
      prefix: <ShoppingCartOutlined />,
      suffix: <span style={{ fontSize: 14, color: '#ff4d4f' }}>-3.1%</span>,
      trend: 'down'
    },
    {
      title: 'Conversion Rate',
      value: 3.24,
      precision: 2,
      valueStyle: { color: '#52c41a' },
      prefix: <TrendingUpOutlined />,
      suffix: '%',
      trend: 'up'
    }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 42000, orders: 120 },
    { month: 'Feb', revenue: 48000, orders: 140 },
    { month: 'Mar', revenue: 52000, orders: 160 },
    { month: 'Apr', revenue: 44000, orders: 130 },
    { month: 'May', revenue: 58000, orders: 180 },
    { month: 'Jun', revenue: 62000, orders: 200 },
  ];

  const recentOrders = [
    {
      key: '1',
      id: '#3210',
      customer: 'John Doe',
      product: 'Premium Dashboard',
      amount: '$2,599',
      status: 'Completed',
      date: '2024-01-15',
      avatar: 'JD'
    },
    {
      key: '2',
      id: '#3209',
      customer: 'Jane Smith',
      product: 'Analytics Pro',
      amount: '$1,299',
      status: 'Processing',
      date: '2024-01-15',
      avatar: 'JS'
    },
    {
      key: '3',
      id: '#3208',
      customer: 'Bob Johnson',
      product: 'Basic Plan',
      amount: '$599',
      status: 'Pending',
      date: '2024-01-14',
      avatar: 'BJ'
    },
  ];

  const activities = [
    {
      title: 'New user registration',
      description: 'John Doe joined the platform',
      time: '2 minutes ago',
      color: 'green'
    },
    {
      title: 'Order completed',
      description: 'Order #3210 has been delivered',
      time: '15 minutes ago',
      color: 'blue'
    },
    {
      title: 'System update',
      description: 'Dashboard analytics updated successfully',
      time: '1 hour ago',
      color: 'orange'
    },
    {
      title: 'New feature released',
      description: 'Real-time notifications now available',
      time: '2 hours ago',
      color: 'purple'
    }
  ];

  const topProducts = [
    { name: 'Premium Dashboard', sales: 245, revenue: '$245,000', growth: 12 },
    { name: 'Analytics Pro', sales: 189, revenue: '$189,000', growth: 8 },
    { name: 'Basic Plan', sales: 156, revenue: '$78,000', growth: -3 },
    { name: 'Enterprise Suite', sales: 98, revenue: '$294,000', growth: 15 },
  ];

  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '2',
      icon: <ShoppingCartOutlined />,
      label: 'Orders',
    },
    {
      key: '3',
      icon: <UserOutlined />,
      label: 'Customers',
    },
    {
      key: '4',
      icon: <ProjectOutlined />,
      label: 'Products',
    },
    {
      key: '5',
      icon: <FileTextOutlined />,
      label: 'Reports',
    },
    {
      key: '6',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  const moreMenuItems: MenuProps['items'] = [
    {
      key: '1',
      label: 'Edit',
      icon: <EditOutlined />,
    },
    {
      key: '2',
      label: 'View',
      icon: <EyeOutlined />,
    },
    {
      key: '3',
      danger: true,
      label: 'Delete',
      icon: <DeleteOutlined />,
    },
  ];

  const orderColumns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      render: (customer: string, record: any) => (
        <Space>
          <Avatar size="small" style={{ backgroundColor: '#1890ff' }}>
            {record.avatar}
          </Avatar>
          {customer}
        </Space>
      ),
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: string) => <Text strong>{amount}</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = status === 'Completed' ? 'green' : status === 'Processing' ? 'blue' : 'orange';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Dropdown menu={{ items: moreMenuItems }} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Header */}
      <Header style={{ 
        padding: '0 24px', 
        background: '#fff', 
        borderBottom: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Space>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <Title level={3} style={{ margin: 0, color: '#262626' }}>
            Dashboard
          </Title>
        </Space>
        
        <Space size="large">
          <Button type="text" icon={<SearchOutlined />} />
          <Badge count={5}>
            <Button type="text" icon={<BellOutlined />} />
          </Badge>
          <Avatar style={{ backgroundColor: '#1890ff' }}>JD</Avatar>
        </Space>
      </Header>

      <Layout>
        {/* Sidebar */}
        <Sider 
          trigger={null} 
          collapsible 
          collapsed={collapsed}
          style={{ background: '#fff' }}
          width={200}
        >
          <Menu
            mode="inline"
            selectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
          />
        </Sider>

        {/* Main Content */}
        <Content style={{ margin: '24px', overflow: 'initial' }}>
          {/* Page Header */}
          <div style={{ marginBottom: 24 }}>
            <Row justify="space-between" align="middle">
              <Col>
                <Title level={2} style={{ margin: 0 }}>Dashboard Overview</Title>
                <Text type="secondary">Welcome back! Here's what's happening with your store today.</Text>
              </Col>
              <Col>
                <Space>
                  <Button icon={<PlusOutlined />} type="primary">New Order</Button>
                  <Button icon={<ExportOutlined />}>Export</Button>
                </Space>
              </Col>
            </Row>
          </div>

          {/* Stats Cards */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            {stats.map((stat, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card>
                  <Statistic
                    title={stat.title}
                    value={stat.value}
                    precision={stat.precision}
                    valueStyle={stat.valueStyle}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </Card>
              </Col>
            ))}
          </Row>

          {/* Charts and Tables */}
          <Row gutter={[16, 16]}>
            {/* Revenue Chart */}
            <Col xs={24} lg={16}>
              <Card 
                title="Revenue Overview"
                extra={
                  <Space>
                    <Button size="small" icon={<FilterOutlined />}>Filter</Button>
                    <Dropdown menu={{ items: moreMenuItems }} trigger={['click']}>
                      <Button size="small" icon={<EllipsisOutlined />} />
                    </Dropdown>
                  </Space>
                }
              >
                <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Alert 
                    message="Revenue Chart" 
                    description="Interactive revenue chart would be displayed here with Ant Design Charts"
                    type="info" 
                    showIcon 
                  />
                </div>
                
                <Divider />
                
                <Row gutter={16}>
                  {revenueData.slice(-3).map((item, index) => (
                    <Col span={8} key={index}>
                      <div style={{ textAlign: 'center' }}>
                        <Text type="secondary">{item.month}</Text>
                        <div>
                          <Title level={4} style={{ margin: '8px 0' }}>
                            ${(item.revenue / 1000).toFixed(0)}k
                          </Title>
                          <Text type={index > 0 ? 'success' : 'secondary'}>
                            {index > 0 ? '+' : ''} {item.orders} orders
                          </Text>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>

            {/* Top Products */}
            <Col xs={24} lg={8}>
              <Card title="Top Products">
                <List
                  dataSource={topProducts}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={
                          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                            <Text>{item.name}</Text>
                            <Tag color={item.growth > 0 ? 'green' : 'red'}>
                              {item.growth > 0 ? '+' : ''}{item.growth}%
                            </Tag>
                          </Space>
                        }
                        description={
                          <Space>
                            <Text type="secondary">{item.sales} sales</Text>
                            <Divider type="vertical" />
                            <Text strong>{item.revenue}</Text>
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>

            {/* Recent Orders */}
            <Col xs={24} lg={16}>
              <Card 
                title="Recent Orders"
                extra={
                  <Button type="link" size="small">
                    View all
                  </Button>
                }
              >
                <Table
                  dataSource={recentOrders}
                  columns={orderColumns}
                  pagination={false}
                  size="small"
                />
              </Card>
            </Col>

            {/* Recent Activity */}
            <Col xs={24} lg={8}>
              <Card title="Recent Activity">
                <Timeline
                  items={activities.map((activity, index) => ({
                    key: index,
                    color: activity.color,
                    children: (
                      <div>
                        <Text strong>{activity.title}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {activity.description}
                        </Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 11 }}>
                          {activity.time}
                        </Text>
                      </div>
                    ),
                  }))}
                />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};
