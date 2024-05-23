import { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { getAllGroupsOfStorage } from '@storage/group/getAllGroupsOfStorage';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import * as S from './styles';

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
    const allGroups = await getAllGroupsOfStorage();
    setGroups(allGroups);
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