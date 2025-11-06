'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShowcaseLayout } from '@/components/layout/ShowcaseLayout';
import { DeviceSimulator } from '@/components/device-simulator/DeviceSimulator';
import { cn } from '@/lib/utils/cn';
import { devices } from '@/lib/device-utils/devices';

// Import all admin apps
const ShadcnDesktopAdmin = React.lazy(() => import('@/apps/shadcn/desktop/admin/AdminApp'));
const ShadcnMobileAdmin = React.lazy(() => import('@/apps/shadcn/mobile/admin/AdminApp'));
const HeroUIDesktopAdmin = React.lazy(() => import('@/apps/heroui/desktop/admin/AdminApp'));
const HeroUIMobileAdmin = React.lazy(() => import('@/apps/heroui/mobile/admin/AdminApp'));
const AntDesignDesktopAdmin = React.lazy(() => import('@/apps/ant-design/desktop/admin/AdminApp'));
const AntDesignMobileAdmin = React.lazy(() => import('@/apps/ant-design/mobile/admin/AdminApp'));

const AdminShowcase: React.FC = () => {
  const libraryApps = {
    'shadcn': {
      desktop: ShadcnDesktopAdmin,
      mobile: ShadcnMobileAdmin,
      name: 'shadcn/ui',
      description: 'Clean and accessible admin interface built on Radix UI primitives',
      features: ['Data tables', 'Form validation', 'User management', 'Settings panel']
    },
    'heroui': {
      desktop: HeroUIDesktopAdmin,
      mobile: HeroUIMobileAdmin,
      name: 'HeroUI',
      description: 'Modern admin interface with rich interactions and animations',
      features: ['Advanced charts', 'Real-time updates', 'Dark mode', 'Responsive design']
    },
    'ant-design': {
      desktop: AntDesignDesktopAdmin,
      mobile: AntDesignMobileAdmin,
      name: 'Ant Design',
      description: 'Enterprise admin interface with comprehensive component library',
      features: ['Complex forms', 'Data grids', 'Workflow management', 'Internationalization']
    }
  };

  return (
    <ShowcaseLayout
      title="Admin Panel Showcase"
      description="Complete admin panel applications built with different component libraries, featuring user management, data tables, forms, settings, and administrative workflows."
      currentApp="admin"
    >
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            ⚙️ Admin Panel Comparison
          </h2>
          <p className="text-gray-600 mb-6">
            Experience comprehensive admin applications with user management, data tables, 
            form handling, settings panels, and administrative workflows. Each implementation 
            showcases different approaches to complex admin interfaces.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="text-2xl mb-2">👥</div>
              <h3 className="font-semibold text-blue-900 mb-2">User Management</h3>
              <p className="text-sm text-blue-700">
                Compare different user management interfaces, from simple tables to 
                advanced CRUD operations with role-based access control.
              </p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold text-green-900 mb-2">Data Management</h3>
              <p className="text-sm text-green-700">
                Explore data tables, filtering, sorting, and pagination across 
                different component libraries and design approaches.
              </p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold text-purple-900 mb-2">Workflow Tools</h3>
              <p className="text-sm text-purple-700">
                Administrative workflows, form handling, validation, and 
                settings management for complex operations.
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="text-yellow-600 text-lg">💡</div>
              <div>
                <h4 className="font-semibold text-yellow-900 mb-2">Key Admin Features to Explore:</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• User management with search and filtering</li>
                  <li>• Data tables with sorting and pagination</li>
                  <li>• Form validation and submission handling</li>
                  <li>• Settings panels with configuration options</li>
                  <li>• Role-based access control interfaces</li>
                  <li>• Dashboard metrics and analytics</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Library Implementations</h3>
          
          <div className="space-y-6">
            {Object.entries(libraryApps).map(([library, config]) => (
              <div key={library} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{config.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{config.description}</p>
                  </div>
                  <div className={cn(
                    'px-3 py-1 rounded-full text-xs font-medium',
                    library === 'shadcn' && 'bg-gray-900 text-white',
                    library === 'heroui' && 'bg-blue-600 text-white',
                    library === 'ant-design' && 'bg-red-600 text-white'
                  )}>
                    {library}
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h5>
                  <div className="flex flex-wrap gap-2">
                    {config.features.map((feature) => (
                      <span
                        key={feature}
                        className={cn(
                          'px-2 py-1 text-xs rounded-full',
                          library === 'shadcn' && 'bg-gray-100 text-gray-700',
                          library === 'heroui' && 'bg-blue-100 text-blue-700',
                          library === 'ant-design' && 'bg-red-100 text-red-700'
                        )}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-2">Desktop Version</h5>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <DeviceSimulator
                        defaultDevice={devices.find(d => d.id === 'desktop')!}
                        showControls={false}
                        className="min-h-[500px]"
                      >
                        <React.Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
                          <config.desktop />
                        </React.Suspense>
                      </DeviceSimulator>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-2">Mobile Version</h5>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <DeviceSimulator
                        defaultDevice={devices.find(d => d.id === 'iphone-14-pro')!}
                        showControls={false}
                        className="min-h-[500px]"
                      >
                        <React.Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
                          <config.mobile />
                        </React.Suspense>
                      </DeviceSimulator>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Features Comparison</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">User Management</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  <span>User tables and search</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  <span>Role-based permissions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  <span>User creation forms</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  <span>Bulk operations</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Data Operations</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  <span>Advanced filtering</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  <span>Export functionality</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  <span>Data validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  <span>Real-time updates</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Administrative Tools</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  <span>Settings management</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  <span>Audit logs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  <span>System monitoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  <span>Workflow automation</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </ShowcaseLayout>
  );
};

export default AdminShowcase;
