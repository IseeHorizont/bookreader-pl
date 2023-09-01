import React, { useEffect } from 'react';
//import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import {Link, useNavigate} from 'react-router-dom';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';

export const Header = () => {
  const navigate = useNavigate();
  let isAuth = localStorage.getItem('token');

  const onClickLogout = () => {
      //localStorage.token = 'default';
      //localStorage.removeItem('token');
      localStorage.clear();
      isAuth = null;
      window.location.reload();
  };

  return (
      <div className={styles.root}>
        <Container maxWidth="lg">
          <div className={styles.inner}>
            <Link className={styles.logo} to="/">
              <div>LET's READ TOGETHER</div>
            </Link>
            <div className={styles.buttons}>
              {isAuth ? (
                  <>
                    <Link to="/posts/create">
                      <Button variant="outlined" color="primary">Создать событие</Button>
                    </Link>
                    <Button onClick={onClickLogout} variant="outlined" color="error">Выйти</Button>
                  </>
              ) : (
                  <>
                    <Link to="/login">
                      <Button variant="outlined">Войти</Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="outlined">Регистрация</Button>
                    </Link>
                  </>
              )}
            </div>
          </div>
        </Container>
      </div>
  );
};
