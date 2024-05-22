import { useState } from 'react';
import { FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import type { AppStackParamList } from '../../@types/navigation';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { RadioButton } from '@components/RadioButton'
import { Input } from '@components/Input';
import { ButtonIcon } from '@components/ButtonIcon';
import { PlayerInfo } from '@components/PlayerInfo';
import { ListEmpty } from '@components/ListEmpty';

import * as S from './styles';

export function Players() {
  const [selectedTeam, setSelectedTeam] = useState();
  const [teams] = useState([]);
  const [players] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();

  const { group } = route.params as AppStackParamList['players'];

  function handleBackButtonAction() {
    navigation.navigate('groups');
  }

  return (
    <S.Container>
      <Header showBackButton onBackButtonAction={handleBackButtonAction} />
      <S.Content>
        <Highlight
          title={group}
          subTitle='Adicione a galera e separe os times'
        />

        <S.ContentInputIcon>
          <Input placeholder='Nome do participante' />
          <ButtonIcon name='add' />
        </S.ContentInputIcon>

        <S.HeaderList>
          <FlatList
            horizontal
            data={teams}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <RadioButton active={selectedTeam === item} onPress={() => setSelectedTeam(item)}>
                {item}
              </RadioButton>
            )}
            contentContainerStyle={{
              gap: 12
            }}
            showsHorizontalScrollIndicator={false}
          />

          <S.NumberOfPlayers>
            {teams.length}
          </S.NumberOfPlayers>
        </S.HeaderList>

        <S.ListOfPlayers>
          <FlatList
            data={players}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <PlayerInfo name={item} onRemove={() => {}} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              { gap: 16 },
              players.length === 0 && { flex: 1 }
            ]}
            ListEmptyComponent={<ListEmpty message="Não há pessoas neste time." />}
          /> 
        </S.ListOfPlayers>
      </S.Content>

      <Button variation='SECONDARY'>Remover turma</Button>
    </S.Container>
  );
}