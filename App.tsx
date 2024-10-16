/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';

import { Text, BottomNavigation, ActivityIndicator } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommonActions, useIsFocused, useNavigation } from '@react-navigation/native';

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
import CategoryProductScreen from './screen/CategoryProductScreen';
import VillageScreen from './screen/VillageScreen';
import SingleProductScreen from './screen/SingleProductScreen';
import AdminMenuScreen from './screen/AdminMenuScreen';
import AdminProductListScreen from './screen/AdminProductListScreen';
import AdminProductFormscreen from './screen/AdminProductFormScreen';
import AdminFaqListScreen from './screen/AdminFaqListScreen';
import AdminFaqFormScreen from './screen/AdminFaqFormScreen';
import AdminOrderListScreen from './screen/AdminOrderListScreen';
import AdminOrderFormScreen from './screen/AdminOrderFormScreen';
import CheckoutScreen from './screen/CheckoutScreen';
import SelectExpeditionScreen from './screen/SelectExpeditionScreen';
import HistoryOrderScreen from './screen/HistoryOrderScreen';
import AdminOrderDetailScreen from './screen/AdminOrderDetailScreen';
import ForgetPasswordScreen from './screen/ForgetPasswordScreen';
import AdminPrintLabelScreen from './screen/AdminPrintLabelScreen';

const Stack = createStackNavigator();
const ProfileStack = createStackNavigator();
const CartStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CartStackScreen = () => {
  return (
    <CartStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <CartStack.Screen name="Cart" component={CartScreen} />
      <CartStack.Screen name="Checkout" component={CheckoutScreen} />
      <ProfileStack.Screen name="Select Checkout Province" component={ProvinceScreen} />
      <ProfileStack.Screen name="Select Checkout Village" component={VillageScreen} />
      <ProfileStack.Screen name="Select Checkout Expedition" component={SelectExpeditionScreen} />
    </CartStack.Navigator>
  )
}

const ProfileStackScreen = () => {

  return (
    <ProfileStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <ProfileStack.Screen name="Profile Group" component={ProfileGroupScreen} />
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />

      <ProfileStack.Screen name="Login" component={LoginScreen} />
      <ProfileStack.Screen name="Register" component={RegisterScreen} />
      <ProfileStack.Screen name="Forget Password" component={ForgetPasswordScreen} />

      <ProfileStack.Screen name="Select Province" component={ProvinceScreen} />
      <ProfileStack.Screen name="Select Village" component={VillageScreen} />
    </ProfileStack.Navigator>
  )
}

const HomeTab = () => {

  return (

    <Tab.Navigator
      initialRouteName='Tab.Home'
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
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Tab.Cart"
        component={CartStackScreen}
        options={{
          tabBarLabel: 'Order',
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

        
       
        <Stack.Screen name="Main Home" component={HomeTab} />
        <Stack.Screen name="User History Order" component={HistoryOrderScreen} />
        <Stack.Screen name="Category Product Screen" component={CategoryProductScreen} />
        <Stack.Screen name="Single Product" component={SingleProductScreen} />
        
        {/* ADMIN */}

        <Stack.Screen name="Admin Menu" component={AdminMenuScreen} />
        <Stack.Screen name="Admin Expedition List" component={AdminExpeditionListScreen} />
        <Stack.Screen name="Admin Expedition Form" component={AdminExpeditionFormScreen} />

        <Stack.Screen name="Admin Product List" component={AdminProductListScreen} />
        <Stack.Screen name="Admin Product Form" component={AdminProductFormscreen} />

        <Stack.Screen name="Admin Faq List" component={AdminFaqListScreen} />
        <Stack.Screen name="Admin Faq Form" component={AdminFaqFormScreen} />

        <Stack.Screen name="Admin Order List" component={AdminOrderListScreen} />
        <Stack.Screen name="Admin Order Form" component={AdminOrderFormScreen} />
        <Stack.Screen name="Admin Order Detail" component={AdminOrderDetailScreen} />
        <Stack.Screen name="Admin Print Label" component={AdminPrintLabelScreen} />

        {/* <Stack.Screen name="Profile" component={ProfileScreen}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
