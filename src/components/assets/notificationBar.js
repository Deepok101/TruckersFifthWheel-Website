import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
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
    if(props.notifications !== undefined){
        var notifications = props.notifications.map((value) => (
            <div>
                <ListItem button alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar>DS</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={value.content}
                        secondary={
                        <React.Fragment>
                           
                            {value.created}
                        </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </div>


        ))
    } else {
        var notifications = null;
    }

    if(props.invisible === false)
        return (
            <List className={classes.root}>
                
                {notifications}
                <ListItem button>
       
                    <ListItemText primary="View All Notifications" />
                </ListItem>
            
            </List>

        )
        else {
            return null
        }
  }