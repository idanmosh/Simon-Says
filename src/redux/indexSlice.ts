import { combineReducers, Dispatch } from '@reduxjs/toolkit';
import waitTime from '../utils/wait_time';
import { SONG_DELAY_TIME, REDUCED_DELAY_TIME } from "../constants";
import padsSlice, { lightenPad, lightenPadOff } from './padsSlice';
import gameSlice, { startGame, startSong, finishSong,
   guessColor, nextLevel, resetState } from './gameSlice';
import resultsSlice, { loadTopScores, setNewScore } from './resultsSlice';
import store from './store';
import Sound from 'react-native-sound';


export default combineReducers({
   padsSlice,
   gameSlice,
   resultsSlice
});

const sing = async () => {
   const dispatch = store.dispatch;
   const state = store.getState();
   await waitTime(SONG_DELAY_TIME);
   try {
      dispatch(startSong());
      const { gameSlice: { all } } = state;
      for (let i = 0; i <= all.length - 1; i++) {
         const id = all[i];
         dispatch(lightenPad({ id }));
         playSound(`${id}.mp3`);
         await waitTime(SONG_DELAY_TIME);
         dispatch(lightenPadOff());
         await waitTime(SONG_DELAY_TIME);
      }
      dispatch(finishSong());
   } catch(e) {
      console.log(e);
   }
}

const playSound = (sound: string) => {
   let player = new Sound(sound, Sound.MAIN_BUNDLE, (e) => {
      if(e) {
          console.log(e);
          return;
      }
      player.play(() => player.release());
  });
}

interface Iguess {
   id: string;
   success: boolean;
}

const guess = async ({ success , id }: Iguess) => {
   const dispatch = store.dispatch;

   try {
      dispatch(guessColor({ success, id }));
      dispatch(startSong());
      dispatch(lightenPad({ id }));
      playSound(`${id}.mp3`);
      await waitTime(REDUCED_DELAY_TIME);
      dispatch(lightenPadOff());
      await waitTime(REDUCED_DELAY_TIME);
      dispatch(finishSong());
  
      const { gameSlice } = store.getState();
      const { all, guessed } = gameSlice;
      const done = all.length === guessed.length && success;
  
      return new Promise((r) => r({ done }));
    } catch (e) {
      console.error(e);
    }
}

export const actionCreators = {
   startSong,
   startGame,
   finishSong,
   lightenPad,
   lightenPadOff,
   nextLevel,
   guessColor,
   loadTopScores,
   setNewScore,
   resetState,
   sing,
   guess
};