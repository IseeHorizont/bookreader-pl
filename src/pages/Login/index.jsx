import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import styles from "./Login.module.scss";


export const Login = () => {


  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>

      <TextField
          required
          className={styles.field}
          label="Email"
          defaultValue="example@gmail.com"

          //error
          //helperText="Не указан email"
          fullWidth
      />
      <TextField
          required
          className={styles.field}
          label="Пароль"
          type="password"
          fullWidth
      />

      <Button size="large" variant="contained" fullWidth>
        Войти
      </Button>
    </Paper>
  );
};
