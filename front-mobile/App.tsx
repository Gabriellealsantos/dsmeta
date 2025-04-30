import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import Routes from './src/routes/Routes';

export default function App() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <Routes />
      </GestureHandlerRootView>
      <Toast />
    </>
  );
}
