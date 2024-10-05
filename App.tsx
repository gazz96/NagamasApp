/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { Text, BottomNavigation } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './screen/HomeScreen';
import ProfileGroupScreen from './screen/ProfileGroupScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screen/LoginScreen';
import ProfileScreen from './screen/ProfileScreen';
import RegisterScreen from './screen/RegisterScreen';
import CartScreen from './screen/CartScreen';
import HelpScreen from './screen/HelpScreen';
import ProvinceScreen from './screen/ProvinceScreen';
import AdminExpeditionListScreen from './screen/AdminExpeditionListScreen';
import AdminExpeditionFormScreen from './screen/AdminExpeditionFormScreen';


const Stack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <ProfileStack.Screen name="Profile Group" component={ProfileGroupScreen}/>
      <ProfileStack.Screen name="Profile" component={ProfileScreen}/>
      <ProfileStack.Screen name="Login" component={LoginScreen}/>
      <ProfileStack.Screen name="Register" component={RegisterScreen}/>
      <ProfileStack.Screen name="Select Province" component={ProvinceScreen}/>
    </ProfileStack.Navigator>
  )
}

const HomeTab = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
    tabBar={({ navigation, state, descriptors, insets }) => (
      <BottomNavigation.Bar
        navigationState={state}
        safeAreaInsets={insets}
        onTabPress={({ route, preventDefault }) => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (event.defaultPrevented) {
            preventDefault();
          } else {
            navigation.dispatch({
              ...CommonActions.navigate(route.name, route.params),
              target: state.key,
            });
          }
        }}
        renderIcon={({ route, focused, color }) =>
          descriptors[route.key].options.tabBarIcon?.({
            focused,
            color,
            size: 24,
          }) || null
        }
        getLabelText={({ route }) => descriptors[route.key].options.tabBarLabel}
      />
    )}>
      <Tab.Screen
        name="Tab.Home"
        component={AdminExpeditionListScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Tab.Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color }) => (
            <Icon name="cart" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Tab.Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icon name="account" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Tab.Help"
        component={HelpScreen}
        options={{
          tabBarLabel: 'Help',
          tabBarIcon: ({ color }) => (
            <Icon name="help-circle" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Main Home" component={AdminExpeditionListScreen}/>
        <Stack.Screen name="Admin Expedition List" component={AdminExpeditionListScreen}/>
        <Stack.Screen name="Admin Expedition Form" component={AdminExpeditionFormScreen}/>
        {/* <Stack.Screen name="Profile" component={ProfileScreen}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
