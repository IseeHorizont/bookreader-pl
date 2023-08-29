import React from 'react';
//import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
//import { resetUserData } from '../../redux/slices/auth';

export const Header = () => {
  const isAuth = true;

  const onClickLogout = () => {};

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
                    <Button onClik={onClickLogout} variant="outlined" color="error">Выйти</Button>
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
