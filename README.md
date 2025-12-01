# ShoreSquad 🌊

**Rally your crew, track weather, and hit the next beach cleanup with our dope map app!**

## Overview

ShoreSquad is a social beach cleanup platform that mobilizes young people to clean beaches using weather tracking, interactive mapping, and community engagement features. Connect with your crew, plan cleanups, and make environmental action fun.

## Features

✨ **Interactive Beach Map** - Discover cleanup locations and nearby beaches  
🌤️ **Weather Integration** - Real-time weather conditions for planning  
👥 **Crew Management** - Rally your squad and track cleanup participation  
📅 **Event Planning** - Create and join beach cleanup events  
🏆 **Gamification** - Achievements and leaderboards  
♿ **Accessibility** - WCAG 2.1 AA compliant  

## Brand Strategy

### Color Palette
- **Ocean Blue** (#0066CC) - Primary, trust, connection
- **Sand Beige** (#F4D5A8) - Secondary, approachability
- **Eco Green** (#2EAD6C) - Action, environmental focus
- **Fresh Cyan** (#1DD3B0) - Energy, youthful appeal
- **Dark Navy** (#0A1E2E) - Text, contrast

### Target Audience
Young, eco-conscious individuals (16-35) who value community and environmental impact.

## JavaScript Features

- **Leaflet.js** - Interactive mapping with beach markers
- **Geolocation API** - User location detection
- **Local Storage** - Persistent user preferences
- **Service Workers** - Offline capability
- **Intersection Observer** - Lazy loading images
- **Fetch API** - Weather data integration
- **Debouncing** - Optimized search performance

## UX Principles

| Principle | Implementation |
|-----------|-----------------|
| **Mobile-First** | Responsive design for all devices |
| **Clear Navigation** | Sticky navbar with intuitive sections |
| **Accessibility** | ARIA labels, keyboard navigation, high contrast |
| **Feedback** | Toast notifications for user actions |
| **Performance** | Optimized animations, lazy loading |

## Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/shoresquad.git
   cd shoresquad
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5500`

### Alternative: Live Server Extension

If you're using VS Code:
1. Install the **Live Server** extension
2. Right-click `index.html` → "Open with Live Server"
3. Browser will auto-open at `http://localhost:5500`

## Project Structure

```
shoresquad/
├── index.html           # HTML5 boilerplate
├── css/
│   └── styles.css       # Responsive styles with CSS variables
├── js/
│   └── app.js           # Main app logic and interactivity
├── assets/              # Images, icons, media
├── package.json         # Dependencies
├── .gitignore           # Git ignore rules
├── .vscode/
│   ├── launch.json      # Chrome debugger config
│   └── settings.json    # Live Server config
└── README.md            # This file
```

## API Integration Ready

The app is structured to integrate with:
- **OpenWeatherMap API** - Real-time weather data
- **Mapbox or Leaflet Routing** - Route optimization
- **Firebase/Supabase** - Event and user management
- **Stripe** - Fundraising for cleanups

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Performance Metrics

- ⚡ First Contentful Paint: < 1.5s
- 🎯 Lighthouse Score: 90+
- 📱 Mobile-optimized with 60fps animations

## Accessibility Features

✅ WCAG 2.1 Level AA compliant  
✅ Keyboard navigation support  
✅ Screen reader optimized  
✅ High contrast mode support  
✅ Reduced motion preferences  
✅ Focus indicators for keyboard users  

## Development

### Adding New Features

1. Create a new branch
2. Update `js/app.js` for functionality
3. Style in `css/styles.css` with CSS variables
4. Test responsiveness at 480px, 768px, 1200px
5. Verify accessibility with screen readers

### Testing Checklist

- [ ] Map loads and displays beaches
- [ ] Weather data displays correctly
- [ ] Mobile menu toggles on small screens
- [ ] All buttons have focus indicators
- [ ] Forms are keyboard accessible
- [ ] Images lazy load properly

## Deployment

Ready to deploy to:
- **Netlify** - Drag & drop deployment
- **Vercel** - Git-based deployment
- **GitHub Pages** - Free static hosting
- **AWS S3 + CloudFront** - Scalable CDN

## Future Enhancements

🔄 Real-time user location sharing  
📸 Photo upload for cleanup progress  
🔔 Push notifications for events  
💬 In-app messaging between crew members  
🌐 Multi-language support  
📊 Environmental impact tracking  

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/NewFeature`)
3. Commit changes (`git commit -m 'Add NewFeature'`)
4. Push to branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

## License

MIT License - feel free to use ShoreSquad for personal or commercial projects.

## Contact

**ShoreSquad Team**  
📧 hello@shoresquad.app  
🌊 www.shoresquad.app  

---

**Let's rally for a cleaner ocean!** 🌊♻️
