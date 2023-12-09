// FirstPage.js
import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import CreateRoomForm from './CreateRoomForm';
import RoomCard from './RoomCard';

const FirstPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [showRooms, setShowRooms] = useState(false);
    const [rooms, setRooms] = useState([]);

    const handleSuccess = (data) => {
        console.log('Room created successfully:', data);
        setShowForm(false);
    };

    const handleError = (error) => {
        console.error('Error creating room:', error);
    };

    const fetchRooms = async () => {
        try {
            const response = await axios.get('http://localhost:3001/getRooms');
            setRooms(response.data.rooms);
            setShowRooms(true);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    return (
        <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 shadow-2xl pl-16 pb-8 max-md:pl-5">
            {/* ... other content ... */}
            <div className="ml-6 mt-8 max-md:mt-6">
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={() => setShowForm(!showForm)}>Create Room</Button>
                    <Button variant="contained" onClick={fetchRooms}>Join Existing Rooms</Button>
                </Stack>
                {showForm && <CreateRoomForm onSuccess={handleSuccess} onError={handleError} />}
                {showRooms && rooms.map((room, index) => (
                    <RoomCard key={index} room={room} id={index} />
                ))}
            </div>
        </div>
    );
}

export default FirstPage;
