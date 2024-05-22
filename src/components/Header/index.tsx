import logoImg from "@assets/logo.png";

import * as S from "./styles";

type HeaderProps = {
  onBackButtonAction?: () => void;
  showBackButton?: boolean;
};

export function Header({ onBackButtonAction, showBackButton = false }: HeaderProps){
  return (
    <S.Container>
      {showBackButton && (
        <S.BackButton onPress={onBackButtonAction}>
          <S.BackIcon />
        </S.BackButton>
      )}
      <S.Logo source={logoImg} />
    </S.Container>
  );
};
