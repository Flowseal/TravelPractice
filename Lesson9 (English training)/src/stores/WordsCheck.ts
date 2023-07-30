import { create } from "zustand";
import { immer } from 'zustand/middleware/immer'
import { DictionaryWord } from "./Dictionary";

type State = {
    unusedWords: DictionaryWord[];
    englishWords: string[];
    currentWord: DictionaryWord | null;
    selectWords: string[];
    correctAnswers: number;
}
  
type Actions = {
    clearStore: () => void;
    setUnusedWords: (words: DictionaryWord[]) => void;
    goToNextWord: (answer?: string) => void;
}
  
export const useWordsCheckStore = create(
    immer<State & Actions>((set, get) => ({
        unusedWords: [],
        currentWord: null,
        englishWords: [],
        selectWords: [],
        correctAnswers: 0,
        clearStore: () =>
            set((state) => {
                state.unusedWords = [];
                state.currentWord = null;
                state.englishWords = [];
                state.selectWords = [];
                state.correctAnswers = 0;
            }),
        setUnusedWords: (words: DictionaryWord[]) =>
            set((state) => {
                state.unusedWords = words;
                words.map((word) => {
                    state.englishWords.push(word.english);
                });
            }),
        goToNextWord: (answer?: string) => {
            let isCorrectAnswer = false;
            if (answer !== undefined && answer === get().currentWord?.english)
            {
                console.log(answer === get().currentWord?.english, answer, get().currentWord?.english);
                isCorrectAnswer = true;
            }

            if (get().unusedWords.length > 0)
            {
                const nextWordTranslation = get().unusedWords[0].english;

                // Create array from 3 fake translations and 1 real translation
                const englishWords = [...get().englishWords];
                const shuffledEnglishWords = englishWords.sort(() => 0.5 - Math.random());
                shuffledEnglishWords.splice(shuffledEnglishWords.indexOf(nextWordTranslation), 1);
                const fakeSelectWords = shuffledEnglishWords.slice(0, Math.min(3, get().englishWords.length));

                // Shuffle
                let selectWords = [...fakeSelectWords, nextWordTranslation];
                selectWords = selectWords.sort(() => 0.5 - Math.random());

                set((state) => {
                    state.currentWord = state.unusedWords[0];
                    state.unusedWords.splice(0, 1);
                    state.selectWords = selectWords;

                    if (answer !== undefined && isCorrectAnswer)
                    {
                        state.correctAnswers += 1;
                    }
                });
            }
            else
            {
                set((state) => {
                    state.selectWords = [];
                    if (answer !== undefined && isCorrectAnswer)
                    {
                        state.correctAnswers += 1;
                    }
                });
            }
        },
    }))
)