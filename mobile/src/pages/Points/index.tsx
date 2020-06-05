import React, { useCallback, useState, useEffect } from 'react';
import { TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';
import { SvgUri } from 'react-native-svg';
import * as Location from 'expo-location';

import api from '../../services/api';

import * as S from './styles';

interface IItem {
  id: string;
  title: string;
  image_url: string;
}

interface IPoint {
  id: string;
  image: string;
  image_url: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface IParams {
  uf: string;
  city: string;
}

const Points: React.FC = () => {
  const [items, setItems] = useState<IItem[]>([]);
  const [points, setPoints] = useState<IPoint[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const route = useRoute();
  const { city, uf } = route.params as IParams;
  const navigation = useNavigation();

  useEffect(() => {
    async function loadPosition(): Promise<void> {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Ooooops',
          'Precisamos de sua permissão para obter a localização',
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      setInitialPosition([-21.6235108, -55.1598438]);
    }

    loadPosition();
  }, []);

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    if (selectedItems.length) {
      api
        .get('points', {
          params: {
            city,
            uf,
            items: selectedItems,
          },
        })
        .then(response => setPoints(response.data));
    }
  }, [selectedItems, city, uf]);

  const handleNavigateToDetail = useCallback(
    (id: string) => {
      navigation.navigate('Detail', { point_id: id });
    },
    [navigation],
  );

  const handleSelectItem = useCallback(
    (id: string) => {
      const alreadySelected = selectedItems.findIndex(item => item === id);

      alreadySelected >= 0
        ? setSelectedItems(oldItems => oldItems.filter(item => item !== id))
        : setSelectedItems(oldItems => [...oldItems, id]);
    },
    [selectedItems],
  );

  return (
    <S.StyledSafeAreaView style={{ flex: 1 }}>
      <S.Container>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <S.Title>Bem vindo.</S.Title>
        <S.Description>Encontre no mapa um ponto de coleta.</S.Description>

        <S.MapContainer>
          {initialPosition[0] !== 0 && (
            <S.Map
              loadingEnabled={initialPosition[0] === 0}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.105,
                longitudeDelta: 0.105,
              }}
            >
              {points?.map(point => (
                <S.MapMarker
                  key={point.id}
                  onPress={() => handleNavigateToDetail(point.id)}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
                >
                  <S.MapMarkerContainer>
                    <S.MapMarkerImage
                      source={{
                        uri: point.image_url,
                      }}
                    />

                    <S.MapMarkerTitle>{point.name}</S.MapMarkerTitle>
                  </S.MapMarkerContainer>
                </S.MapMarker>
              ))}
            </S.Map>
          )}
        </S.MapContainer>
      </S.Container>
      <S.ItemsContainer>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
        >
          {items?.map((item: IItem) => (
            <S.Item
              style={
                selectedItems.includes(item.id) && {
                  borderColor: '#34cb79',
                  borderWidth: 2,
                }
              }
              key={item.id}
              onPress={() => handleSelectItem(item.id)}
              activeOpacity={0.6}
            >
              <SvgUri width={42} height={42} uri={item.image_url} />
              <S.ItemTitle>{item.title}</S.ItemTitle>
            </S.Item>
          ))}
        </ScrollView>
      </S.ItemsContainer>
    </S.StyledSafeAreaView>
  );
};

export default Points;
