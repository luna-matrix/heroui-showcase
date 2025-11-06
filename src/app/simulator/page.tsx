'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { devices } from '@/lib/device-utils/devices';
import type { Device } from '@/lib/types';

const SimulatorContent: React.FC = () => {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const deviceParam = searchParams.get('device');
  const libraryParam = searchParams.get('library') as 'shadcn' | 'heroui' | 'ant-design' | null;
  const appParam = searchParams.get('app') as 'dashboard' | 'ecommerce' | null;
  const orientationParam = searchParams.get('orientation') as 'portrait' | 'landscape' | null;

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading simulator...</p>
        </div>
      </div>
    );
  }

  // Find device
  let selectedDevice: Device | undefined;
  if (deviceParam) {
    selectedDevice = devices.find(d => d.id === deviceParam);
  }
  if (!selectedDevice) {
    selectedDevice = devices.find(d => d.id === 'desktop') || devices[0];
  }

  const orientation = orientationParam || selectedDevice?.orientation || 'portrait';
  const isPortrait = orientation === 'portrait';
  const width = isPortrait ? selectedDevice.width : selectedDevice.height;
  const height = isPortrait ? selectedDevice.height : selectedDevice.width;

  // Get the correct app URL to embed
  const getComponentUrl = () => {
    if (!libraryParam || !appParam || !selectedDevice) return '#';
    
    const baseUrl = window.location.origin;
    const device = selectedDevice.id;
    const library = libraryParam;
    const app = appParam;
    const orient = orientation;
    
    return `${baseUrl}/apps/${app}?library=${library}&device=${device}&orientation=${orient}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="text-center mb-4 absolute top-4 left-4 bg-white rounded-lg shadow-md p-3 z-10">
        <div className="text-sm font-medium text-gray-900">
          {selectedDevice.name} Simulator
        </div>
        <div className="text-xs text-gray-600">
          {libraryParam?.toUpperCase()} {appParam?.toUpperCase()} ({width} × {height}px)
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
        <div 
          className="relative"
          style={{
            width: `${width}px`,
            height: `${height}px`
          }}
        >
          <iframe
            src={getComponentUrl()}
            width={width}
            height={height}
            className="w-full h-full border-0"
            title="Component Simulator"
          />
        </div>
      </div>

      <div className="text-center mt-4 text-sm text-gray-600">
        <p>Device Simulator Window</p>
        <p className="text-xs">Close this window to return to main showcase</p>
      </div>
    </div>
  );
};

const SimulatorPage: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading simulator...</p>
        </div>
      </div>
    }>
      <SimulatorContent />
    </Suspense>
  );
};

export default SimulatorPage;
