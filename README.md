# Wellnest

> A modern Expo + React Native app for onboarding, authentication, and user management, using Firebase and Google Sign-In, styled with Tailwind CSS (NativeWind).

---

## Features

- **Expo + React Native**: Cross-platform mobile app (Android/iOS/Web)
- **File-based Routing**: Powered by `expo-router` for easy navigation
- **Authentication**: Email/password and Google Sign-In via Firebase
- **Onboarding Flow**: Dynamic onboarding slides from Firestore
- **Persistent User Store**: Zustand + AsyncStorage for user state
- **Tailwind CSS**: Utility-first styling with NativeWind
- **Profile Management**: View and logout functionality

---

## Folder Structure

```markdown
wellnest/
├── app/ # App screens and routes (login, register, onboarding, tabs)
│ ├── (tabs)/ # Tab navigation (Home, Profile)
│ ├── \_layout.tsx # Root layout and navigation logic
│ ├── login.tsx # Login screen
│ ├── register.tsx # Registration screen
│ └── onboarding.tsx # Onboarding flow
├── components/ # Reusable UI components (Button, GoogleSignInButton)
├── store/ # Zustand user store
├── utils/ # Helper functions, Google Sign-In config
├── constants/ # Theme and color constants
├── assets/ # Images and static assets
├── global.css # Tailwind/NativeWind global styles
├── tailwind.config.js # Tailwind/NativeWind config
├── app.json # Expo app config
├── package.json # Project dependencies and scripts
└── ...
```

---

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the app**

   ```bash
   npm run start
   # or for Android
   npm run android
   # or for Web
   npm run web
   ```

3. **Configure Firebase**
   - Place your `google-services.json` in `assets/` (already present for demo)
   - Set up your Firebase project and update environment variables as needed

---

## Scripts

- `npm run start` – Start Expo development server
- `npm run android` – Run app on Android device/emulator
- `npm run web` – Run app in web browser
- `npm run lint` – Lint code with ESLint
- `npm run reset-project` – Reset to a blank app directory

---

## Tech Stack

- [Expo](https://expo.dev/) + [React Native](https://reactnative.dev/)
- [expo-router](https://expo.github.io/router/docs)
- [Firebase](https://firebase.google.com/) (Auth, Firestore)
- [Google Sign-In](https://github.com/react-native-google-signin/google-signin)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)

---

## Contributing

1. Fork the repo and clone it
2. Install dependencies: `npm install`
3. Create a new branch for your feature/fix
4. Make your changes and commit
5. Open a pull request

---

## License

MIT
