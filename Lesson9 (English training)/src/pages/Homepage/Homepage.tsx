import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
    const navigate = useNavigate();

    return (
        <>
            <p className="title">Выберите режим</p>
            <Stack direction="row" spacing={1} alignItems={"flex-start"}>
                <Button variant="contained" onClick={() => navigate("dictionary")} sx={{fontWeight: `700`}}>
                    Заполнить словарь
                </Button>
                <Button variant="outlined" onClick={() => navigate("check")} sx={{fontWeight: `700`}}>
                    Проверить знания
                </Button>
            </Stack>
        </>
    );
}