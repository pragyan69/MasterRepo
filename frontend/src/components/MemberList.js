import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText } from '@mui/material';

const MemberList = () => {
    const [members, setMembers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getAllMembers');
                setMembers(response.data.members);
            } catch (error) {
                setError('Failed to fetch members');
            }
        };

        fetchMembers();
    }, []);

    return (
        <div>
            {error ? (
                <p>{error}</p>
            ) : (
                <List>
                    {members.map((member, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={member} />
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    );
};

export default MemberList;
