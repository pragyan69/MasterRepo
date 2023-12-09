import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RoomMemberList from './RoomMemberList';
import RoomIdeasList from './RoomIdeasList';
import IntegrationButtons from './IntegrationButtons';
import RoomFeatures from './RoomFeatures';

const RoomPage = () => {
    const { roomId } = useParams();
    const [members, setMembers] = useState([]);
    const [ideas, setIdeas] = useState([]);

    useEffect(() => {
        // Fetch members and ideas for the room using roomId
        // Replace with your actual API calls
        axios.get(`http://localhost:3001/getRoomMembers/${roomId}`)
            .then(response => setMembers(response.data.members))
            .catch(error => console.error(error));

        axios.get(`http://localhost:3001/getRoomIdeas/${roomId}`)
            .then(response => setIdeas(response.data.ideas))
            .catch(error => console.error(error));

        axios.get(`http://localhost:3001/getRoomIdeas/${roomId}`)
            .then(response => setIdeas(response.data.ideas))
            .catch(error => console.error(error));
    }, [roomId]);

    return (
        <div>
            <h1>Room Members</h1>
            <RoomMemberList members={members} />
            <h1>Room Ideas</h1>
            <RoomIdeasList ideas={ideas} />
            <IntegrationButtons />
        </div>
    );
};

export default RoomPage;
