import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      position: 'absolute',
      right: 10,
      top: 70,
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));
  
  export default function NotificationBar(props) {
    const classes = useStyles();
    if(props.invisible === false)
        return (
            <List className={classes.root}>
                <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar>DS</Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary="Brunch this weekend?"
                    secondary={
                    <React.Fragment>
                        <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                        >
                        Ali Connors
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                    }
                />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar>DS</Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary="Summer BBQ"
                    secondary={
                    <React.Fragment>
                        <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                        >
                        to Scott, Alex, Jennifer
                        </Typography>
                        {" — Wish I could come, but I'm out of town this…"}
                    </React.Fragment>
                    }
                />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar>DS</Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary="Oui Oui"
                    secondary={
                    <React.Fragment>
                        <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                        >
                        Sandra Adams
                        </Typography>
                        {' — Do you have Paris recommendations? Have you ever…'}
                    </React.Fragment>
                    }
                />
                </ListItem>
            </List>

        )
        else {
            return null
        }
  }