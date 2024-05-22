import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';

type ButtonTypeStyledProps = {
  active: boolean;
}

export const Container = styled(TouchableOpacity)<ButtonTypeStyledProps>`
  min-height: 38px;
  max-height: 38px;

  padding: 8px 12px;

  background-color: transparent;

  border-radius: 4px;
  border: 1px solid ${({ theme, active }) => active ? theme.COLORS.GREEN_700 : 'transparent'};

  justify-content: center;
  align-items: center;
`;


export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.WHITE};
  `}
`