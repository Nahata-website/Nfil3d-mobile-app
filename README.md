# NFIL3D Mobile Application (Android & iOS)

A complete e-commerce, buying guide, and 3D printing companion mobile application for **NFIL3D (nfil3d.com)**.

---

## 📱 Features

1. **🛍️ Store & E-Commerce:**
   - 3D Printers, Filaments (Turbo-Finish PLA+, High-Strength PETG, TPU 95A, Carbon Fiber, Silk Rainbow), 3D Pens & Spares.
   - Live WooCommerce API synchronization (`/wp-json/wc/v3`).
   - Search & filtering by material categories.
   - Product details modal with technical specifications and color variations.

2. **🧭 Smart Buying Guide & Material Selector:**
   - **Interactive Filament Finder Wizard**: 3-question selector matching print requirements to the ideal NFIL3D spool.
   - **Material Comparison Matrix**: Thermal, mechanical, and printability properties across PLA, PETG, TPU, ABS, and Carbon Fiber.
   - **3D Pen Master Guide**: Tips, stencils, and temperature guidance for 3D drawing pens.

3. **🌡️ Print Hub & Maker Tools:**
   - **Spool Cost & Usage Calculator**: Calculates exact material cost in ₹ per print and remaining models per 1kg spool.
   - **Temperature Cheat Sheet**: Official nozzle & bed temperature reference.
   - **Troubleshooting Assistant**: Instant step-by-step fixes for Warping, Stringing, and Nozzle Clogging.

4. **🛒 Shopping Bag & Checkout:**
   - Free shipping progress bar (Free delivery over ₹999 across India).
   - Coupon code engine (Try `NFIL10` for 10% discount).
   - Seamless checkout flow with address & payment selection.

---

## 🚀 How to Run & Test on Your Mobile Phone (Android & iPhone)

### Step 1: Install Expo Go App on your phone
- **Android**: Download [Expo Go on Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iPhone**: Download [Expo Go on Apple App Store](https://apps.apple.com/app/expo-go/id982107779)

### Step 2: Start the Development Server
Open PowerShell in the `nfil3d-mobile-app` directory and run:
```powershell
npx expo start
```

### Step 3: Scan the QR Code
- On **Android**: Open the **Expo Go** app and tap **"Scan QR code"**.
- On **iPhone**: Open the default **Camera app** and scan the terminal QR code, then tap the prompt to open in Expo Go.

The app will load and update in real-time as you develop!

---

## 🔑 Connecting Your NFIL3D WooCommerce API Keys

Open `src/config/woocommerce.js` and paste your credentials:
```javascript
export const WOOCOMMERCE_CONFIG = {
  siteUrl: 'https://nfil3d.com',
  consumerKey: 'ck_your_actual_consumer_key',
  consumerSecret: 'cs_your_actual_consumer_secret',
  apiVersion: 'wc/v3',
  timeout: 10000,
};
```
Once saved, the app will automatically switch from the built-in offline catalog to **Live WooCommerce Sync**!
