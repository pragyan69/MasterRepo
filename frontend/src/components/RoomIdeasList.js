import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const RoomIdeasList = ({ ideas }) => {
    return (
        <List>
            {ideas.map((idea, index) => (
                <ListItem key={index}>
                    <ListItemText primary={idea} />
                </ListItem>
            ))}
        </List>
    );
};

export default RoomIdeasList;
