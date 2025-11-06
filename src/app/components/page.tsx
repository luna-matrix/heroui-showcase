'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShowcaseLayout } from '@/components/layout/ShowcaseLayout';
import { DeviceSimulator } from '@/components/device-simulator/DeviceSimulator';
import { Button as HeroUIButton, Input as HeroUIInput, Card as HeroUICard } from '@heroui/react';
import { Button as AntButton, Input as AntInput, Card as AntCard, Select as AntSelect, Badge as AntBadge } from 'antd';
import { useIsAuthenticated } from '@/lib/stores/useAuthStore';

const ComponentsPage = () => {
  const isAuthenticated = useIsAuthenticated();
  const [selectedLibrary, setSelectedLibrary] = useState('all');

  const renderShadcnComponents = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Input Fields</h3>
        <div className="space-y-3 max-w-md">
          <Input placeholder="Enter your name" />
          <Input type="email" placeholder="Email address" />
          <Input type="password" placeholder="Password" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Badges</h3>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Select</h3>
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Choose an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Cards</h3>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is a card component from shadcn/ui with content and actions.</p>
            <div className="mt-4 flex gap-2">
              <Button size="sm">Action</Button>
              <Button variant="outline" size="sm">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderHeroUIComponents = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <HeroUIButton color="primary">Primary Button</HeroUIButton>
          <HeroUIButton color="secondary">Secondary</HeroUIButton>
          <HeroUIButton color="default">Default</HeroUIButton>
          <HeroUIButton color="danger">Danger</HeroUIButton>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Input Fields</h3>
        <div className="space-y-3 max-w-md">
          <HeroUIInput placeholder="Enter your name" />
          <HeroUIInput type="email" placeholder="Email address" />
          <HeroUIInput type="password" placeholder="Password" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Badges</h3>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Select</h3>
        <AntSelect
          placeholder="Choose an option"
          style={{ width: 200 }}
          options={[
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' }
          ]}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Cards</h3>
        <HeroUICard className="max-w-md">
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-2">Card Title</h4>
            <p>This is a card component from HeroUI with content and actions.</p>
            <div className="mt-4 flex gap-2">
              <HeroUIButton size="sm" color="primary">Action</HeroUIButton>
              <HeroUIButton size="sm" variant="bordered">Cancel</HeroUIButton>
            </div>
          </div>
        </HeroUICard>
      </div>
    </div>
  );

  const renderAntDesignComponents = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <AntButton type="primary">Primary Button</AntButton>
          <AntButton>Default</AntButton>
          <AntButton type="dashed">Dashed</AntButton>
          <AntButton type="text">Text</AntButton>
          <AntButton type="link">Link</AntButton>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Input Fields</h3>
        <div className="space-y-3 max-w-md">
          <AntInput placeholder="Enter your name" />
          <AntInput type="email" placeholder="Email address" />
          <AntInput.Password placeholder="Password" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Badges</h3>
        <div className="flex flex-wrap gap-2">
          <AntBadge count="Default" />
          <AntBadge count="Processing" status="processing" />
          <AntBadge count="Success" status="success" />
          <AntBadge count="Error" status="error" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Select</h3>
        <AntSelect
          placeholder="Choose an option"
          style={{ width: 200 }}
          options={[
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' }
          ]}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Cards</h3>
        <AntCard className="max-w-md" title="Card Title">
          <p>This is a card component from Ant Design with content and actions.</p>
          <div className="mt-4 flex gap-2">
            <AntButton type="primary" size="small">Action</AntButton>
            <AntButton size="small">Cancel</AntButton>
          </div>
        </AntCard>
      </div>
    </div>
  );

  return (
    <ShowcaseLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Component Comparison</h1>
          <p className="text-lg text-gray-600">
            Compare components across different libraries side by side
          </p>
        </motion.div>

        {isAuthenticated ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-8">
                <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">All Libraries</TabsTrigger>
                <TabsTrigger value="shadcn" className="data-[state=active]:bg-gray-900 data-[state=active]:text-white">shadcn/ui</TabsTrigger>
                <TabsTrigger value="heroui" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">HeroUI</TabsTrigger>
                <TabsTrigger value="ant" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Ant Design</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-8">
                <div className="grid lg:grid-cols-1 gap-8">
                  <Card className="shadow-lg border-0">
                    <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-700 text-white">
                      <CardTitle className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center text-xs font-bold">S</div>
                        shadcn/ui Components
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                      {renderShadcnComponents()}
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0">
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      <CardTitle className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center text-xs font-bold">H</div>
                        HeroUI Components
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                      {renderHeroUIComponents()}
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0">
                    <CardHeader className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
                      <CardTitle className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center text-xs font-bold">A</div>
                        Ant Design Components
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                      {renderAntDesignComponents()}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="shadcn" className="space-y-8">
                <Card className="shadow-lg border-0">
                  <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-700 text-white">
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center text-xs font-bold">S</div>
                      shadcn/ui Components
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    {renderShadcnComponents()}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="heroui" className="space-y-8">
                <Card className="shadow-lg border-0">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center text-xs font-bold">H</div>
                      HeroUI Components
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    {renderHeroUIComponents()}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ant" className="space-y-8">
                <Card className="shadow-lg border-0">
                  <CardHeader className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center text-xs font-bold">A</div>
                      Ant Design Components
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    {renderAntDesignComponents()}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Card className="max-w-md mx-auto">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
                <p className="text-gray-600 mb-6">
                  Please sign in to access the component comparison features.
                </p>
                <Button onClick={() => window.location.href = '/'}>
                  Back to Home
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </ShowcaseLayout>
  );
};

export default ComponentsPage;
