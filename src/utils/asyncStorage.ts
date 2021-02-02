import AsyncStorage from '@react-native-async-storage/async-storage';
import { IscoresState } from '../redux/sliceTypes';

export const storeTopScores = async (topScores: Array<{ score: number, name: string; }>) => {
    try {
        const jsonValue = JSON.stringify(topScores);
        await AsyncStorage.setItem('@topScores', jsonValue);
    } catch(e) {
        console.log(e);
    }
}

export const getTopScores = async (): Promise<Array<{ score: number, name: string; }>> => {
    try {
        const topScores = await AsyncStorage.getItem('@topScores');
        return topScores != null ? JSON.parse(topScores) : [];
    } catch(e) {
        console.log(e);
        return [];
    }
}