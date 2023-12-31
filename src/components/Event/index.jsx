import React from "react";
import clsx from "clsx";
import { Link } from 'react-router-dom'
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import styles from "./Event.module.scss";
import { UserInfo } from "../UserInfo";
import { EventSkeleton } from "./Skeleton";
import axios from '../../axios';
import Typography from "@mui/material/Typography";
import { Card, CardContent } from "@mui/material";

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Grid from "@mui/material/Grid";
import {AddCircleRounded} from "@mui/icons-material";
import GroupsIcon from '@mui/icons-material/Groups';

export const Event = ({
  _id,            // 'id'
  imageUrl,       // 'eventImage'
  user,           // 'avatar' & creatorName
  title,     // 'eventTitle'
  description,    // 'description'
  book,           // 'bookAuthor': 'bookTitle'
  tags,           // 'categoryName'
  viewsCount,     //
  commentsCount,  //
  createdAt,      // 'createdAt'
  isEditable,     // does he have rights for editing?

  isAuth,         // is user authenticated ?
  isLoading,      //

  likes,          // all likes
  dislikes,       // all dislikes

  children,
  isFullEvent,


}) => {

  if (isLoading) {
    return <EventSkeleton />;
  }

  const onClickRemove = async () => {
    try {
      if (window.confirm('Вы действительно хотите удалить это событие?')) {
        console.log("Home: _id#" + _id);
        const currentToken = localStorage.getItem('token');
        await axios.delete('/event/' + _id, {headers: {Authorization: `Bearer ${currentToken}`}});
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      alert('Ошибка удаления события');
    }
  };

  async function clickOnLike() {
    try {
      await axios.post('/rating/', {
            eventId: _id,
            email: localStorage.getItem('email'),
            vote: 'LIKE'
          }, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
          }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function clickOnDislike() {
    try {
      await axios.post('/rating/', {
            eventId: _id,
            email: localStorage.getItem('email'),
            vote: 'DISLIKE'
          }, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
          }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function clickOnJoinEvent() {
    console.log("click on => clickOnJoinEvent")
  }

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullEvent })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/event/${_id}`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullEvent })}
          src={imageUrl}
          alt={description}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />

        <div className={styles.indention}>
          <Card>
            <CardContent>
              {(title) ? (
                  <>
                    <h3 className={styles.title}>{ title }</h3>
                    <br/>
                    <hr align="left" width="500" size="2" color="#ffa08c" />
                    <br/>
                  </>
              ) : ('')}
              {isAuth ? (
                <h3 className={styles.title}>
                    <Link
                        color="primary"
                        style={{ textDecoration: 'none'}}
                        to={'/event/' + _id}>{ book }
                    </Link>

                </h3>
                ) : (
                  <h3 className={styles.title}>
                    { book }
                  </h3>
                )
              }
              {(description) ? (<Typography>{ description }</Typography>) : ('')}
            </CardContent>
          </Card>

          <ul className={clsx(styles.tags, { [styles.tagsFull]: isFullEvent })}>
            {tags.map((name) => (
              <li key={name}>
                # {name}
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}

          {isFullEvent ? (
              <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
                <Grid>
                  <ul className={clsx(styles.eventDetails, { [styles.eventDetailsFull]: isFullEvent })} >
                    <li>
                      <EyeIcon />
                      <span>{viewsCount}</span>
                    </li>
                    <li>
                      <CommentIcon />
                      <span>{commentsCount}</span>
                    </li>
                  </ul>
                </Grid>

                <Grid>
                  <ul className={styles.joinEventScore}>
                    <li>
                      Участники: {Math.floor(Math.random() * (20 - 1) + 1)}
                    </li>
                    <li>
                      <IconButton className={styles.joinEventButtons} color="primary" onClick={() => clickOnJoinEvent()}>
                        <AddCircleRounded/>
                      </IconButton>
                    </li>
                  </ul>
                </Grid>
                <Grid>
                  <IconButton className={styles.voteButtons} onClick={() => clickOnLike()}>
                    <ThumbUpIcon />
                    <span>{!likes ? (0) : likes}</span>
                  </IconButton>
                  <IconButton className={styles.voteButtons} onClick={() => clickOnDislike()}>
                    <ThumbDownIcon />
                    <span>{!dislikes ? (0) : dislikes}</span>
                  </IconButton>
                </Grid>
              </Grid>
          ) : (
              <ul className={clsx(styles.eventDetails, { [styles.eventDetailsFull]: isFullEvent })}>
                <li>
                  <EyeIcon />
                  <span>{viewsCount}</span>
                </li>
                <li>
                  <CommentIcon />
                  <span>{commentsCount}</span>
                </li>
                <li>
                  <SentimentVerySatisfiedIcon />
                  <span>{!likes ? (0) : likes}</span>
                </li>
                <li>
                  <SentimentVeryDissatisfiedIcon />
                  <span>{!dislikes ? (0) : dislikes}</span>
                </li>
                <li>
                  <GroupsIcon/>
                  <span>{Math.floor(Math.random() * (10 - 1) + 1)}</span>
                </li>
              </ul>
          )}
        </div>
      </div>
    </div>
  );
};
