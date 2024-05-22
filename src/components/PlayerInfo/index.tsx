import { ButtonIcon } from '@components/ButtonIcon';
import * as S from './styles';

type PlayerInfoProps = {
  name: string;
  onRemove: () => void;
}

export function PlayerInfo({ name, onRemove }: PlayerInfoProps) {
  return (
    <S.Container>
      <S.Icon name='person' />
      <S.Title>{name}</S.Title>
      <ButtonIcon name='close' variation='SECONDARY' onPress={onRemove} />
    </S.Container>
  );
}
