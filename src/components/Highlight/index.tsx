import * as S from './styles';

type HighlightProps = {
  title: string;
  subTitle: string;
}

export function Highlight({ title, subTitle }: HighlightProps){
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.SubTitle>{subTitle}</S.SubTitle>
    </S.Container>
  );
};
