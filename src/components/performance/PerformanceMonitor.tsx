'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Card, Row, Col, Statistic, Progress, Button, Tag, 
  List, Avatar, Space, Tabs, Table, Alert,
  Tooltip, Switch, Divider, Typography
} from 'antd';
import {
  DashboardOutlined, 
  ClockCircleOutlined,
  DownloadOutlined,
  UploadOutlined,
  EyeOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  ClearOutlined,
  ExportOutlined,
  ImportOutlined,
  TrophyOutlined,
  WarningOutlined
} from '@ant-design/icons';
import { usePerformanceStore, usePerformanceMetrics } from '@/lib/stores/usePerformanceStore';
import { cn } from '@/lib/utils/cn';

const { Title, Text } = Typography;

interface PerformanceMonitorProps {
  className?: string;
  showControls?: boolean;
  libraries?: string[];
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  className,
  showControls = true,
  libraries = ['shadcn', 'heroui', 'ant-design']
}) => {
  const {
    startTracking,
    stopTracking,
    isTracking,
    getComparison,
    clearMetrics,
    exportData,
    importData
  } = usePerformanceStore();

  const [activeTab, setActiveTab] = useState('overview');
  const [realTimeMode, setRealTimeMode] = useState(true);
  const [comparison, setComparison] = useState<any>(null);

  const metrics = usePerformanceMetrics();
  const latestMetrics = metrics.slice(-5);

  useEffect(() => {
    const comparison = getComparison(libraries);
    setComparison(comparison);
  }, [metrics, libraries]);

  const handleStartTracking = (library: string, platform: string, device: string) => {
    startTracking(library, platform, device);
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-metrics-${Date.now()}.json`;
    a.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result as string;
        importData(data);
      };
      reader.readAsText(file);
    }
  };

  const renderOverview = () => (
    <Row gutter={[16, 16]}>
      {/* Status Card */}
      <Col xs={24} lg={8}>
        <Card 
          title="Tracking Status"
          extra={
            <Tag color={isTracking ? 'green' : 'default'}>
              {isTracking ? 'Recording' : 'Idle'}
            </Tag>
          }
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ fontSize: '48px', color: isTracking ? '#52c41a' : '#8c8c8c' }}>
                {isTracking ? '🔴' : '⚪'}
              </div>
              <Text type={isTracking ? 'success' : 'secondary'}>
                {isTracking ? 'Performance tracking active' : 'Ready to start tracking'}
              </Text>
            </div>
            
            {showControls && (
              <Space>
                {isTracking ? (
                  <Button 
                    danger 
                    icon={<PauseCircleOutlined />} 
                    onClick={stopTracking}
                    block
                  >
                    Stop Tracking
                  </Button>
                ) : (
                  <Button 
                    type="primary" 
                    icon={<PlayCircleOutlined />}
                    onClick={() => handleStartTracking('shadcn', 'desktop', 'macbook-pro')}
                    block
                  >
                    Start Tracking
                  </Button>
                )}
              </Space>
            )}
          </Space>
        </Card>
      </Col>

      {/* Summary Stats */}
      <Col xs={24} lg={16}>
        <Card title="Performance Summary">
          {comparison ? (
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic
                  title="Fastest Library"
                  value={comparison.leader.fastest}
                  prefix={<TrophyOutlined style={{ color: '#ffd700' }} />}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Smallest Bundle"
                  value={comparison.leader.smallest}
                  prefix={<DownloadOutlined style={{ color: '#52c41a' }} />}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Most Efficient"
                  value={comparison.leader.mostEfficient}
                  prefix={<DashboardOutlined style={{ color: '#1890ff' }} />}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Best UX"
                  value={comparison.leader.bestUX}
                  prefix={<EyeOutlined style={{ color: '#722ed1' }} />}
                />
              </Col>
            </Row>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Text type="secondary">No performance data available</Text>
              <br />
              <Text type="secondary">Start tracking to see comparisons</Text>
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );

  const renderMetrics = () => (
    <Row gutter={[16, 16]}>
      {/* Web Vitals */}
      <Col xs={24} lg={12}>
        <Card title="Core Web Vitals" extra={<Tooltip title="Google's Core Web Vitals metrics"><WarningOutlined /></Tooltip>}>
          <Space direction="vertical" style={{ width: '100%' }}>
            {latestMetrics.slice(-1).map((metric: any, index: number) => (
              <div key={index}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Statistic
                      title="FCP"
                      value={metric.fcp}
                      precision={0}
                      suffix="ms"
                      valueStyle={{ color: metric.fcp < 1800 ? '#52c41a' : '#ff4d4f' }}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="LCP"
                      value={metric.lcp}
                      precision={0}
                      suffix="ms"
                      valueStyle={{ color: metric.lcp < 2500 ? '#52c41a' : '#ff4d4f' }}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="FID"
                      value={metric.fid}
                      precision={0}
                      suffix="ms"
                      valueStyle={{ color: metric.fid < 100 ? '#52c41a' : '#ff4d4f' }}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="CLS"
                      value={metric.cls}
                      precision={3}
                      valueStyle={{ color: metric.cls < 0.1 ? '#52c41a' : '#ff4d4f' }}
                    />
                  </Col>
                </Row>
              </div>
            ))}
          </Space>
        </Card>
      </Col>

      {/* Bundle Metrics */}
      <Col xs={24} lg={12}>
        <Card title="Bundle & Runtime Metrics">
          <Space direction="vertical" style={{ width: '100%' }}>
            {latestMetrics.slice(-1).map((metric: any, index: number) => (
              <div key={index}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Statistic
                      title="Bundle Size"
                      value={(metric.bundleSize / 1024).toFixed(1)}
                      suffix="KB"
                      prefix={<UploadOutlined />}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="Gzipped"
                      value={(metric.gzippedSize / 1024).toFixed(1)}
                      suffix="KB"
                      prefix={<DownloadOutlined />}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="Render Time"
                      value={metric.renderTime}
                      precision={0}
                      suffix="ms"
                      prefix={<ClockCircleOutlined />}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="Memory"
                      value={(metric.memoryUsage / 1024 / 1024).toFixed(1)}
                      suffix="MB"
                      prefix={<DashboardOutlined />}
                    />
                  </Col>
                </Row>
              </div>
            ))}
          </Space>
        </Card>
      </Col>
    </Row>
  );

  const renderComparison = () => (
    <Row gutter={[16, 16]}>
      {/* Library Comparison Table */}
      <Col span={24}>
        <Card title="Library Comparison">
          {comparison?.libraries && comparison.libraries.length > 0 ? (
            <Table
              dataSource={comparison.libraries}
              pagination={false}
              size="small"
              columns={[
                {
                  title: 'Library',
                  dataIndex: 'library',
                  key: 'library',
                  render: (library: string) => (
                    <Tag color={
                      library === 'shadcn' ? 'default' :
                      library === 'heroui' ? 'blue' : 'red'
                    }>
                      {library}
                    </Tag>
                  ),
                },
                {
                  title: 'FCP',
                  dataIndex: 'fcp',
                  key: 'fcp',
                  render: (value: number) => `${value.toFixed(0)}ms`,
                  sorter: (a: any, b: any) => a.fcp - b.fcp,
                },
                {
                  title: 'LCP',
                  dataIndex: 'lcp',
                  key: 'lcp',
                  render: (value: number) => `${value.toFixed(0)}ms`,
                  sorter: (a: any, b: any) => a.lcp - b.lcp,
                },
                {
                  title: 'Bundle',
                  dataIndex: 'gzippedSize',
                  key: 'gzippedSize',
                  render: (value: number) => `${(value / 1024).toFixed(1)}KB`,
                  sorter: (a: any, b: any) => a.gzippedSize - b.gzippedSize,
                },
                {
                  title: 'Memory',
                  dataIndex: 'memoryUsage',
                  key: 'memoryUsage',
                  render: (value: number) => `${(value / 1024 / 1024).toFixed(1)}MB`,
                  sorter: (a: any, b: any) => a.memoryUsage - b.memoryUsage,
                },
              ]}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Text type="secondary">No comparison data available</Text>
            </div>
          )}
        </Card>
      </Col>

      {/* Recommendations */}
      {comparison?.recommendations && comparison.recommendations.length > 0 && (
        <Col span={24}>
          <Card title="Recommendations">
            <List
              dataSource={comparison.recommendations}
              renderItem={(item: string) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<WarningOutlined style={{ color: '#faad14' }} />}
                    description={item}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      )}
    </Row>
  );

  const renderHistory = () => (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card title="Performance History">
          {latestMetrics.length > 0 ? (
            <Table
              dataSource={latestMetrics}
              pagination={{ pageSize: 10 }}
              size="small"
              columns={[
                {
                  title: 'Time',
                  dataIndex: 'timestamp',
                  key: 'timestamp',
                  render: (timestamp: number) => new Date(timestamp).toLocaleTimeString(),
                },
                {
                  title: 'Library',
                  dataIndex: 'library',
                  key: 'library',
                  render: (library: string) => (
                    <Tag color={
                      library === 'shadcn' ? 'default' :
                      library === 'heroui' ? 'blue' : 'red'
                    }>
                      {library}
                    </Tag>
                  ),
                },
                {
                  title: 'Platform',
                  dataIndex: 'platform',
                  key: 'platform',
                  render: (platform: string) => (
                    <Tag color={platform === 'desktop' ? 'green' : 'orange'}>
                      {platform}
                    </Tag>
                  ),
                },
                {
                  title: 'FCP',
                  dataIndex: 'fcp',
                  key: 'fcp',
                  render: (value: number) => `${value.toFixed(0)}ms`,
                },
                {
                  title: 'Bundle',
                  dataIndex: 'gzippedSize',
                  key: 'gzippedSize',
                  render: (value: number) => `${(value / 1024).toFixed(1)}KB`,
                },
                {
                  title: 'Memory',
                  dataIndex: 'memoryUsage',
                  key: 'memoryUsage',
                  render: (value: number) => `${(value / 1024 / 1024).toFixed(1)}MB`,
                },
              ]}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Text type="secondary">No historical data available</Text>
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );

  return (
    <div className={cn('space-y-6', className)}>
      {showControls && (
        <Card>
          <Row justify="space-between" align="middle">
            <Col>
              <Space>
                <Text>Real-time Mode:</Text>
                <Switch 
                  checked={realTimeMode} 
                  onChange={setRealTimeMode}
                  checkedChildren="Live"
                  unCheckedChildren="Manual"
                />
              </Space>
            </Col>
            
            <Col>
              <Space>
                <Button icon={<ExportOutlined />} onClick={handleExport}>
                  Export Data
                </Button>
                <Button icon={<ImportOutlined />}>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%' }}
                  />
                  Import Data
                </Button>
                <Button icon={<ClearOutlined />} onClick={clearMetrics} danger>
                  Clear All
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
      )}

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <Tabs.TabPane tab="Overview" key="overview">
          {renderOverview()}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Metrics" key="metrics">
          {renderMetrics()}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Comparison" key="comparison">
          {renderComparison()}
        </Tabs.TabPane>
        <Tabs.TabPane tab="History" key="history">
          {renderHistory()}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
