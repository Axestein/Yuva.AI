# Yuva: AI-Driven Talent Scout <img width="150" height="120" alt="Screenshot 2025-09-15 141649" src="https://github.com/user-attachments/assets/3e949332-6442-495a-b573-58799bed1ede" />

Yuva is an innovative mobile application designed to identify and nurture athletic talent across India, especially in rural and remote areas. Powered by on-device AI, Yuva enables standardized athletic testing without the need for specialized equipment or expert scouts.

## App Demo Video

### User/Athelete
https://github.com/user-attachments/assets/af732014-f02e-4bdd-8c28-4cbd43d546e7

### Coach
https://github.com/user-attachments/assets/164c1a0f-3f4b-4419-8c6e-fe7fcd5a67c6

## Problem Statement

Identifying athletic talent in a vast country like India is a monumental challenge. Aspiring athletes in rural and remote areas lack access to standardized testing facilities and expert scouts. This leads to a massive loss of potential talent that could otherwise excel in various sports disciplines.

## Key Features

- **📱 On-Device AI** – Analyzes performance videos offline directly on the user's phone
- **🏃 Test Battery** – Guides users through SAI's standard tests (vertical jump, sprint, sit-ups, etc.)
- **🔍 Cheat Detection** – Flags tampered videos and incorrect form using advanced algorithms
- **📊 Benchmarking** – Instant comparison with national standards and age-group percentiles
- 🎮 **Gamification** – Badges, leaderboards, and progress tracking to maintain engagement
- **🔒 Secure Submission** – Encrypted upload to SAI servers when connectivity is available
- **🌐 Multi-Language Support** – Accessibility in various Indian languages

## Standard Test Battery

Yuva implements the Sports Authority of India (SAI) standard tests:

1. **Physical Assessments**
   - Vertical Jump (explosive leg power)
   - Sprint Test (acceleration and speed)
   - Agility Test (quickness and coordination)
   - Endurance Run (cardiovascular fitness)

2. **Strength Tests**
   - Push-ups (upper body strength)
   - Sit-ups (core strength)
   - Pull-ups (back and arm strength)
   - Plank Test (core endurance)

3. **Skill Assessments**
   - Ball Control (sport-specific dribbling skills)
   - Shooting Accuracy (precision and power)
   - Reaction Time (quick response ability)
   - Coordination (body movement harmony)

## 🛠️ Technical Approach

<img width="457" height="420" alt="Screenshot 2025-09-27 100012" src="https://github.com/user-attachments/assets/7c40c971-ca38-4fec-a8a0-663cce6a7e53" />
<img width="512" height="420" alt="Screenshot 2025-09-27 100025" src="https://github.com/user-attachments/assets/75c964b4-859f-409e-83d7-93099ea26813" />
<img width="868" height="350" alt="Screenshot 2025-09-27 100048" src="https://github.com/user-attachments/assets/cab110c8-8dd8-4474-85a9-6f7e0b957203" />

### Technologies Used:

- **Frontend**: React Native with Expo for cross-platform compatibility
- **Styling**: React Native StyleSheet with custom components
- **AI Model**: TensorFlow.js with MoveNet for pose estimation
- **Animations**: React Native Reanimated for smooth UI interactions
- **Deployment**: Mobile app stores (iOS & Android) with web-based admin panel

### Methodology:

1. **Video Recording**: The app guides the user to record a specific fitness test with clear instructions
2. **On-Device Processing**: TensorFlow Lite models analyze the video frame-by-frame on the user's phone to:
   - Detect human pose and key body points
   - Calculate performance metrics (jump height, sprint time, rep count)
   - Run cheat detection algorithms to ensure test validity
3. **Instant Feedback**: Results are calculated, benchmarked, and displayed to the user immediately
4. **Secure Sync**: Verified and encrypted data packets are synced with the SAI backend when connectivity is available

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/yuva-talent-scout.git
cd yuva-talent-scout
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install TensorFlow.js dependencies:
```bash
expo install @tensorflow/tfjs @tensorflow-models/posenet
```

4. Start the development server:
```bash
expo start
# or
npm start
```

5. Run on your preferred platform:
- Press `a` for Android emulator
- Press `i` for iOS simulator
- Scan QR code with Expo Go app on your physical device

## 🎯 Usage

1. **Registration**: Create an account with basic details and age verification
2. **Test Selection**: Choose from the standardized test battery
3. **Guidance**: Follow step-by-step instructions for each test
4. **Recording**: Capture performance using phone's camera with on-screen guidance
5. **Analysis**: Get immediate AI-powered feedback and results
6. **Tracking**: Monitor progress over time and compare with national standards

## 🏗️ System Architecture

```
yuva-talent-scout/
├── assets/               # Images, fonts, and model files
├── components/           # Reusable UI components
│   ├── CameraModule/    # Custom camera with guidance overlay
│   ├── PoseRenderer/    # AI pose estimation visualization
│   ├── NavBar/          # Bottom navigation component
│   └── ProgressChart/   # Data visualization components
├── screens/             # Main app screens
│   ├── HomeScreen.js    # Dashboard with stats and progress
│   ├── TestScreen.js    # Athletic assessment tests
│   ├── TutorialsScreen.js # Test instructions and demonstrations
│   ├── ProfileScreen.js # User profile and historical data
│   └── LeaderboardScreen.js # Gamification and rankings
├── services/            # Business logic and external services
│   ├── ai-analysis/     # TensorFlow.js integration
│   ├── encryption/      # Data security utilities
│   └── api/             # SAI server communication
├── utils/               # Helper functions and utilities
│   ├── cheat-detection/ # Algorithm for identifying tampered tests
│   └── benchmarks/      # National standard comparisons
└── App.js               # Main application component
```

## 🔧 Customization

To adapt Yuva for different regions or sports:

1. **Modify Test Parameters**: Adjust the `testConfigurations` for different age groups or regions
2. **Add New Tests**: Extend the test battery with sport-specific assessments
3. **Update Benchmark Data**: Modify national standards in the benchmarks utility
4. **Regional Adaptation**: Add multi-language support for different regions

## 🤝 Contributing

We welcome contributions to Yuva! Please feel free to submit pull requests, report bugs, or suggest new features.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines:
- Follow React Native best practices
- Ensure accessibility standards are met
- Maintain test coverage for critical functionality
- Document new features thoroughly

## 🙏 Acknowledgments

- Sports Authority of India (SAI) for test protocols and standards
- TensorFlow.js team for pose estimation models
- React Native community for excellent documentation and support
- The many coaches and athletes who provided feedback during development

<div align="center">
Developed with ❤️ for the athletes of India
</div>
