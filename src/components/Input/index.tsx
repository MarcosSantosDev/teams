import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';

import * as S from './styles';

type InputProps = TextInputProps;

export function Input(props: InputProps) {
  const theme = useTheme();

  return <S.Container autoCorrect={false} placeholderTextColor={theme.COLORS.GRAY_300} {...props} />;
}
