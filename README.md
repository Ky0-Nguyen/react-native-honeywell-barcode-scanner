# React Native Honeywell Barcode Scanner

A React Native library for integrating Honeywell barcode scanners into your React Native applications. This library provides a simple and efficient way to interact with Honeywell barcode scanning devices on both Android and iOS platforms.

## Features

- Support for Honeywell barcode scanning devices
- Simple and intuitive API
- TypeScript support
- Compatible with React Native 0.79.2 and above

## Installation

```sh
npm install @angelcat/react-native-honeywell-barcode-scanner
# or
yarn add @angelcat/react-native-honeywell-barcode-scanner
```

### iOS

For iOS, you need to install the pods:

```sh
cd ios && pod install
```

## Usage

```js
import { HoneywellBarcodeScanner } from '@angelcat/react-native-honeywell-barcode-scanner';

// Initialize the scanner
const scanner = new HoneywellBarcodeScanner();

// Start scanning
scanner.startScanning({
  onScan: (barcode) => {
    console.log('Scanned barcode:', barcode);
  },
  onError: (error) => {
    console.error('Scanning error:', error);
  }
});

// Stop scanning when done
scanner.stopScanning();
```

## API Reference

### Methods

- `startScanning(options)`: Start the barcode scanner
  - `options.onScan`: Callback function when a barcode is scanned
  - `options.onError`: Callback function when an error occurs

- `stopScanning()`: Stop the barcode scanner

## Contributing

We welcome contributions! Please see our [contributing guide](CONTRIBUTING.md) for more details.

## License

MIT © [KyoNguyen](https://github.com/Ky0-Nguyen)

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
