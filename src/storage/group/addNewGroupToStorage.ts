import AsyncStorage from '@react-native-async-storage/async-storage';

import { GROUPS_COLLECTION } from '@storage/storageConfig'
import { AppError } from '@utils/AppError'

import { getAllGroupsOfStorage } from './getAllGroupsOfStorage';

type AddNewGroupToStorageParams = {
  newGroup: string;
}

export const addNewGroupToStorage = async ({ newGroup }: AddNewGroupToStorageParams) => {
  try {
    const storedGroups = await getAllGroupsOfStorage();

    const groupAlreadyExists = storedGroups.filter(group => group === newGroup);

    if (groupAlreadyExists.length > 0) {
      throw new AppError(`Já existe uma turma com o nome ${newGroup}`);
    } else {
      const storage = JSON.stringify([...storedGroups, newGroup]);
      await AsyncStorage.setItem(GROUPS_COLLECTION, storage);
    }
  } catch (error) {
    throw error;
  }
}