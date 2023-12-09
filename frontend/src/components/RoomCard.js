// RoomCard.js
import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const RoomCard = ({ room, id }) => {
    const navigate = useNavigate();

  const handleJoinRoom = () => {
    navigate(`/room/${id}`); // Navigate to Room page with room ID
  };


  return (
    <Card sx={{ minWidth: 275, marginBottom: 2 }}>
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          Room ID: {id}
        </Typography>
        <Typography variant="h5" component="div">
          {room.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Member Limit: {room.memberLimit}
        </Typography>
        <Typography variant="body2">
          {room.description}
          <br />
          Validity: {new Date(room.validity).toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions>
      <Button size="small" onClick={handleJoinRoom}>Join Room</Button>
      </CardActions>
    </Card>
  );
};

export default RoomCard;
