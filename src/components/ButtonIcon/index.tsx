import { TouchableOpacityProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import * as S from './styles';

type ButtonProps = TouchableOpacityProps & {
  variation?: S.IconVariation;
  name: keyof typeof MaterialIcons.glyphMap;
}

export function ButtonIcon({ variation = 'PRIMARY', name, ...rest }: ButtonProps) {
  return (
    <S.Container {...rest}>
      <S.Icon name={name} variation={variation} />
    </S.Container>
  );
}
