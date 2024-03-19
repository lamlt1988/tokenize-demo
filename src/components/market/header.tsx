import {Button, Text} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import SearchIcon from '../../assets/icons/search-ico.svg';
import {Typography, Colors} from '../../styles';
import {useTranslation} from 'react-i18next';

export enum MarketType {
  BTC = 'BTC',
  ETH = 'ETH',
  SGD = 'SGD',
  USD = 'USD',
}

interface IHeader {
  onSelectMarket: (type: MarketType) => void;
  currentMarket: MarketType;
}
export function Header({onSelectMarket, currentMarket}: IHeader) {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.title} category="s1">
          {t('markets')}
        </Text>
        <SearchIcon />
      </View>
      <View style={styles.buttonsView}>
        <Button
          size="small"
          style={StyleSheet.flatten([
            styles.button,
            {
              backgroundColor:
                currentMarket === MarketType.BTC
                  ? Colors.primary.brand01
                  : Colors.neutral.gray03,
            },
          ])}
          onPress={() => onSelectMarket(MarketType.BTC)}>
          {evaProps => (
            <Text
              {...evaProps}
              style={StyleSheet.flatten([
                evaProps?.style,
                {
                  color:
                    currentMarket === MarketType.BTC
                      ? Colors.neutral.white
                      : Colors.neutral.gray02,
                },
              ])}>
              {MarketType.BTC}
            </Text>
          )}
        </Button>
        <Button
          size="small"
          style={StyleSheet.flatten([
            styles.button,
            {
              backgroundColor:
                currentMarket === MarketType.ETH
                  ? Colors.primary.brand01
                  : Colors.neutral.gray03,
            },
          ])}
          onPress={() => onSelectMarket(MarketType.ETH)}>
          {evaProps => (
            <Text
              {...evaProps}
              style={StyleSheet.flatten([
                evaProps?.style,
                {
                  color:
                    currentMarket === MarketType.ETH
                      ? Colors.neutral.white
                      : Colors.neutral.gray02,
                },
              ])}>
              {MarketType.ETH}
            </Text>
          )}
        </Button>
        <Button
          size="small"
          style={StyleSheet.flatten([
            styles.button,
            {
              backgroundColor:
                currentMarket === MarketType.SGD
                  ? Colors.primary.brand01
                  : Colors.neutral.gray03,
            },
          ])}
          onPress={() => onSelectMarket(MarketType.SGD)}>
          {evaProps => (
            <Text
              {...evaProps}
              style={StyleSheet.flatten([
                evaProps?.style,
                {
                  color:
                    currentMarket === MarketType.SGD
                      ? Colors.neutral.white
                      : Colors.neutral.gray02,
                },
              ])}>
              {MarketType.SGD}
            </Text>
          )}
        </Button>
        <Button
          size="small"
          style={StyleSheet.flatten([
            styles.button,
            {
              backgroundColor:
                currentMarket === MarketType.USD
                  ? Colors.primary.brand01
                  : Colors.neutral.gray03,
              marginRight: 0,
            },
          ])}
          onPress={() => onSelectMarket(MarketType.USD)}>
          {evaProps => (
            <Text
              {...evaProps}
              style={StyleSheet.flatten([
                evaProps?.style,
                {
                  color:
                    currentMarket === MarketType.USD
                      ? Colors.neutral.white
                      : Colors.neutral.gray02,
                },
              ])}>
              {MarketType.USD}
            </Text>
          )}
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 28,
    marginRight: 20,
    marginBottom: 20,
  },
  title: {
    ...Typography.monospace.base,
    color: Colors.neutral.gray01,
    textTransform: 'uppercase',
  },
  buttonsView: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    marginRight: 10,
    borderWidth: 0,
  },
});
