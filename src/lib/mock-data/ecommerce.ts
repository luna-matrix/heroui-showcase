// Mock data for e-commerce applications

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  images: string[];
  inStock: boolean;
  tags: string[];
  specifications?: Record<string, any>;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  variant?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  shippingAddress: Address;
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

// Generate mock products
export const generateProducts = (count: number = 50): Product[] => {
  const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Toys'];
  const brands = ['TechPro', 'StyleCo', 'HomePlus', 'SportsGear', 'BookWorld', 'ToyLand'];
  const tags = ['bestseller', 'new', 'sale', 'trending', 'limited', 'eco-friendly', 'premium'];

  return Array.from({ length: count }, (_, i) => {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const onSale = Math.random() > 0.7;
    
    return {
      id: `product-${i + 1}`,
      name: `${brand} ${category} Item ${i + 1}`,
      description: `High-quality ${category.toLowerCase()} product from ${brand}. Features premium materials and excellent craftsmanship.`,
      price: Math.floor(Math.random() * 500) + 50,
      originalPrice: onSale ? Math.floor(Math.random() * 600) + 100 : undefined,
      category,
      brand,
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
      reviews: Math.floor(Math.random() * 500) + 10,
      images: [
        `https://picsum.photos/seed/product${i}1/400/400.jpg`,
        `https://picsum.photos/seed/product${i}2/400/400.jpg`,
        `https://picsum.photos/seed/product${i}3/400/400.jpg`,
      ],
      inStock: Math.random() > 0.1,
      tags: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => 
        tags[Math.floor(Math.random() * tags.length)]
      ),
      specifications: {
        color: ['Black', 'White', 'Blue', 'Red', 'Green'][Math.floor(Math.random() * 5)],
        size: ['S', 'M', 'L', 'XL'][Math.floor(Math.random() * 4)],
        weight: `${Math.floor(Math.random() * 1000 + 100)}g`,
        material: ['Cotton', 'Polyester', 'Metal', 'Plastic', 'Wood'][Math.floor(Math.random() * 5)],
      }
    };
  });
};

// Generate mock categories
export const generateCategories = (): Category[] => [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Latest gadgets and technology',
    image: 'https://picsum.photos/seed/electronics/300/200.jpg',
    productCount: 156
  },
  {
    id: 'clothing',
    name: 'Clothing',
    description: 'Fashion and apparel for all ages',
    image: 'https://picsum.photos/seed/clothing/300/200.jpg',
    productCount: 342
  },
  {
    id: 'home-garden',
    name: 'Home & Garden',
    description: 'Everything for your home and garden',
    image: 'https://picsum.photos/seed/home/300/200.jpg',
    productCount: 89
  },
  {
    id: 'sports',
    name: 'Sports & Outdoors',
    description: 'Gear for active lifestyles',
    image: 'https://picsum.photos/seed/sports/300/200.jpg',
    productCount: 127
  },
  {
    id: 'books',
    name: 'Books & Media',
    description: 'Books, movies, and music',
    image: 'https://picsum.photos/seed/books/300/200.jpg',
    productCount: 234
  },
  {
    id: 'toys',
    name: 'Toys & Games',
    description: 'Fun for kids and adults',
    image: 'https://picsum.photos/seed/toys/300/200.jpg',
    productCount: 78
  }
];

// Generate mock cart items
export const generateCartItems = (): CartItem[] => {
  const products = generateProducts(8);
  return products.slice(0, 4).map((product, index) => ({
    id: `cart-item-${index + 1}`,
    product,
    quantity: Math.floor(Math.random() * 3) + 1,
    variant: index % 2 === 0 ? ['Red', 'Blue'][Math.floor(Math.random() * 2)] : undefined
  }));
};

// Generate mock orders
export const generateOrders = (): Order[] => {
  const products = generateProducts(20);
  const statuses: Order['status'][] = ['pending', 'processing', 'shipped', 'delivered'];
  
  return Array.from({ length: 5 }, (_, i) => {
    const orderProducts = products.slice(i * 3, (i + 1) * 3);
    const items = orderProducts.map((product, index) => ({
      id: `order-${i + 1}-item-${index + 1}`,
      product,
      quantity: Math.floor(Math.random() * 2) + 1
    }));
    
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    return {
      id: `order-${i + 1}`,
      items,
      total,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toLocaleDateString(),
      shippingAddress: {
        id: `address-${i + 1}`,
        type: 'home',
        street: `${123 + i} Main Street`,
        city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][i],
        state: ['NY', 'CA', 'IL', 'TX', 'AZ'][i],
        zipCode: `${10000 + i * 1000}`,
        country: 'United States',
        isDefault: i === 0
      }
    };
  });
};

// Generate mock addresses
export const generateAddresses = (): Address[] => [
  {
    id: 'address-1',
    type: 'home',
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    isDefault: true
  },
  {
    id: 'address-2',
    type: 'work',
    street: '456 Business Ave',
    city: 'New York',
    state: 'NY',
    zipCode: '10002',
    country: 'United States',
    isDefault: false
  },
  {
    id: 'address-3',
    type: 'other',
    street: '789 Side Street',
    city: 'Brooklyn',
    state: 'NY',
    zipCode: '11201',
    country: 'United States',
    isDefault: false
  }
];

// E-commerce statistics
export const getEcommerceStats = () => ({
  totalProducts: 1026,
  totalCategories: 6,
  averageRating: 4.2,
  totalReviews: 12543,
  topCategories: [
    { name: 'Electronics', sales: 2341, growth: 12.5 },
    { name: 'Clothing', sales: 1876, growth: 8.3 },
    { name: 'Home & Garden', sales: 1234, growth: -2.1 },
    { name: 'Sports', sales: 987, growth: 15.7 },
    { name: 'Books', sales: 876, growth: 3.2 }
  ],
  recentActivity: [
    { type: 'sale', message: 'TechPro Laptop sold', time: '2 minutes ago' },
    { type: 'review', message: 'New 5-star review on StyleCo Jacket', time: '5 minutes ago' },
    { type: 'stock', message: 'HomePlus Chair restocked', time: '10 minutes ago' },
    { type: 'order', message: 'New order #12345 placed', time: '15 minutes ago' }
  ]
});

// Export mock e-commerce data
export const mockEcommerceData = {
  products: generateProducts(24).map(product => ({
    ...product,
    image: product.images[0],
    stock: product.inStock ? Math.floor(Math.random() * 50) + 10 : 0,
    discount: product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : undefined,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    sku: `SKU-${product.id.split('-')[1]}`
  })),
  categories: generateCategories(),
  cartItems: generateCartItems(),
  orders: generateOrders(),
  addresses: generateAddresses(),
  stats: getEcommerceStats()
};

// Extended Product interface for e-commerce apps
export interface ExtendedProduct extends Product {
  image: string;
  stock: number;
  discount?: number;
  createdAt: string;
  sku: string;
}
