import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUPS_COLLECTION } from '../storageConfig'

import { getAllGroupsOfStorage } from "./getAllGroupsOfStorage";

type DeleteGroupOfStorageParams = {
  deletedGroup: string;
}

export const deleteGroupOfStorage = async ({ deletedGroup }: DeleteGroupOfStorageParams) => {
  try {
    const allGroupsStored = await getAllGroupsOfStorage();

    const storage = allGroupsStored.filter(group => group !== deletedGroup);
    const updatedStorage = JSON.stringify(storage);

    await AsyncStorage.setItem(GROUPS_COLLECTION, updatedStorage);    
  } catch (error) {
    throw error
  }
}