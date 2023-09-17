import { Table, TableBody, TableCell, tableCellClasses,
    TableContainer, TableHead, TableRow } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/styles";
import { brown } from "@mui/material/colors";
import { deepOrange } from '@mui/material/colors';

export const AdminTable = ({
    allUsers,
    activeUsers,
    allEvents,
    deletedEvents,
    popularTags,
}) => {
    const colorTableCell = deepOrange[100];
    const colorTableOddRow = deepOrange[50];
    const colorTableEvenRow = brown[50];

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: colorTableCell,
            fontSize: 18,
            borderBottom: "2px solid black",
            fontWeight: 'bold',
            textTransform: 'uppercase'
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 18,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: colorTableEvenRow,
        },
        '&:nth-of-type(even)': {
            backgroundColor: colorTableOddRow,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    function createData(name, value) {
        return { name, value };
    }

    const rows = [
        createData('Зарегистрировано пользователей', allUsers ),
        createData('Активных пользователей', activeUsers ),
        createData('Создано новых событий', allEvents),
        createData('Удалено событий', deletedEvents),
        createData('Самая популярная категория', popularTags),
    ];

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 800 }} aria-label="customized table">
                <TableHead >
                    <TableRow >
                        <StyledTableCell align="center">Метрики сервиса</StyledTableCell>
                        <StyledTableCell align="center">Показатели</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.value}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};