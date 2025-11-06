export interface Device {
  id: string;
  name: string;
  width: number;
  height: number;
  type: 'mobile' | 'tablet' | 'desktop';
  orientation?: 'portrait' | 'landscape';
}

export interface Library {
  id: 'shadcn' | 'heroui' | 'ant-design';
  name: string;
  description: string;
  version: string;
  features: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
  preferences: {
    theme: 'light' | 'dark';
    device: string;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  avatar?: string;
  preferences?: Partial<User['preferences']>;
}

export interface DashboardData {
  metrics: {
    revenue: number;
    users: number;
    conversion: number;
    engagement: number;
  };
  charts: {
    revenue: ChartData[];
    users: ChartData[];
    products: ProductData[];
  };
  activities: ActivityItem[];
}

export interface ChartData {
  name: string;
  value: number;
  date: string;
}

export interface ProductData {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  category: string;
}

export interface ActivityItem {
  id: string;
  type: 'user' | 'sale' | 'system';
  message: string;
  timestamp: Date;
  user?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  category: string;
  rating: number;
  reviews: Review[];
  inStock: boolean;
  tags: string[];
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOptions: ProductOption[];
}

export interface ProductOption {
  name: string;
  value: string;
  price: number;
}

export interface PerformanceMetrics {
  bundleSize: {
    desktop: number;
    mobile: number;
  };
  loadTimes: {
    fcp: number; // First Contentful Paint
    lcp: number; // Largest Contentful Paint
    tti: number; // Time to Interactive
  };
  renderPerformance: {
    averageRenderTime: number;
    peakMemoryUsage: number;
  };
}

export interface ComponentComparison {
  library: Library;
  component: string;
  code: string;
  props: Record<string, any>;
  performance: PerformanceMetrics;
  features: string[];
  limitations: string[];
}

export interface AppComparison {
  app: 'dashboard' | 'ecommerce' | 'admin';
  platform: 'desktop' | 'mobile';
  implementations: ComponentComparison[];
}
