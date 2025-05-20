import { NativeModules, NativeEventEmitter } from 'react-native';

const { HoneywellScanner } = NativeModules;
const emitter = new NativeEventEmitter(HoneywellScanner);

export default {
  startScan: () => HoneywellScanner.startScan(),
  stopScan: () => HoneywellScanner.stopScan(),
  onBarcodeRead: (callback: (event: { data: string }) => void) => {
    const sub = emitter.addListener('onBarcodeRead', callback);
    return () => sub.remove();
  },
};
