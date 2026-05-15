# Banbox — Development setup

This guide walks through installing dependencies, configuring the API, and running Banbox on iOS, Android, or web.

## Prerequisites

| Requirement | Version / notes |
|-------------|-----------------|
| **Node.js** | 20 LTS or newer recommended |
| **npm** | Comes with Node (or use pnpm/yarn if you prefer) |
| **Git** | To clone the repository |
| **Expo CLI** | Used via `npx expo` (no global install required) |

### iOS (macOS only)

- **Xcode** 15+ with iOS Simulator
- **Xcode Command Line Tools:** `xcode-select --install`
- **CocoaPods** (usually installed with Xcode; used when running native builds)

### Android

- **Android Studio** with Android SDK
- An **Android Virtual Device (AVD)** or a physical device with USB debugging enabled
- `ANDROID_HOME` set in your shell profile (Android Studio can configure this)

### Optional

- **Expo Go** on a physical device ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)) for quick previews without a dev build
- **Watchman** (macOS): `brew install watchman` — can improve Metro file watching

## 1. Clone and install

```bash
git clone <your-repo-url> Banbox
cd Banbox
npm install
```

## 2. Configure the API

Banbox reads the backend URL from `constants/index.ts`:

```ts
export const API_BASE_URL = 'http://139.59.122.17:4000';
```

Change this to your API origin (no trailing slash). The client calls:

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/home` | Home feed (user, announcement, products, stories, …) |
| `POST` | `/home/login` | Sign in |
| `POST` | `/home/register` | Sign up |
| `GET` | `/home/me` | Current user (Bearer token) |

### Local API on a simulator

- **iOS Simulator:** `http://localhost:4000` or `http://127.0.0.1:4000` usually works.
- **Android Emulator:** use `http://10.0.2.2:4000` to reach the host machine’s `localhost`.
- **Physical device:** use your computer’s LAN IP (e.g. `http://192.168.1.10:4000`) and ensure the device and machine are on the same network.

### HTTP on iOS

iOS blocks cleartext HTTP by default. For development against `http://` endpoints you may need an App Transport Security exception in `app.json` under `ios.infoPlist`, or prefer HTTPS in production.

## 3. Start the dev server

```bash
npx expo start
```

From the terminal UI:

- Press **`i`** — open iOS Simulator (macOS + Xcode)
- Press **`a`** — open Android emulator
- Press **`w`** — open web
- Scan the QR code — open in **Expo Go** (limited; some native modules need a dev build)

Clear cache if Metro misbehaves:

```bash
npx expo start --clear
```

## 4. Native development builds

This project uses native modules (e.g. Reanimated, gesture handler) and enables the **New Architecture**. For the closest match to production, use development builds instead of Expo Go alone.

### iOS

```bash
npx expo run:ios
```

Or via npm:

```bash
npm run ios
```

First run generates the `ios/` folder (gitignored) and installs pods. Pick a simulator when prompted.

### Android

Start an emulator from Android Studio, then:

```bash
npx expo run:android
```

Or:

```bash
npm run android
```

## 5. Web

```bash
npm run web
```

Static export is configured in `app.json` (`web.output: "static"`). Production web builds use Expo’s static export flow documented on [expo.dev](https://docs.expo.dev/guides/publishing-websites/).

## 6. Linting

```bash
npm run lint
```

Uses `eslint-config-expo` with the config in `eslint.config.js`.

## 7. IDE setup

Recommended for this repo:

- **VS Code / Cursor** with the [Expo Tools](https://marketplace.visualstudio.com/items?itemName=expo.vscode-expo-tools) extension (see `.vscode/extensions.json`)
- TypeScript path alias `@/*` is defined in `tsconfig.json` — restart the TS server if imports are not resolved

## Troubleshooting

### “Network request failed” / empty home sections

1. Confirm `API_BASE_URL` in `constants/index.ts`.
2. Ensure the backend is running and reachable from the simulator/device (see [Local API](#local-api-on-a-simulator)).
3. The home screen catches fetch errors silently during dev; check Metro logs for `ApiError` details.

### iOS build / pod errors

```bash
cd ios && pod install && cd ..
npx expo run:ios
```

If `ios/` does not exist yet, run `npx expo prebuild` first (generates native projects).

### Android SDK not found

Set `ANDROID_HOME` (example):

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools
```

### Metro stuck or stale bundle

```bash
npx expo start --clear
```

Remove caches if needed:

```bash
rm -rf node_modules .expo
npm install
```

### Splash screen stays too long / too short

Adjust `SPLASH_MIN_DURATION_MS` in `constants/index.ts` (default `1800` ms).

## App identifiers

From `app.json`:

| Platform | Identifier |
|----------|------------|
| iOS | `com.imranbappy.Banbox` |
| Android | `com.imranbappy.Banbox` |
| URL scheme | `banbox://` |

Change these before shipping to stores if you fork the project.

## Next steps

- Implement remaining tabs (Wishlist, Cart, Orders, Profile) under `app/(tabs)/`
- Wire header actions in `components/home/Header.tsx`
- Point `API_BASE_URL` at staging/production and add HTTPS
- Add EAS Build profiles when ready for TestFlight / Play Console — see [EAS Build](https://docs.expo.dev/build/introduction/)

For an overview of features and architecture, see [README.md](./README.md).
