import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';

import * as S from './styles';
import { useState } from 'react';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

export function Groups() {
  const [groups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNavigateToNewGroup() {
    navigation.navigate('new');
  }

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
            <GroupCard title={item} />
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