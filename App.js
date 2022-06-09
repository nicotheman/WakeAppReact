import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {FormPage} from "./src/pages/FormPage";

export default function App() {
  return (
    <View style={styles.container}>
      <FormPage></FormPage>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 10,
    paddingTop: 40,
    backgroundColor: "#F0F0F0"
  },
});
