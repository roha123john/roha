import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardStack from './DashboardStack';
import TodoProfileScreen from '../components/Auth/TodoProfileScreen';
import TodoLogoutScreen from '../components/Auth/TodoLogoutScreen';


export default function DrawerNavigator() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
    screenOptions={{
      drawerStyle: {
        backgroundColor: '#035E30',
        width: 240,
      },
    }}
   >
      <Drawer.Screen name="Home" component={DashboardStack} />
 
      <Drawer.Screen name="Profile" component={TodoProfileScreen} />
     
      <Drawer.Screen name="Logout" component={TodoLogoutScreen} />
    </Drawer.Navigator>
  )
}