'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, GitBranch, BarChart3, ShoppingCart, Settings, Users, Menu, X } from 'lucide-react';
import { UserMenu } from '@/components/auth/UserMenu';
import { useIsAuthenticated, useCurrentUser } from '@/lib/stores/useAuthStore';
import { cn } from '@/lib/utils/cn';

interface ShowcaseLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showNavigation?: boolean;
  currentLibrary?: 'shadcn' | 'heroui' | 'ant-design';
  currentApp?: 'dashboard' | 'ecommerce' | 'admin';
}

export const ShowcaseLayout: React.FC<ShowcaseLayoutProps> = ({
  children,
  title,
  description,
  showNavigation = true,
  currentLibrary,
  currentApp
}) => {
  const isAuthenticated = useIsAuthenticated();
  const currentUser = useCurrentUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navigationItems = [
    {
      name: 'Components',
      href: '/components',
      icon: Code2,
      description: 'Individual component comparisons'
    },
    {
      name: 'Dashboard',
      href: '/apps/dashboard',
      icon: BarChart3,
      description: 'Analytics dashboard showcase'
    },
    {
      name: 'E-commerce',
      href: '/apps/ecommerce',
      icon: ShoppingCart,
      description: 'Online store demonstration'
    },
    {
      name: 'Admin Panel',
      href: '/apps/admin',
      icon: Settings,
      description: 'Admin interface showcase'
    }
  ];

  const libraries = [
    { id: 'shadcn', name: 'shadcn/ui', color: 'bg-gray-900' },
    { id: 'heroui', name: 'HeroUI', color: 'bg-blue-600' },
    { id: 'ant-design', name: 'Ant Design', color: 'bg-red-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <GitBranch className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Component Showcase</span>
              </div>

              {/* Library & App Indicators */}
              {showNavigation && (currentLibrary || currentApp) && (
                <div className="hidden md:flex items-center gap-4 ml-8">
                  {currentLibrary && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Library:</span>
                      <span className={cn(
                        'px-2 py-1 text-xs font-medium text-white rounded',
                        libraries.find(lib => lib.id === currentLibrary)?.color
                      )}>
                        {libraries.find(lib => lib.id === currentLibrary)?.name}
                      </span>
                    </div>
                  )}
                  {currentApp && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">App:</span>
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded capitalize">
                        {currentApp}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sign In
                  </button>
                  <button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    Get Started
                  </button>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md hover:bg-gray-100"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-gray-200 bg-white"
          >
            <div className="px-4 py-2 space-y-1">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50"
                >
                  <item.icon className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </header>

      {/* Page Header */}
      {(title || description) && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {title && (
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-gray-900 mb-2"
              >
                {title}
              </motion.h1>
            )}
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-gray-600"
              >
                {description}
              </motion.p>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {/* Desktop Sidebar Navigation */}
        {showNavigation && (
          <div className="hidden lg:block">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex gap-8">
                <nav className="w-64 py-8">
                  <div className="space-y-1">
                    {navigationItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                      >
                        <item.icon className="w-5 h-5" />
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.description}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </nav>
                <div className="flex-1 py-8">
                  {children}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Content */}
        {showNavigation ? (
          <div className="lg:hidden">
            <div className="px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </div>
        ) : (
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>Component Showcase - Comparing React Component Libraries</p>
            <p className="mt-1">Built with Next.js, TypeScript, and Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
