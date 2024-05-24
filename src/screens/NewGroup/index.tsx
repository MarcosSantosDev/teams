import { useState, useRef } from 'react';
import { Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AppError } from '@utils/AppError';
import { createNewGroup } from '@storage/groups/createNewGroup';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

import * as S from './styles';

const useNewGroup = () => {
  const navigation = useNavigation();
  
  const [group, setGroup] = useState('')
  
  const newGroupInputRef = useRef<TextInput>(null);

  function handleBackButtonAction() {
    setGroup('');
    navigation.navigate('groups');
  }

  async function handleSubmit() {
    try {
      if (group.trim().length === 0) {
       return Alert.alert( "Nova turma", "Informe o nome da turma para adicionar !");  
      }

      await createNewGroup({ newGroup: group })
      setGroup('');
      newGroupInputRef.current?.blur();
      navigation.navigate('players', { group });
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Nova Turma', error.message);
      }
      return Alert.alert('Nova Turma', 'Não foi possível criar uma nova turma.');
    }
  }

  return {
    newGroupInputRef,
    group,
    setGroup,
    handleSubmit,
    handleBackButtonAction
  }
} 

export function NewGroup() {
  const {
    newGroupInputRef,
    group,
    setGroup,
    handleSubmit,
    handleBackButtonAction
  } = useNewGroup();

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
          placeholder='Nome da turma'
          onChangeText={setGroup}
          onSubmitEditing={handleSubmit}
          returnKeyType='done'
        />

        <Button onPress={handleSubmit}>Criar</Button>
      </S.Content>
    </S.Container>
  );
}
