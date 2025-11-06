'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShowcaseLayout } from '@/components/layout/ShowcaseLayout';
import { PerformanceMonitor } from '@/components/performance/PerformanceMonitor';

export default function PerformancePage() {
  return (
    <ShowcaseLayout
      title="Performance Monitoring Center"
      description="Real-time performance tracking and comparison of component libraries with Core Web Vitals, bundle analysis, and optimization recommendations."
      currentLibrary={undefined}
      currentApp={undefined}
    >
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            🚀 Performance Analysis Suite
          </h2>
          <p className="text-gray-600 mb-6">
            Monitor and compare the performance of different component libraries in real-time. 
            Track Core Web Vitals, bundle sizes, memory usage, and get actionable optimization recommendations.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold text-blue-900">Core Web Vitals</h3>
              <p className="text-sm text-blue-700">FCP, LCP, FID, CLS tracking</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="text-2xl mb-2">📦</div>
              <h3 className="font-semibold text-green-900">Bundle Analysis</h3>
              <p className="text-sm text-green-700">Size, compression, treeshaking</p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="text-2xl mb-2">🧠</div>
              <h3 className="font-semibold text-purple-900">Memory Usage</h3>
              <p className="text-sm text-purple-700">Heap size, leak detection</p>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold text-orange-900">Smart Insights</h3>
              <p className="text-sm text-orange-700">AI-powered recommendations</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="text-yellow-600 text-lg">💡</div>
              <div>
                <h4 className="font-semibold text-yellow-900">Getting Started</h4>
                <ul className="text-sm text-yellow-800 mt-2 space-y-1">
                  <li>• Click "Start Tracking" to begin monitoring performance</li>
                  <li>• Switch between different component libraries to compare</li>
                  <li>• View real-time metrics in the Overview tab</li>
                  <li>• Export data for further analysis</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <PerformanceMonitor 
            showControls={true}
            libraries={['shadcn', 'heroui', 'ant-design']}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics Explained</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Core Web Vitals</h4>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-700">FCP (First Contentful Paint)</dt>
                  <dd className="text-sm text-gray-600">Time until first content is rendered. Target: {"<1.8s"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-700">LCP (Largest Contentful Paint)</dt>
                  <dd className="text-sm text-gray-600">Time for largest element to render. Target: {"<2.5s"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-700">FID (First Input Delay)</dt>
                  <dd className="text-sm text-gray-600">Responsiveness to user input. Target: {"<100ms"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-700">CLS (Cumulative Layout Shift)</dt>
                  <dd className="text-sm text-gray-600">Visual stability score. Target: {"<0.1"}</dd>
                </div>
              </dl>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Bundle Metrics</h4>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-700">Bundle Size</dt>
                  <dd className="text-sm text-gray-600">Total JavaScript size before compression</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-700">Gzipped Size</dt>
                  <dd className="text-sm text-gray-600">Size after gzip compression</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-700">Memory Usage</dt>
                  <dd className="text-sm text-gray-600">JavaScript heap consumption</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-700">Render Time</dt>
                  <dd className="text-sm text-gray-600">Time to complete page rendering</dd>
                </div>
              </dl>
            </div>
          </div>
        </motion.div>
      </div>
    </ShowcaseLayout>
  );
}
