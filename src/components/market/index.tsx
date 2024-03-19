import {StyleSheet, StatusBar, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {List, ListItem, Text} from '@ui-kitten/components';
import {MarketType, Header} from './header';
import {Typography, Colors} from '../../styles';
import {useEffect, useState} from 'react';
import {fetchMarket} from '../../services/api';
import {ICryptoPair, IMarketInfo} from '../../services/api/types';

const renderItemThumbnail = (item: ICryptoPair): React.ReactElement => (
  <View style={styles.thumbContainer}>
    <Image
      source={{
        uri: `https://tokenize-dev.com/assets/images/currency-logos/${item.marketCurrency.toLowerCase()}.png`,
      }}
      resizeMode="cover"
      width={50}
      height={50}
    />
  </View>
);

const renderItemAccessory = (item: ICryptoPair): React.ReactElement => (
  <View>
    <Text style={styles.commonText} category="p2">
      ${item.ceiling}
    </Text>
    <Text style={styles.commonText} category="c2">
      {item.floor}
    </Text>
  </View>
);

const renderItem = ({item}: {item: ICryptoPair}): React.ReactElement => (
  <ListItem
    title={`${item.marketName}`}
    description={`${item.marketCurrencyLong}`}
    style={styles.item}
    accessoryLeft={() => renderItemThumbnail(item)}
    accessoryRight={() => renderItemAccessory(item)}
  />
);

export function Market() {
  const [marketList, setMarketList] = useState<IMarketInfo[]>([]);
  const [marketSelected, setMarketSelected] = useState<MarketType>(
    MarketType.BTC,
  );
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const markets = marketList.filter(o => o.title === marketSelected);
  const data = markets[0]?.list;
  useEffect(() => {
    let isActive = true;
    const getMarket = async () => {
      try {
        let marketData = await fetchMarket();
        if (marketData && isActive) {
          setMarketList(marketData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMarket();
    return () => {
      isActive = false;
    };
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      let marketData = await fetchMarket();
      if (marketData) {
        setMarketList(marketData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <SafeAreaView style={styles.container}>
        <Header
          onSelectMarket={setMarketSelected}
          currentMarket={marketSelected}
        />
        <List
          data={data}
          renderItem={renderItem}
          style={styles.list}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    marginBottom: 10,
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  list: {
    marginHorizontal: 10,
    backgroundColor: 'transparent',
  },
  thumbContainer: {
    width: 38,
    height: 38,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commonText: {
    ...Typography.monospace.base,
    color: Colors.neutral.gray01,
  },
});
