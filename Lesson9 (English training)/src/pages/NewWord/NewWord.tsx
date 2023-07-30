import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDictionaryStore } from "../../stores/Dictionary";

export default function NewWord() {
    const navigate = useNavigate();
    const newWord = useDictionaryStore(state => state.newWord);
    const [russianWord, setRussianWord] = useState<string>("");
    const [englishWord, setEnglishWord] = useState<string>("");
    
    const russianWordError = russianWord.length === 0;
    const englishWordError = englishWord.length === 0;

    const handleTextfieldChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, setter: (value: string) => void) => {
        setter(event.target.value);
    };

    const handleSaveWord = () => {
        newWord({russian: russianWord, english: englishWord});
        navigate("/dictionary");
    ;}
    
    return (
        <>
            <Stack direction="row" spacing={1}>
                <Button variant="outlined" onClick={() => navigate("/dictionary")} sx={{fontWeight: `700`}}>
                    <NavigateBeforeIcon />
                </Button>
                <p className="title">Добавление слова</p>
            </Stack>   

            <Stack direction="column">
                <div className="box-container top">
                    <p className="subtitle">Словарное слово</p>
                </div>
                <div className="box-container bot">
                    <Stack direction="row" sx={{width: `480px`}} justifyContent={"space-between"} alignItems={"center"}>
                        <span>Слово на русском языке</span>
                        <TextField id="russian-word" variant="outlined" size="small" error={russianWordError} value={russianWord} onChange={(e) => handleTextfieldChange(e, setRussianWord)}/>
                    </Stack>
                    <Stack direction="row" sx={{width: `480px`}} justifyContent={"space-between"} alignItems={"center"}>
                        <span>Перевод на английский язык</span>
                        <TextField id="english-word" variant="outlined" size="small" error={englishWordError} value={englishWord} onChange={(e) => handleTextfieldChange(e, setEnglishWord)}/>
                    </Stack>
                </div>       

                <Stack direction="row" spacing={1} alignItems={"flex-start"}>
                    <Button variant="contained" disabled={russianWordError || englishWordError} onClick={handleSaveWord} sx={{fontWeight: `700`}}>
                        Сохранить
                    </Button>
                    <Button variant="outlined" onClick={() => navigate("/dictionary")} sx={{fontWeight: `700`}}>
                        Отменить
                    </Button>
                </Stack>                  
            </Stack>
        </>
    );
}