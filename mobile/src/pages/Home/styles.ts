import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';

export const Container = styled.ImageBackground`
  flex: 1;
  padding: 32px;
  background: ${({ theme }) => theme.colors.background};
`;

export const Logo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LogoTitle = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: 28px;
  font-family: 'Ubuntu_700Bold';
  margin-left: 20px;
`;

export const Main = styled.View`
  flex: 1;
  justify-content: center;
`;

export const ToggleThemeButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  top: ${Platform.OS === 'ios' ? 60 : 50}px;
`;

export const ThemeIcon = styled(Icon).attrs({
  size: 30,
  color: '#feb72b',
})``;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${Platform.OS === 'ios' ? 32 : 30}px;
  font-family: 'Ubuntu_700Bold';
  max-width: 260px;
  margin-top: ${Platform.OS === 'ios' ? 64 : 24}px;
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  margin-top: 16px;
  font-family: 'Roboto_400Regular';
  max-width: 260px;
  line-height: 24px;
`;

export const Footer = styled.View``;

export const Input = styled.TextInput`
  height: 60px;
  background-color: ${({ theme }) => theme.colors.inputBackground};
  border-radius: 10px;
  margin-bottom: 8px;
  padding: 0 24px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Button = styled(RectButton)`
  background-color: #34cb79;
  height: 60px;
  flex-direction: row;
  border-radius: 10px;
  overflow: hidden;
  align-items: center;
  margin-top: 8px;
`;

export const IconView = styled.View`
  height: 60px;
  width: 60px;
  background-color: rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  flex: 1;
  justify-content: center;
  text-align: center;
  color: #fff;
  font-family: 'Roboto_500Medium';
  font-size: 16px;
`;
