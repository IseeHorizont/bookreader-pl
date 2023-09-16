import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./AddComment.module.scss";
import {useParams} from "react-router-dom";
import React from "react";
import axios from "../../axios";

export const Index = () => {
    const { eventId } = useParams();

    const [fields, setFields] = React.useState({
        commentText: '',
    });

    const addComment = async () => {
        if (!fields.commentText) {
            alert('Комментарий не должен быть пустой');
            return;
        }
        try {
            const currentToken = localStorage.getItem('token');
            const email = localStorage.getItem('email');

            console.log(eventId + ' ' + email + ' ' + fields.commentText)

            await axios.post('/comment/', {
                    eventId: eventId,
                    username: email,
                    text: fields.commentText,
                }, { headers: { Authorization: `Bearer ${currentToken}`}
                }
            );
            setFieldValue('commentText', '')
            window.location.reload();
        }
        catch (error) {
            alert('Ошибка публикации комментария');
        }

    };

    const setFieldValue = (name, value) => {
        setFields((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <div className={styles.root}>
                <Avatar
                    classes={{ root: styles.avatar }}
                    src={localStorage.getItem('clientAvatar')}
                />
                <div className={styles.form}>
                    <TextField
                        label="Добавить свой комментарий"
                        onChange={(e) => setFieldValue('commentText', e.target.value)}
                        variant="outlined"
                        maxRows={10}
                        multiline
                        fullWidth
                    />
                    <Button onClick={addComment} variant="contained">Отправить</Button>
                </div>
            </div>
        </>
    );
};