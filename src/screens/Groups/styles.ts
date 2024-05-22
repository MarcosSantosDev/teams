import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
	flex: 1;
	background-color: ${({ theme }) => theme.COLORS.GRAY_600};
	padding: 24px;
`

export const ContentHighlight = styled.View`
  flex: 1;
  
  padding: 32px 0;
  gap: 32px;
  justify-content: center;
`
