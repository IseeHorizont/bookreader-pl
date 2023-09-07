import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import { SideBlock } from "./SideBlock";
import axios from "../axios";

export const TagsBlock = ({ items, isLoading = true }) => {

  //const doFilter = () => {
        // const currentToken = localStorage.getItem('token');
        // axios.get('/event/own/', {headers: { Authorization: `Bearer ${currentToken}`}})
        //     .then((response) => {
        //         setOwnEvents(response.data);
        //     });
  //}

  return (
    <SideBlock title="Популярное">
      <List>
        {(isLoading ? [...Array(3)] : items).map((name, i) => (
          // <a
          //   style={{ textDecoration: "none", color: "black" }}
          //   href={`/tags/${name}`}
          // >
            <ListItem key={i} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          //</a>
        ))}
      </List>
    </SideBlock>
  );
};
