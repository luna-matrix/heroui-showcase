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
  Divider,
  Tag,
  Layout,
  Pagination,
  Modal,
  Rate,
  Checkbox,
  Space,
  Typography,
  Empty,
  FloatButton,
  Drawer,
  Tabs,
  Segmented,
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
  CloseOutlined,
  PlusOutlined,
  MinusOutlined
} from '@ant-design/icons';
import { mockEcommerceData, ExtendedProduct } from '@/lib/mock-data/ecommerce';
import { cn } from '@/lib/utils/cn';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

export const AntDesignMobileEcommerce: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [cartItems, setCartItems] = useState(3);
  const [activeTab, setActiveTab] = useState('home');
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const [productModalVisible, setProductModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ExtendedProduct | null>(null);

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

  const MobileProductCard: React.FC<{ product: ExtendedProduct }> = ({ product }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
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
              className="h-40 w-full object-cover"
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
              <Tag color="red" className="absolute top-2 left-2 text-xs">
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
            size="small"
          >
            Add to Cart
          </Button>
        ]}
        onClick={() => {
          setSelectedProduct(product);
          setProductModalVisible(true);
        }}
      >
        <Card.Meta
          title={
            <div className="line-clamp-1 font-semibold text-sm">{product.name}</div>
          }
          description={
            <div className="space-y-1">
              <Text className="text-gray-600 line-clamp-1 text-xs">{product.description}</Text>
              
              <div className="flex items-center gap-1">
                <Rate disabled defaultValue={product.rating} className="text-xs" />
                <Text type="secondary" className="text-xs">({product.reviews})</Text>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Text strong className="text-sm">${product.price}</Text>
                  {product.originalPrice && (
                    <Text delete type="secondary" className="text-xs">${product.originalPrice}</Text>
                  )}
                </div>
                
                <Badge
                  status={product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'error'}
                  text={
                    product.stock > 10 ? 'In Stock' : 
                    product.stock > 0 ? `Only ${product.stock}` : 'Out'
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

  const HomeTab = () => (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="sticky top-0 bg-white z-10 pb-2">
        <Input
          placeholder="Search products..."
          prefix={<SearchOutlined />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="large"
        />
      </div>

      {/* Categories */}
      <Card title="Categories" size="small">
        <Row gutter={[8, 8]}>
          {categories.slice(1).map(cat => (
            <Col span={12} key={cat.value}>
              <Button
                size="small"
                className="w-full"
                onClick={() => setSelectedCategory(cat.value)}
              >
                {cat.label}
              </Button>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Featured Products */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <Title level={4}>Featured Products</Title>
          <Button type="link" size="small">
            See All
          </Button>
        </div>
        <Row gutter={[12, 12]}>
          {sortedProducts.slice(0, 4).map((product) => (
            <Col span={12} key={product.id}>
              <MobileProductCard product={product} />
            </Col>
          ))}
        </Row>
      </div>

      {/* Special Offers */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
        <div className="text-center space-y-2">
          <Title level={4} className="!mb-0 !text-white">Flash Sale!</Title>
          <Text className="text-white opacity-90">Up to 50% off selected items</Text>
          <Button type="primary" className="bg-white text-purple-600">
            Shop Now
          </Button>
        </div>
      </Card>
    </div>
  );

  const ProductsTab = () => (
    <div className="space-y-3">
      {/* Filter and Sort */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-lg">
        <Button
          icon={<FilterOutlined />}
          onClick={() => setFilterDrawerVisible(true)}
          size="small"
        >
          Filters
        </Button>
        
        <Select
          value={sortBy}
          onChange={setSortBy}
          size="small"
          className="flex-1"
        >
          {sortOptions.map(option => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </div>

      {/* Products Grid */}
      <Row gutter={[12, 12]}>
        {sortedProducts.map((product) => (
          <Col span={12} key={product.id}>
            <MobileProductCard product={product} />
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination
          total={sortedProducts.length}
          pageSize={8}
          simple
          showSizeChanger={false}
        />
      </div>
    </div>
  );

  const CartTab = () => (
    <div className="text-center py-8">
      <Empty
        image={<ShoppingCartOutlined className="text-4xl" />}
        description="Your cart is empty"
      />
    </div>
  );

  const ProfileTab = () => (
    <div className="text-center py-8">
      <Empty
        image={<UserOutlined className="text-4xl" />}
        description="Profile coming soon"
      />
    </div>
  );

  return (
    <Layout className="min-h-screen">
      {/* Header */}
      <Header className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Title level={4} className="!mb-0">
              ShopHub
            </Title>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge count={cartItems} size="small">
              <Button type="primary" icon={<ShoppingCartOutlined />} size="small" />
            </Badge>
          </div>
        </div>
      </Header>

      {/* Main Content */}
      <Content className="bg-gray-50 pb-16">
        <div className="p-3">
          {activeTab === 'home' && <HomeTab />}
          {activeTab === 'products' && <ProductsTab />}
          {activeTab === 'cart' && <CartTab />}
          {activeTab === 'profile' && <ProfileTab />}
        </div>
      </Content>

      {/* Filter Drawer */}
      <Drawer
        title="Filters"
        placement="bottom"
        onClose={() => setFilterDrawerVisible(false)}
        open={filterDrawerVisible}
        height="80vh"
      >
        <Space direction="vertical" className="w-full" size="large">
          <div>
            <Title level={5}>Category</Title>
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
      </Drawer>

      {/* Product Detail Modal */}
      <Modal
        title="Product Details"
        open={productModalVisible}
        onCancel={() => setProductModalVisible(false)}
        footer={[
          <Button
            key="wishlist"
            icon={<HeartOutlined />}
            onClick={() => setCartItems(cartItems + 1)}
            className="flex-1"
          >
            Wishlist
          </Button>,
          <Button
            key="cart"
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={() => setCartItems(cartItems + 1)}
            className="flex-1"
          >
            Add to Cart
          </Button>
        ]}
        width="100%"
        centered
      >
        {selectedProduct && (
          <div className="space-y-4">
            <Image
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full rounded-lg"
            />
            
            <div>
              <Title level={4}>{selectedProduct.name}</Title>
              <Text type="secondary">{selectedProduct.description}</Text>
            </div>
            
            <div className="flex items-center gap-2">
              <Rate disabled defaultValue={selectedProduct.rating} />
              <Text type="secondary">({selectedProduct.reviews} reviews)</Text>
            </div>
            
            <div className="flex items-center gap-3">
              <Title level={3} className="!mb-0">${selectedProduct.price}</Title>
              {selectedProduct.originalPrice && (
                <Text delete type="secondary">
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
            
            <Divider />
            
            <div>
              <Title level={5}>Product Details</Title>
              <Space direction="vertical" className="w-full" size="small">
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
            </div>
          </div>
        )}
      </Modal>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          centered
          size="small"
          className="w-full"
          items={[
            {
              key: 'home',
              label: <span><HomeOutlined /> Home</span>,
            },
            {
              key: 'products',
              label: <span><ShopOutlined /> Products</span>,
            },
            {
              key: 'cart',
              label: <span><ShoppingCartOutlined /> Cart</span>,
            },
            {
              key: 'profile',
              label: <span><UserOutlined /> Profile</span>,
            },
          ]}
        />
      </div>
    </Layout>
  );
};
