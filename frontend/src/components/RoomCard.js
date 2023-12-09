// RoomCard.js
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const RoomCard = ({ room, id }) => {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    Room ID: {id}
                </Typography>
                <Typography variant="h5" component="h2">
                    {room.name}
                </Typography>
                <Typography color="textSecondary">
                    Member Limit: {room.memberLimit}
                </Typography>
                <Typography variant="body2" component="p">
                    {room.description}
                    <br />
                    Validity: {new Date(room.validity).toLocaleDateString()}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default RoomCard;
