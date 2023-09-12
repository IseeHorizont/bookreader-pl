import Grid from "@mui/material/Grid";
import logo from "../logo.png";
import {AdminTable} from "../components/AdminTable";

export const AdminRoom = () => {


    return (
        <Grid container
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              spacing={1}
        >
            <Grid>
                <img src={logo} width={500} height={150}/>
            </Grid>
            <Grid>
                <h2>Статистика сервиса</h2>
            </Grid>

            <Grid>
                <AdminTable

                />
            </Grid>

        </Grid>

    );
};