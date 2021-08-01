import { createSlice } from '@reduxjs/toolkit';

import { CardModel } from '../models/cardModel';

interface CategoryReducerInterface {
  isGameMode: boolean;
  isPlaying: boolean;
  isFinished: boolean;
  vocabCards: CardModel[];
  requiredCard: CardModel | undefined;
  matches: boolean[];
}

const initialState: CategoryReducerInterface = {
  isGameMode: false,
  isPlaying: false,
  isFinished: false,
  vocabCards: [],
  requiredCard: undefined,
  matches: [],
};

export const categorySlice = createSlice({
  name: 'categorySlice',
  initialState,
  reducers: {
    resetCategorySliceState: (state) => {
      state.isPlaying = initialState.isPlaying;
      state.isFinished = initialState.isFinished;
      state.vocabCards = [...initialState.vocabCards];
      state.requiredCard = initialState.requiredCard;
      state.matches = initialState.matches;
    },
    toggleGameMode: (state) => {
      if (state.isGameMode) {
        state.isGameMode = initialState.isGameMode;
        state.isPlaying = initialState.isPlaying;
        state.isFinished = initialState.isFinished;
        state.vocabCards = [...initialState.vocabCards];
        state.requiredCard = initialState.requiredCard;
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
    setVocabCards: (state, { payload }: { payload: CardModel[] }) => {
      state.vocabCards = payload.slice();
    },
    setNextRequiredCard: (state) => {
      state.requiredCard = state.vocabCards[0];
      state.vocabCards.shift();
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
  resetCategorySliceState,
  toggleGameMode,
  setPlayingStatus,
  setFinishedStatus,
  setVocabCards,
  setNextRequiredCard,
  incrementWrongMatches,
  incrementCorrectMatches,
} = categorySlice.actions;
export default categorySlice.reducer;
