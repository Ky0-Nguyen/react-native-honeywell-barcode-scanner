import { useEffect, useState } from 'react';
import { Button, Text, SafeAreaView, StyleSheet } from 'react-native';
import Scanner from 'react-native-honeywell-barcode-scanner';

export default function App() {
  const [result, setResult] = useState('');

  useEffect(() => {
    const unsub = Scanner.onBarcodeRead((e) => {
      setResult(e.data);
    });
    return unsub;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Start Scan" onPress={() => Scanner.startScan()} />
      <Button title="Stop Scan" onPress={() => Scanner.stopScan()} />
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
  resultText: {
    marginTop: 20,
  },
});
