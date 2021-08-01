import { createSlice } from '@reduxjs/toolkit';

import { WordModel } from '../models/WordModel';

interface GameReducerInterface {
  isGameMode: boolean;
  isPlaying: boolean;
  isFinished: boolean;
  words: WordModel[];
  requiredWord: WordModel | undefined;
  matches: boolean[];
}

const initialState: GameReducerInterface = {
  isGameMode: false,
  isPlaying: false,
  isFinished: false,
  words: [],
  requiredWord: undefined,
  matches: [],
};

export const gameSlice = createSlice({
  name: 'gameSlice',
  initialState,
  reducers: {
    resetGameSliceState: (state) => {
      state.isPlaying = initialState.isPlaying;
      state.isFinished = initialState.isFinished;
      state.words = [...initialState.words];
      state.requiredWord = initialState.requiredWord;
      state.matches = initialState.matches;
    },
    toggleGameMode: (state) => {
      if (state.isGameMode) {
        state.isGameMode = initialState.isGameMode;
        state.isPlaying = initialState.isPlaying;
        state.isFinished = initialState.isFinished;
        state.words = [...initialState.words];
        state.requiredWord = initialState.requiredWord;
        state.matches = initialState.matches;
        return;
      }
      state.isGameMode = true;
    },
    setPlayingStatus: (state, { payload }: { payload: boolean }) => {
      state.isPlaying = payload;
    },
    setFinishedStatus: (state, { payload }: { payload: boolean }) => {
      state.isFinished = payload;
    },
    setWords: (state, { payload }: { payload: WordModel[] }) => {
      state.words = payload.slice();
    },
    setNextRequiredWord: (state) => {
      state.requiredWord = state.words[0];
      state.words.shift();
    },
    incrementWrongMatches: (state) => {
      state.matches.push(false);
    },
    incrementCorrectMatches: (state) => {
      state.matches.push(true);
    },
  },
});

export const {
  resetGameSliceState,
  toggleGameMode,
  setPlayingStatus,
  setFinishedStatus,
  setWords,
  setNextRequiredWord,
  incrementWrongMatches,
  incrementCorrectMatches,
} = gameSlice.actions;
export default gameSlice.reducer;
