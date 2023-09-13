import Grid from "@mui/material/Grid";
import logo from "../logo-white.png";
import {AdminTable} from "../components/AdminTable";
import React, {useState} from "react";
import axios from "../axios";

export const AdminRoom = () => {

    const [allRegisterUsers, setAllRegisterUsers] = useState([]);
    const [activeUsers, setActiveUsers] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const [deletedEvents, setDeletedEvents] = useState([]);
    const [popularTags, setPopularTags] = useState([]);

    React.useEffect(() => {
        const currentToken = localStorage.getItem('token');

        axios.get('/statistic/allusers', {headers: { Authorization: `Bearer ${currentToken}`}})
            .then((response) => {
                setAllRegisterUsers(response.data);
            })

        axios.get('/statistic/activeusers', {headers: { Authorization: `Bearer ${currentToken}`}})
            .then((response) => {
                setActiveUsers(response.data);
            })

        axios.get('/statistic/allevents', {headers: { Authorization: `Bearer ${currentToken}`}})
            .then((response) => {
                setAllEvents(response.data);
            })

        axios.get('/statistic/deletedevents', {headers: { Authorization: `Bearer ${currentToken}`}})
            .then((response) => {
                setDeletedEvents(response.data);
            })

        axios.get('/tags/popular', { params: { limit: 1 } })
            .then((response) => {
                setPopularTags('# '+response.data);
            })

    }, []);

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
                    allUsers={allRegisterUsers}
                    activeUsers={activeUsers}
                    allEvents={allEvents}
                    deletedEvents={deletedEvents}
                    popularTags={popularTags}
                />
            </Grid>

        </Grid>

    );
};