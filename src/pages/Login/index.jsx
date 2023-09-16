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
import {FormControl, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";


export const Login = () => {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: 'valera-go@gmail.com',
            password: '12345'
        },
        mode: 'onChange',
    });

    const onSubmit = async (creds) => {
        console.log("creds: " + creds.email + " " + creds.password);
        try {
            const { data } = await axios.post('/auth/authenticate', creds);
            window.localStorage.setItem('token', data.token);
            window.localStorage.setItem('role', data.role);
            window.localStorage.setItem('email', creds.email);

            axios.get('/client/badge',
                { headers: { Authorization: `Bearer ${data.token}`},
                          params: { username: `${creds.email}` } }
                )
                .then((response) => {
                    localStorage.setItem('clientAvatar', response.data.avatarImageUrl);
                    console.log(localStorage.getItem('clientAvatar'));
                })
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
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Вход в аккаунт
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputLabel htmlFor="outlined-adornment-password">E-mail</InputLabel>
                <TextField
                    //required
                    className={styles.field}
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    {...register('email', { required: 'Введите корректный email-адрес' })}
                    fullWidth
                />

                <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                <OutlinedInput
                    type={showPassword ? "text" : "password"}
                    className={styles.field}
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    {...register('password', { required: 'Введите свой пароль' })}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <Button type="submit" size="large" variant="contained" fullWidth>
                    Войти
                </Button>
            </form>
        </Paper>
    );
};
