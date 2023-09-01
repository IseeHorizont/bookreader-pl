import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import styles from "./Login.module.scss";
import { useForm } from 'react-hook-form';
import React from "react";
import { useState } from 'react';
import axios from "../../axios";
import { useNavigate } from "react-router-dom";


export const Login = () => {
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isValid},
    } = useForm({
        defaultValues: {
            email: 'react@test.io',
            password: '111222333'
        },
        mode: 'onChange',
    });

    const onSubmit = (creds) => {
        console.log("creds: " + creds.email + " " + creds.password);
        // axios.post('/auth/register', creds)
        //     .then((response) => {
        //         setToken(response.data.token);
        //         console.log("Token: " + token);
        //     });
        localStorage.setItem('token', 'testToken'); // todo save token

        if (localStorage.token !== 'default') {
            navigate('/');
        }

        // todo example
        // try {
        //     const { data } = await axios.post('/auth/login', fields);
        //     dispatch(setUserData(data));
        //     window.localStorage.setItem('token', data.token);
        //     navigate('/');
        // } catch (error) {
        //     console.log(error);
        //     if (error.isAxiosError) {
        //         if (error.response.data.errors) {
        //             error.response.data.errors.forEach((obj) => {
        //                 setError(obj.param, { message: obj.msg }, { shouldFocus: true });
        //             });
        //         }
        //         if (error.response.data.message) {
        //             setError('email', { message: error.response.data.message }, { shouldFocus: true });
        //         }
        //     }
        // }
    }

    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Вход в аккаунт
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    required
                    className={styles.field}
                    label="Email"
                    type="email"
                    defaultValue="example@gmail.com"
                    {...register('email', {required: 'Введите корректный email-адрес'})}
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    fullWidth
                />
                <TextField
                    required
                    className={styles.field}
                    label="Пароль"
                    type="password"
                    {...register('password', {required: 'Введите свой пароль'})}
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    fullWidth
                />
                <Button type="submit" size="large" variant="contained" fullWidth>
                    Войти
                </Button>
            </form>
        </Paper>
    );
};
