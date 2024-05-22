import styled, { css } from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
	flex: 1;
	background-color: ${({ theme }) => theme.COLORS.GRAY_600};
	padding: 24px;
`

export const Content = styled.View`
	flex: 1;

	padding: 32px 0;
  gap: 32px;
`

export const ContentInputIcon = styled.View`
  width: 100%;
  
  flex-direction: row;
  align-items: center;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  border-radius: 6px;
`

export const ButtonIcon = styled.TouchableOpacity`
  background-color: transparent;

  width: 32px;
`

export const HeaderList = styled.View`
  width: 100%;

  flex-direction: row;
  gap: 40px;  
  align-items: center;
`

export const NumberOfPlayers = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.GRAY_200};
  `}
`
export const ListOfPlayers = styled.View`
	flex: 1;
`
