# 📱 Seren Capture Mobile

**React Native/Expo Mobile App for Residential Access Control Image Capture**

A mobile application that integrates with the Seren Capture backend system to provide a native mobile experience for security guards and gate operators.

## ✨ Features

- **📱 Native Mobile Experience**: Built with React Native and Expo for iOS and Android
- **📷 Camera Integration**: Direct camera access for capturing ID and vehicle images
- **🔍 OTP Search**: Search resident information using One-Time-PIN
- **🎯 Mode Selection**: Choose between Pedestrian and Vehicle capture modes
- **🖼️ Image Preview**: Preview captured images before uploading
- **📊 Progress Tracking**: Visual progress indicators throughout the capture process
- **🧪 Demo Mode**: Offline functionality with sample data for testing
- **📡 Backend Integration**: Seamless connection to Seren Capture backend API

## 🏗️ Architecture

### Screen Flow
```
Home Screen (OTP Entry)
    ↓
Mode Selection (Pedestrian/Vehicle)
    ↓
Capture Screen (Camera + Image Upload)
    ↓
Completion Screen (Summary + New Session)
```

### Key Components
- **Screens**: HomeScreen, ModeSelectionScreen, CaptureScreen, CompletionScreen
- **Components**: Button, Card, LoadingSpinner
- **Services**: ApiService for backend communication
- **Navigation**: React Navigation with Stack Navigator
- **Theme**: Consistent styling and colors

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your mobile device (for testing)
- Seren Capture backend running (see main project)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Update API configuration**
   - Edit `src/services/apiService.js`
   - Update the IP address to your backend server:
   ```javascript
   this.baseURL = 'http://YOUR_IP_ADDRESS:3000/api/capture'
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Test on device**
   - Scan QR code with Expo Go app (Android) or Camera app (iOS)
   - Ensure your device is on the same network as your computer

## 📱 Testing the App

### With Backend Running (Recommended)

1. **Start the backend server** (in main project directory):
   ```bash
   cd ../seren-capture
   npm start
   ```

2. **Verify backend is accessible**:
   ```bash
   curl http://YOUR_IP:3000/health
   ```

3. **Test mobile app**:
   - Use demo OTPs: `123456`, `789012`, `456789`
   - Test both Pedestrian and Vehicle modes
   - Capture images and complete sessions

### Demo Mode (Offline)

If backend is not available, the app automatically switches to demo mode with:
- Sample resident data
- Offline functionality
- Mock API responses

## 🎯 Usage Guide

### 1. Home Screen
- Enter OTP provided by visitor
- View demo mode information (if applicable)
- Search for resident information

### 2. Mode Selection
- Review resident details
- Choose capture mode:
  - **Pedestrian**: ID/Passport capture only
  - **Vehicle**: ID + Vehicle license capture

### 3. Capture Screen
- Capture required images using device camera
- Preview images before proceeding
- Upload images to backend server
- Track progress visually

### 4. Completion Screen
- Review capture summary
- View session details
- Start new capture session

## 🔧 Configuration

### API Configuration
Update `src/services/apiService.js`:
```javascript
this.baseURL = __DEV__ 
  ? 'http://YOUR_IP:3000/api/capture' // Development
  : 'https://your-domain.com/api/capture'; // Production
```

### Camera Permissions
The app requests camera permissions automatically. Permissions are configured in `app.json`:
- iOS: Camera usage description in Info.plist
- Android: Camera permission in manifest

### Theme Customization
Edit `src/constants/theme.js` to customize:
- Colors
- Font sizes
- Spacing
- Shadows
- Animations

## 📦 Dependencies

### Core Dependencies
- **expo**: Expo SDK
- **react-navigation**: Navigation library
- **expo-camera**: Camera API
- **expo-image-picker**: Image selection
- **axios**: HTTP client

### UI Dependencies
- **react-native-safe-area-context**: Safe area handling
- **react-native-screens**: Native screen management

## 🔒 Security Features

- **Secure API Communication**: HTTPS support for production
- **Image Validation**: File type and size validation
- **Permission Handling**: Proper camera permission management
- **Error Handling**: Comprehensive error handling and user feedback

## 📊 Performance

- **Optimized Images**: Automatic image compression
- **Efficient Navigation**: Stack-based navigation
- **Memory Management**: Proper image cleanup
- **Network Optimization**: Request timeouts and retry logic

## 🐛 Troubleshooting

### Common Issues

1. **Cannot connect to backend**
   - Verify backend is running on correct port
   - Check IP address in apiService.js
   - Ensure devices are on same network

2. **Camera not working**
   - Check permissions in device settings
   - Restart the Expo development server
   - Clear Expo cache: `expo start -c`

3. **App crashes on startup**
   - Check for JavaScript errors in console
   - Verify all dependencies are installed
   - Try running `npx expo install --fix`

### Debug Mode
- Shake device to open developer menu
- Enable Remote JS Debugging
- Check console logs for API errors

## 🚀 Deployment

### Production Build

1. **Configure for production**
   - Update API URLs in apiService.js
   - Set proper app icon and splash screen
   - Configure app.json for production

2. **Build for iOS**
   ```bash
   expo build:ios
   ```

3. **Build for Android**
   ```bash
   expo build:android
   ```

### App Store Deployment
- Follow Expo documentation for App Store submission
- Ensure proper app metadata and descriptions
- Test thoroughly on physical devices

## 📝 Development Notes

### File Structure
```
src/
├── components/          # Reusable UI components
├── screens/            # Main app screens
├── services/           # API and external services
├── constants/          # Theme and configuration
└── utils/              # Helper functions
```

### Code Style
- Follow React Native best practices
- Use functional components with hooks
- Implement proper error boundaries
- Write descriptive component names

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Follow existing code style
4. Test on both iOS and Android
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

---

## 🔗 Related Projects

- **Seren Capture Backend**: Main server application
- **EstateMate API**: Resident management system integration

## 📞 Support

For issues and questions:
- Check troubleshooting section
- Review backend logs
- Test API endpoints directly
- Verify network connectivity
