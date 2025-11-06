'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShowcaseLayout } from '@/components/layout/ShowcaseLayout';
import { DeviceSimulator } from '@/components/device-simulator/DeviceSimulator';
import { cn } from '@/lib/utils/cn';
import { devices } from '@/lib/device-utils/devices';

// Import all e-commerce apps
const ShadcnDesktopEcommerce = React.lazy(() => import('@/apps/shadcn/desktop/ecommerce/EcommerceApp').then(mod => ({ default: mod.EcommerceApp })));
const ShadcnMobileEcommerce = React.lazy(() => import('@/apps/shadcn/mobile/ecommerce/EcommerceApp').then(mod => ({ default: mod.EcommerceApp })));
const HeroUIDesktopEcommerce = React.lazy(() => import('@/apps/heroui/desktop/ecommerce/EcommerceApp').then(mod => ({ default: mod.HeroUIDesktopEcommerce })));
const HeroUIMobileEcommerce = React.lazy(() => import('@/apps/heroui/mobile/ecommerce/EcommerceApp').then(mod => ({ default: mod.HeroUIMobileEcommerce })));
const AntDesignDesktopEcommerce = React.lazy(() => import('@/apps/ant-design/desktop/ecommerce/EcommerceApp').then(mod => ({ default: mod.AntDesignDesktopEcommerce })));
const AntDesignMobileEcommerce = React.lazy(() => import('@/apps/ant-design/mobile/ecommerce/EcommerceApp').then(mod => ({ default: mod.AntDesignMobileEcommerce })));

const EcommerceShowcase: React.FC = () => {
  const libraryApps = {
    'shadcn': {
      desktop: ShadcnDesktopEcommerce,
      mobile: ShadcnMobileEcommerce,
      name: 'shadcn/ui',
      description: 'Built on Radix UI primitives, fully customizable',
      features: ['Minimal design', 'Accessible', 'TypeScript native', 'Tree-shakable']
    },
    'heroui': {
      desktop: HeroUIDesktopEcommerce,
      mobile: HeroUIMobileEcommerce,
      name: 'HeroUI',
      description: 'Modern design system with beautiful animations',
      features: ['Rich animations', 'Dark mode', 'Mobile-first', 'Comprehensive']
    },
    'ant-design': {
      desktop: AntDesignDesktopEcommerce,
      mobile: AntDesignMobileEcommerce,
      name: 'Ant Design',
      description: 'Enterprise-focused component library',
      features: ['Enterprise design', 'Form validation', 'Internationalization', 'Comprehensive']
    }
  };

  return (
    <ShowcaseLayout
      title="E-commerce Showcase"
      description="Complete e-commerce applications built with different component libraries, featuring product catalogs, shopping cart, checkout flows, and responsive design."
      currentApp="ecommerce"
    >
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            🛒 E-commerce Platform Comparison
          </h2>
          <p className="text-gray-600 mb-6">
            Experience complete e-commerce applications with product browsing, search, filtering, 
            shopping cart management, and checkout flows. Each implementation demonstrates 
            different design philosophies and component approaches.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="text-2xl mb-2">🎨</div>
              <h3 className="font-semibold text-blue-900 mb-2">Design Approach</h3>
              <p className="text-sm text-blue-700">
                Compare different design systems: minimal shadcn/ui, modern HeroUI, 
                and enterprise-focused Ant Design approaches to e-commerce.
              </p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="text-2xl mb-2">📱</div>
              <h3 className="font-semibold text-green-900 mb-2">Mobile Experience</h3>
              <p className="text-sm text-green-700">
                Mobile-optimized interfaces with touch-friendly interactions, 
                swipe gestures, and adaptive layouts.
              </p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold text-purple-900 mb-2">Performance</h3>
              <p className="text-sm text-purple-700">
                Optimized bundle sizes, lazy loading, and efficient rendering 
                for smooth shopping experiences.
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="text-yellow-600 text-lg">💡</div>
              <div>
                <h4 className="font-semibold text-yellow-900 mb-2">Key Features to Explore:</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Product search and filtering across categories</li>
                  <li>• Shopping cart with quantity management</li>
                  <li>• Product cards with ratings and reviews</li>
                  <li>• Responsive grid layouts</li>
                  <li>• Mobile navigation patterns</li>
                  <li>• Different sorting and filter options</li>
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">E-commerce Features Comparison</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Product Discovery</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  <span>Search functionality</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  <span>Category filtering</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  <span>Sorting options</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  <span>Product ratings</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Shopping Experience</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  <span>Cart management</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  <span>Quick add to cart</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  <span>Wishlist functionality</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  <span>Product variants</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Mobile Optimized</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  <span>Touch interactions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  <span>Swipe gestures</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  <span>Responsive grids</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  <span>Bottom cart</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </ShowcaseLayout>
  );
};

export default EcommerceShowcase;
