import { User } from '@/lib/types';

export interface AdminUser extends User {
  department: string;
  lastLogin: Date;
  status: 'active' | 'inactive' | 'suspended';
  permissions: string[];
}

export interface AdminLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  timestamp: Date;
  ip: string;
  userAgent: string;
  status: 'success' | 'failed';
}

export interface AdminSetting {
  id: string;
  category: string;
  key: string;
  value: string | number | boolean;
  description: string;
  type: 'string' | 'number' | 'boolean' | 'select';
  options?: string[];
}

export interface AdminMetric {
  id: string;
  name: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  unit: string;
  trend: number[];
}

export const mockAdminUsers: AdminUser[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c31c?w=150&h=150&fit=crop&crop=face',
    role: 'admin',
    department: 'Engineering',
    lastLogin: new Date('2024-01-15T10:30:00'),
    status: 'active',
    permissions: ['user_management', 'system_settings', 'data_export', 'audit_logs'],
    preferences: {
      theme: 'light',
      device: 'desktop'
    }
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'admin',
    department: 'Product',
    lastLogin: new Date('2024-01-15T09:15:00'),
    status: 'active',
    permissions: ['user_management', 'content_management', 'analytics'],
    preferences: {
      theme: 'dark',
      device: 'mobile'
    }
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    role: 'user',
    department: 'Marketing',
    lastLogin: new Date('2024-01-14T16:45:00'),
    status: 'active',
    permissions: ['content_edit', 'analytics_view'],
    preferences: {
      theme: 'light',
      device: 'tablet'
    }
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@company.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'user',
    department: 'Sales',
    lastLogin: new Date('2024-01-13T14:20:00'),
    status: 'inactive',
    permissions: ['lead_management'],
    preferences: {
      theme: 'light',
      device: 'desktop'
    }
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@company.com',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
    role: 'admin',
    department: 'Operations',
    lastLogin: new Date('2024-01-15T11:00:00'),
    status: 'suspended',
    permissions: ['user_management', 'system_settings'],
    preferences: {
      theme: 'dark',
      device: 'mobile'
    }
  }
];

export const mockAdminLogs: AdminLog[] = [
  {
    id: '1',
    userId: '1',
    action: 'login',
    resource: 'authentication',
    timestamp: new Date('2024-01-15T10:30:00'),
    ip: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    status: 'success'
  },
  {
    id: '2',
    userId: '2',
    action: 'user_update',
    resource: 'user_management',
    timestamp: new Date('2024-01-15T09:45:00'),
    ip: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    status: 'success'
  },
  {
    id: '3',
    userId: '3',
    action: 'export_data',
    resource: 'analytics',
    timestamp: new Date('2024-01-15T08:20:00'),
    ip: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
    status: 'success'
  },
  {
    id: '4',
    userId: '1',
    action: 'settings_update',
    resource: 'system_settings',
    timestamp: new Date('2024-01-14T16:30:00'),
    ip: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    status: 'success'
  },
  {
    id: '5',
    userId: '2',
    action: 'login_failed',
    resource: 'authentication',
    timestamp: new Date('2024-01-14T15:45:00'),
    ip: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    status: 'failed'
  }
];

export const mockAdminSettings: AdminSetting[] = [
  {
    id: '1',
    category: 'General',
    key: 'site_name',
    value: 'Admin Dashboard',
    description: 'Name of the application',
    type: 'string'
  },
  {
    id: '2',
    category: 'General',
    key: 'maintenance_mode',
    value: false,
    description: 'Enable maintenance mode',
    type: 'boolean'
  },
  {
    id: '3',
    category: 'Security',
    key: 'session_timeout',
    value: 30,
    description: 'Session timeout in minutes',
    type: 'number'
  },
  {
    id: '4',
    category: 'Security',
    key: 'two_factor_auth',
    value: true,
    description: 'Require two-factor authentication',
    type: 'boolean'
  },
  {
    id: '5',
    category: 'Notifications',
    key: 'email_notifications',
    value: true,
    description: 'Send email notifications',
    type: 'boolean'
  },
  {
    id: '6',
    category: 'Notifications',
    key: 'notification_frequency',
    value: 'daily',
    description: 'Frequency of email notifications',
    type: 'select',
    options: ['immediate', 'hourly', 'daily', 'weekly']
  },
  {
    id: '7',
    category: 'Performance',
    key: 'cache_enabled',
    value: true,
    description: 'Enable caching',
    type: 'boolean'
  },
  {
    id: '8',
    category: 'Performance',
    key: 'cache_duration',
    value: 3600,
    description: 'Cache duration in seconds',
    type: 'number'
  }
];

export const mockAdminMetrics: AdminMetric[] = [
  {
    id: '1',
    name: 'Total Users',
    value: 1234,
    change: 12.5,
    changeType: 'increase',
    unit: 'users',
    trend: [1000, 1050, 1100, 1150, 1200, 1234]
  },
  {
    id: '2',
    name: 'Active Sessions',
    value: 89,
    change: -5.2,
    changeType: 'decrease',
    unit: 'sessions',
    trend: [95, 92, 88, 91, 94, 89]
  },
  {
    id: '3',
    name: 'System Load',
    value: 67.8,
    change: 2.1,
    changeType: 'increase',
    unit: '%',
    trend: [65, 68, 64, 70, 66, 67.8]
  },
  {
    id: '4',
    name: 'Storage Used',
    value: 45.2,
    change: 8.7,
    changeType: 'increase',
    unit: 'GB',
    trend: [40, 41, 42, 43, 44, 45.2]
  }
];
