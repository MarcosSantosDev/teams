import { useCallback, useState, useRef, useMemo } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";

import { AppError } from "@utils/AppError";
import { deleteGroup } from "@storage/groups/deleteGroup";
import { createNewPlayerByGroup } from "@storage/players/createNewPlayerByGroup";
import { getPlayersByGroup } from "@storage/players/getPlayersByGroup";
import { PlayerDTO } from "@storage/players/PlayerDTO";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { RadioButton } from "@components/RadioButton";
import { Input } from "@components/Input";
import { ButtonIcon } from "@components/ButtonIcon";
import { PlayerInfo } from "@components/PlayerInfo";
import { ListEmpty } from "@components/ListEmpty";

import type { AppStackParamList } from "../../@types/navigation";

import * as S from "./styles";
import { deletePlayerByGroup } from "@storage/players/deletePlayer";

const usePlayers = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [teams] = useState<string[]>(["Time A", "Time B"]);
  const [selectedTeam, setSelectedTeam] = useState<string>("Time A");
  const [players, setPlayers] = useState<PlayerDTO[]>([]);
  const [newPlayerInputValue, setNewPlayerInputValue] = useState<string>("");

  const newPlayerInputRef = useRef<TextInput>(null);

  const { group } = route.params as AppStackParamList["players"];

  const playersByTeam = useMemo(() => {
    return players.filter(
      (player) => player.team === selectedTeam
    )
  }, [players, selectedTeam]);

  async function fetchPlayers() {
    const playersStored = await getPlayersByGroup({ group });
    setPlayers(playersStored);
  }

  function handleBackButtonAction() {
    navigation.navigate("groups");
  }

  async function handleDeleteGroup() {
    try {
      await deleteGroup({ group });
      navigation.navigate("groups");
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert("Remover turma", error.message);
      }
      return Alert.alert("Remover turma", "Não foi possivel remover a turma.");
    }
  }

  async function handleCreateNewPlayer() {
    try {
      await createNewPlayerByGroup({
        group,
        newPlayer: {
          name: newPlayerInputValue,
          team: selectedTeam,
        },
      });
      setNewPlayerInputValue("");
      newPlayerInputRef?.current?.blur();
      await fetchPlayers();
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert("Criar participante", error.message);
      }
      return Alert.alert(
        "Criar participante",
        "Não foi possivel criar o participante."
      );
    }
  }

  async function handleDeletePlayer(deletedPlayer: string) {
    try {
      await deletePlayerByGroup({ group, deletedPlayer });
      await fetchPlayers();
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert("Remover participante", error.message);
      }
      return Alert.alert(
        "Remover participante",
        "Não foi possivel remover o participante."
      );
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchPlayers();
    }, [])
  );

  return {
    newPlayerInputRef,
    newPlayerInputValue,
    group,
    teams,
    selectedTeam,
    players,
    playersByTeam,
    setNewPlayerInputValue,
    setSelectedTeam,
    handleBackButtonAction,
    handleDeleteGroup,
    handleCreateNewPlayer,
    handleDeletePlayer
  }
}

export function Players() {
  const {
    newPlayerInputRef,
    newPlayerInputValue,
    group,
    teams,
    selectedTeam,
    playersByTeam,
    setNewPlayerInputValue,
    setSelectedTeam,
    handleBackButtonAction,
    handleDeleteGroup,
    handleCreateNewPlayer,
    handleDeletePlayer
  } = usePlayers();

  return (
    <S.Container>
      <Header showBackButton onBackButtonAction={handleBackButtonAction} />
      <S.Content>
        <Highlight
          title={group}
          subTitle="Adicione a galera e separe os times"
        />

        <S.ContentInputIcon>
          <Input
            inputRef={newPlayerInputRef}
            value={newPlayerInputValue}
            onChangeText={setNewPlayerInputValue}
            placeholder="Nome do participante"
          />
          <ButtonIcon name="add" onPress={() => handleCreateNewPlayer()} />
        </S.ContentInputIcon>

        <S.HeaderList>
          <FlatList
            horizontal
            data={teams}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <RadioButton
                active={selectedTeam === item}
                onPress={() => setSelectedTeam(item)}
              >
                {item}
              </RadioButton>
            )}
            contentContainerStyle={{
              gap: 12,
            }}
            showsHorizontalScrollIndicator={false}
          />

          <S.NumberOfPlayers>{playersByTeam.length}</S.NumberOfPlayers>
        </S.HeaderList>

        <S.ListOfPlayers>
          <FlatList
            data={playersByTeam}
            keyExtractor={(player) => `${player.team}:${player.name}`}
            renderItem={({ item: player }) => (
              <PlayerInfo
                name={player.name}
                onRemove={() => handleDeletePlayer(player.name)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              { gap: 16 },
              playersByTeam.length === 0 && { flex: 1 },
            ]}
            ListEmptyComponent={
              <ListEmpty message="Não há pessoas neste time." />
            }
          />
        </S.ListOfPlayers>
      </S.Content>

      <Button variation="SECONDARY" onPress={() => handleDeleteGroup()}>
        Remover turma
      </Button>
    </S.Container>
  );
}
