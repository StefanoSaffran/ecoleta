import React, { useEffect, useState, useCallback } from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';

import api from '../../services/api';

import * as S from './styles';

interface IParams {
  point_id: string;
}

interface IData {
  point: {
    image: string;
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: Array<{
    title: string;
  }>;
}

const Detail: React.FC = () => {
  const [data, setData] = useState<IData>({} as IData);
  const navigation = useNavigation();
  const route = useRoute();

  const { point_id } = route.params as IParams;

  useEffect(() => {
    api.get<IData>(`points/${point_id}`).then(response => {
      setData(response.data);
    });
  }, [point_id]);

  const handleWhatsapp = useCallback(() => {
    if (data?.point?.whatsapp) {
      Linking.openURL(
        `whatsapp://send?phone=${data.point.whatsapp}&text="Tenho interesse sobre a coleta de resíduos"`,
      );
    }
  }, [data]);

  const handleComposeMail = useCallback(() => {
    if (data.point.email) {
      MailComposer.composeAsync({
        subject: `Interesse na coleta de resíduos`,
        recipients: [data.point.email],
      });
    }
  }, [data]);

  if (!data.point)
    return (
      <ActivityIndicator
        color="#333"
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    );

  return (
    <S.StyledSafeAreaView style={{ flex: 1 }}>
      <S.Container>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <S.PointImage
          source={{
            uri: data.point.image_url,
          }}
        />

        <S.PointName>{data.point.name}</S.PointName>
        <S.PointItems>
          {data.items.map(item => item.title).join(', ')}
        </S.PointItems>

        <S.Address>
          <S.AddressTitle>Endereço</S.AddressTitle>
          <S.AddressContent>
            {data.point.city}, {data.point.uf}
          </S.AddressContent>
        </S.Address>
      </S.Container>

      <S.Footer>
        <S.Button onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" size={20} color="#fff" />
          <S.ButtonText>Whatsapp</S.ButtonText>
        </S.Button>
        <S.Button onPress={handleComposeMail}>
          <Icon name="mail" size={20} color="#fff" />
          <S.ButtonText>E-mail</S.ButtonText>
        </S.Button>
      </S.Footer>
    </S.StyledSafeAreaView>
  );
};

export default Detail;
