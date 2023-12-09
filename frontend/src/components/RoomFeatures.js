import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const RoomFeatures = ({ features }) => {
    // Check if 'ideas' is defined before attempting to map it
    if (!features || features.length === 0) {
        return <div>No ideas available</div>;
    }

    return (
        <List>
            {features.map((features, index) => (
                <ListItem key={index}>
                    <ListItemText primary={features} />
                </ListItem>
            ))}
        </List>
    );
};

export default RoomFeatures;
