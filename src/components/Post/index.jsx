import React from "react";
import clsx from "clsx";
import { Link } from 'react-router-dom'
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

import styles from "./Post.module.scss";
import { UserInfo } from "../UserInfo";
import {EventSkeleton} from "./Skeleton";

export const Post = ({
  id,
  title,
  book,
  description,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullEvent,
  isLoading,
  isEditable,
}) => {

  if (isLoading) {
    return <EventSkeleton />;
  }

  const onClickRemove = () => {};

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullEvent })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/event/${id}`}>
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
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />

        <div className={styles.indention}>
          <h4 className={clsx(styles.title, { [styles.titleFull]: isFullEvent })}>
            {/*{isFullEvent ? title : <Link to={`/event/${id}`}>{book}</Link>}*/}
            <Link to={`/event/${id}`}>{book}</Link>
          </h4>
          {/*<p className={clsx(styles.title, { [styles.titleFull]: isFullEvent })}>*/}
          {/*  {isFullEvent ? description : t}*/}
          {/*</p>*/}

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
