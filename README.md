# Tama EL Pablo | Portfolio Website

A modern, animated portfolio website showcasing backend development skills and web stress testing services. Built with React and featuring advanced animations, real-time statistics, and responsive design.

🌐 **Live Demo**: [https://el-pablos.github.io/portome](https://el-pablos.github.io/portome)

## 🌟 Features

### Animated Elements
- **Typewriter Title**: Animated browser tab title "tamshub | code your dream" with blinking cursor
- **Dynamic Favicon**: Rotating coding symbols (`</>`, `{}`, `()`) with smooth transitions
- **URL Hash Animation**: Cycles through `#tamshub`, `#code`, `#your`, `#dream` sections
- **Theme Transitions**: Smooth 0.3s transitions between light and dark modes
- **Terminal Animation**: Live typewriter effect in hero terminal component

### Interactive Features
- **Light/Dark Mode Toggle**: Complete theme switching with proper contrast ratios
- **Visitor Counter**: Real-time session-based visitor tracking with localStorage
- **GitHub Statistics**: Live stats from @el-pablos and @dasaraul accounts with API rate limiting
- **Responsive Design**: Optimized for screens from 320px to 2560px width
- **Smooth Scrolling**: Section navigation with active state detection

### Technical Highlights
- **Performance Optimized**: 60fps animations using transform and opacity only
- **Accessibility**: WCAG AA contrast ratios, keyboard navigation, screen reader support
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Browser Compatibility**: Chrome, Firefox, Safari, Edge support

## 🔧 Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (React)
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Icons**: Lucide React icons
- **Animations**: Framer Motion for complex animations
- **APIs**: GitHub REST API v4 with rate limiting and caching
- **Build**: Create React App with optimization

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/el-pablos/portome.git
cd portome

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 📁 Project Structure

```
portome/
├── src/
│   ├── App.js           # Main React component with all features
│   ├── index.js         # Application entry point
│   └── index.css        # Tailwind CSS imports
├── public/
│   ├── index.html       # HTML template
│   └── favicon.ico      # Static favicon (replaced by animated)
├── build/               # Production build output
└── package.json         # Dependencies and scripts
```

## 🎨 Features Overview

### 🖥️ Portfolio Sections
- **Hero**: Animated terminal with typing commands
- **About**: Developer introduction with GitHub links
- **GitHub Stats**: Live repository and activity statistics
- **Services**: Backend development, OSINT, API integration, DevOps
- **Stress Testing**: Professional web stress testing services with pricing
- **Showcase**: Verified stress testing results with proof images
- **Portfolio**: Featured projects from GitHub accounts
- **Contact**: Multiple contact methods and call-to-action

### ⚡ Animation System
- **Title Animation**: Character-by-character typewriter with cursor blink
- **Favicon Rotation**: Canvas-generated 32x32px animated icons
- **Hash Cycling**: URL updates without page jumping using replaceState
- **Theme Transitions**: CSS custom properties with smooth color changes
- **Hover Effects**: Transform-based micro-interactions

### 📊 Real-time Data
- **Visitor Tracking**: Session-based counting with multi-tab sync
- **GitHub Integration**: Repository count, activity events, last commit date
- **API Management**: 10-minute caching, exponential backoff, error handling
- **Loading States**: Smooth loading indicators and error boundaries

## 🌐 Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 90+     | ✅ Full Support |
| Firefox | 88+     | ✅ Full Support |
| Safari  | 14+     | ✅ Full Support |
| Edge    | 90+     | ✅ Full Support |

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px (optimized touch interactions)
- **Tablet**: 768px - 1024px (adaptive layouts)
- **Desktop**: 1024px - 2560px (full feature set)

## 🛡️ Security & Performance

- **Content Security Policy**: Prevents XSS attacks
- **Rate Limiting**: GitHub API requests with proper backoff
- **Error Boundaries**: Graceful failure handling
- **Performance**: Optimized bundle size, lazy loading, efficient re-renders

## 🎯 SEO & Accessibility

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **ARIA Labels**: Screen reader compatibility
- **Meta Tags**: Open Graph and Twitter Card support
- **Alt Text**: Descriptive image alternatives
- **Focus Management**: Keyboard navigation support

## 📈 Analytics & Monitoring

- **Visitor Counter**: Unique session tracking
- **GitHub Stats**: Repository and activity monitoring
- **Performance Metrics**: Core Web Vitals tracking
- **Error Tracking**: API failure monitoring with fallbacks

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

- **GitHub**: [@el-pablos](https://github.com/el-pablos) | [@dasaraul](https://github.com/dasaraul)
- **Telegram**: [@ImTamaa](https://t.me/ImTamaa)
- **Email**: yeteprem.end23juni@gmail.com
- **Location**: Jakarta Selatan, Indonesia

## 📄 License

This project is open source and available under the MIT License.

---

**Tama EL Pablo** - Backend Developer | Open Source Enthusiast | Security Researcher
*Building reliable APIs and secure systems with Laravel and modern technologies*