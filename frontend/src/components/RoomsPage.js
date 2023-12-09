// RoomsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RoomCard from './RoomCard';

const RoomsPage = () => {
    const [rooms, setRooms] = useState([]);

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

    return (
        <div>
            {rooms.map((room, index) => (
                <RoomCard key={index} room={room} id={index} />
            ))}
        </div>
    );
};

export default RoomsPage;
