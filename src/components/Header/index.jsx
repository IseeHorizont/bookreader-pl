import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import {Link, useNavigate} from 'react-router-dom';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import Avatar from "@mui/material/Avatar";
import {Box, Chip} from "@mui/material";
import clsx from "clsx";


export const Header = () => {
  const navigate = useNavigate();
  let isAuth = localStorage.getItem('token');
  let isAdmin = localStorage.getItem('role') === 'ADMIN';

  //console.log('isAdmin: ' + isAdmin); // todo ?????

  const [clientBadge, setClientBadge] = useState(null);
  const [clientName, setClientName] = useState('');

  const onClickLogout = () => {
      localStorage.clear();
      isAuth = null;
      navigate("/");
  };

  React.useEffect(() => {
      setClientBadge(localStorage.getItem('clientAvatar'));
      setClientName(localStorage.getItem('email'));
  }, []);

  return (
      <div className={styles.root}>
        <Container maxWidth="lg">
          <div className={styles.inner}>
            {isAdmin ? (
              <>
                <Link className={styles.logo} to="/">
                  <div>LET's READ TOGETHER</div>
                </Link>
                <Link className={styles.admin} to="/statistics">
                  <div>STATISTICS</div>
                </Link>
              </>
              ) : (
                <Link className={styles.logo} to="/">
                  <div>LET's READ TOGETHER</div>
                </Link>
              )}

            <div className={styles.buttons}>
              {isAuth ? (
                  <>
                    <Container>
                      <Chip
                        color='success'
                        avatar={<Avatar alt="U" src={`${clientBadge}`}  />}
                        label={clientName ? (`${clientName}`) : ('Не узнаю Вас в гриме...')}
                        variant="outlined"
                      />
                      <Link to="/event/">
                        <Button variant="outlined" color="primary">Создать событие</Button>
                      </Link>
                      <Button onClick={onClickLogout} variant="outlined" color="error">Выйти</Button>
                    </Container>
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
