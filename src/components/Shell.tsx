import React, {  FunctionComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { colors } from '../constants';
import { RootState } from '../redux/store';
import Header from './Header';

const Shell: FunctionComponent<any> = ({ children }) => {
    
    const highscore = useSelector((state: RootState) => state.resultsSlice.highest); 

    return(
        <View style={styles.container}>
            <Header>
                <Text style={styles.highScore}>HIGH SCORE:  {highscore}</Text>
            </Header>
            <View style={styles.gameView}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%',
        flexDirection: 'column'
    },
    gameView: {
        position: 'absolute',
        zIndex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '100%'
    },
    highScore: {
        color: colors.white,
        fontSize: 26,
        fontWeight: 'bold',
        fontStyle: 'italic'
    }
});

export default Shell;