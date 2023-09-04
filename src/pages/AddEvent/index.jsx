import React, {useState} from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import axios from '../../axios';

import 'easymde/dist/easymde.min.css';
import styles from './AddEvent.module.scss';

export const AddEvent = () => {
    const navigate = useNavigate();
    //const { id } = useParams();
    //const inputFileRef = React.useRef(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [fields, setFields] = React.useState({
        eventTitle: '',
        description: '',
        bookTitle: '',
        bookAuthor: '',
        bookPublicationYear: '',
        imageUrl: '',
        categoryName: ''
    });

    const isEmptyFields = Object.values({
        eventTitle: fields.eventTitle,
        description: fields.description,
        bookTitle: fields.bookTitle,
        bookAuthor: fields.bookTitle,
        bookPublicationYear: fields.bookPublicationYear,
        categoryName: fields.categoryName
    }).some((v) => !v);

    const setFieldValue = (name, value) => {
        setFields((prev) => ({ ...prev, [name]: value }));
    };

    const onChange = React.useCallback((value) => {
        setFieldValue('description', value);
    }, []);

    const options = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Добавьте описание события...',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        [],
    );

    const onSubmit = async () => {
        console.log(fields, fields.categoryName);
        try {
            await axios.post('/event/', {
                    eventImage: fields.imageUrl,
                    eventTitle: fields.eventTitle,
                    description: fields.description,
                    categoryName: fields.categoryName, // todo fields.categoryName.split(','),
                    bookTitle: fields.bookTitle,
                    bookAuthor: fields.bookAuthor,
                    bookPublicationYear: fields.bookPublicationYear
            }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
                }
            );
            navigate('/');
        }
        catch (error) {
            console.log(error);
            alert('Ошибка при создании события. Попробуйте снова или позже...');
        }
    };

    return (
        <Paper style={{ padding: 30 }}>
            <TextField
                value={fields.imageUrl}
                onChange={(e) => setFieldValue('imageUrl', e.target.value)}
                classes={{ root: styles.image }}
                variant="filled"
                placeholder="Превью Вашего события"
                fullWidth
            />
            <br />
            <br />
            {fields.imageUrl && (
                <img className={styles.image} src={`${fields.imageUrl}`} />
            )}
            <br />
            <TextField
                value={fields.eventTitle}
                onChange={(e) => setFieldValue('eventTitle', e.target.value)}
                classes={{ root: styles.title }}
                variant="standard"
                placeholder="Заголовок события..."
                fullWidth
            />
            <TextField
                value={fields.categoryName}
                onChange={(e) => setFieldValue('categoryName', e.target.value)}
                classes={{ root: styles.tags }}
                variant="filled"
                placeholder="Укажите категорию для события"
                fullWidth
            />
            <br />
            <br />

            <SimpleMDE
                className={styles.title}
                value={fields.description}
                onChange={onChange}
                options={options}
            />
            <br />

            <TextField
                label="Название книги"
                value={fields.bookTitle}
                onChange={(e) => setFieldValue('bookTitle', e.target.value)}
                classes={{ root: styles.tags }}
                variant="filled"
                placeholder="Название книги"
                fullWidth
            />
            <TextField
                label="Автор книги"
                value={fields.bookAuthor}
                onChange={(e) => setFieldValue('bookAuthor', e.target.value)}
                classes={{ root: styles.tags }}
                variant="filled"
                placeholder="Автор книги"
                fullWidth
            />
            <TextField
                label="Год издания"
                value={fields.bookPublicationYear}
                onChange={(e) => setFieldValue('bookPublicationYear', e.target.value)}
                classes={{ root: styles.tags }}
                variant="filled"
                placeholder="Год издания"
                fullWidth
            />

            <br />
            <br />

            <div className={styles.buttons}>
                <Button onClick={onSubmit} disabled={isEmptyFields} size="large" variant="contained">
                    {/*{!isEditing ? 'Опубликовать' : 'Сохранить'}*/}
                    {'Опубликовать'}
                </Button>
                <Link to="/">
                    <Button disabled={isLoading} size="large">
                        Отмена
                    </Button>
                </Link>
            </div>
        </Paper>
    );
};