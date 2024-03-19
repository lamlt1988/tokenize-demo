import {createStackNavigator} from '@react-navigation/stack';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {ScreenName} from '../screens/types';
import {LoginScreen, MarketScreen} from '../screens';
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Text,
} from '@ui-kitten/components';
import HomeIcon from '../assets/icons/home-ico.svg';
import MarketIcon from '../assets/icons/market-ico.svg';
import WalletIcon from '../assets/icons/wallet-ico.svg';
import PortfolioIcon from '../assets/icons/portfolio-ico.svg';
import MoreIcon from '../assets/icons/more-ico.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {Colors} from '../styles';
import {selectAccessToken, useUserStore} from '../store/user';
import {useTranslation} from 'react-i18next';

const Stack = createStackNavigator();
const {Navigator, Screen} = createBottomTabNavigator();

const HomeScreen = () => (
  <Layout style={styles.emptyScreenContainer}>
    <Text category="h1">Home</Text>
  </Layout>
);

const WalletScreen = () => (
  <Layout style={styles.emptyScreenContainer}>
    <Text category="h1">Wallet</Text>
  </Layout>
);

const PortfolioScreen = () => (
  <Layout style={styles.emptyScreenContainer}>
    <Text category="h1">Portfolio</Text>
  </Layout>
);

const MoreScreen = () => (
  <Layout style={styles.emptyScreenContainer}>
    <Text category="h1">More</Text>
  </Layout>
);

const BottomTabBar = ({navigation, state}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();
  return (
    <BottomNavigation
      style={{marginBottom: insets.bottom}}
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab
        title={t('home')}
        icon={
          <HomeIcon
            fill={
              state.index === 0 ? Colors.primary.brand : Colors.neutral.gray02
            }
          />
        }
      />
      <BottomNavigationTab
        title={t('markets')}
        icon={
          <MarketIcon
            stroke={
              state.index === 1 ? Colors.primary.brand : Colors.neutral.gray02
            }
          />
        }
      />
      <BottomNavigationTab
        title={t('wallets')}
        icon={
          <WalletIcon
            stroke={
              state.index === 2 ? Colors.primary.brand : Colors.neutral.gray02
            }
          />
        }
      />
      <BottomNavigationTab
        title={t('portfolio')}
        icon={
          <PortfolioIcon
            stroke={
              state.index === 3 ? Colors.primary.brand : Colors.neutral.gray02
            }
          />
        }
      />
      <BottomNavigationTab
        title={t('more')}
        icon={
          <MoreIcon
            stroke={
              state.index === 4 ? Colors.primary.brand : Colors.neutral.gray02
            }
          />
        }
      />
    </BottomNavigation>
  );
};

const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name={ScreenName.HOME} component={HomeScreen} />
    <Screen
      name={ScreenName.MARKET}
      component={MarketScreen}
      options={{headerShown: false}}
    />
    <Screen name={ScreenName.WALLET} component={WalletScreen} />
    <Screen name={ScreenName.PORTFOLIO} component={PortfolioScreen} />
    <Screen name={ScreenName.MORE} component={MoreScreen} />
  </Navigator>
);

export function RootNavigator() {
  const accessToken = useUserStore(selectAccessToken);
  return (
    <>
      <Stack.Navigator>
        {!accessToken ? (
          <Stack.Screen
            name={ScreenName.LOGIN}
            component={LoginScreen}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name={ScreenName.TAB_NAVIGATOR}
            component={TabNavigator}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  emptyScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
