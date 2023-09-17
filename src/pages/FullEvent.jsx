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
    const [comments, setComments] = useState([]);

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

        axios
            .get('/comment', { headers: { Authorization: `Bearer ${currentToken}`},
                                         params: { eventId: eventId } }
            )
            .then(({ data }) => {
                console.log(data);
                setComments(data);
            })
            .catch((err) => {
                alert('Ошибка при получении события');
                console.warn(err);
            });

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
                commentsCount={data.commentCounter}
                createdAt={data.createdAt}

                isEditable={data.creatorEmail === localStorage.getItem('email')}
                isAuth={true}
                isFullEvent={true}

                likes={eventRating.likeCounter}
                dislikes={eventRating.dislikeCounter}
            />
            {data && (
                <CommentsBlock
                    items={comments}
                    isLoading={false}
                >
                    <Index >

                    </Index>
                </CommentsBlock>
            )}
        </div>
    );
};