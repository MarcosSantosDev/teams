import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';


export const Container = styled(TouchableOpacity)`
  height: 56px;
  width: 56px;

  background-color: transparent;
  border-radius: 6px;

  justify-content: center;
  align-items: center;
`;

export type IconVariation = 'PRIMARY' | 'SECONDARY';

type IconProps = {
  variation: IconVariation;
}

export const Icon = styled(MaterialIcons).attrs<IconProps>(({ theme, variation }) => ({
  size: 24,
  color: variation === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED
}))``