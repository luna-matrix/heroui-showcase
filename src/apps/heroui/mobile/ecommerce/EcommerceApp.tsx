'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardBody,
  Button,
  Input,
  Select,
  SelectItem,
  Badge,
  Image,
  Tabs,
  Tab,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Divider,
} from '@heroui/react';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  Star, 
  Filter,
  User,
  Bell,
  Menu,
  X,
  ChevronLeft
} from 'lucide-react';
import { mockEcommerceData, ExtendedProduct } from '@/lib/mock-data/ecommerce';
import { cn } from '@/lib/utils/cn';

export const HeroUIMobileEcommerce: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [cartItems, setCartItems] = useState(3);
  const [activeTab, setActiveTab] = useState('home');
  const [filterOpen, setFilterOpen] = useState(false);
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

  const MobileProductCard: React.FC<{ product: ExtendedProduct }> = ({ product }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <div className="relative">
        <Image
          alt={product.name}
          className="w-full h-48 object-cover"
          src={product.image}
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            className="bg-white/80 backdrop-blur-sm min-w-unit-6 h-6"
          >
            <Heart className="w-3 h-3" />
          </Button>
        </div>
        {product.discount && (
          <Chip
            color="danger"
            size="sm"
            className="absolute top-2 left-2 text-xs"
          >
            -{product.discount}%
          </Chip>
        )}
      </div>
      
      <div className="p-3 space-y-2">
        <div>
          <h4 className="font-semibold text-sm text-gray-900 line-clamp-1">{product.name}</h4>
          <p className="text-xs text-gray-600 line-clamp-1 mt-1">{product.description}</p>
        </div>
        
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          
          <Button
            isIconOnly
            color="primary"
            size="sm"
            className="min-w-unit-6 h-6"
            onPress={() => setCartItems(cartItems + 1)}
          >
            <ShoppingCart className="w-3 h-3" />
          </Button>
        </div>
        
        <Badge 
          color={product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'danger'}
          size="sm"
          variant="flat"
          className="text-xs"
        >
          {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
        </Badge>
      </div>
    </motion.div>
  );

  const HomeTab = () => (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="sticky top-0 bg-white z-10 pb-2">
        <Input
          startContent={<Search className="w-4 h-4 text-gray-400" />}
          placeholder="Search products..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          size="sm"
          className="w-full"
        />
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg p-3">
        <h3 className="font-semibold text-sm mb-2">Categories</h3>
        <div className="grid grid-cols-2 gap-2">
          {categories.slice(1).map(cat => (
            <Button
              key={cat.value}
              variant="flat"
              size="sm"
              className="justify-start text-xs"
              onPress={() => setSelectedCategory(cat.value)}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-sm">Featured Products</h3>
          <Button
            variant="light"
            size="sm"
            endContent={<ChevronLeft className="w-3 h-3 rotate-180" />}
            className="text-xs"
          >
            See All
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {sortedProducts.slice(0, 4).map((product) => (
            <MobileProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Special Offers */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 text-white">
        <h3 className="font-bold text-sm mb-1">Flash Sale!</h3>
        <p className="text-xs opacity-90 mb-2">Up to 50% off selected items</p>
        <Button size="sm" variant="solid" className="bg-white text-purple-600 text-xs">
          Shop Now
        </Button>
      </div>
    </div>
  );

  const ProductsTab = () => (
    <div className="space-y-3">
      {/* Filter and Sort */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-lg">
        <Button
          variant="flat"
          size="sm"
          startContent={<Filter className="w-3 h-3" />}
          onPress={() => setFilterOpen(true)}
          className="text-xs"
        >
          Filters
        </Button>
        
        <Select
          selectedKeys={[sortBy]}
          onSelectionChange={(keys) => setSortBy(Array.from(keys)[0] as string)}
          size="sm"
          className="flex-1 min-w-0"
          classNames={{
            trigger: "text-xs h-8"
          }}
        >
          {sortOptions.map(option => (
            <SelectItem key={option.value} className="text-xs">
              {option.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-3">
        {sortedProducts.map((product) => (
          <div key={product.id} onClick={() => {
            setSelectedProduct(product);
            onOpen();
          }}>
            <MobileProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              onPress={() => setFilterOpen(true)}
            >
              <Menu className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-bold">ShopHub</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button isIconOnly variant="flat" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button color="primary" size="sm" className="relative min-w-unit-8 h-8">
              <ShoppingCart className="w-4 h-4" />
              {cartItems > 0 && (
                <Badge
                  color="danger"
                  className="absolute -top-1 -right-1 text-xs"
                >
                  {cartItems}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-16">
        <div className="p-3">
          {activeTab === 'home' && <HomeTab />}
          {activeTab === 'products' && <ProductsTab />}
          {activeTab === 'cart' && (
            <div className="text-center py-8">
              <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          )}
          {activeTab === 'profile' && (
            <div className="text-center py-8">
              <User className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">Profile coming soon</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20">
        <div className="grid grid-cols-4">
          {[
            { key: 'home', label: 'Home', icon: Menu },
            { key: 'products', label: 'Products', icon: Search },
            { key: 'cart', label: 'Cart', icon: ShoppingCart },
            { key: 'profile', label: 'Profile', icon: User },
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? 'solid' : 'light'}
              color={activeTab === tab.key ? 'primary' : 'default'}
              size="sm"
              className="flex flex-col gap-1 h-14 rounded-none"
              onPress={() => setActiveTab(tab.key)}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-xs">{tab.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Filter Modal */}
      <Modal 
        isOpen={filterOpen} 
        onOpenChange={() => setFilterOpen(false)}
        placement="bottom"
        className="max-h-96"
      >
        <ModalContent>
          <ModalHeader className="flex justify-between items-center pb-2">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => setFilterOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </ModalHeader>
          
          <ModalBody className="space-y-4">
            <div>
              <h3 className="font-semibold text-sm mb-2">Category</h3>
              <Select
                selectedKeys={[selectedCategory]}
                onSelectionChange={(keys) => setSelectedCategory(Array.from(keys)[0] as string)}
                size="sm"
                className="w-full"
              >
                {categories.map(cat => (
                  <SelectItem key={cat.value} className="text-sm">
                    {cat.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            
            <div>
              <h3 className="font-semibold text-sm mb-2">Price Range</h3>
              <div className="flex gap-2">
                <Input type="number" label="Min" placeholder="0" size="sm" className="flex-1" />
                <Input type="number" label="Max" placeholder="1000" size="sm" className="flex-1" />
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-sm mb-2">Rating</h3>
              <div className="space-y-1">
                {[4, 3, 2, 1].map(rating => (
                  <div key={rating} className="flex items-center gap-2">
                    <input type="radio" name="rating" className="w-3 h-3" />
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-3 h-3",
                            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          )}
                        />
                      ))}
                      <span className="text-xs ml-1">& up</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ModalBody>
          
          <ModalFooter>
            <Button variant="light" onPress={() => setFilterOpen(false)}>
              Reset
            </Button>
            <Button color="primary" onPress={() => setFilterOpen(false)}>
              Apply Filters
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Product Detail Modal */}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        size="full"
        placement="bottom"
        scrollBehavior="inside"
      >
        <ModalContent className="max-h-96">
          {selectedProduct && (
            <>
              <ModalHeader className="flex gap-3 pb-2">
                <Image
                  alt={selectedProduct.name}
                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                  src={selectedProduct.image}
                />
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold line-clamp-2">{selectedProduct.name}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-1">{selectedProduct.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-sm ml-1">{selectedProduct.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">({selectedProduct.reviews} reviews)</span>
                  </div>
                </div>
              </ModalHeader>
              
              <ModalBody className="space-y-4">
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
                
                <Divider />
                
                <div>
                  <h3 className="font-semibold text-sm mb-2">Product Details</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
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
                  <h3 className="font-semibold text-sm mb-2">Description</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{selectedProduct.description}</p>
                </div>
              </ModalBody>
              
              <ModalFooter className="gap-2">
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => setCartItems(cartItems + 1)}
                  startContent={<Heart className="w-4 h-4" />}
                  className="flex-1"
                >
                  Wishlist
                </Button>
                <Button
                  color="primary"
                  onPress={() => setCartItems(cartItems + 1)}
                  startContent={<ShoppingCart className="w-4 h-4" />}
                  className="flex-1"
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
