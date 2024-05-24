import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUPS_COLLECTION } from '../storageConfig'

import { getAllGroups } from "./getAllGroups";

type DeleteGroupParams = {
  group: string;
}

export const deleteGroup = async (deletedGroup: DeleteGroupParams) => {
  try {
    const allGroupsStored = await getAllGroups();

    const storage = allGroupsStored.filter(group => group !== deletedGroup.group);
    const updatedStorage = JSON.stringify(storage);
    await AsyncStorage.setItem(GROUPS_COLLECTION, updatedStorage);
  } catch (error) {
    console.log(error);
    throw error;
  }
}