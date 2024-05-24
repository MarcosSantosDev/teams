import AsyncStorage from '@react-native-async-storage/async-storage';

import { GROUPS_COLLECTION } from '@storage/storageConfig'
import { AppError } from '@utils/AppError'

import { getAllGroups } from './getAllGroups';

type CreateNewGroupParams = {
  newGroup: string;
}

export const createNewGroup = async ({ newGroup }: CreateNewGroupParams) => {
  try {
    const storedGroups = await getAllGroups();

    const groupAlreadyExists = storedGroups.filter(group => group === newGroup);

    if (groupAlreadyExists.length > 0) {
      throw new AppError(`Já existe uma turma com o nome ${newGroup}`);
    } else {
      const storage = JSON.stringify([...storedGroups, newGroup]);
      await AsyncStorage.setItem(GROUPS_COLLECTION, storage);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}