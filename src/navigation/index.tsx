import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {RootNavigator} from './root-navigator';

export default function Navigation() {
  const navigationRef = useNavigationContainerRef();
  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <RootNavigator />
      </NavigationContainer>
    </>
  );
}
