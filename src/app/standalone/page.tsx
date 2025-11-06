'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { devices } from '@/lib/device-utils/devices';
import type { Device } from '@/lib/types';

const StandaloneSimulatorContent: React.FC = () => {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const deviceParam = searchParams.get('device');
  const libraryParam = searchParams.get('library') as 'shadcn' | 'heroui' | 'ant-design' | null;
  const appParam = searchParams.get('app') as 'dashboard' | 'ecommerce' | 'admin' | null;
  const orientationParam = searchParams.get('orientation') as 'portrait' | 'landscape' | null;

  if (!mounted) {
    return null;
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-0 m-0">
      <div 
        className="bg-white shadow-2xl overflow-hidden"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          maxWidth: '100vw',
          maxHeight: '100vh'
        }}
      >
        <iframe
          src={getComponentUrl()}
          width={width}
          height={height}
          className="w-full h-full border-0"
          title="Standalone Component Simulator"
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </div>
    </div>
  );
};

const StandaloneSimulatorPage: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <StandaloneSimulatorContent />
    </Suspense>
  );
};

export default StandaloneSimulatorPage;
