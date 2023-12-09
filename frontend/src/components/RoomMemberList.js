import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const RoomMemberList = ({ members }) => {
    return (
        <List>
            {members.map((member, index) => (
                <ListItem key={index}>
                    <ListItemText primary={member} />
                </ListItem>
            ))}
        </List>
    );
};

export default RoomMemberList;
