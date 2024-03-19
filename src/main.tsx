import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigation from './navigation';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {i18nInit} from './services/i18n';
i18nInit();
function Main() {
  return (
    <SafeAreaProvider style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <ApplicationProvider {...eva} theme={eva.light}>
          <Navigation />
        </ApplicationProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Main;
