import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { colors } from '../constants';

const { width } = Dimensions.get('screen');

interface ScoreProps {
    score: number
}

const Score: React.FC<ScoreProps> = ({ score }) => {
    return(
        <View style={styles.container}>
            <Text style={styles.score}>{score}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width * 0.25,
        height: width * 0.25,
        justifyContent: 'center',
        alignContent: 'center',
        position: 'absolute',
        zIndex: 5,
        backgroundColor: colors.dark,
        borderRadius: 200,
        elevation: 10
    },
    score: {
        alignSelf: 'center',
        fontSize: width * 0.1,
        fontWeight: 'bold',
        color: colors.white
    }
});

export default Score;