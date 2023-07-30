import "./Result.scss"
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useNavigate } from "react-router-dom";
import { useWordsCheckStore } from "../../stores/WordsCheck";


export default function Result() {
    const navigate = useNavigate();
    const correctAnswers = useWordsCheckStore(state => state.correctAnswers);
    const englishWords = useWordsCheckStore(state => state.englishWords);

    return (
        <>
            <p className="title">Результат проверки знаний</p>

            <div className="result-box">
                <span className="header">Ответы</span>
                <div className="row">
                    <div className="label">
                        <CheckCircleOutlineIcon sx={{color: `#50AC58`}}/><span>Правильные</span>
                    </div>
                    <span className="result">{correctAnswers}</span>
                </div>
                <div className="row">
                    <div className="label">
                        <HighlightOffIcon sx={{color: `#D00000`}}/><span>Ошибочные</span>
                    </div>
                    <span className="result">{englishWords.length-correctAnswers}</span>
                </div>
                <div className="row">
                    <div className="label">
                        <MenuBookIcon sx={{color: `#9932AB`}}/><span>Всего слов</span>
                    </div>
                    <span className="result">{englishWords.length}</span>
                </div>
            </div>

            <Stack direction="row" spacing={1} alignItems={"flex-start"}>
                <Button variant="contained" onClick={() => navigate("/check")} sx={{fontWeight: `700`}}>
                    Проверить знания ещё раз
                </Button>
                <Button variant="outlined" onClick={() => navigate("/")} sx={{fontWeight: `700`}}>
                    Вернуться в начало
                </Button>
            </Stack>
        </>
    )
}