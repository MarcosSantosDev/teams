import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

import * as S from './styles';

export function NewGroup() {
  const [group, setGroup] = useState('')

  const navigation = useNavigation();
  
  function handleBackButtonAction() {
    navigation.navigate('groups');
  }

  function handleSubmit() {
    navigation.navigate('players', { group });
  }

  return (
    <S.Container>
      <Header showBackButton onBackButtonAction={handleBackButtonAction} />

      <S.Content>
        <S.ContentHighlight>
          <S.UsersIcon />
        
          <Highlight
            title='Nova Turma'
            subTitle='Crie uma turma para adicionar pessoas'
          />
        </S.ContentHighlight>

        <Input
          value={group}
          onChangeText={setGroup}
          placeholder='Nome da turma'
        />

        <Button onPress={handleSubmit}>Criar</Button>
      </S.Content>
    </S.Container>
  );
}