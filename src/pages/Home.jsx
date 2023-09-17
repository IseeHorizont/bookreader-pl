import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import { Post } from "../components/Post";
import { CommentsBlock } from "../components/CommentsBlock";
import {Box} from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import axios from '../axios';
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import Skeleton from "@mui/material/Skeleton";
import ListItemText from "@mui/material/ListItemText";
import {SideBlock} from "../components/SideBlock";
import Button from "@mui/material/Button";
import img from "../work-in-progress.jpg";

export const Home = () => {

    const [value, setValue] = useState('1');
    const [events, setEvents] = useState([]);
    const [newEvents, setNewEvents] = useState([]);
    const [ownEvents, setOwnEvents] = useState([]);
    const [popularEvents, setPopularEvents] = useState([]);
    const [tags, setTags] = useState([]);
    const [eventRating, setEventRating] = useState([]);
    const [lastComments, setLastComments] = useState([]);

    let isAuth = localStorage.getItem('token');

    const handleChange = (value, newValue) => {
        setValue(newValue);
        if (newValue === '3' && isAuth) {
            getOwnEvents();
        }
    };

    function filterByCategory(name) {
        axios.get('/event/filter', { params: { categoryName: name } })
            .then((response) => {
                setEvents(response.data);
            })
    }

    function getAllEvents() {
        axios.get('/event/')
            .then((response) => {
                setEvents(response.data);
            })
    }

    React.useEffect(() => {
        // all public events
        if (events.length === 0) {
            axios.get('/event/')
                .then((response) => {
                    setEvents(response.data);
                })
        }

        // last 10 the newest events
        axios.get('/event/new', { params: { limit: 10 } })
            .then((response) => {
                setNewEvents(response.data);
            })

        axios.get('/tags/popular', { params: { limit: 3 } })
            .then((response) => {
                setTags(response.data);
            })

        axios.get('/rating/')
            .then((response) => {
                setEventRating(response.data);
            })

        axios.get('/comment/top', { params: { limit: 3 } })
            .then((response) => {
                setLastComments(response.data);
            })

        axios.get('/event/popular', { params: { limit: 5 } })
            .then((response) => {
                setPopularEvents(response.data);
            })

    }, []);

    const getOwnEvents = () => {
        const currentToken = localStorage.getItem('token');
        axios.get('/event/own/', { headers: { Authorization: `Bearer ${currentToken}`} })
            .then((response) => {
                setOwnEvents(response.data);
            });
    }

    const getLikesByEventId = (eventId) => {
        for (let index in eventRating) {
            if (eventRating[index].eventId === eventId) {
                return eventRating[index].likeCounter;
            }
        }
        return 0;
    }

    const getDislikesByEventId = (eventId) => {
        for (let index in eventRating) {
            if (eventRating[index].eventId === eventId) {
                return eventRating[index].dislikeCounter;
            }
        }
        return 0;
    }

    return (
        <Box sx={{ marginBottom: 15, width: '100%', typography: 'body1' }}>

            {isAuth ? (
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider',  }}>
                        <TabList
                            onChange={handleChange}
                            TabIndicatorProps={{
                                style: {backgroundColor: "#ffa08c",}
                            }}
                        >
                            <Tab label="Все" value="1" />
                            <Tab label="Новые" value="2" />
                            <Tab label="Только мои" value="3" />
                            <Tab label="Популярные" value="4" />
                            <Tab label="Избранное" value="5" />
                        </TabList>
                    </Box>
                    {/* Auth && all events */}
                    <TabPanel value="1">
                        <Grid container spacing={4}>
                            <Grid xs={8} item>
                                {events.map((obj) => (
                                    <Post
                                        _id={obj.id}

                                        imageUrl={obj.eventImage}
                                        user={{
                                            avatarUrl: obj.avatar,
                                            fullName: obj.creatorName
                                        }}
                                        description={obj.description}
                                        book={obj.bookAuthor + ": " + obj.bookTitle}
                                        tags={[obj.categoryName]}

                                        viewsCount={Math.floor(Math.random() * 50) + 1}
                                        commentsCount={obj.commentCounter}
                                        createdAt={obj.createdAt}

                                        isEditable={(obj.creatorEmail === localStorage.getItem('email')) ||
                                                    (localStorage.getItem('role') === 'ADMIN')}
                                        isAuth={isAuth}

                                        likes={getLikesByEventId(obj.id)}
                                        dislikes={getDislikesByEventId(obj.id)}
                                    />
                                ))}
                            </Grid>
                            <Grid xs={4} item>
                                <SideBlock title="Популярное">
                                    <List>
                                        {(tags.length === 0 ? [...Array(3)] : tags).map((name) => (
                                            <a
                                                style={{ textDecoration: "none", color: "black" }}
                                                href="#" onClick={() => filterByCategory(name)}
                                            >
                                                <ListItem disablePadding>
                                                    <ListItemButton>
                                                        <ListItemIcon>
                                                            <TagIcon />
                                                        </ListItemIcon>
                                                        {tags.length === 0 ? (
                                                            <Skeleton width={100} />
                                                        ) : (
                                                            <ListItemText primary={name} />
                                                        )}
                                                    </ListItemButton>
                                                </ListItem>
                                            </a>
                                        ))}
                                        <a
                                            style={{ textDecoration: "none", color: "black" }}
                                            href="#" onClick={() => getAllEvents()}
                                        >
                                            <ListItem disablePadding>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        <TagIcon />
                                                    </ListItemIcon>
                                                    {tags.length === 0 ? (
                                                        <Skeleton width={100} />
                                                    ) : (
                                                        <ListItemText primary={"Все"} />
                                                    )}
                                                </ListItemButton>
                                            </ListItem>
                                        </a>
                                    </List>
                                </SideBlock>
                                <CommentsBlock
                                    items={lastComments}
                                    isLoading={false}
                                />
                            </Grid>
                        </Grid>
                    </TabPanel>
                    {/* Auth && new events */}
                    <TabPanel value="2">
                        <Grid container spacing={4}>
                            <Grid xs={8} item>
                                {newEvents.map((obj) => (
                                    <Post
                                        _id={obj.id}
                                        imageUrl={obj.eventImage}
                                        user={{
                                            avatarUrl: obj.avatar,
                                            fullName: obj.creatorName
                                        }}
                                        description={obj.description}
                                        book={obj.bookAuthor + ": " + obj.bookTitle}
                                        tags={[obj.categoryName]}

                                        viewsCount={Math.floor(Math.random() * 50) + 1}
                                        commentsCount={obj.commentCounter}
                                        createdAt={obj.createdAt}

                                        isEditable={obj.creatorEmail === localStorage.getItem('email') ||
                                                    (localStorage.getItem('role') === 'ADMIN')}
                                        isAuth={isAuth}

                                        likes={getLikesByEventId(obj.id)}
                                        dislikes={getDislikesByEventId(obj.id)}
                                    />
                                ))}
                            </Grid>

                            <Grid xs={4} item>
                                <CommentsBlock
                                    items={lastComments}
                                    isLoading={false}
                                />
                            </Grid>
                        </Grid>
                    </TabPanel>
                    {/* Auth && own events */}
                    <TabPanel value="3">
                        {ownEvents.length > 0 ? (
                            <Grid container spacing={4}>
                                    <Grid xs={8} item>
                                        {ownEvents.map((obj) => (
                                            <Post
                                                _id={obj.id}
                                                imageUrl={obj.eventImage}
                                                user={{
                                                    avatarUrl: obj.avatar,
                                                    fullName: obj.creatorName
                                                }}
                                                description={obj.description}
                                                book={obj.bookAuthor + ": " + obj.bookTitle}
                                                tags={[obj.categoryName]}

                                                viewsCount={Math.floor(Math.random() * 50) + 1}
                                                commentsCount={obj.commentCounter}
                                                createdAt={obj.createdAt}

                                                isEditable={obj.creatorEmail === localStorage.getItem('email')}
                                                isAuth={isAuth}

                                                likes={getLikesByEventId(obj.id)}
                                                dislikes={getDislikesByEventId(obj.id)}
                                            />
                                        ))}
                                    </Grid>
                                    <Grid xs={4} item>
                                        <CommentsBlock
                                            items={lastComments}
                                            isLoading={false}
                                        />
                                    </Grid>
                                </Grid>
                        ) : (
                            <Typography>У Вас ещё нет собственных событий</Typography>
                        )}
                    </TabPanel>
                    {/* Auth && popular events */}
                    <TabPanel value="4">
                        <Grid container spacing={4}>
                            <Grid xs={8} item>
                                {popularEvents.map((obj) => (
                                    <Post
                                        _id={obj.id}
                                        imageUrl={obj.eventImage}
                                        user={{
                                            avatarUrl: obj.avatar,
                                            fullName: obj.creatorName
                                        }}
                                        description={obj.description}
                                        book={obj.bookAuthor + ": " + obj.bookTitle}
                                        tags={[obj.categoryName]}

                                        viewsCount={Math.floor(Math.random() * 50) + 1}
                                        commentsCount={obj.commentCounter}
                                        createdAt={obj.createdAt}

                                        isEditable={obj.creatorEmail === localStorage.getItem('email') ||
                                            (localStorage.getItem('role') === 'ADMIN')}
                                        isAuth={isAuth}

                                        likes={getLikesByEventId(obj.id)}
                                        dislikes={getDislikesByEventId(obj.id)}
                                    />
                                ))}
                            </Grid>

                            <Grid xs={4} item>
                                <CommentsBlock
                                    items={lastComments}
                                    isLoading={false}
                                />
                            </Grid>
                        </Grid>
                    </TabPanel>
                    {/* Auth && favorite events */}
                    <TabPanel value="5">
                        <Box >
                            <Grid item xs={6} container spacing={1}>
                                <Grid style={{textAlign: "start"}} xs={12}>
                                    <img
                                        src={img}
                                        alt=""
                                        width={500} height={500}
                                    />
                                </Grid>
                                <Grid style={{textAlign: "start"}} xs={12}>
                                    <Typography variant="h4">
                                        Раздел в разработке. Мы скоро!
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </TabPanel>
                </TabContext>
            ) : (
                // isNotAuth: show tab: all & new
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList
                            onChange={handleChange}
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: "#ffa08c",
                                }
                            }}
                        >
                            <Tab label="Все" value="1" />
                            <Tab label="Новые" value="2" />
                            <Tab label="Популярные" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Grid container spacing={4}>
                            <Grid xs={8} item>
                                {events.map((obj) => (
                                    <Post
                                        _id={obj.id}
                                        imageUrl={obj.eventImage}
                                        user={{
                                            avatarUrl: obj.avatar,
                                            fullName: obj.creatorName
                                        }}
                                        description={obj.description}
                                        book={obj.bookAuthor + ": " + obj.bookTitle}
                                        tags={[obj.categoryName]}

                                        viewsCount={Math.floor(Math.random() * 50) + 1}
                                        commentsCount={obj.commentCounter}
                                        createdAt={obj.createdAt}

                                        isEditable={obj.creatorEmail === localStorage.getItem('email')}

                                        likes={getLikesByEventId(obj.id)}
                                        dislikes={getDislikesByEventId(obj.id)}
                                    />
                                ))}

                            </Grid>
                            <Grid xs={4} item>
                                <SideBlock title="Популярное">
                                    <List>
                                        {(tags.length === 0 ? [...Array(3)] : tags).map((name) => (
                                            <a
                                                style={{ textDecoration: "none", color: "black" }}
                                                href="#" onClick={() => filterByCategory(name)}
                                            >
                                                <ListItem disablePadding>
                                                    <ListItemButton>
                                                        <ListItemIcon>
                                                            <TagIcon />
                                                        </ListItemIcon>
                                                        {tags.length === 0 ? (
                                                            <Skeleton width={100} />
                                                        ) : (
                                                            <ListItemText primary={name} />
                                                        )}
                                                    </ListItemButton>
                                                </ListItem>
                                            </a>
                                        ))}
                                        <a
                                            style={{ textDecoration: "none", color: "black" }}
                                            href="#" onClick={() => getAllEvents()}
                                        >
                                            <ListItem disablePadding>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        <TagIcon />
                                                    </ListItemIcon>
                                                    {tags.length === 0 ? (
                                                        <Skeleton width={100} />
                                                    ) : (
                                                        <ListItemText primary={"Все"} />
                                                    )}
                                                </ListItemButton>
                                            </ListItem>
                                        </a>
                                    </List>
                                </SideBlock>
                                <CommentsBlock
                                    items={lastComments}
                                    isLoading={false}
                                />
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value="2">
                        <Grid container spacing={4}>
                            <Grid xs={8} item>
                                {newEvents.map((obj) => (
                                    <Post
                                        _id={obj.id}
                                        imageUrl={obj.eventImage}
                                        user={{
                                            avatarUrl: obj.avatar,
                                            fullName: obj.creatorName
                                        }}
                                        description={obj.description}
                                        book={obj.bookAuthor + ": " + obj.bookTitle}
                                        tags={[obj.categoryName]}

                                        viewsCount={Math.floor(Math.random() * 50) + 1}
                                        commentsCount={obj.commentCounter}
                                        createdAt={obj.createdAt}

                                        isEditable={obj.creatorEmail === localStorage.getItem('email')}

                                        likes={getLikesByEventId(obj.id)}
                                        dislikes={getDislikesByEventId(obj.id)}
                                    />
                                ))}
                            </Grid>
                            <Grid xs={4} item>
                                <CommentsBlock
                                    items={lastComments}
                                    isLoading={false}
                                />
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value="3">
                        <Grid container spacing={4}>
                            <Grid xs={8} item>
                                {popularEvents.map((obj) => (
                                    <Post
                                        _id={obj.id}
                                        imageUrl={obj.eventImage}
                                        user={{
                                            avatarUrl: obj.avatar,
                                            fullName: obj.creatorName
                                        }}
                                        description={obj.description}
                                        book={obj.bookAuthor + ": " + obj.bookTitle}
                                        tags={[obj.categoryName]}

                                        viewsCount={Math.floor(Math.random() * 50) + 1}
                                        commentsCount={obj.commentCounter}
                                        createdAt={obj.createdAt}

                                        isEditable={obj.creatorEmail === localStorage.getItem('email') ||
                                            (localStorage.getItem('role') === 'ADMIN')}
                                        isAuth={isAuth}

                                        likes={getLikesByEventId(obj.id)}
                                        dislikes={getDislikesByEventId(obj.id)}
                                    />
                                ))}
                            </Grid>

                            <Grid xs={4} item>
                                <CommentsBlock
                                    items={lastComments}
                                    isLoading={false}
                                />
                            </Grid>
                        </Grid>
                    </TabPanel>
                </TabContext>
            )}
        </Box>
    );

};