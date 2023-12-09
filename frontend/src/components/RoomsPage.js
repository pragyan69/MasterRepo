// RoomsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RoomCard from './RoomCard';
import { Grid, Button, Box } from '@mui/material';

const RoomsPage = () => {
    const [rooms, setRooms] = useState([]);
    const [visibleRooms, setVisibleRooms] = useState(4); // Initially show 4 rooms

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getRooms');
                setRooms(response.data.rooms);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, []);

    const loadMoreRooms = () => {
        setVisibleRooms((prevVisibleRooms) => prevVisibleRooms + 4);
    };

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '100vh',
                padding: '20px',
                background: 'linear-gradient(to bottom right, #E0F7FA, #E0F7FA 50%, #E0F7FA)',
                boxSizing: 'border-box'
            }}
        >
            <Grid container spacing={2}>
                {rooms.slice(0, visibleRooms).map((room, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <RoomCard room={room} id={index} />
                    </Grid>
                ))}
            </Grid>
            {visibleRooms < rooms.length && (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Button onClick={loadMoreRooms} variant="contained">
                        Load More
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default RoomsPage;
