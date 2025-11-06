'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Smartphone, Tablet, Maximize2, RotateCw, ExternalLink } from 'lucide-react';
import { devices, getDevicesByType, getDefaultDevice } from '@/lib/device-utils/devices';
import { Device } from '@/lib/types';
import { cn } from '@/lib/utils/cn';

interface DeviceSimulatorProps {
  children: React.ReactNode;
  className?: string;
  showControls?: boolean;
  defaultDevice?: Device;
}

export const DeviceSimulator: React.FC<DeviceSimulatorProps> = ({
  children,
  className,
  showControls = true,
  defaultDevice = getDefaultDevice()
}) => {
  const [selectedDevice, setSelectedDevice] = useState<Device>(defaultDevice);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    defaultDevice.orientation || 'portrait'
  );
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleDeviceChange = (device: Device) => {
    setSelectedDevice(device);
    setOrientation(device.orientation || 'portrait');
  };

  const handleOrientationToggle = () => {
    const newOrientation = orientation === 'portrait' ? 'landscape' : 'portrait';
    setOrientation(newOrientation);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const openInNewWindow = () => {
    // Detect current library and app from URL
    const currentUrl = window.location.pathname;
    let library = 'shadcn';
    let app = 'dashboard';
    
    if (currentUrl.includes('/apps/dashboard')) {
      app = 'dashboard';
    } else if (currentUrl.includes('/apps/ecommerce')) {
      app = 'ecommerce';
    } else if (currentUrl.includes('/apps/admin')) {
      app = 'admin';
    }
    
    // Get library from URL params or path
    const urlParams = new URLSearchParams(window.location.search);
    library = urlParams.get('library') || library;
    
    if (currentUrl.includes('heroui')) {
      library = 'heroui';
    } else if (currentUrl.includes('ant-design')) {
      library = 'ant-design';
    }
    
    // Create unique window name based on library, app, device, and orientation
    const windowName = `standalone-${library}-${app}-${selectedDevice.id}-${orientation}`;
    
    const isPortrait = orientation === 'portrait';
    const width = isPortrait ? selectedDevice.width : selectedDevice.height;
    const height = isPortrait ? selectedDevice.height : selectedDevice.width;
    
    // Close any existing window with same name
    const existingWindow = window.open('', windowName);
    if (existingWindow && !existingWindow.closed) {
      existingWindow.close();
    }
    
    // Use standalone page instead of simulator page for clean view
    const standaloneUrl = `${window.location.origin}/standalone?device=${selectedDevice.id}&library=${library}&app=${app}&orientation=${orientation}`;
    
    // Create a new window with current device dimensions
    const windowFeatures = `width=${width + 50},height=${height + 50},scrollbars=yes,resizable=yes,location=no,menubar=no,toolbar=no,status=no`;
    const newWindow = window.open(standaloneUrl, windowName, windowFeatures);
    
    // Focus new window
    if (newWindow) {
      newWindow.focus();
    }
  };

  const getDeviceFrame = () => {
    const isPortrait = orientation === 'portrait';
    const width = isPortrait ? selectedDevice.width : selectedDevice.height;
    const height = isPortrait ? selectedDevice.height : selectedDevice.width;

    if (selectedDevice.type === 'mobile') {
      return (
        <div className="relative mx-auto">
          <div 
            className="relative bg-black rounded-[2.5rem] p-2 shadow-2xl"
            style={{
              width: `${width + 16}px`,
              height: `${height + 16}px`
            }}
          >
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-20 h-5 bg-black rounded-full"></div>
            <div 
              className="bg-white rounded-[2rem] overflow-auto"
              style={{
                width: `${width}px`,
                height: `${height}px`
              }}
            >
              {children}
            </div>
          </div>
        </div>
      );
    }

    if (selectedDevice.type === 'tablet') {
      return (
        <div className="relative mx-auto">
          <div 
            className="relative bg-gray-800 rounded-lg shadow-2xl"
            style={{
              width: `${width + 20}px`,
              height: `${height + 20}px`
            }}
          >
            <div 
              className="bg-white rounded-md overflow-auto"
              style={{
                width: `${width}px`,
                height: `${height}px`
              }}
            >
              {children}
            </div>
          </div>
        </div>
      );
    }

    // Desktop
    return (
      <div className="relative w-full">
        <div className="bg-gray-100 rounded-lg shadow-xl p-4">
          <div className="bg-white rounded-lg overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    );
  };

  const DeviceIcon = ({ type }: { type: Device['type'] }) => {
    switch (type) {
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'tablet':
        return <Tablet className="w-4 h-4" />;
      case 'desktop':
        return <Monitor className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  return (
    <div className={cn('w-full', className)}>
      {showControls && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {(['mobile', 'tablet', 'desktop'] as const).map((type) => (
                <div key={type} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <DeviceIcon type={type} />
                    <span className="capitalize">{type}</span>
                  </div>
                  <div className="flex gap-1">
                    {getDevicesByType(type).map((device) => (
                      <motion.button
                        key={device.id}
                        onClick={() => handleDeviceChange(device)}
                        className={cn(
                          'px-3 py-2 text-xs rounded-md border transition-all',
                          'hover:bg-gray-100 hover:border-gray-300',
                          selectedDevice.id === device.id
                            ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600'
                            : 'bg-white text-gray-700 border-gray-200'
                        )}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {device.name.split(' ')[0]}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              {selectedDevice.type !== 'desktop' && (
                <motion.button
                  onClick={handleOrientationToggle}
                  className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCw className="w-4 h-4" />
                  {orientation === 'portrait' ? 'Landscape' : 'Portrait'}
                </motion.button>
              )}
              
              <motion.button
                onClick={openInNewWindow}
                className="px-3 py-2 text-sm bg-blue-600 text-white border border-blue-600 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-4 h-4" />
                Open in New Window
              </motion.button>
              
              <motion.button
                onClick={toggleFullscreen}
                className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Maximize2 className="w-4 h-4" />
                {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              </motion.button>
            </div>
          </div>
          
          <div className="mt-3 text-sm text-gray-600">
            Current: <span className="font-medium">{selectedDevice.name}</span>
            {selectedDevice.type !== 'desktop' && (
              <span className="ml-2">
                ({orientation === 'portrait' ? selectedDevice.width : selectedDevice.height} × {orientation === 'portrait' ? selectedDevice.height : selectedDevice.width}px)
              </span>
            )}
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          'transition-all duration-300 w-full',
          isFullscreen && 'fixed inset-0 z-50 bg-white p-8'
        )}
        id="simulator-content"
      >
        {getDeviceFrame()}
      </motion.div>
    </div>
  );
};
