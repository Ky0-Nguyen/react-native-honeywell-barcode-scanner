# React Native Honeywell Barcode Scanner

A React Native library for integrating Honeywell barcode scanners into your React Native applications. This library provides a simple and efficient way to interact with Honeywell barcode scanning devices on Android platform.

## Features

- Support for Honeywell barcode scanning devices
- Simple and intuitive API
- TypeScript support
- Compatible with React Native 0.79.2 and above

## Requirements

- Android device with Honeywell barcode scanner hardware
- Does not work on Android emulators
- Does not work on iOS devices

## Installation

```sh
npm install @angelcat/react-native-honeywell-barcode-scanner
# or
yarn add @angelcat/react-native-honeywell-barcode-scanner
```

## Usage

```js
import Scanner from '@angelcat/react-native-honeywell-barcode-scanner';

// Initialize the scanner
Scanner.initializeScanner()
  .then(() => {
    console.log('Scanner initialized successfully');
  })
  .catch((error) => {
    console.error('Failed to initialize scanner:', error);
  });

// Setup barcode read listener
const unsub = Scanner.onBarcodeRead((e) => {
  console.log('Scanned barcode:', e.data);
});

// Setup error listener
const errorUnsub = Scanner.onBarcodeError((e) => {
  console.error('Scanning error:', e.error);
});

// Start scanning
Scanner.startScan();

// Stop scanning when done
Scanner.stopScan();

// Clean up listeners
unsub();
errorUnsub();
```

## API Reference

### Methods

- `initializeScanner()`: Initialize the barcode scanner
- `startScan()`: Start the barcode scanner
- `stopScan()`: Stop the barcode scanner
- `onBarcodeRead(callback)`: Set up listener for barcode scans
  - `callback(event)`: Called when a barcode is scanned
    - `event.data`: The scanned barcode data
- `onBarcodeError(callback)`: Set up listener for scanner errors
  - `callback(event)`: Called when an error occurs
    - `event.error`: The error message

## Contributing

We welcome contributions! Please see our [contributing guide](CONTRIBUTING.md) for more details.

## License

MIT © [KyoNguyen](https://github.com/Ky0-Nguyen)

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
