import React from 'react';
import { Platform, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { enableScreens } from 'react-native-screens';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FilterScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';

enableScreens();

const defaultStackNavOptions = {      
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTintColor: Platform.OS === 'ios' ? Colors.primaryColor : 'white'     
}


const MealsNavigator = createStackNavigator(
    {
        Categories: {
            screen: CategoriesScreen,
        },
        CategoryMeals: {
            screen: CategoryMealsScreen,
        },
        MealDetail: {
            screen: MealDetailScreen
        }
    }, 
    {
        //initialRouteName: 'Categories',     
        defaultNavigationOptions: defaultStackNavOptions   
    }
);

const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions      
});

const tabScreenConfig = {
    Meals: { 
        screen: MealsNavigator , 
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons 
                        name='ios-restaurant' 
                        size={25} 
                        color={tabInfo.tintColor} 
                    />
                );
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontWeight:'bold'}}>Meals</Text> : 'Meals'
        }
    },
    Favorites: { 
        screen: FavNavigator, 
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons 
                        name='ios-star' 
                        size={25} 
                        color={tabInfo.tintColor} 
                    />
                );
            },
            tabBarColor: Colors.accentColor,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontWeight:'bold'}}>Favorite</Text> : 'Favorite'

        }
    }
}

const MealsFavTabNavigator =
    Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: 'white',
        shifting: true,
        barStyle: {
            backgroundColor: Colors.primaryColor,
        }
    }) 
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
            activeTintColor: Colors.accentColor
        }
    });

    const FilterNavigator = createStackNavigator({
        Filters: FilterScreen
    }, {
        defaultNavigationOptions: defaultStackNavOptions
    });

const MainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen: MealsFavTabNavigator, 
        navigationOptions: {
            drawerLabel: 'Meals'
        }
    },
    Filters: FilterNavigator
}, {
    contentOptions:{
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontWeight:'bold',
        }
    }
});

export default createAppContainer( MainNavigator );