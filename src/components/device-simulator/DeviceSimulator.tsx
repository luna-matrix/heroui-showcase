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
    const isPortrait = orientation === 'portrait';
    const width = isPortrait ? selectedDevice.width : selectedDevice.height;
    const height = isPortrait ? selectedDevice.height : selectedDevice.width;
    
    // Create a new window with the current device dimensions
    const windowFeatures = `width=${width + 100},height=${height + 100},scrollbars=yes,resizable=yes`;
    const newWindow = window.open('', '_blank', windowFeatures);
    
    if (newWindow) {
      // Write the HTML content to the new window
      newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${selectedDevice.name} Simulator - Component Library Showcase</title>
          <style>
            body {
              margin: 0;
              padding: 20px;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: #f3f4f6;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
            }
            .simulator-container {
              background: white;
              border-radius: ${selectedDevice.type === 'mobile' ? '2rem' : '0.5rem'};
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
              overflow: hidden;
              width: ${width}px;
              height: ${height}px;
              border: ${selectedDevice.type === 'mobile' ? '8px solid black' : '1px solid #e5e7eb'};
            }
            .header {
              background: white;
              padding: 10px;
              border-bottom: 1px solid #e5e7eb;
              text-align: center;
              font-size: 14px;
              color: #6b7280;
            }
            .device-info {
              position: absolute;
              top: 10px;
              right: 10px;
              background: rgba(255, 255, 255, 0.9);
              padding: 8px;
              border-radius: 6px;
              font-size: 12px;
              color: #374151;
              backdrop-filter: blur(4px);
            }
          </style>
        </head>
        <body>
          <div class="header">
            <strong>${selectedDevice.name}</strong> Simulator 
            <span style="margin-left: 10px; color: #9ca3af;">(${width} × ${height}px)</span>
          </div>
          <div class="simulator-container" id="simulator-content">
            <div style="padding: 20px; text-align: center; color: #9ca3af;">
              Loading simulator content...
            </div>
          </div>
          <div class="device-info">
            <div><strong>Device:</strong> ${selectedDevice.name}</div>
            <div><strong>Type:</strong> ${selectedDevice.type}</div>
            <div><strong>Orientation:</strong> ${orientation}</div>
            <div><strong>Library:</strong> ${typeof window !== 'undefined' && window.location.pathname.includes('heroui') ? 'HeroUI' : 'shadcn/ui'}</div>
          </div>
          <script>
            // Try to get the actual content from the main window
            if (window.opener && !window.opener.closed) {
              setTimeout(() => {
                try {
                  const simulatorContent = window.opener.document.querySelector('#simulator-content')?.innerHTML;
                  if (simulatorContent) {
                    document.getElementById('simulator-content').innerHTML = simulatorContent;
                  }
                } catch (e) {
                  console.log('Could not sync content:', e);
                }
              }, 1000);
            }
          </script>
        </body>
        </html>
      `);
      newWindow.document.close();
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
              className="bg-white rounded-[2rem] overflow-hidden"
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
              className="bg-white rounded-md overflow-hidden"
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
