import { createStackNavigator } from '@react-navigation/stack';
import TodoList from '../components/Dashboard/TodoList';
function DashboardStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Todo" component={TodoList} options={{ headerShown: false }}
      />
      
    </Stack.Navigator>
  );
};
export default DashboardStack;