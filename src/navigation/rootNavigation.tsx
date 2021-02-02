import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/core';
import * as screenTypes from './screenTypes';

import { GameScreen } from '../screens/GameScreen';
import ResultsScreen from '../screens/ResultsScreen';

interface RootNavigationParams extends ParamListBase {
    [screenTypes.GAME_SCREEN]: undefined;
    [screenTypes.RESULTS_SCREEN]: undefined;
}

const Stack = createStackNavigator<RootNavigationParams>();

const RootNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName={screenTypes.GAME_SCREEN}
                headerMode={"none"}>
                <Stack.Screen name={screenTypes.GAME_SCREEN} component={GameScreen}/>
                <Stack.Screen name={screenTypes.RESULTS_SCREEN} component={ResultsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigation;

