const toggleAudio = new Audio('/sounds/toggle.mp3');
const btnAudio = new Audio('/sounds/button.mp3');
const menuAudio = new Audio('/sounds/menu-open.mp3');
const wrongAudio = new Audio('/sounds/wrong.mp3');
const correctAudio = new Audio('/sounds/correct.mp3');
const winSound = new Audio('/vocabulary/game/win.mp3');
const losingSound = new Audio('/vocabulary/game/losing.mp3');

export const playToggleSound = (): void => {
  toggleAudio.pause();
  toggleAudio.currentTime = 0;
  toggleAudio.play();
};
export const playBtnSound = (): void => {
  btnAudio.play();
};
export const playVocabCardSound = (path: string | undefined): void => {
  if (path) {
    const vocabCardSound = new Audio(path);
    vocabCardSound.volume = 0.2;
    vocabCardSound.play();
  }
};
export const playMenuSound = (): void => {
  menuAudio.volume = 0.2;
  menuAudio.pause();
  menuAudio.currentTime = 0;
  menuAudio.play();
};
export const playWrongSound = (): void => {
  wrongAudio.pause();
  wrongAudio.currentTime = 0;
  wrongAudio.play();
};
export const playCorrectSound = (): void => {
  correctAudio.pause();
  correctAudio.currentTime = 0;
  correctAudio.play();
};
export const playWinSound = (): void => {
  winSound.play();
};
export const playLosingSound = (): void => {
  losingSound.play();
};
