# 📱 Je veux aller à Paris（我要去巴黎）iOS App Guide

You have two easy ways to run **Je veux aller à Paris（我要去巴黎）** on your iPhone or iPad:

---

## 🌟 Method 1: PWA (Recommended - Instant, No Xcode or Fees Needed!)

This is the fastest, cleanest way used by millions of web apps:
1. Open the GitHub Pages site (`https://kkwangela.github.io/french-learning/`) or start the local server on your Mac (`./start.sh`) and open the displayed LAN address.
2. Open Safari on your iPhone and visit the address.
3. Tap the **Share button (📤)** at the bottom of Safari.
4. Scroll down and tap **"Add to Home Screen (添加到主屏幕 ➕)"**.
5. Tap **Add**.

**Result:** A native-looking **"我要去巴黎"** app icon (Parisian coffee cat 🐱☕🗼) appears on your iPhone home screen. When launched:
- It opens in full-screen standalone mode (no Safari address bar, no tabs).
- Completely offline-capable (cached by Service Worker).
- Uses native iOS high-quality French voices (Thomas, Amélie, etc.).

---

## 🛠️ Method 2: Xcode Native iOS App (Swift & WKWebView)

If you prefer a compiled `.ipa` or Xcode project:
1. Open **Xcode** on your Mac.
2. Choose **File > New > Project... > iOS > App (SwiftUI)**.
3. Product Name: `JeVeuxAllerAParis` (Display Name: `我要去巴黎`).
4. Copy `ContentView.swift` from this directory into your Xcode project.
5. Drag the web app files (`index.html`, `css/`, `js/`, `assets/`) into your Xcode Project Navigator (check "Copy items if needed" and "Create folder references").
6. Connect your iPhone via USB cable, select your device, and click **Run (▶️)**.
