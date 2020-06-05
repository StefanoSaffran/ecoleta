import React, { useState, useContext, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

import { useTheme } from '../../hooks/theme';

import {
  Container,
  Logo,
  LogoTitle,
  Main,
  Title,
  Description,
  Footer,
  Button,
  IconView,
  ButtonText,
  ToggleThemeButton,
  ThemeIcon,
} from './styles';

interface IIBGEResponse {
  sigla: string;
}

interface IIBGECityResponse {
  nome: string;
}

const Home: React.FC = () => {
  const { title, colors } = useContext(ThemeContext);
  const { toggleTheme } = useTheme();
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const navigation = useNavigation();

  const pickerSelectStyles = {
    inputAndroid: {
      height: 60,
      backgroundColor: colors.cardBackground,
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
      color: colors.text,
    },
    inputIOS: {
      height: 60,
      backgroundColor: colors.cardBackground,
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
      color: colors.text,
    },
    placeholder: { color: colors.placeholder },
  };

  useEffect(() => {
    if (selectedUf === '0') return;

    axios
      .get<IIBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`,
      )
      .then(response => {
        const cityNames = response.data.map(city => city.nome);

        setCities(cityNames);
      });
  }, [selectedUf]);

  useEffect(() => {
    axios
      .get<IIBGEResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      )
      .then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Container
        imageStyle={{
          width: 274,
          height: 368,
          tintColor: title === 'light' ? 'green' : '#f5f5f5',
          opacity: 0.2,
        }}
        // eslint-disable-next-line global-require
        source={require('../../assets/home-background.png')}
      >
        <Main>
          <Logo>
            <FontAwesome name="recycle" size={50} color="#34cb79" />
            <LogoTitle>Ecoleta</LogoTitle>
          </Logo>
          <ToggleThemeButton onPress={toggleTheme}>
            <ThemeIcon name={title === 'light' ? 'sun' : 'moon'} />
          </ToggleThemeButton>
          <View>
            <Title>Seu marketplace de coleta de resíduos</Title>
            <Description>
              Ajudamos pessoas a encontrarem pontos de coleta de forma
              eficiente.
            </Description>
          </View>
        </Main>

        <Footer>
          <RNPickerSelect
            placeholder={{
              color: colors.placeholder,
              label: 'Selecione a UF',
            }}
            value={selectedUf}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            onValueChange={setSelectedUf}
            items={ufs?.map(uf => ({
              label: uf,
              value: uf,
            }))}
          />
          <RNPickerSelect
            placeholder={{
              label: 'Selecione a Cidade',
            }}
            value={selectedCity}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            onValueChange={setSelectedCity}
            items={cities?.map(city => ({
              label: city,
              value: city,
            }))}
          />
          <Button
            onPress={() =>
              navigation.navigate('Points', {
                uf: selectedUf,
                city: selectedCity,
              })}
          >
            <IconView>
              <Icon name="arrow-right" color="#fff" size={24} />
            </IconView>
            <ButtonText>Entrar</ButtonText>
          </Button>
        </Footer>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default Home;
