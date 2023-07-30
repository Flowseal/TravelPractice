import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from 'zustand/middleware/immer'

export type DictionaryWord = {
    russian: string;
    english: string;
};

type State = {
    words: DictionaryWord[];
    wordToEdit: DictionaryWord | null;
}
  
type Actions = {
    newWord: (word: DictionaryWord) => void;
    deleteWord: (word: DictionaryWord) => void;
    editWord: (oldWord: DictionaryWord, newWord: DictionaryWord) => void;
    setWordToEdit: (word: DictionaryWord | null) => void;
}
  
export const useDictionaryStore = create(persist(
    immer<State & Actions>((set, get) => ({
        words: [],
        wordToEdit: null,
        newWord: (word: DictionaryWord) =>
            set((state) => {
                state.words.push(word);
            }),
        deleteWord: (word: DictionaryWord) => {
            const wordIndex = get().words.indexOf(word);
            if (wordIndex !== -1)
            {
                set((state) => {
                    state.words.splice(wordIndex, 1);
                });
            } 
        },
        editWord: (oldWord: DictionaryWord, newWord: DictionaryWord) => {
            const wordIndex = get().words.indexOf(oldWord);
            if (wordIndex !== -1)
            {
                set((state) => {
                    state.words[wordIndex] = newWord;
                });
            } 
        },
        setWordToEdit: (word: DictionaryWord | null) =>
            set((state) => {
                state.wordToEdit = word;
            }),
    })), {
        name: 'words',
        storage: createJSONStorage(() => localStorage),
    })
)