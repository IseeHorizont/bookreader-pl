import React from "react";
import clsx from "clsx";
import {Link, useNavigate} from 'react-router-dom'
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

import styles from "./Post.module.scss";
import { UserInfo } from "../UserInfo";
import {EventSkeleton} from "./Skeleton";
import axios from '../../axios';
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {Card, CardContent} from "@mui/material";


export const Post = ({
  _id,            // 'id'
  imageUrl,       // 'eventImage'
  user,           // 'avatar' & creatorName
  description,    // 'description'
  book,           // 'bookAuthor': 'bookTitle'
  tags,           // 'categoryName'
  viewsCount,     //
  commentsCount,  //
  createdAt,      // 'createdAt'
  isEditable,     // does he have rights for editing?

  // todo unused fields
  children,
  isFullEvent,

}) => {

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
          <Card className={styles.card}>
            <CardContent>
              <h3 className={styles.title}>
                <Link
                    color="primary"
                    style={{ textDecoration: 'none'}}
                    to={`/event/${_id}`}>{ book }
                </Link>
              </h3>
              {(description) ? (<Typography><i>{ description }</i></Typography>) : ('')}
            </CardContent>
          </Card>

          <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name}>
                #{name}
                {/* todo <Link to={`/tag/${name}`}>#{name}</Link>*/}
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
