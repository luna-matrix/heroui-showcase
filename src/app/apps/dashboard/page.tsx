'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShowcaseLayout } from '@/components/layout/ShowcaseLayout';
import { DeviceSimulator } from '@/components/device-simulator/DeviceSimulator';
import { ShadcnUIDesktopDashboard } from '@/apps/shadcn/desktop/dashboard/DashboardApp';
import { ShadcnUIMobileDashboard } from '@/apps/shadcn/mobile/dashboard/DashboardApp';
import { HeroUIDesktopDashboard } from '@/apps/heroui/desktop/dashboard/DashboardApp';
import { getDefaultDevice, devices } from '@/lib/device-utils/devices';
import { Device } from '@/lib/types';
import { cn } from '@/lib/utils/cn';

export default function DashboardPage() {
  const [selectedLibrary, setSelectedLibrary] = useState<'shadcn' | 'heroui' | 'ant-design'>('shadcn');
  const [selectedDevice, setSelectedDevice] = useState<Device>(getDefaultDevice());
  const [isMobile, setIsMobile] = useState(false);

  const libraries = [
    { id: 'shadcn', name: 'shadcn/ui', color: 'bg-gray-900' },
    { id: 'heroui', name: 'HeroUI', color: 'bg-blue-600' },
    { id: 'ant-design', name: 'Ant Design', color: 'bg-red-600' }
  ];

  const mobileDevices = devices.filter(d => d.type === 'mobile');
  const tabletDevices = devices.filter(d => d.type === 'tablet');
  const desktopDevices = devices.filter(d => d.type === 'desktop');

  const getDashboardComponent = () => {
    if (selectedLibrary === 'shadcn') {
      return isMobile ? <ShadcnUIMobileDashboard /> : <ShadcnUIDesktopDashboard />;
    }
    if (selectedLibrary === 'heroui') {
      return isMobile ? (
        <div className="flex items-center justify-center h-full bg-gray-50">
          <div className="text-center p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              HeroUI Mobile Dashboard
            </h3>
            <p className="text-gray-600">
              Coming soon...
            </p>
          </div>
        </div>
      ) : <HeroUIDesktopDashboard />;
    }
    // TODO: Add Ant Design implementation
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {selectedLibrary} Dashboard
          </h3>
          <p className="text-gray-600">
            Coming soon...
          </p>
        </div>
      </div>
    );
  };

  return (
    <ShowcaseLayout
      title="Dashboard Application Showcase"
      description="Compare how different component libraries implement a complete analytics dashboard across desktop and mobile devices."
      currentLibrary={selectedLibrary}
      currentApp="dashboard"
    >
      <div className="space-y-8">
        {/* Library Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Component Library</h2>
          <div className="flex flex-wrap gap-3">
            {libraries.map((library) => (
              <button
                key={library.id}
                onClick={() => setSelectedLibrary(library.id as any)}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  selectedLibrary === library.id
                    ? `${library.color} text-white`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                {library.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Controls Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
        >
          <div className="flex flex-wrap items-center gap-6">
            {/* Platform Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Platform:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsMobile(false)}
                  className={cn(
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    !isMobile
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  )}
                >
                  Desktop
                </button>
                <button
                  onClick={() => setIsMobile(true)}
                  className={cn(
                    'px-4 py-2 rounded-lg font-medium transition-colors',
                    isMobile
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  )}
                >
                  Mobile
                </button>
              </div>
            </div>

            {/* Device Selection */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Device:</span>
              <select
                value={selectedDevice.id}
                onChange={(e) => setSelectedDevice(devices.find(d => d.id === e.target.value) || getDefaultDevice())}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {(isMobile ? [...mobileDevices, ...tabletDevices] : [...desktopDevices, ...tabletDevices]).map((device) => (
                  <option key={device.id} value={device.id}>
                    {device.name} ({device.width}×{device.height})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Device Simulator - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full"
        >
          <DeviceSimulator
            defaultDevice={selectedDevice}
            showControls={true}
          >
            {getDashboardComponent()}
          </DeviceSimulator>
        </motion.div>

        {/* Comparison Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Differences</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">shadcn/ui</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Built on Radix UI primitives</li>
                <li>• Fully customizable with Tailwind</li>
                <li>• Excellent accessibility</li>
                <li>• Unstyled by design</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">HeroUI</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Beautiful animations</li>
                <li>• Comprehensive component set</li>
                <li>• Modern design system</li>
                <li>• Dark mode built-in</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Ant Design</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Enterprise-focused</li>
                <li>• Extensive component library</li>
                <li>• Design system consistency</li>
                <li>• Internationalization support</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </ShowcaseLayout>
  );
}
