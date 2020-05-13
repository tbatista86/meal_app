import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux'

import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';

const CategorieMealsScreen = props => {

    const catId = props.navigation.getParam('categoryId');

    const availableMeals = useSelector(state => state.meals.filteredMeals);

    const displayMeals = availableMeals.filter(
        meal => meal.categoryId.indexOf(catId) >= 0
    );

    if (displayMeals.length === 0) {
        return(
            <View style={styles.content}>
                <DefaultText>No meals found, maybe check filters?</DefaultText>
            </View>
        );
    }

    return <MealList listData={displayMeals} navigation={props.navigation}/>;
};

CategorieMealsScreen.navigationOptions = (navigationData) => {
    const catId = navigationData.navigation.getParam('categoryId')  
    
    const selectedCotegory = CATEGORIES.find(cat => cat.id === catId);

    return {
        headerTitle: selectedCotegory.title,
    };
};

const styles = StyleSheet.create({
    content:{
        flex:1,
        justifyContent:'center',
        alignItems:"center"
    }
});

export default CategorieMealsScreen;