'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Select,
  SelectItem,
  Badge,
  Avatar,
  Image,
  Tabs,
  Tab,
  Divider,
  Chip,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@heroui/react';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  Star, 
  Filter,
  Grid3X3,
  List,
  User,
  Bell,
  Menu
} from 'lucide-react';
import { mockEcommerceData, ExtendedProduct } from '@/lib/mock-data/ecommerce';
import { cn } from '@/lib/utils/cn';

export const HeroUIDesktopEcommerce: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [cartItems, setCartItems] = useState(3);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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

  const ProductCard: React.FC<{ product: any }> = ({ product }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card 
        className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        isPressable
        onPress={() => {
          setSelectedProduct(product);
          onOpen();
        }}
      >
        <CardBody className="overflow-visible p-0">
          <div className="relative">
            <Image
              removeWrapper
              alt={product.name}
              className="w-full h-48 object-cover"
              src={product.image}
            />
            <div className="absolute top-2 right-2 flex gap-1">
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                className="bg-white/80 backdrop-blur-sm"
              >
                <Heart className="w-4 h-4" />
              </Button>
            </div>
            {product.discount && (
              <Chip
                color="danger"
                size="sm"
                className="absolute top-2 left-2"
              >
                -{product.discount}%
              </Chip>
            )}
          </div>
          
          <div className="p-4 space-y-3">
            <div>
              <h4 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h4>
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">{product.description}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium ml-1">{product.rating}</span>
              </div>
              <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                </div>
                <Badge 
                  color={product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'danger'}
                  size="sm"
                  variant="flat"
                >
                  {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
                </Badge>
              </div>
              
              <Button
                isIconOnly
                color="primary"
                size="sm"
                onPress={() => setCartItems(cartItems + 1)}
              >
                <ShoppingCart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar className="border-b border-gray-200 bg-white">
        <NavbarContent>
          <NavbarBrand>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ShopHub
            </h1>
          </NavbarBrand>
          
          <div className="flex-1 max-w-2xl mx-8">
            <Input
              startContent={<Search className="w-5 h-5 text-gray-400" />}
              placeholder="Search products..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              size="md"
              className="max-w-full"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <Button isIconOnly variant="flat">
              <Bell className="w-5 h-5" />
            </Button>
            <Button isIconOnly variant="flat">
              <User className="w-5 h-5" />
            </Button>
            <Button color="primary" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartItems > 0 && (
                <Badge
                  color="danger"
                  className="absolute -top-2 -right-2"
                >
                  {cartItems}
                </Badge>
              )}
            </Button>
          </div>
        </NavbarContent>
      </Navbar>

      {/* Category Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center gap-6">
            <Select
              selectedKeys={[selectedCategory]}
              onSelectionChange={(keys) => setSelectedCategory(Array.from(keys)[0] as string)}
              size="sm"
              className="min-w-48"
            >
              {categories.map(cat => (
                <SelectItem key={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </Select>
            
            <div className="flex-1 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  isIconOnly
                  variant={viewMode === 'grid' ? 'solid' : 'flat'}
                  size="sm"
                  onPress={() => setViewMode('grid')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  isIconOnly
                  variant={viewMode === 'list' ? 'solid' : 'flat'}
                  size="sm"
                  onPress={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
              
              <Select
                selectedKeys={[sortBy]}
                onSelectionChange={(keys) => setSortBy(Array.from(keys)[0] as string)}
                size="sm"
                className="min-w-40"
              >
                {sortOptions.map(option => (
                  <SelectItem key={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            
            <Button variant="flat" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-64 space-y-6">
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Price Range</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  <Input type="number" label="Min" placeholder="0" size="sm" />
                  <Input type="number" label="Max" placeholder="1000" size="sm" />
                  <Button color="primary" size="sm" className="w-full">
                    Apply
                  </Button>
                </div>
              </CardBody>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Brands</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-2">
                  {['Apple', 'Samsung', 'Sony', 'Nike', 'Adidas'].map(brand => (
                    <div key={brand} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <label className="text-sm">{brand}</label>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Rating</h3>
              </CardHeader>
              <CardBody>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map(rating => (
                    <div key={rating} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-3 h-3",
                              i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            )}
                          />
                        ))}
                        <span className="text-sm ml-1">& up</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {sortedProducts.length} Products Found
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                Showing {Math.min(sortedProducts.length, 12)} of {sortedProducts.length}
              </div>
            </div>

            <div className={cn(
              "grid gap-6",
              viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
            )}>
              {sortedProducts.slice(0, 12).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <Pagination
                total={Math.ceil(sortedProducts.length / 12)}
                initialPage={1}
                className="gap-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        size="3xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {selectedProduct && (
            <>
              <ModalHeader className="flex gap-4">
                <Image
                  alt={selectedProduct.name}
                  className="w-32 h-32 object-cover rounded-lg"
                  src={selectedProduct.image}
                />
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{selectedProduct.name}</h2>
                  <p className="text-gray-600 mt-1">{selectedProduct.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium ml-1">{selectedProduct.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({selectedProduct.reviews} reviews)</span>
                  </div>
                </div>
              </ModalHeader>
              
              <ModalBody>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Product Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Brand:</span>
                        <span className="font-medium">{selectedProduct.brand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium">{selectedProduct.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Stock:</span>
                        <span className="font-medium">{selectedProduct.stock} units</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">SKU:</span>
                        <span className="font-medium">{selectedProduct.sku}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Price & Availability</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-gray-900">${selectedProduct.price}</span>
                        {selectedProduct.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">${selectedProduct.originalPrice}</span>
                        )}
                        {selectedProduct.discount && (
                          <Chip color="danger" size="sm">-{selectedProduct.discount}%</Chip>
                        )}
                      </div>
                      
                      <Badge 
                        color={selectedProduct.stock > 10 ? 'success' : selectedProduct.stock > 0 ? 'warning' : 'danger'}
                        variant="flat"
                      >
                        {selectedProduct.stock > 10 ? 'In Stock' : selectedProduct.stock > 0 ? `Only ${selectedProduct.stock} left` : 'Out of Stock'}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <Divider />
                
                <div>
                  <h3 className="font-semibold mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>
                </div>
              </ModalBody>
              
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => setCartItems(cartItems + 1)}
                  startContent={<Heart className="w-4 h-4" />}
                >
                  Add to Wishlist
                </Button>
                <Button
                  color="primary"
                  onPress={() => setCartItems(cartItems + 1)}
                  startContent={<ShoppingCart className="w-4 h-4" />}
                >
                  Add to Cart
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
