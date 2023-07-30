import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DictionaryWord, useDictionaryStore } from "../../stores/Dictionary";

type EditWordProps = {
    wordToEdit: DictionaryWord | null;
};

export default function EditWord({wordToEdit}: EditWordProps) {
    const navigate = useNavigate();
    const editWord = useDictionaryStore(state => state.editWord);
    const words = useDictionaryStore(state => state.words);
    const [russianWord, setRussianWord] = useState<string>("");
    const [englishWord, setEnglishWord] = useState<string>("");

    useEffect(() => {
        if (wordToEdit === null || words.indexOf(wordToEdit!) === -1)
        {
            navigate("/dictionary");
        }

        setRussianWord(wordToEdit!.russian);
        setEnglishWord(wordToEdit!.english);
    }, []);

    const handleTextfieldChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, setter: (value: string) => void) => {
        setter(event.target.value);
    };

    const handleSaveWord = () => {
        editWord(wordToEdit!, {russian: russianWord, english: englishWord});
        navigate("/dictionary");
    ;}
    
    return (
        <>
            <Stack direction="row" spacing={1}>
                <Button variant="outlined" onClick={() => navigate("/dictionary")}sx={{fontWeight: `700`}}>
                    <NavigateBeforeIcon />
                </Button>
                <p className="title">Редактирование слова</p>
            </Stack>   

            <Stack direction="column">
                <div className="box-container top">
                    <p className="subtitle">Словарное слово</p>
                </div>
                <div className="box-container bot">
                    <Stack direction="row" sx={{width: `480px`}} justifyContent={"space-between"} alignItems={"center"}>
                        <span>Слово на русском языке</span>
                        <TextField id="russian-word" variant="outlined" size="small" value={russianWord} onChange={(e) => handleTextfieldChange(e, setRussianWord)}/>
                    </Stack>
                    <Stack direction="row" sx={{width: `480px`}} justifyContent={"space-between"} alignItems={"center"}>
                        <span>Перевод на английский язык</span>
                        <TextField id="english-word" variant="outlined" size="small" value={englishWord} onChange={(e) => handleTextfieldChange(e, setEnglishWord)}/>
                    </Stack>
                </div>       

                <Stack direction="row" spacing={1} alignItems={"flex-start"}>
                    <Button variant="contained" onClick={handleSaveWord} sx={{fontWeight: `700`}}>
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