import { TouchableOpacityProps } from 'react-native';

import * as S from './styles';

type ButtonProps = TouchableOpacityProps & {
  children?: React.ReactNode;
  variation?: S.ButtonVariation;
}

export function Button({ children, variation = 'PRIMARY', ...rest }: ButtonProps) {
  return (
    <S.Container variation={variation} {...rest}>
      <S.Title>{children}</S.Title>
    </S.Container>
  );
}
