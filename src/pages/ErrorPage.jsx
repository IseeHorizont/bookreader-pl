import {Box} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { createTheme } from '@mui/material/styles';
import React from "react";

export const ErrorPage = () => {
    const navigate = useNavigate();

    const onClickOnMainPage = () => {
        navigate('/');
    };

    const theme = createTheme({
        palette: {
            mine: {
                main: '#ffa08c',
                contrastText: '#242105',
            },

        },
    });

    return (
        <Box>
            <Grid container spacing={3}>
                <Grid style={{textAlign: "center"}} xs={12}>
                    <img
                        src="https://img.freepik.com/free-vector/curiosity-people-concept-illustration_114360-11034.jpg?w=2000&t=st=1693735947~exp=1693736547~hmac=aa8a1ca81256cc1db1861b496c359b6a5d3521821ff2a1c3c2ba463b8a501fe1"
                        alt=""
                        width={500} height={500}
                    />
                </Grid>
                <Grid style={{textAlign: "center"}} xs={12}>
                    <Typography variant="h1">
                        404
                    </Typography>
                    <Typography variant="h4">
                        Пока такой страницы мы не нашли...
                    </Typography>
                    <Button theme={theme} color="mine"
                            sx={{ m: 5 }}
                            onClick={onClickOnMainPage}
                            size="large"
                            variant="contained"
                    >
                        Вернуться на главную?
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}