import { useEffect, useState } from 'react';
import { Button, Text, SafeAreaView, StyleSheet, Alert } from 'react-native';
import Scanner from '@angelcat/react-native-honeywell-barcode-scanner';

export default function App() {
  const [result, setResult] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Khởi tạo scanner khi component mount
    Scanner.initializeScanner()
      .then(() => {
        console.log('Scanner initialized successfully');
        setIsInitialized(true);
      })
      .catch((error: any) => {
        console.error('Failed to initialize scanner:', error);
        Alert.alert('Error', 'Failed to initialize scanner: ' + error.message);
      });

    // Setup barcode read listener
    const unsub = Scanner.onBarcodeRead((e: { data: string }) => {
      setResult(e.data);
    });

    // Setup error listener
    const errorUnsub = Scanner.onBarcodeError((e: { error: string }) => {
      console.error('Barcode error:', e.error);
      Alert.alert('Scanner Error', e.error);
    });

    return () => {
      unsub();
      errorUnsub();
    };
  }, []);

  const handleStartScan = async () => {
    try {
      await Scanner.startScan();
    } catch (error) {
      console.error('Start scan error:', error);
      Alert.alert('Error', 'Failed to start scan: ' + error.message);
    }
  };

  const handleStopScan = async () => {
    try {
      await Scanner.stopScan();
    } catch (error) {
      console.error('Stop scan error:', error);
      Alert.alert('Error', 'Failed to stop scan: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.statusText}>
        Scanner Status: {isInitialized ? 'Ready' : 'Initializing...'}
      </Text>
      <Button
        title="Start Scan"
        onPress={handleStartScan}
        disabled={!isInitialized}
      />
      <Button
        title="Stop Scan"
        onPress={handleStopScan}
        disabled={!isInitialized}
      />
      <Text style={styles.resultText}>Result: {result}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    marginBottom: 20,
    fontSize: 16,
  },
  resultText: {
    marginTop: 20,
    fontSize: 16,
  },
});
