'use client';

import React from 'react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface PerformanceMetrics {
  timestamp: number;
  library: 'shadcn' | 'heroui' | 'ant-design';
  platform: 'desktop' | 'mobile';
  device: string;
  
  // Core Web Vitals
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  
  // Bundle Metrics
  bundleSize: number;
  gzippedSize: number;
  componentCount: number;
  
  // Runtime Performance
  renderTime: number;
  componentUpdateTime: number;
  stateUpdateTime: number;
  
  // Memory Usage
  memoryUsage: number;
  nodeCount: number;
  
  // Network Performance
  requestCount: number;
  totalTransferSize: number;
  cacheHitRate: number;
}

interface PerformanceComparison {
  libraries: PerformanceMetrics[];
  leader: {
    fastest: string;
    smallest: string;
    mostEfficient: string;
    bestUX: string;
  };
  recommendations: string[];
}

interface PerformanceState {
  metrics: PerformanceMetrics[];
  isTracking: boolean;
  currentSession: string;
  comparisons: PerformanceComparison[];
  
  // Actions
  startTracking: (library: string, platform: string, device: string) => void;
  stopTracking: () => void;
  recordMetric: (metric: Partial<PerformanceMetrics>) => void;
  clearMetrics: () => void;
  getComparison: (libraries: string[]) => PerformanceComparison | null;
  exportData: () => string;
  importData: (data: string) => void;
  
  // Internal methods
  setupPerformanceObservers: (sessionId: string) => void;
  calculateFinalMetrics: () => void;
  generateRecommendations: (statsArray: PerformanceMetrics[]) => string[];
}

