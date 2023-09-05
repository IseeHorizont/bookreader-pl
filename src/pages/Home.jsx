import React, {useState} from 'react';
//import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import {Box} from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import axios from '../axios';
import Typography from "@mui/material/Typography";

export const Home = () => {

    const [value, setValue] = useState('1');
    const [events, setEvents] = useState([]);
    const [newEvents, setNewEvents] = useState([]);
    const [ownEvents, setOwnEvents] = useState([]);

    let isAuth = localStorage.getItem('token');

    const handleChange = (value, newValue) => {
        setValue(newValue);
        if (newValue === '3') {
            getOwnEvents();
        }
    };

    React.useEffect(() => {
        // all public events
        axios.get('/event/')
            .then((response) => {
                setEvents(response.data);
            })

        // last 10 the newest events
        axios.get('/event/new', { params: { Limit: 10 } })
            .then((response) => {
                setNewEvents(response.data);
            })
    }, []);

    const getOwnEvents = () => {
        const currentToken = localStorage.getItem('token');
        axios.get('/event/own/', {headers: { Authorization: `Bearer ${currentToken}`}})
            .then((response) => {
                setOwnEvents(response.data);
            });
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
                        </TabList>
                    </Box>
                    {/* todo Auth && all events */}
                    <TabPanel value="1">
                        <Grid container spacing={4}>
                            <Grid xs={8} item>
                                {events.map((obj) => (
                                    <Post
                                        _id={obj.id}

                                        // todo title={obj.description}

                                        book={obj.bookAuthor + ": " + obj.bookTitle}
                                        imageUrl={obj.eventImage}  //"https://img.freepik.com/premium-vector/people-reading-park_73637-401.jpg?w=2000"
                                        user={{
                                            avatarUrl: obj.avatar,
                                            fullName: obj.creatorName
                                        }}
                                        createdAt={obj.createdAt}
                                        viewsCount={Math.floor(Math.random() * 50) + 1}
                                        commentsCount={Math.floor(Math.random() * 50) + 1}
                                        tags={[obj.categoryName]}
                                        isEditable={obj.creatorEmail === localStorage.getItem('email')}
                                    />
                                ))}
                            </Grid>
                            <Grid xs={4} item>
                                <TagsBlock
                                    items={["bestseller", "fun", "historic"]}
                                    isLoading={false}
                                />
                                <CommentsBlock
                                    items={[
                                        {
                                            user: {
                                                fullName: "Василий Малов",
                                                avatarUrl: "https://img.freepik.com/premium-psd/people-avatar-3d-illustration_235528-1573.jpg?w=2000",
                                            },
                                            text: "Тест комментария тут",
                                        },
                                        {
                                            user: {
                                                fullName: "Иван Доставалов",
                                                avatarUrl: "https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436189.jpg?w=2000&t=st=1693334811~exp=1693335411~hmac=b139cdad69fa6b60313326e17037575dd12df8a0a589a555dc200b1fbeed35cf",
                                            },
                                            text: "Тест комментария тут. Тест комментария тут. Тест комментария тут",
                                        },
                                    ]}
                                    isLoading={false}
                                />
                            </Grid>
                        </Grid>
                    </TabPanel>
                    {/* todo Auth && new events */}
                    <TabPanel value="2">
                        <Grid container spacing={4}>
                            <Grid xs={8} item>
                                {newEvents.map((obj) => (
                                    <Post
                                        _id={obj.id}
                                        title={obj.description}
                                        book={obj.bookAuthor + ": " + obj.bookTitle}
                                        imageUrl={obj.eventImage}
                                        user={{
                                            avatarUrl: obj.avatar,
                                            fullName: obj.creatorName
                                        }}
                                        createdAt={obj.createdAt}
                                        viewsCount={Math.floor(Math.random() * 50) + 1}
                                        commentsCount={Math.floor(Math.random() * 50) + 1}
                                        tags={[obj.categoryName]}
                                        isEditable={obj.creatorEmail === localStorage.getItem('email')}
                                    />
                                ))}
                            </Grid>

                            <Grid xs={4} item>
                                <TagsBlock
                                    items={["bestseller", "fun", "historic"]}
                                    isLoading={false}
                                />
                                <CommentsBlock
                                    items={[
                                        {
                                            user: {
                                                fullName: "Василий Малов",
                                                avatarUrl: "https://img.freepik.com/premium-psd/people-avatar-3d-illustration_235528-1573.jpg?w=2000",
                                            },
                                            text: "Тест комментария тут",
                                        },
                                        {
                                            user: {
                                                fullName: "Иван Доставалов",
                                                avatarUrl: "https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436189.jpg?w=2000&t=st=1693334811~exp=1693335411~hmac=b139cdad69fa6b60313326e17037575dd12df8a0a589a555dc200b1fbeed35cf",
                                            },
                                            text: "Тест комментария тут. Тест комментария тут. Тест комментария тут",
                                        },
                                    ]}
                                    isLoading={false}
                                />
                            </Grid>
                        </Grid>
                    </TabPanel>
                    {/* todo Auth && own events */}
                    <TabPanel value="3">
                        {ownEvents.length > 0 ? (
                            <Grid container spacing={4}>
                                    <Grid xs={8} item>
                                        {ownEvents.map((obj) => (
                                            <Post
                                                _id={obj.id}
                                                title={obj.description}
                                                book={obj.bookAuthor + ": " + obj.bookTitle}
                                                imageUrl={obj.eventImage}
                                                user={{
                                                    avatarUrl: obj.avatar,
                                                    fullName: obj.creatorName
                                                }}
                                                createdAt={obj.createdAt}
                                                viewsCount={Math.floor(Math.random() * 50) + 1}
                                                commentsCount={Math.floor(Math.random() * 50) + 1}
                                                tags={[obj.categoryName]}
                                                isEditable={obj.creatorEmail === localStorage.getItem('email')}
                                            />
                                        ))}
                                    </Grid>
                                    <Grid xs={4} item>
                                        <TagsBlock
                                            items={["bestseller", "fun", "historic"]}
                                            isLoading={false}
                                        />
                                        <CommentsBlock
                                            items={[
                                                {
                                                    user: {
                                                        fullName: "Василий Малов",
                                                        avatarUrl: "https://img.freepik.com/premium-psd/people-avatar-3d-illustration_235528-1573.jpg?w=2000",
                                                    },
                                                    text: "Тест комментария тут",
                                                },
                                                {
                                                    user: {
                                                        fullName: "Иван Доставалов",
                                                        avatarUrl: "https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436189.jpg?w=2000&t=st=1693334811~exp=1693335411~hmac=b139cdad69fa6b60313326e17037575dd12df8a0a589a555dc200b1fbeed35cf",
                                                    },
                                                    text: "Тест комментария тут. Тест комментария тут. Тест комментария тут",
                                                },
                                            ]}
                                            isLoading={false}
                                        />
                                    </Grid>
                                </Grid>
                        ) : (
                            <Typography>У Вас ещё нет собственных событий</Typography>
                        )}
                    </TabPanel>
                    {/* todo Auth && popular events */}
                    <TabPanel value="4">
                        <Typography>Раздел в разработке. Мы скоро!</Typography>
                    </TabPanel>
                </TabContext>
            ) : (
                // todo isNotAuth: show tab: all & new
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
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Grid container spacing={4}>
                            <Grid xs={8} item>
                                {events.map((obj) => (
                                    <Post
                                        _id={obj.id}
                                        title={obj.description}
                                        book={obj.bookAuthor + ": " + obj.bookTitle}
                                        imageUrl={obj.eventImage}
                                        user={{
                                            avatarUrl: obj.avatar,
                                            fullName: obj.creatorName
                                        }}
                                        createdAt={obj.createdAt}
                                        viewsCount={Math.floor(Math.random() * 50) + 1}
                                        commentsCount={Math.floor(Math.random() * 50) + 1}
                                        tags={[obj.categoryName]}
                                    />
                                ))}

                            </Grid>
                            <Grid xs={4} item>
                                <TagsBlock
                                    items={["bestseller", "fun", "historic"]}
                                    isLoading={false}
                                />
                                <CommentsBlock
                                    items={[
                                        {
                                            user: {
                                                fullName: "Василий Малов",
                                                avatarUrl: "https://img.freepik.com/premium-psd/people-avatar-3d-illustration_235528-1573.jpg?w=2000",
                                            },
                                            text: "Тест комментария тут",
                                        },
                                        {
                                            user: {
                                                fullName: "Иван Доставалов",
                                                avatarUrl: "https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436189.jpg?w=2000&t=st=1693334811~exp=1693335411~hmac=b139cdad69fa6b60313326e17037575dd12df8a0a589a555dc200b1fbeed35cf",
                                            },
                                            text: "Тест комментария тут. Тест комментария тут. Тест комментария тут",
                                        },
                                    ]}
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
                                        title={obj.description}
                                        book={obj.bookAuthor + ": " + obj.bookTitle}
                                        imageUrl={obj.eventImage}
                                        user={{
                                            avatarUrl: obj.avatar,
                                            fullName: obj.creatorName
                                        }}
                                        createdAt={obj.createdAt}
                                        viewsCount={Math.floor(Math.random() * 50) + 1}
                                        commentsCount={Math.floor(Math.random() * 50) + 1}
                                        tags={[obj.categoryName]}
                                    />
                                ))}
                            </Grid>

                            <Grid xs={4} item>
                                <TagsBlock
                                    items={["bestseller", "fun", "historic"]}
                                    isLoading={false}
                                />
                                <CommentsBlock
                                    items={[
                                        {
                                            user: {
                                                fullName: "Василий Малов",
                                                avatarUrl: "https://img.freepik.com/premium-psd/people-avatar-3d-illustration_235528-1573.jpg?w=2000",
                                            },
                                            text: "Тест комментария тут",
                                        },
                                        {
                                            user: {
                                                fullName: "Иван Доставалов",
                                                avatarUrl: "https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436189.jpg?w=2000&t=st=1693334811~exp=1693335411~hmac=b139cdad69fa6b60313326e17037575dd12df8a0a589a555dc200b1fbeed35cf",
                                            },
                                            text: "Тест комментария тут. Тест комментария тут. Тест комментария тут",
                                        },
                                    ]}
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