import {Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow} from "@mui/material";
import Paper from "@mui/material/Paper";
import {makeStyles, styled} from "@mui/styles";
import {createTheme} from "@mui/material/styles";
import {lime, purple} from "@mui/material/colors";
import { deepOrange } from '@mui/material/colors';
import { teal } from '@mui/material/colors';

export const AdminTable = ({



}) => {

    const colorTableCell = deepOrange[200];
    const colorTableOddRow = deepOrange[100];
    const colorTableEvenRow = deepOrange[50];

    const colorTableCell__1 = teal[200];
    const colorTableOddRow__1 = teal[100];
    const colorTableEvenRow__1 = teal[50];

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            //backgroundColor: theme.palette.primary.light,
            //color: theme.palette.common.white,
            backgroundColor: colorTableCell__1,
            fontSize: 20,
            //color: "black",
            borderBottom: "2px solid black",
            fontWeight: 'bold'
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 18,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: colorTableEvenRow__1,
        },
        '&:nth-of-type(even)': {
            backgroundColor: colorTableOddRow__1,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    function createData(name, calories) {
        return { name, calories};
    }

    const rows = [
        createData('French fry', 159 ),
        createData('Ice cream sandwich', 237 ),
        createData('Eclair', 262),
        createData('Cupcake', 305),
        createData('Gingerbread', 356),
    ];

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 800 }} aria-label="customized table">
                <TableHead >
                    <TableRow >
                        <StyledTableCell align="center">Метрики сервиса</StyledTableCell>
                        <StyledTableCell align="center">Показатели</StyledTableCell>
                        {/*<StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>*/}
                        {/*<StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>*/}
                        {/*<StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>*/}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.calories}</StyledTableCell>
                            {/*<StyledTableCell align="center">{row.fat}</StyledTableCell>*/}
                            {/*<StyledTableCell align="center">{row.carbs}</StyledTableCell>*/}
                            {/*<StyledTableCell align="center">{row.protein}</StyledTableCell>*/}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};