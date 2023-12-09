// RoomsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RoomCard from './RoomCard';
import { Grid, Button } from '@mui/material';

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
        <>
            <Grid container spacing={2}>
                {rooms.slice(0, visibleRooms).map((room, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <RoomCard room={room} id={index} />
                    </Grid>
                ))}
            </Grid>
            {visibleRooms < rooms.length && (
                <Button onClick={loadMoreRooms} variant="contained" style={{ margin: '20px 0' }}>
                    Load More
                </Button>
            )}
        </>
    );
};

export default RoomsPage;
