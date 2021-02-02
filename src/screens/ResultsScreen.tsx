import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import * as screenTypes from '../navigation/screenTypes';

const { height } = Dimensions.get('screen');

const ResultsScreen = () => {

    const navigation = useNavigation();

    const topScores = useSelector((state: RootState) => state.resultsSlice.topScores);

    return(
        <View style={styles.container}>
            {
                topScores.map((item, i) => (
                    <View style={styles.scoreItem} key={i}>
                        <Text style={styles.text}>{i+1}.  Name: {item.name}</Text>
                        <Text style={styles.text}>Score: {item.score}</Text>
                    </View>
                ))
            }
            <TouchableOpacity style={styles.button} onPress={() => navigation.reset({ routes: [{ name: screenTypes.GAME_SCREEN }] })}>
                <Text>Play Again</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ResultsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scoreItem: {
        flex: 1,
        margin: 3,
        borderRadius: 10,
        padding: 5,
        elevation: 1,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    button: {
        justifyContent: 'center',
        height: height * 0.1, 
        alignItems: 'center',
        borderWidth: 3,
        borderRadius: 5,
        margin: 3,
        backgroundColor: 'gray',
    }
});