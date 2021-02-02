import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IscoresState } from './sliceTypes';
import { storeTopScores } from '../utils/asyncStorage';

const initialState: IscoresState = {
    topScores: [],
    highest: 0,
    lowest: 0
}

const reducers = {
    setNewScore: (state: IscoresState, action: PayloadAction<{ score: number, name: string }>) => {
        if(state.topScores.length < 10) 
            state.topScores.push(action.payload);
        else {
            if(action.payload.score > state.lowest) {
                state.topScores.pop();
                state.topScores.push(action.payload);
            }
        }  

        state.topScores.sort((a, b) => b.score - a.score);
        state.highest = state.topScores[0].score;
        state.lowest = state.topScores[state.topScores.length - 1].score;
        storeTopScores(state.topScores);
    },
    loadTopScores: (state: IscoresState, action: PayloadAction<Array<{ score: number, name: string }>>) => {
        state.topScores = action.payload;
        if(state.topScores.length > 0) {
            state.highest = state.topScores[0].score;
            state.lowest = state.topScores[state.topScores.length - 1].score;
        }
    }
}

const resultsSlice = createSlice({
    name: 'results',
    initialState,
    reducers
});

export const { loadTopScores, setNewScore } = resultsSlice.actions;

export default resultsSlice.reducer;