import { useCallback, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { getAllGroups } from '@storage/groups/getAllGroups';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import * as S from './styles';
import { AppError } from '@utils/AppError';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNavigateToNewGroup() {
    navigation.navigate('new');
  }

  function handleNavigateToPlayers(group: string) {
    navigation.navigate('players', { group });
  }

  async function fetchAllGroups() {
    try {      
      const allGroups = await getAllGroups();
      setGroups(allGroups);
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Busca de turmas', error.message);
      }
      return Alert.alert('Busca de turmas', 'Não foi possivel carregar as turmas.')
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchAllGroups()
    }, [])
  )

  return (
    <S.Container>
      <Header />
      
      <S.ContentHighlight>
        <Highlight
          title='Turmas'
          subTitle='Jogue com a sua turma'
        />

        <FlatList
          data={groups}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleNavigateToPlayers(item)} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={<ListEmpty message="Que tal cadastrar a primeria turma ?" />}
        />
      </S.ContentHighlight>

      <Button onPress={handleNavigateToNewGroup}>Criar nova turma</Button>
    </S.Container>
  );
}