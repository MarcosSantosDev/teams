import * as React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';

import * as S from './styles';

type InputProps = TextInputProps & {
  inputRef?: React.LegacyRef<TextInput>;
};

export function Input({ inputRef, ...props }: InputProps) {
  const theme = useTheme();

  return (
    <S.Container
       {...props}
      autoCorrect={false}
      placeholderTextColor={theme.COLORS.GRAY_300}    
      ref={inputRef}
    />
  );
}
