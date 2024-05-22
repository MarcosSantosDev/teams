import { TouchableOpacityProps } from 'react-native';

import * as S from './styles';

type RadioButtonProps = TouchableOpacityProps & {
  children?: React.ReactNode;
  active?: boolean;
}

export function RadioButton({ children, active = false, ...rest }: RadioButtonProps) {
  return (
    <S.Container active={active} {...rest}>
      <S.Title>{children}</S.Title>
    </S.Container>
  );
}
