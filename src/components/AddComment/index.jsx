import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./AddComment.module.scss";

export const Index = () => {
    return (
        <>
            <div className={styles.root}>
                <Avatar
                    classes={{ root: styles.avatar }}
                    src={localStorage.getItem('clientAvatar')}
                />
                <div className={styles.form}>
                    <TextField
                        label="Добавить свой комментарий"
                        variant="outlined"
                        maxRows={10}
                        multiline
                        fullWidth
                    />
                    <Button variant="contained">Отправить</Button>
                </div>
            </div>
        </>
    );
};