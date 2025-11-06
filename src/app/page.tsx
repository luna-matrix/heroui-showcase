'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, BarChart3, ShoppingCart, Settings, ArrowRight, Star, Zap, Shield, Smartphone } from 'lucide-react';
import { ShowcaseLayout } from '@/components/layout/ShowcaseLayout';
import { DeviceSimulator } from '@/components/device-simulator/DeviceSimulator';
import { LoginForm } from '@/components/auth/LoginForm';
import { useIsAuthenticated } from '@/lib/stores/useAuthStore';

export default function Home() {
  const isAuthenticated = useIsAuthenticated();

  const libraries = [
    {
      name: 'shadcn/ui',
      description: 'Beautifully designed components built with Radix UI and Tailwind CSS',
      features: ['Accessible', 'Customizable', 'Modern', 'TypeScript'],
      color: 'from-gray-900 to-gray-700'
    },
    {
      name: 'HeroUI',
      description: 'Modern React UI library with stunning animations and design',
      features: ['Animated', 'Comprehensive', 'Dark Mode', 'Mobile-first'],
      color: 'from-blue-600 to-purple-600'
    },
    {
      name: 'Ant Design',
      description: 'Enterprise-class UI design language and React UI library',
      features: ['Enterprise', 'Comprehensive', 'Design System', 'Professional'],
      color: 'from-red-600 to-orange-600'
    }
  ];

  const applications = [
    {
      name: 'Analytics Dashboard',
      description: 'Data visualization and metrics display',
      icon: BarChart3,
      href: '/apps/dashboard',
      devices: ['Desktop', 'Tablet', 'Mobile']
    },
    {
      name: 'E-commerce Store',
      description: 'Product catalog and shopping experience',
      icon: ShoppingCart,
      href: '/apps/ecommerce',
      devices: ['Desktop', 'Tablet', 'Mobile']
    },
    {
      name: 'Admin Panel',
      description: 'User management and system controls',
      icon: Settings,
      href: '/apps/admin',
      devices: ['Desktop', 'Tablet', 'Mobile']
    }
  ];

  const features = [
    {
      icon: Smartphone,
      title: 'Responsive Design',
      description: 'Test how components adapt across different screen sizes and devices'
    },
    {
      icon: Zap,
      title: 'Performance Tracking',
      description: 'Compare bundle sizes, load times, and rendering performance'
    },
    {
      icon: Star,
      title: 'Side-by-Side Comparison',
      description: 'View the same functionality implemented with different libraries'
    },
    {
      icon: Shield,
      title: 'Real-world Applications',
      description: 'See complete applications, not just isolated components'
    }
  ];

  return (
    <ShowcaseLayout>
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              React Component Library
              <span className="block text-blue-600">Showcase</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare shadcn/ui, HeroUI, and Ant Design with real-world applications,
              responsive design testing, and performance analysis.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a href="/components" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
              Compare Components
              <ArrowRight className="w-4 h-4" />
            </a>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              View Documentation
            </button>
          </motion.div>
        </section>

        {/* Libraries Section */}
        <section className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Libraries</h2>
            <p className="text-lg text-gray-600">
              Modern React component libraries with different philosophies and strengths
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {libraries.map((library, index) => (
              <motion.div
                key={library.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
              >
                <div className={`h-2 bg-gradient-to-r ${library.color} rounded-full mb-6`}></div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{library.name}</h3>
                <p className="text-gray-600 mb-6">{library.description}</p>
                <div className="flex flex-wrap gap-2">
                  {library.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Applications Section */}
        <section className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Real Applications</h2>
            <p className="text-lg text-gray-600">
              Complete applications built with each library for realistic comparison
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {applications.map((app, index) => (
              <motion.a
                key={app.name}
                href={app.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1 block"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <app.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{app.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{app.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {app.devices.map((device) => (
                    <span
                      key={device}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                    >
                      {device}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-blue-600 font-medium">
                  View Demo
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-lg text-gray-600">
              Tools and insights to help you choose the right component library
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Demo Section */}
        {isAuthenticated && (
          <section className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Try Device Simulator</h2>
              <p className="text-lg text-gray-600">
                See how components adapt to different screen sizes
              </p>
            </motion.div>

            <DeviceSimulator defaultDevice={{ id: 'ipad-air', name: 'iPad Air', width: 820, height: 1180, type: 'tablet', orientation: 'portrait' }}>
              <div className="p-8 bg-white h-full">
                <div className="max-w-md mx-auto space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mx-auto mb-4"></div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Sample Component</h3>
                    <p className="text-gray-600">This is a demonstration of the device simulator</p>
                  </div>
                  <div className="space-y-3">
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Primary Button
                    </button>
                    <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Secondary Button
                    </button>
                  </div>
                </div>
              </div>
            </DeviceSimulator>
          </section>
        )}

        {!isAuthenticated && (
          <section className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Started</h2>
              <p className="text-lg text-gray-600">
                Sign in to access interactive features and device simulators
              </p>
            </motion.div>

            <LoginForm />
          </section>
        )}
      </div>
    </ShowcaseLayout>
  );
}
