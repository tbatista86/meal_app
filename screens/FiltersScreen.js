import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { setFilters } from '../store/actions/meals';

const FilterSwitch = props => {
    return(
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch 
                trackColor={{true: Colors.primaryColor}}
                thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
                value={props.state} 
                onValueChange={props.onChange}                    
            />
        </View>
    );
}

const FiltersScreen = props => {
    const { navigation } = props;

    const [isglutenFree, setIsGrutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVeganFree, setIsVeganFree] = useState(false);
    const [isVegetarianFree, setIsVegetarianFree] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilres = {
            gletenFree: isglutenFree,
            lactoseFree: isLactoseFree,
            veganFree: isVeganFree,
            vegetarianFree: isVegetarianFree
        };

        dispatch(setFilters(appliedFilres));
    }, [isglutenFree, isLactoseFree, isVeganFree, isVegetarianFree, dispatch]);

    useEffect(() => {
        navigation.setParams({save: saveFilters});
    }, [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch label='Gulten-free' state={isglutenFree} onChange={newValue => setIsGrutenFree(newValue)}/>
            <FilterSwitch label='Lactose-free' state={isLactoseFree} onChange={newValue => setIsLactoseFree(newValue)}/>
            <FilterSwitch label='Vegan-free' state={isVeganFree} onChange={newValue => setIsVeganFree(newValue)}/>
            <FilterSwitch label='Vegetarian-free' state={isVegetarianFree} onChange={newValue => setIsVegetarianFree(newValue)}/>
        </View>
    );
};

FiltersScreen.navigationOptions = navData => {    
    return {
        headerTitle: 'Filter Meals',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName="ios-menu" onPress={() => {
                navData.navigation.toggleDrawer();
            }} />
        </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName="ios-save" onPress={
            navData.navigation.getParam('save')          
        } />
    </HeaderButtons>,
    };
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center'
    },
    title:{
        fontWeight:'bold',
        fontSize:22,
        margin:20,
        textAlign:'center'
    },
    filterContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'80%',
        marginVertical:15
    }
});

export default FiltersScreen;