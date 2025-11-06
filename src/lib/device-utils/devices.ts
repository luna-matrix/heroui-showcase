import { Device } from '@/lib/types';

export const devices: Device[] = [
  // Mobile Devices
  {
    id: 'iphone-14-pro',
    name: 'iPhone 14 Pro',
    width: 390,
    height: 844,
    type: 'mobile',
    orientation: 'portrait'
  },
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    width: 430,
    height: 932,
    type: 'mobile',
    orientation: 'portrait'
  },
  {
    id: 'pixel-7',
    name: 'Google Pixel 7',
    width: 412,
    height: 892,
    type: 'mobile',
    orientation: 'portrait'
  },
  {
    id: 'samsung-s23',
    name: 'Samsung Galaxy S23',
    width: 360,
    height: 780,
    type: 'mobile',
    orientation: 'portrait'
  },
  
  // Tablet Devices
  {
    id: 'ipad-air',
    name: 'iPad Air',
    width: 820,
    height: 1180,
    type: 'tablet',
    orientation: 'portrait'
  },
  {
    id: 'ipad-pro',
    name: 'iPad Pro 12.9"',
    width: 1024,
    height: 1366,
    type: 'tablet',
    orientation: 'portrait'
  },
  
  // Desktop Devices
  {
    id: 'laptop',
    name: 'Laptop (1366x768)',
    width: 1366,
    height: 768,
    type: 'desktop',
    orientation: 'landscape'
  },
  {
    id: 'desktop',
    name: 'Desktop (1920x1080)',
    width: 1920,
    height: 1080,
    type: 'desktop',
    orientation: 'landscape'
  },
  {
    id: 'ultrawide',
    name: 'Ultrawide (3440x1440)',
    width: 3440,
    height: 1440,
    type: 'desktop',
    orientation: 'landscape'
  }
];

export const getDeviceById = (id: string): Device | undefined => {
  return devices.find(device => device.id === id);
};

export const getDevicesByType = (type: 'mobile' | 'tablet' | 'desktop'): Device[] => {
  return devices.filter(device => device.type === type);
};

export const getDefaultDevice = (): Device => {
  return devices[4]; // iPad Air as default
};

export const getViewportClass = (device: Device): string => {
  if (device.type === 'mobile') {
    return 'max-w-md mx-auto';
  } else if (device.type === 'tablet') {
    return 'max-w-4xl mx-auto';
  } else {
    return 'w-full';
  }
};
