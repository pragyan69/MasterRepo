import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const RoomIdeasList = ({ ideas }) => {
    // Check if 'ideas' is defined before attempting to map it
    if (!ideas || ideas.length === 0) {
        return <div>No ideas available</div>;
    }

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
