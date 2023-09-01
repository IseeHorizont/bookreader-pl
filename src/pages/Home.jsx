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

export const Home = () => {
    const [value, setValue] = React.useState('1');

    console.log("home token: " + localStorage.token)
    let isAuth = localStorage.getItem('token');

    const handleChange = (value, newValue) => {
        setValue(newValue);
    };

    const [events, setEvents] = useState([]);
    let postsLoading = false;

    React.useEffect(() => {
        axios.get('/event/')
            .then((response) => {
                console.log(response.data);
                setEvents(response.data);
                postsLoading = true;
            })
    }, []);


    return (
        <Box sx={{ marginBottom: 15, width: '100%', typography: 'body1' }}>

            {isAuth ? (
                // all tabs
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Все" value="1" />
                            <Tab label="Только мои" value="2" />
                            <Tab label="Популярные" value="3" />
                            <Tab label="Новые" value="4" />
                        </TabList>
                    </Box>

                    <TabPanel value="1">
                        <Grid container spacing={4}>
                            <Grid xs={8} item>
                                {events.map((obj, index) => (
                                    <Post
                                        id={index}
                                        title={obj.description}
                                        book={obj.bookAuthor + ": " + obj.bookTitle}
                                        imageUrl="https://img.freepik.com/premium-vector/people-reading-park_73637-401.jpg?w=2000"
                                        user={{
                                            avatarUrl: obj.avatar,
                                            fullName: obj.creatorName
                                        }}
                                        createdAt={obj.createdAt}
                                        viewsCount={150001}
                                        commentsCount={332}
                                        tags={[obj.categoryName]}
                                        isEditable
                                        isLoading={postsLoading === 'loaded'}
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
                        Here will be your own events soon...
                    </TabPanel>
                    <TabPanel value="3">
                        Here will be the most popular events soon...
                    </TabPanel>
                    <TabPanel value="4">
                        Here will be new events soon...
                    </TabPanel>
                </TabContext>
            ) : (
                // show only first tab
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Все" value="1" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Grid container spacing={4}>
                            <Grid xs={8} item>
                                {events.map((obj, index) => (
                                    <Post
                                        id={index}
                                        title={obj.description}
                                        book={obj.bookAuthor + ": " + obj.bookTitle}
                                        imageUrl="https://img.freepik.com/premium-vector/people-reading-park_73637-401.jpg?w=2000"
                                        user={{
                                            avatarUrl: obj.avatar,
                                            fullName: obj.creatorName
                                        }}
                                        createdAt={obj.createdAt}
                                        viewsCount={150001}
                                        commentsCount={332}
                                        tags={[obj.categoryName]}
                                        isEditable
                                        isLoading={postsLoading === 'loaded'}
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



    // return (
    //     <Box sx={{ marginBottom: 15, width: '100%', typography: 'body1' }}>
    //         <TabContext value={value}>
    //             <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    //                 <TabList onChange={handleChange} aria-label="lab API tabs example">
    //                     <Tab label="Все" value="1" />
    //                     <Tab label="Только мои" value="2" />
    //                     <Tab label="Популярные" value="3" />
    //                     <Tab label="Новые" value="4" />
    //                 </TabList>
    //             </Box>
    //
    //             <TabPanel value="1">
    //                 <Grid container spacing={4}>
    //                     <Grid xs={8} item>
    //                         {events.map((obj, index) => (
    //                             <Post
    //                                 id={index}
    //                                 title={obj.description}
    //                                 book={obj.bookAuthor + ": " + obj.bookTitle}
    //                                 imageUrl="https://img.freepik.com/premium-vector/people-reading-park_73637-401.jpg?w=2000"
    //                                 user={{
    //                                     avatarUrl: obj.avatar,
    //                                     fullName: obj.creatorName
    //                                 }}
    //                                 createdAt={obj.createdAt}
    //                                 viewsCount={150001}
    //                                 commentsCount={332}
    //                                 tags={[obj.categoryName]}
    //                                 isEditable
    //                                 isLoading={postsLoading === 'loaded'}
    //                             />
    //                         ))}
    //
    //                     </Grid>
    //                         <Grid xs={4} item>
    //                             <TagsBlock
    //                                 items={["bestseller", "fun", "historic"]}
    //                                 isLoading={false}
    //                             />
    //                             <CommentsBlock
    //                                 items={[
    //                                     {
    //                                         user: {
    //                                             fullName: "Василий Малов",
    //                                             avatarUrl: "https://img.freepik.com/premium-psd/people-avatar-3d-illustration_235528-1573.jpg?w=2000",
    //                                         },
    //                                         text: "Тест комментария тут",
    //                                     },
    //                                     {
    //                                         user: {
    //                                             fullName: "Иван Доставалов",
    //                                             avatarUrl: "https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436189.jpg?w=2000&t=st=1693334811~exp=1693335411~hmac=b139cdad69fa6b60313326e17037575dd12df8a0a589a555dc200b1fbeed35cf",
    //                                         },
    //                                         text: "Тест комментария тут. Тест комментария тут. Тест комментария тут",
    //                                     },
    //                                 ]}
    //                                 isLoading={false}
    //                             />
    //                         </Grid>
    //                 </Grid>
    //             </TabPanel>
    //             <TabPanel value="2">
    //                 Here will be your own events soon...
    //             </TabPanel>
    //             <TabPanel value="3">
    //                 Here will be the most popular events soon...
    //             </TabPanel>
    //             <TabPanel value="4">
    //                 Here will be new events soon...
    //             </TabPanel>
    //         </TabContext>
    //     </Box>
    // );
};