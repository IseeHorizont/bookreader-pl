import React from "react";

import { SideBlock } from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export const CommentsBlock = ({ items, children, isLoading = true }) => {
  return (
    <SideBlock title="Комментарии">
        <List>
            {(isLoading ? [...Array(5)] : items).map((obj, index) => (
                <React.Fragment key={index}>
                    <Paper>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            {isLoading ? (
                                <Skeleton variant="circular" width={40} height={40} />
                            ) : (
                                <Avatar alt={obj.authorName} src={obj.avatar} />
                            )}
                        </ListItemAvatar>
                        {isLoading ? (
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <Skeleton variant="text" height={25} width={120} />
                                <Skeleton variant="text" height={18} width={230} />
                            </div>
                        ) : (
                            <ListItemText
                                primary={obj.authorName}
                                secondary={
                                    <React.Fragment>
                                        <List>
                                            <ListItemText>
                                                <Typography
                                                    sx={{ display: 'inline'}}
                                                    component = "span"
                                                    variant = "body1"
                                                    color = "text.primary"
                                                >
                                                {obj.text}
                                                </Typography>
                                            </ListItemText>
                                            <ListItemText sx={{ display: 'inline' }} variant="body3" color="text.primary">
                                                {obj.createdAt}
                                            </ListItemText>
                                        </List>
                                    </React.Fragment>
                                }

                            />
                        )}
                    </ListItem>
                </Paper>
                    <Divider variant="inset" component="li" />
                </React.Fragment>
            ))}
        </List>
        {children}
    </SideBlock>
  )
};
