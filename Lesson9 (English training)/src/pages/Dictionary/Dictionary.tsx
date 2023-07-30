import { useDictionaryStore, DictionaryWord } from "../../stores/Dictionary";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import EditIcon from "@mui/icons-material/Edit";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const StyledMenu = styled((props: MenuProps) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(() => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      minWidth: 180,
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '&:hover': {
            backgroundColor: `rgba(233, 30, 99, 0.2)`
        },
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          marginRight: `16px`,
          color: `#1565C0`,
        },
      },
    },
}));

export default function Dictionary() {
    const navigate = useNavigate();
    const words = useDictionaryStore(state => state.words);
    const setWordToEdit = useDictionaryStore(state => state.setWordToEdit);
    const deleteWord = useDictionaryStore(state => state.deleteWord);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorWord, setAnchorWord] = useState<null | DictionaryWord>(null);
    const anchorOpened = Boolean(anchorEl);

    const handleAnchorClick = (event: React.MouseEvent<HTMLElement>, word: DictionaryWord) => {
      setAnchorEl(event.currentTarget);
      setAnchorWord(word);
    };

    const handleDeleteWord = () => {
        deleteWord(anchorWord!);
        setAnchorEl(null);
    };

    const handleEditWord = () => {
        setWordToEdit(anchorWord);
        setAnchorEl(null);
        navigate("/edit-word")
    };
    
    const handleAnchorClose = () => {
      setAnchorEl(null);
    };

    return (
        <>
            <Stack direction="row" spacing={1}>
                <Button variant="outlined" sx={{fontWeight: `700`}} onClick={() => navigate("/")}>
                    <NavigateBeforeIcon />
                </Button>
                <p className="title">Словарь</p>
            </Stack>
            <Stack alignItems={"flex-start"}>
                <Button variant="contained" sx={{width: `auto`, fontWeight: `700`}} onClick={() => navigate("/new-word")}>
                    + Добавить слово
                </Button>
            </Stack>

            {words.length > 0 && (
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow sx={{backgroundColor: `#DFE4EC`}}>
                    <TableCell>Слово на русском языке</TableCell>
                    <TableCell>Перевод на английский язык</TableCell>
                    <TableCell align="right">Действие</TableCell>
                </TableRow>
                </TableHead>
                <TableBody sx={{backgroundColor: `#FFF`}}>
                {words.map((word, index) => (
                    <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, borderTop: `1px solid #CFD7E2`, '&:hover': {backgroundColor: `#E3F2FD`} }}
                    >
                        <TableCell component="th" scope="row">
                            {word.russian}
                        </TableCell>
                        <TableCell>{word.english}</TableCell>
                        <TableCell align="right">
                        <IconButton
                            aria-label="Menu"
                            id="burger-menu"
                            aria-controls={anchorOpened ? 'burger-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={anchorOpened ? 'true' : undefined}
                            onClick={(e) => handleAnchorClick(e, word)}
                        >
                            <MenuIcon />
                        </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            )}

        <StyledMenu
            id="burger-menu"
            aria-labelledby="burger-menu"
            anchorEl={anchorEl}
            open={anchorOpened}
            onClose={handleAnchorClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <MenuItem onClick={handleEditWord} disableRipple>
                <EditIcon />
                Редактировать
             </MenuItem>
             <MenuItem onClick={handleDeleteWord} disableRipple>
                <DeleteIcon />
                Удалить
             </MenuItem>
        </StyledMenu>
        </>
    );
}