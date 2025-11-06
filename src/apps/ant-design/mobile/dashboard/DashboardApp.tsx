'use client';

import React, { useState } from 'react';
import { 
  Layout, Card, Row, Col, Statistic, Typography, Table, Tag, 
  List, Avatar, Space, Divider, Button, Dropdown,
  Menu, Timeline, Alert, Badge, Tabs, Grid,
  FloatButton, Drawer
} from 'antd';
import {
  UserOutlined, ShoppingCartOutlined, DollarOutlined,
  RiseOutlined, BellOutlined, SettingOutlined,
  MenuOutlined, SearchOutlined, PlusOutlined, FilterOutlined,
  TeamOutlined, ProjectOutlined, FileTextOutlined,
  MoreOutlined, EditOutlined, DeleteOutlined, EyeOutlined,
  HomeOutlined, BarChartOutlined, AppstoreOutlined,
  MessageOutlined, SyncOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { useBreakpoint } = Grid;

export const AntDesignMobileDashboard: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const screens = useBreakpoint();

  // Mock data
  const stats = [
    {
      title: 'Revenue',
      value: '$48.5k',
      valueStyle: { color: '#3f8600' },
      prefix: <DollarOutlined />,
      trend: '+12.5%'
    },
    {
      title: 'Users',
      value: '2.4k',
      valueStyle: { color: '#1890ff' },
      prefix: <UserOutlined />,
      trend: '+8.2%'
    },
    {
      title: 'Orders',
      value: '847',
      valueStyle: { color: '#722ed1' },
      prefix: <ShoppingCartOutlined />,
      trend: '-3.1%'
    },
    {
      title: 'Rate',
      value: '3.2%',
      valueStyle: { color: '#52c41a' },
      prefix: <RiseOutlined />,
      trend: '+0.8%'
    }
  ];

  const recentOrders = [
    {
      key: '1',
      id: '#3210',
      customer: 'John Doe',
      product: 'Premium',
      amount: '$2,599',
      status: 'Completed',
      avatar: 'JD'
    },
    {
      key: '2',
      id: '#3209',
      customer: 'Jane Smith',
      product: 'Analytics',
      amount: '$1,299',
      status: 'Processing',
      avatar: 'JS'
    },
    {
      key: '3',
      id: '#3208',
      customer: 'Bob Johnson',
      product: 'Basic',
      amount: '$599',
      status: 'Pending',
      avatar: 'BJ'
    },
  ];

  const activities = [
    {
      title: 'New user',
      description: 'John Doe joined',
      time: '2m ago',
      color: 'green'
    },
    {
      title: 'Order completed',
      description: 'Order #3210 delivered',
      time: '15m ago',
      color: 'blue'
    },
    {
      title: 'System update',
      description: 'Analytics updated',
      time: '1h ago',
      color: 'orange'
    },
  ];

  const topProducts = [
    { name: 'Premium Dashboard', sales: 245, growth: 12 },
    { name: 'Analytics Pro', sales: 189, growth: 8 },
    { name: 'Basic Plan', sales: 156, growth: -3 },
  ];

  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: '2',
      icon: <BarChartOutlined />,
      label: 'Analytics',
    },
    {
      key: '3',
      icon: <AppstoreOutlined />,
      label: 'Products',
    },
    {
      key: '4',
      icon: <MessageOutlined />,
      label: 'Messages',
    },
    {
      key: '5',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  const orderColumns = [
    {
      title: 'Order',
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
  ];

  const renderOverviewTab = () => (
    <div>
      {/* Stats Grid */}
      <Row gutter={[8, 8]} style={{ marginBottom: 16 }}>
        {stats.map((stat, index) => (
          <Col span={12} key={index}>
            <Card size="small">
              <Statistic
                title={stat.title}
                value={stat.value}
                valueStyle={stat.valueStyle}
                prefix={stat.prefix}
                suffix={
                  <Text style={{ fontSize: 12, color: stat.valueStyle.color }}>
                    {stat.trend}
                  </Text>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Quick Actions */}
      <Card title="Quick Actions" size="small" style={{ marginBottom: 16 }}>
        <Space wrap>
          <Button type="primary" icon={<PlusOutlined />} size="small">
            New Order
          </Button>
          <Button icon={<SearchOutlined />} size="small">
            Search
          </Button>
          <Button icon={<FilterOutlined />} size="small">
            Filter
          </Button>
        </Space>
      </Card>

      {/* Recent Activity */}
      <Card title="Recent Activity" size="small">
        <Timeline
          size="small"
          items={activities.map((activity, index) => ({
            key: index,
            color: activity.color,
            children: (
              <div>
                <Text strong style={{ fontSize: 14 }}>{activity.title}</Text>
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
    </div>
  );

  const renderOrdersTab = () => (
    <div>
      <Card title="Recent Orders" size="small">
        <Table
          dataSource={recentOrders}
          columns={orderColumns}
          pagination={false}
          size="small"
          scroll={{ x: 400 }}
        />
      </Card>
    </div>
  );

  const renderProductsTab = () => (
    <div>
      <Card title="Top Products" size="small">
        <List
          dataSource={topProducts}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Tag color={item.growth > 0 ? 'green' : 'red'}>
                  {item.growth > 0 ? '+' : ''}{item.growth}%
                </Tag>
              ]}
            >
              <List.Item.Meta
                title={item.name}
                description={`${item.sales} sales`}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Header */}
      <Header style={{ 
        padding: '0 16px', 
        background: '#fff', 
        borderBottom: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 56
      }}>
        <Space>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setDrawerVisible(true)}
            style={{ fontSize: '16px' }}
          />
          <Title level={4} style={{ margin: 0, color: '#262626' }}>
            Dashboard
          </Title>
        </Space>
        
        <Space>
          <Badge count={5}>
            <Button type="text" icon={<BellOutlined />} />
          </Badge>
          <Avatar size="small" style={{ backgroundColor: '#1890ff' }}>JD</Avatar>
        </Space>
      </Header>

      {/* Main Content */}
      <Content style={{ padding: '12px' }}>
        {/* Tab Navigation */}
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          size="small"
          style={{ marginBottom: 16 }}
        >
          <TabPane tab="Overview" key="overview" />
          <TabPane tab="Orders" key="orders" />
          <TabPane tab="Products" key="products" />
        </Tabs>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'orders' && renderOrdersTab()}
        {activeTab === 'products' && renderProductsTab()}

        {/* Sync Status */}
        <Alert
          message="Last synced 2 minutes ago"
          type="info"
          showIcon
          icon={<SyncOutlined />}
          style={{ marginTop: 16 }}
        />
      </Content>

      {/* Bottom Navigation */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#fff',
        borderTop: '1px solid #f0f0f0',
        padding: '8px 0',
        zIndex: 1000
      }}>
        <Menu
          mode="horizontal"
          selectedKeys={[activeTab === 'overview' ? '1' : activeTab === 'orders' ? '2' : '3']}
          style={{ 
            border: 'none',
            display: 'flex',
            justifyContent: 'space-around'
          }}
          items={menuItems}
        />
      </div>

      {/* Navigation Drawer */}
      <Drawer
        title="Navigation"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="inline"
          selectedKeys={['1']}
          style={{ height: '100%', borderRight: 0 }}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
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
          ]}
        />
      </Drawer>

      {/* Floating Action Button */}
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ right: 24, bottom: 80 }}
        icon={<PlusOutlined />}
      >
        <FloatButton icon={<PlusOutlined />} tooltip="New Order" />
        <FloatButton icon={<UserOutlined />} tooltip="New Customer" />
        <FloatButton icon={<FileTextOutlined />} tooltip="New Report" />
      </FloatButton.Group>
    </Layout>
  );
};
