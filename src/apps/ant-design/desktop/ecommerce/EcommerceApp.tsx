'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  Row,
  Col,
  Button,
  Input,
  Select,
  Badge,
  Avatar,
  Image,
  Tabs,
  Divider,
  Tag,
  Layout,
  Menu,
  Pagination,
  Modal,
  Rate,
  Checkbox,
  Slider,
  Space,
  Typography,
  Empty,
  Breadcrumb,
  Dropdown,
} from 'antd';
import { 
  SearchOutlined, 
  ShoppingCartOutlined, 
  HeartOutlined, 
  FilterOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  UserOutlined,
  BellOutlined,
  MenuOutlined,
  HomeOutlined,
  ShopOutlined,
  ShoppingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CloseOutlined
} from '@ant-design/icons';
import { mockEcommerceData, ExtendedProduct } from '@/lib/mock-data/ecommerce';
import { cn } from '@/lib/utils/cn';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

export const AntDesignDesktopEcommerce: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [cartItems, setCartItems] = useState(3);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ExtendedProduct | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'sports', label: 'Sports' },
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
  ];

  const filteredProducts = mockEcommerceData.products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  const ProductCard: React.FC<{ product: ExtendedProduct }> = ({ product }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card
        hoverable
        className="h-full"
        cover={
          <div className="relative">
            <Image
              alt={product.name}
              src={product.image}
              className="h-48 w-full object-cover"
              preview={false}
            />
            <div className="absolute top-2 right-2 flex gap-1">
              <Button
                type="text"
                icon={<HeartOutlined />}
                className="bg-white/80 backdrop-blur-sm"
                size="small"
              />
            </div>
            {product.discount && (
              <Tag color="red" className="absolute top-2 left-2">
                -{product.discount}%
              </Tag>
            )}
          </div>
        }
        actions={[
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={() => setCartItems(cartItems + 1)}
          >
            Add to Cart
          </Button>
        ]}
        onClick={() => {
          setSelectedProduct(product);
          setIsModalVisible(true);
        }}
      >
        <Card.Meta
          title={
            <div className="line-clamp-1 font-semibold">{product.name}</div>
          }
          description={
            <div className="space-y-2">
              <Text className="text-gray-600 line-clamp-2 text-sm">{product.description}</Text>
              
              <div className="flex items-center gap-2">
                <Rate disabled defaultValue={product.rating} className="text-xs" />
                <Text type="secondary" className="text-xs">({product.reviews} reviews)</Text>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Text strong className="text-lg">${product.price}</Text>
                  {product.originalPrice && (
                    <Text delete type="secondary" className="text-sm">${product.originalPrice}</Text>
                  )}
                </div>
                
                <Badge
                  status={product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'error'}
                  text={
                    product.stock > 10 ? 'In Stock' : 
                    product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'
                  }
                  className="text-xs"
                />
              </div>
            </div>
          }
        />
      </Card>
    </motion.div>
  );

  return (
    <Layout className="min-h-screen">
      {/* Header */}
      <Header className="bg-white border-b border-gray-200 px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Title level={3} className="!mb-0 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ShopHub
            </Title>
          </div>
          
          <div className="flex-1 max-w-2xl">
            <Input
              placeholder="Search products..."
              prefix={<SearchOutlined />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="large"
              className="max-w-full"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button type="text" icon={<BellOutlined />} />
          <Button type="text" icon={<UserOutlined />} />
          <Badge count={cartItems} size="small">
            <Button type="primary" icon={<ShoppingCartOutlined />}>
              Cart
            </Button>
          </Badge>
        </div>
      </Header>

      <Layout>
        {/* Sidebar Filters */}
        <Sider 
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={280}
          className="bg-white border-r border-gray-200"
          trigger={null}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Title level={5}>Filters</Title>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
              />
            </div>
            
            {!collapsed && (
              <Space direction="vertical" className="w-full" size="large">
                <div>
                  <Title level={5}>Price Range</Title>
                  <Space direction="vertical" className="w-full">
                    <Input placeholder="Min" size="small" />
                    <Input placeholder="Max" size="small" />
                    <Button type="primary" size="small" className="w-full">
                      Apply
                    </Button>
                  </Space>
                </div>
                
                <div>
                  <Title level={5}>Categories</Title>
                  <Select
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    className="w-full"
                  >
                    {categories.map(cat => (
                      <Option key={cat.value} value={cat.value}>
                        {cat.label}
                      </Option>
                    ))}
                  </Select>
                </div>
                
                <div>
                  <Title level={5}>Sort By</Title>
                  <Select
                    value={sortBy}
                    onChange={setSortBy}
                    className="w-full"
                  >
                    {sortOptions.map(option => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </div>
                
                <div>
                  <Title level={5}>View Mode</Title>
                  <Space>
                    <Button
                      type={viewMode === 'grid' ? 'primary' : 'default'}
                      icon={<AppstoreOutlined />}
                      onClick={() => setViewMode('grid')}
                    />
                    <Button
                      type={viewMode === 'list' ? 'primary' : 'default'}
                      icon={<UnorderedListOutlined />}
                      onClick={() => setViewMode('list')}
                    />
                  </Space>
                </div>
                
                <div>
                  <Title level={5}>Brands</Title>
                  <Space direction="vertical">
                    {['Apple', 'Samsung', 'Sony', 'Nike', 'Adidas'].map(brand => (
                      <Checkbox key={brand}>{brand}</Checkbox>
                    ))}
                  </Space>
                </div>
                
                <div>
                  <Title level={5}>Rating</Title>
                  <Space direction="vertical">
                    {[4, 3, 2, 1].map(rating => (
                      <Checkbox key={rating}>
                        <Rate disabled defaultValue={rating} className="text-xs" />
                        <Text className="ml-2">& up</Text>
                      </Checkbox>
                    ))}
                  </Space>
                </div>
              </Space>
            )}
          </div>
        </Sider>

        {/* Main Content */}
        <Layout>
          <Content className="p-6 bg-gray-50">
            <div className="mb-6">
              <Breadcrumb
                items={[
                  { title: <HomeOutlined />, href: '' },
                  { title: 'Products', href: '' },
                  { title: `${sortedProducts.length} Results` }
                ]}
                className="mb-4"
              />
              
              <div className="flex items-center justify-between">
                <Title level={2} className="!mb-0">
                  {sortedProducts.length} Products Found
                </Title>
                <Text type="secondary">
                  Showing {Math.min(sortedProducts.length, 12)} of {sortedProducts.length}
                </Text>
              </div>
            </div>

            <Row gutter={[24, 24]}>
              {sortedProducts.slice(0, 12).map((product) => (
                <Col 
                  key={product.id}
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  xl={viewMode === 'list' ? 24 : 6}
                >
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <Pagination
                total={sortedProducts.length}
                pageSize={12}
                showSizeChanger
                showQuickJumper
                showTotal={(total, range) => 
                  `${range[0]}-${range[1]} of ${total} items`
                }
              />
            </div>
          </Content>
        </Layout>
      </Layout>

      {/* Product Detail Modal */}
      <Modal
        title="Product Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button
            key="wishlist"
            icon={<HeartOutlined />}
            onClick={() => setCartItems(cartItems + 1)}
          >
            Add to Wishlist
          </Button>,
          <Button
            key="cart"
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={() => setCartItems(cartItems + 1)}
          >
            Add to Cart
          </Button>
        ]}
        width={800}
      >
        {selectedProduct && (
          <div className="space-y-6">
            <Row gutter={24}>
              <Col span={8}>
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full rounded-lg"
                />
              </Col>
              <Col span={16}>
                <div className="space-y-4">
                  <div>
                    <Title level={3}>{selectedProduct.name}</Title>
                    <Text type="secondary">{selectedProduct.description}</Text>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Rate disabled defaultValue={selectedProduct.rating} />
                    <Text type="secondary">({selectedProduct.reviews} reviews)</Text>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Title level={2} className="!mb-0">${selectedProduct.price}</Title>
                    {selectedProduct.originalPrice && (
                      <Text delete type="secondary" className="text-lg">
                        ${selectedProduct.originalPrice}
                      </Text>
                    )}
                    {selectedProduct.discount && (
                      <Tag color="red">-{selectedProduct.discount}%</Tag>
                    )}
                  </div>
                  
                  <Badge
                    status={selectedProduct.stock > 10 ? 'success' : selectedProduct.stock > 0 ? 'warning' : 'error'}
                    text={
                      selectedProduct.stock > 10 ? 'In Stock' : 
                      selectedProduct.stock > 0 ? `Only ${selectedProduct.stock} left` : 'Out of Stock'
                    }
                  />
                </div>
              </Col>
            </Row>
            
            <Divider />
            
            <Row gutter={24}>
              <Col span={12}>
                <Title level={5}>Product Details</Title>
                <Space direction="vertical" className="w-full">
                  <div className="flex justify-between">
                    <Text strong>Brand:</Text>
                    <Text>{selectedProduct.brand}</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text strong>Category:</Text>
                    <Text>{selectedProduct.category}</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text strong>Stock:</Text>
                    <Text>{selectedProduct.stock} units</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text strong>SKU:</Text>
                    <Text>{selectedProduct.sku}</Text>
                  </div>
                </Space>
              </Col>
              
              <Col span={12}>
                <Title level={5}>Specifications</Title>
                <Space direction="vertical" className="w-full">
                  {selectedProduct.specifications && Object.entries(selectedProduct.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <Text strong className="capitalize">{key}:</Text>
                      <Text>{value}</Text>
                    </div>
                  ))}
                </Space>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </Layout>
  );
};
