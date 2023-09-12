import Grid from "@mui/material/Grid";
import logo from "../logo-white.png";
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
                <img src={logo} width={400} height={120}/>
            </Grid>
            <Grid>
                <br/>
                <h1>Статистика сервиса</h1>
            </Grid>

            <Grid>
                <AdminTable

                />
            </Grid>

        </Grid>

    );
};