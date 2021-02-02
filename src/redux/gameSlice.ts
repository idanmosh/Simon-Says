import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IgameState } from './sliceTypes';

const initialState: IgameState = {
    singing: true,
    gameOver: false,
    score: 0,
    guessed: [],
    all: []
}

const reducers = {
    startGame: (state: IgameState, action: PayloadAction<{ next: string }>) => {
        state.guessed = [];
        state.all = [action.payload.next];
        state.gameOver = false;
        state.score = 0;
        console.log('startGame');
    },
    nextLevel: (state: IgameState, action: PayloadAction<{ next: string }>) => {
        state.guessed = [];
        state.all = state.all.concat(action.payload.next);
        state.score += 1;
        console.log('nextLevel');
    },
    startSong: (state: IgameState, action: PayloadAction<undefined>) => {
        state.singing = true;
        console.log('startSong');
    },
    finishSong: (state: IgameState, action: PayloadAction<undefined>) => {
        state.singing = false;
        console.log('finishSong');
    },
    guessColor: (state: IgameState, action: PayloadAction<{ success: boolean, id: string }>) => {
        state.gameOver = !action.payload.success;
        state.guessed = action.payload.success ? state.guessed.concat(action.payload.id) : state.guessed;
        console.log('guessColor');
    },
    resetState: (state: IgameState, action: PayloadAction<undefined>) => {
        state.singing = true;
        state.gameOver = false;
        state.score = 0;
        state.guessed = [];
        state.all = [];
    }
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers
});

export const { startGame, nextLevel, startSong,
    finishSong, guessColor, resetState } = gameSlice.actions;

export default gameSlice.reducer;