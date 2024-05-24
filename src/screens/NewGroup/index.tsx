import { useState, useRef } from 'react';
import { Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { createNewGroup } from '@storage/groups/createNewGroup';

import { AppError } from '@utils/AppError';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';


import * as S from './styles';

export function NewGroup() {
  const navigation = useNavigation();
  
  const [group, setGroup] = useState('')
  
  const newGroupInputRef = useRef<TextInput>(null);

  function handleBackButtonAction() {
    setGroup('');
    navigation.navigate('groups');
  }

  async function handleSubmit() {
    try {
      await createNewGroup({ newGroup: group })
      
      newGroupInputRef.current?.blur();
      
      setGroup('');
      navigation.navigate('players', { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova Turma', error.message);
      }
      Alert.alert('Nova Turma', 'Não foi possível criar uma nova turma.');
      console.log(error);
    }
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
          inputRef={newGroupInputRef}
          value={group}
          onChangeText={setGroup}
          placeholder='Nome da turma'
        />

        <Button onPress={handleSubmit}>Criar</Button>
      </S.Content>
    </S.Container>
  );
}
