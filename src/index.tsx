import { NativeModules, NativeEventEmitter } from 'react-native';

const { HoneywellBarcodeScanner } = NativeModules;
console.log('NativeModules:', NativeModules);
console.log('HoneywellBarcodeScanner:', HoneywellBarcodeScanner);

const emitter = new NativeEventEmitter(HoneywellBarcodeScanner);

export default {
  initializeScanner: () => {
    console.log('Initializing scanner...');
    return new Promise((resolve, reject) => {
      try {
        // Gọi startScan để trigger initialization
        HoneywellBarcodeScanner.startScan()
          .then(() => {
            console.log('Scanner initialized successfully');
            // Dừng scan ngay sau khi khởi tạo
            return HoneywellBarcodeScanner.stopScan();
          })
          .then(() => {
            resolve(true);
          })
          .catch((error: any) => {
            console.error('Failed to initialize scanner:', error);
            reject(error);
          });
      } catch (error) {
        console.error('Error in initializeScanner:', error);
        reject(error);
      }
    });
  },

  startScan: () => {
    console.log('Calling startScan...');
    return HoneywellBarcodeScanner.startScan()
      .then((result: string) => {
        console.log('startScan success:', result);
        return result;
      })
      .catch((error: any) => {
        console.error('startScan error:', error);
        throw error;
      });
  },

  stopScan: () => {
    console.log('Calling stopScan...');
    return HoneywellBarcodeScanner.stopScan()
      .then((result: string) => {
        console.log('stopScan success:', result);
        return result;
      })
      .catch((error: any) => {
        console.error('stopScan error:', error);
        throw error;
      });
  },

  onBarcodeRead: (callback: (event: { data: string }) => void) => {
    console.log('Setting up onBarcodeRead listener');
    const sub = emitter.addListener('onBarcodeRead', (event) => {
      console.log('Barcode read event:', event);
      callback(event);
    });
    return () => {
      console.log('Removing onBarcodeRead listener');
      sub.remove();
    };
  },

  onBarcodeError: (callback: (event: { error: string }) => void) => {
    console.log('Setting up onBarcodeError listener');
    const sub = emitter.addListener('onBarcodeError', (event) => {
      console.log('Barcode error event:', event);
      callback(event);
    });
    return () => {
      console.log('Removing onBarcodeError listener');
      sub.remove();
    };
  },
};
