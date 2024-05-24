import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYERS_COLLECTION } from "@storage/storageConfig";

import type { PlayerDTO } from './PlayerDTO'

type GetPlayersByGroupParams = {
  group: string;
}

export const getPlayersByGroup = async ({ group }: GetPlayersByGroupParams) => {
  try {
    const playersStored = await AsyncStorage.getItem(`${PLAYERS_COLLECTION}:${group}`);

    const storage = playersStored ? JSON.parse(playersStored) : [];

    return storage as PlayerDTO[];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