export const usePerformanceStore = create<PerformanceState>()(
  devtools(
    (set, get) => ({
      metrics: [],
      isTracking: false,
      currentSession: '',
      comparisons: [],

      startTracking: (library: string, platform: string, device: string) => {
        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        set({ 
          isTracking: true, 
          currentSession: sessionId 
        });
        
        // Initialize metric tracking
        const initialMetric: PerformanceMetrics = {
          timestamp: Date.now(),
          library: library as any,
          platform: platform as any,
          device,
          fcp: 0,
          lcp: 0,
          fid: 0,
          cls: 0,
          bundleSize: 0,
          gzippedSize: 0,
          componentCount: 0,
          renderTime: 0,
          componentUpdateTime: 0,
          stateUpdateTime: 0,
          memoryUsage: 0,
          nodeCount: 0,
          requestCount: 0,
          totalTransferSize: 0,
          cacheHitRate: 0,
        };

        set(state => ({
          metrics: [...state.metrics, initialMetric]
        }));

        // Start performance observers
        if (typeof window !== 'undefined' && 'performance' in window) {
          get().setupPerformanceObservers(sessionId);
        }

        console.log(`🚀 Started performance tracking for ${library} on ${platform} (${device})`);
      },

      stopTracking: () => {
        const { isTracking, currentSession } = get();
        if (!isTracking) return;

        set({ 
          isTracking: false, 
          currentSession: '' 
        });

        // Calculate final metrics
        get().calculateFinalMetrics();
        console.log(`⏹️ Stopped performance tracking for session ${currentSession}`);
      },

      recordMetric: (metricUpdate) => {
        const { metrics, isTracking } = get();
        if (!isTracking) return;

        set(state => {
          const updatedMetrics = [...state.metrics];
          const lastMetric = updatedMetrics[updatedMetrics.length - 1];
          
          if (lastMetric) {
            updatedMetrics[updatedMetrics.length - 1] = {
              ...lastMetric,
              ...metricUpdate
            };
          }
          
          return { metrics: updatedMetrics };
        });
      },

      clearMetrics: () => {
        set({ 
          metrics: [], 
          comparisons: [] 
        });
      },

      getComparison: (libraries: string[]) => {
        const { metrics } = get();
        const filteredMetrics = metrics.filter(m => 
          libraries.includes(m.library)
        );

        if (filteredMetrics.length === 0) return null;

        // Calculate averages for each library
        const libraryStats = new Map<string, PerformanceMetrics>();
        
        filteredMetrics.forEach(metric => {
          const existing = libraryStats.get(metric.library);
          if (existing) {
            // Calculate weighted average
            libraryStats.set(metric.library, {
              ...existing,
              fcp: (existing.fcp + metric.fcp) / 2,
              lcp: (existing.lcp + metric.lcp) / 2,
              fid: (existing.fid + metric.fid) / 2,
              cls: (existing.cls + metric.cls) / 2,
              bundleSize: (existing.bundleSize + metric.bundleSize) / 2,
              gzippedSize: (existing.gzippedSize + metric.gzippedSize) / 2,
              renderTime: (existing.renderTime + metric.renderTime) / 2,
            });
          } else {
            libraryStats.set(metric.library, { ...metric });
          }
        });

        const statsArray = Array.from(libraryStats.values());
        
        // Find leaders
        const fastest = statsArray.reduce((min, curr) => 
          curr.fcp < min.fcp ? curr : min
        );

        const smallest = statsArray.reduce((min, curr) => 
          curr.gzippedSize < min.gzippedSize ? curr : min
        );

        const mostEfficient = statsArray.reduce((min, curr) => 
          (curr.fcp + curr.lcp + curr.fid) < (min.fcp + min.lcp + min.fid) ? curr : min
        );

        const bestUX = statsArray.reduce((min, curr) => 
          curr.cls < min.cls ? curr : min
        );

        // Generate recommendations
        const recommendations = get().generateRecommendations(statsArray);

        return {
          libraries: statsArray,
          leader: {
            fastest: fastest.library,
            smallest: smallest.library,
            mostEfficient: mostEfficient.library,
            bestUX: bestUX.library,
          },
          recommendations
        };
      },

      exportData: () => {
        const { metrics } = get();
        return JSON.stringify({
          version: '1.0.0',
          exportDate: new Date().toISOString(),
          metrics
        }, null, 2);
      },

      importData: (data: string) => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.metrics && Array.isArray(parsed.metrics)) {
            set({ metrics: parsed.metrics });
            console.log(`📥 Imported ${parsed.metrics.length} performance metrics`);
          }
        } catch (error) {
          console.error('Failed to import performance data:', error);
        }
      },

      setupPerformanceObservers: (sessionId: string) => {
        if (!('PerformanceObserver' in window)) return;

        // First Contentful Paint
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            if (entry.name === 'first-contentful-paint') {
              get().recordMetric({ fcp: entry.startTime });
            }
          });
        });
        fcpObserver.observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            get().recordMetric({ lcp: entry.startTime });
          });
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            if (entry instanceof PerformanceEntry && 'value' in entry) {
              get().recordMetric({ cls: (entry as any).value });
            }
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      },

      calculateFinalMetrics: () => {
        if (typeof window === 'undefined' || !('performance' in window)) return;

        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          get().recordMetric({
            renderTime: navigation.loadEventEnd - navigation.loadEventStart,
            componentUpdateTime: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          });
        }

        // Memory usage (if available)
        if ('memory' in performance) {
          const memory = (performance as any).memory;
          get().recordMetric({
            memoryUsage: memory.usedJSHeapSize,
            nodeCount: 0 // Would need custom tracking
          });
        }

        // Network performance
        const resources = performance.getEntriesByType('resource');
        const totalTransferSize = resources.reduce((sum, entry) => 
          sum + (entry as any).transferSize || 0, 0
        );
        get().recordMetric({
          requestCount: resources.length,
          totalTransferSize
        });
      },

      generateRecommendations: (statsArray: PerformanceMetrics[]) => {
        const recommendations: string[] = [];

        // Analyze bundle sizes
        const avgBundleSize = statsArray.reduce((sum, stat) => sum + stat.gzippedSize, 0) / statsArray.length;
        statsArray.forEach(stat => {
          if (stat.gzippedSize > avgBundleSize * 1.2) {
            recommendations.push(
              `${stat.library} bundle size (${(stat.gzippedSize / 1024).toFixed(1)}KB) is significantly larger than average. Consider code splitting or tree shaking.`
            );
          }
        });

        // Analyze render performance
        const avgRenderTime = statsArray.reduce((sum, stat) => sum + stat.renderTime, 0) / statsArray.length;
        statsArray.forEach(stat => {
          if (stat.fcp > avgRenderTime * 1.5) {
            recommendations.push(
              `${stat.library} shows slower first contentful paint. Optimize critical rendering path.`
            );
          }
        });

        // Analyze layout stability
        statsArray.forEach(stat => {
          if (stat.cls > 0.1) {
            recommendations.push(
              `${stat.library} has layout shift issues (${stat.cls.toFixed(3)}). Ensure proper image dimensions and avoid inserting content.`
            );
          }
        });

        return recommendations;
      },
    }),
    {
      name: 'performance-store'
    }
  )
);

// Hook for easy access to performance metrics
export const usePerformanceMetrics = (library?: string, platform?: string) => {
  const { metrics } = usePerformanceStore();
  
  return React.useMemo(() => {
    let filtered = metrics;
    
    if (library) {
      filtered = filtered.filter(m => m.library === library);
    }
    
    if (platform) {
      filtered = filtered.filter(m => m.platform === platform);
    }
    
    return filtered;
  }, [metrics, library, platform]);
};
