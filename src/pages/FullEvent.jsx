import { Post } from "../components/Post";
import { CommentsBlock } from "../components/CommentsBlock";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from '../axios';
import {EventSkeleton} from "../components/Post/Skeleton";
import {Index} from "../components/AddComment";


export const FullEvent = () => {
    const [data, setData] = useState();
    const { eventId } = useParams();
    const [eventRating, setEventRating] = useState([]);

    useEffect(() => {
        const currentToken = localStorage.getItem('token');
        console.log("id: " + eventId);
        axios
            .get('/event/' + eventId, {headers: { Authorization: `Bearer ${currentToken}`}})
            .then(({ data }) => {
                console.log(data);
                setData(data);
            })
            .catch((err) => {
                alert('Ошибка при получении события');
                console.warn(err);
            });

        axios.get('/rating/' + eventId)
            .then((response) => {
                setEventRating(response.data);
            })

    }, [eventId]);

    if (!data) {
        return <EventSkeleton />;
    }

    return (
        <div>
            <Post
                _id={eventId}
                imageUrl={data.eventImage}
                user={{
                    avatarUrl: data.avatar,
                    fullName: data.creatorName
                }}
                title={data.eventTitle}
                description={data.description}
                book={data.bookAuthor + ": " + data.bookTitle}
                tags={[data.categoryName]}

                viewsCount={Math.floor(Math.random() * 50) + 1}
                commentsCount={Math.floor(Math.random() * 50) + 1}
                createdAt={data.createdAt}

                isEditable={data.creatorEmail === localStorage.getItem('email')}
                isAuth={true}
                isFullEvent={true}

                likes={eventRating.likeCounter}
                dislikes={eventRating.dislikeCounter}
            />
            {data && (
                <CommentsBlock
                    items={[
                        {
                            user: {
                                fullName: "Василий Малов",
                                avatarUrl: "https://img.freepik.com/premium-psd/people-avatar-3d-illustration_235528-1573.jpg?w=2000",
                            },
                            text: "Это тестовый комментарий. Нет поводов для паники...",
                        },
                        {
                            user: {
                                fullName: "Иван Доставалов",
                                avatarUrl: "https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436189.jpg?w=2000&t=st=1693334811~exp=1693335411~hmac=b139cdad69fa6b60313326e17037575dd12df8a0a589a555dc200b1fbeed35cf",
                            },
                            text: "Тестовый комментарий. Да, это тестовый комментарий",
                        },
                    ]}
                    isLoading={false}>
                    <Index />
                </CommentsBlock>
            )}
        </div>
    );
};