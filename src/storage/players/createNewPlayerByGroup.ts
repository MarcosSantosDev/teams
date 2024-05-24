import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYERS_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";

import type { PlayerDTO } from './PlayerDTO'
import { getPlayersByGroup } from "./getPlayersByGroup";

type CreateNewPlayerByGroupParams = {
  newPlayer: PlayerDTO;
  group: string;
}

export const createNewPlayerByGroup = async ({ newPlayer, group }: CreateNewPlayerByGroupParams) => {
  try {
    const playersStored = await getPlayersByGroup({ group });

    const playerAlreadyExists = playersStored.filter(({ name }) => name === newPlayer.name);

    if (playerAlreadyExists.length > 0) {
      throw new AppError('Não podemos adicionar este participante, ele já está em um time.');
    } else {
      const storage = [...playersStored, newPlayer];

      await AsyncStorage.setItem(`${PLAYERS_COLLECTION}:${group}`, JSON.stringify(storage));
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
