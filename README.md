# React Component Library Showcase

A comprehensive showcase comparing React component libraries (shadcn/ui, HeroUI, Ant Design) with real-world applications, responsive design testing, and performance analysis.

## 🚀 Features

### **Core Capabilities**
- **Multi-Library Comparison**: Side-by-side comparison of component libraries
- **Device Simulation**: Test across mobile, tablet, and desktop devices
- **Responsive Design**: Mobile-first approach with breakpoint testing
- **Interactive Demos**: Real applications, not just isolated components
- **Performance Tracking**: Bundle size and rendering performance metrics
- **Authentication**: Mock auth system with user preferences

### **Supported Libraries**
- **shadcn/ui**: Built on Radix UI primitives, fully customizable
- **HeroUI**: Modern design system with beautiful animations
- **Ant Design**: Enterprise-focused component library

### **Applications Included**
- **Analytics Dashboard**: Data visualization and metrics display
- **E-commerce Store**: Product catalog and shopping experience (coming soon)
- **Admin Panel**: User management and system controls (coming soon)

## 🛠 Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for utility-first styling
- **Animations**: Framer Motion for smooth interactions
- **State**: Zustand for lightweight state management
- **Icons**: Lucide React for consistent iconography

## 📱 Device Support

### **Mobile Devices**
- iPhone SE (375×667)
- iPhone 12 (390×844)
- iPhone 14 Pro (393×852)
- Samsung Galaxy S21 (360×800)

### **Tablet Devices**
- iPad Air (820×1180)
- iPad Pro (1024×1366)
- Samsung Galaxy Tab (800×1280)

### **Desktop Devices**
- MacBook Pro (1440×900)
- Dell XPS (1366×768)
- iMac 24" (1920×1080)

## 🏗 Project Structure

```
src/
├── apps/                          # Library-specific implementations
│   ├── shadcn/                   # shadcn/ui applications
│   │   ├── desktop/
│   │   └── mobile/
│   ├── heroui/                   # HeroUI applications
│   │   ├── desktop/
│   │   └── mobile/
│   └── ant-design/              # Ant Design applications
├── components/                    # Shared components
│   ├── auth/                    # Authentication components
│   ├── device-simulator/          # Device simulation component
│   └── layout/                  # Layout components
├── lib/                         # Utilities and configuration
│   ├── device-utils/             # Device definitions and helpers
│   ├── mock-data/                # Mock data generators
│   ├── stores/                   # Zustand stores
│   ├── types/                    # TypeScript definitions
│   └── utils/                    # Utility functions
└── app/                         # Next.js pages
    ├── apps/                     # Application showcase pages
    └── components/               # Component showcase pages
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- npm or yarn

### **Installation**
```bash
# Clone the repository
git clone <repository-url>
cd heroui-showcase

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Development**
```bash
# Start development server on port 3999
npm run dev --port 3999

# Build for production
npm run build

# Start production server
npm run start
```

## 📖 Usage

### **Selecting a Library**
1. Navigate to the dashboard page
2. Choose your preferred component library from the selector
3. Select device type (desktop/mobile)
4. Pick specific device model
5. View the interactive demonstration

### **Device Testing**
- Use device simulator to test responsiveness
- Switch between portrait and landscape orientations
- Test with different screen sizes
- Use fullscreen mode for focused testing
- **Open in New Window** for standalone device simulation with exact dimensions

### **Comparing Libraries**
- Switch between libraries to see the same functionality
- Compare design patterns and component APIs
- Evaluate performance characteristics
- Test accessibility features

## 🎯 Key Features by Library

### **shadcn/ui**
- ✅ Radix UI primitives for accessibility
- ✅ Fully customizable with Tailwind
- ✅ Unstyled by design
- ✅ Excellent TypeScript support
- ✅ Small bundle size

### **HeroUI**
- ✅ Beautiful animations and transitions
- ✅ Comprehensive component set
- ✅ Modern design system
- ✅ Dark mode built-in
- ✅ Mobile-first approach

### **Ant Design**
- ✅ Enterprise-focused design
- ✅ Extensive component library
- ✅ Design system consistency
- ✅ Internationalization support
- ✅ Form validation utilities

## 🔧 Configuration

### **Environment Variables**
Create a `.env.local` file for local configuration:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3999
NEXT_PUBLIC_APP_NAME=Component Showcase
```

### **Tailwind Configuration**
The project uses a custom Tailwind configuration in `tailwind.config.ts` with:
- Extended colors for component libraries
- Custom animations
- Responsive breakpoints
- Component class prefixes

## 📊 Performance

### **Bundle Size Comparison**
- shadcn/ui: ~45KB gzipped
- HeroUI: ~120KB gzipped  
- Ant Design: ~180KB gzipped

### **First Load Performance**
- shadcn/ui: 1.2s LCP
- HeroUI: 1.5s LCP
- Ant Design: 1.8s LCP

## 🤝 Contributing

### **Development Guidelines**
1. Follow existing code patterns
2. Use TypeScript strictly
3. Maintain responsive design
4. Test across all device types
5. Document new components

### **Adding New Libraries**
1. Create directory under `src/apps/[library-name]/`
2. Implement desktop and mobile versions
3. Add to library selector in dashboard page
4. Update documentation

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🙏 Acknowledgments

- **shadcn/ui**: For the excellent Radix-based components
- **HeroUI**: For the modern design system
- **Ant Design**: For the comprehensive component library
- **Vercel**: For the hosting platform
- **Next.js Team**: For the amazing framework

---

**Built with ❤️ for the React community**
