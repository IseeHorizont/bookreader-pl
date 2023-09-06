import React, {useEffect, useState} from 'react';
//import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import {Link, useNavigate} from 'react-router-dom';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import {StyledBadge} from "../StyledBadge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";


export const Header = () => {
  const navigate = useNavigate();
  let isAuth = localStorage.getItem('token');
  const [clientBadge, setClientBadge] = useState(null);

  const onClickLogout = () => {
      //localStorage.token = 'default';
      //localStorage.removeItem('token');
      localStorage.clear();
      isAuth = null;
      navigate("/");
      window.location.reload();
  };

  React.useEffect(() => {
      setClientBadge(localStorage.getItem('clientAvatar'));
  }, []);

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
                      <Stack direction="row" spacing={1}>
                        <Container>
                            <Link to="/event/">
                              <Button variant="outlined" color="primary">Создать событие</Button>
                            </Link>
                            <Button onClick={onClickLogout} variant="outlined" color="error">Выйти</Button>
                        </Container>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                          <Avatar src={`${clientBadge}`} />
                        </StyledBadge>
                      </Stack>
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
