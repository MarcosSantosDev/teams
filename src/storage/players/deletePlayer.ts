import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYERS_COLLECTION } from "@storage/storageConfig";

import { getPlayersByGroup } from "./getPlayersByGroup";

type DeletePlayerByGroupParams = {
  deletedPlayer: string;
  group: string;
}

export const deletePlayerByGroup = async ({ deletedPlayer, group }: DeletePlayerByGroupParams) => {
  try {
    const playersStored = await getPlayersByGroup({ group });

    const storage = playersStored.filter(({ name }) => name !== deletedPlayer);

    await AsyncStorage.setItem(`${PLAYERS_COLLECTION}:${group}`, JSON.stringify(storage));
  } catch (error) {
    console.log(error);
    throw error;    
  }
}
