import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox"
import ListItemText from "@mui/material/ListItemText"
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";
import { useWordsCheckStore } from "../../stores/WordsCheck";
import { useDictionaryStore } from "../../stores/Dictionary";
import { useEffect, useState } from "react";

export default function Check() {
    const navigate = useNavigate();

    const dictionaryWords = useDictionaryStore(state => state.words);
    const currentWord = useWordsCheckStore(state => state.currentWord);
    const selectWords = useWordsCheckStore(state => state.selectWords);
    const unusedWords = useWordsCheckStore(state => state.unusedWords);
    const clearCheckStore = useWordsCheckStore(state => state.clearStore);
    const setUnusedWords = useWordsCheckStore(state => state.setUnusedWords);
    const goToNextWord = useWordsCheckStore(state => state.goToNextWord);
    
    const [selectedTranslation, setSelectedTranslation] = useState<string>("Не выбрано"); 
    const handleSelectedTranslationChange = (event: SelectChangeEvent) => {
        setSelectedTranslation(event.target.value as string);
    };

    useEffect(() => {
        clearCheckStore();
        setUnusedWords(dictionaryWords);
        goToNextWord();
    }, []);

    // On next word
    useEffect(() => {
        if (selectWords.length === 0 && currentWord !== null && selectedTranslation !== "Не выбрано")
        {
            // currentWord чтобы проверить инициализацию всех элементов (т.е. 1-ое тестирование)
            // selectedTranslation чтобы проверить ресет всех элементов (т.е. повтороное тестирование)
            navigate("/result");
        }

        setSelectedTranslation("Не выбрано");
    }, [selectWords]);
    
    const handleCheckButtonClick = () => {
        if (selectedTranslation !== "")
        {
            goToNextWord(selectedTranslation);
        }
    };

    return (
        <>
            <Stack direction="row" spacing={1}>
                <Button variant="outlined" sx={{fontWeight: `700`}} onClick={() => navigate("/")}>
                    <NavigateBeforeIcon />
                </Button>
                <p className="title">Проверка знаний</p>
            </Stack>

            <span style={{color: `#476185`, fontWeight: 700}}>Слово: {dictionaryWords.length-unusedWords.length} из {dictionaryWords.length}</span>

            <div className="box-container top">
                <Stack direction="row" sx={{width: `480px`}} justifyContent={"space-between"} alignItems={"center"}>
                    <span>Слово на русском языке</span>
                    <TextField id="russian-word" variant="outlined" size="small" aria-readonly value={currentWord?.russian || ""}/>
                </Stack>
                <Stack direction="row" sx={{width: `480px`}} justifyContent={"space-between"} alignItems={"center"}>
                    <span>Перевод на английский язык</span>
                    <FormControl sx={{ m: 1, minWidth: 210, margin: 0 }} size="small">
                        <Select
                            labelId="english-word"
                            id="english-word"
                            value={selectedTranslation}
                            onChange={handleSelectedTranslationChange}
                            renderValue={(selected) => selected}
                        >
                            {selectWords.map((word, index) => (
                                <MenuItem key={index} value={word}>
                                    <Checkbox checked={selectedTranslation === word} />
                                    <ListItemText primary={word} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            </div>

            <Stack alignItems={"flex-start"}>
                <Button variant="contained" sx={{width: `auto`, fontWeight: `700`}} disabled={selectedTranslation === "Не выбрано"} onClick={handleCheckButtonClick}>
                    Проверить
                </Button>
            </Stack>
        </>
    );
}