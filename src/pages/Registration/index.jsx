import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Login.module.scss";
import {useForm} from "react-hook-form";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

export const Registration = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: {
            nickname: 'registration',
            email: 'register@test.com',
            password: '12345'
        },
        mode: 'onChange',
    });

    const onSubmit = async (userData) => {
        try {
            const { data } = await axios.post('/auth/register', userData);
            window.localStorage.setItem('token', data.token);
            navigate('/');
        } catch (error) {
            console.log("Login: " + error);
            if (error.isAxiosError) {
                if (error.response.data.errors) {
                    error.response.data.errors.forEach((obj) => {
                        setError(obj.param, { message: obj.msg }, { shouldFocus: true });
                    });
                }
                if (error.response.data.message) {
                    setError('email', { message: error.response.data.message }, { shouldFocus: true });
                }
                alert('Неверный email или пароль');
            }
        }
    }

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Создание аккаунта
            </Typography>
            <div className={styles.avatar}>
                <Avatar sx={{ width: 100, height: 100 }} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    required
                    className={styles.field}
                    label="Имя пользователя"
                    helperText={errors.nickname?.message}
                    {...register('nickname', { required: 'Введите своё имя/псевдоним' })}
                    fullWidth
                />
                <TextField
                    required
                    className={styles.field}
                    type="email"
                    label="Email"
                    helperText={errors.email?.message}
                    {...register('email', { required: 'Введите корректный email-адрес' })}
                    fullWidth
                />
                <TextField
                    required
                    className={styles.field}
                    label="Пароль"
                    {...register('password', { required: 'Введите свой пароль' })}
                    fullWidth
                />
                <Button type="submit" size="large" variant="contained" fullWidth>Войти</Button>
            </form>
        </Paper>
    );
};
