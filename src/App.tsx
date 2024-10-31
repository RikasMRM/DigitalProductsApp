import React from 'react';
import { Provider } from 'react-redux';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { store } from './store';
import { Navigation } from './navigation';
import { config } from '@gluestack-ui/config';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GluestackUIProvider config={config}>
          <Navigation />
        </GluestackUIProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
