import { createStackNavigator } from '@react-navigation/stack';
import TodoLoginScreen from '../components/Auth/TodoLoginScreen';
import TodoSignUpScreen from '../components/Auth/TodoSignUpScreen';

import Drawer from './Drawer'

function StackNavigator() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TodoLogin" component={TodoLoginScreen} />
      <Stack.Screen name="TodoSignup" component={TodoSignUpScreen} />
      <Stack.Screen name="Todo" component={Drawer} />
    </Stack.Navigator>
  );
};
export default StackNavigator;