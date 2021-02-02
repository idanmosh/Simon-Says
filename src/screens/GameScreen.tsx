import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, Vibration, Modal, Dimensions } from "react-native";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators as actions } from "../redux/indexSlice";
import randId from '../utils/rand_id';
import * as screenTypes from '../navigation/screenTypes';
import waitTime from '../utils/wait_time';
import { NEXT_LEVEL_DELAY_TIME, SONG_DELAY_TIME } from '../constants';
import { RootState } from '../redux/store';
import Shell from '../components/Shell';
import GrayScale from '../components/GrayScale';
import CenterOverlay from '../components/CenterOverlay';
import Button from '../components/Button';
import Game from '../components/Game';
import Pads from "../components/Pads";
import Score from "../components/Score";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { getTopScores } from '../utils/asyncStorage';

const { width, height } = Dimensions.get('screen');

export const GameScreen = () => {

    const dispatch = useDispatch();

    const navigation = useNavigation();

    const state = useSelector((state: RootState) => state, shallowEqual);
    
    const { gameSlice, padsSlice } = state;

    const { gameOver, guessed, all, score, singing } = gameSlice;

    const { colors } = padsSlice;

    const [userState, setUserState] = useState({
        name: '',
        nameError: ''
    });
    
    const startMatch = useCallback(() => {
        dispatch(actions.startGame({ next: randId() }));
        waitTime(SONG_DELAY_TIME).then(() => actions.sing());
    }, [dispatch]);

    useEffect(() => {
        getTopScores()
        .then(res => dispatch(actions.loadTopScores(res)));
    }, [])

    const onPadClick = ({ id }: { id: string }) => {
        const tail = guessed.length;
        const success = all[tail] === id;

        if(!gameOver) {
            Vibration.vibrate(10);
            actions.guess({ success, id })
            .then(async (res: any) => {
                const { done } = res;
                if(done) {
                    dispatch(actions.nextLevel({ next: randId() }));
                    await waitTime(NEXT_LEVEL_DELAY_TIME);
                    await actions.sing();
                }
            });
        }       
    };
    
    const checkName = () => {
        if(userState.name !== '') {
            dispatch(actions.resetState());
            dispatch(actions.setNewScore({ score, name: userState.name }))
            setUserState({ ...userState, nameError: '' });
            navigation.reset({ routes: [{ name: screenTypes.RESULTS_SCREEN }] });
        }
        else
            setUserState({ ...userState, nameError: 'Enter valid name' });
    }

    return(
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps={'handled'}>
            <Shell>
                {gameOver && (
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={gameOver}
                    >
                        <CenterOverlay>
                            <Text style={styles.scoreText}>SCORE  {score}</Text>
                            <TextInput
                                style={styles.nameInput}
                                onSubmitEditing={checkName} 
                                placeholder={"Name"}
                                returnKeyType={"done"}
                                defaultValue={userState.name}
                                onChangeText={name => setUserState({ ...userState, name })}
                            />
                            <Button onClick={checkName}/>
                            {userState.nameError !== '' ? <Text style={styles.messageErr}>{userState.nameError}</Text> : null}
                        </CenterOverlay>
                    </Modal>
                )}
                <GrayScale disabled={!gameOver}>
                    <Game pointerEvents={(singing || gameOver) ? 'none' : 'auto'}>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 0 }}>
                            <View style={{ flexDirection: 'row' }}>
                                {colors.slice(0,2).map((pad, i) => (
                                    <Pads 
                                        key={i}
                                        pad={pad}
                                        onClick={() => onPadClick({ id: pad.id })}
                                    />
                                ))}
                            </View>
                            <Score score={score}/>
                            <View style={{ flexDirection: 'row' }}>
                                {colors.slice(2,4).map((pad, i) => (
                                    <Pads 
                                        key={i}
                                        pad={pad}
                                        onClick={() => onPadClick({ id: pad.id })}
                                    />
                                ))}
                            </View>
                        </View>
                    </Game>
                </GrayScale>
            </Shell>
            {
                all.length === 0 ?
                    <TouchableOpacity style={styles.startGameBtn} onPress={() => startMatch()}>
                        <Text style={styles.startGameTxt}>Start Game</Text>
                    </TouchableOpacity>
                : 
                    null
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    nameInput: { 
        height: '15%', 
        width: '70%', 
        backgroundColor: 'white',
        marginTop: 20,
        textAlign: 'center' 
    },
    scoreText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    messageErr: {
        fontSize: 14,
        color: 'white'
    },
    startGameBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        width: width * 0.5,
        height: height * 0.07,
        borderRadius: 10,
        marginBottom: 20,
        alignSelf: 'center',
    },
    startGameTxt: {
        color: 'white'
    }
});