import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Groups } from "@screens/Groups";
import { NewGroup } from "@screens/NewGroup";
import { Players } from "@screens/Players";

const AppStack = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <AppStack.Navigator 
      initialRouteName="groups"
      screenOptions={{ headerShown: false }}
    >
      <AppStack.Screen name="groups" component={Groups} />
      <AppStack.Screen name="new" component={NewGroup} />
      <AppStack.Screen name="players" component={Players} />
    </AppStack.Navigator>
  );
}
