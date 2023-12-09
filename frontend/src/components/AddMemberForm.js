import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const AddMemberForm = ({ onSuccess, onError }) => {
    const [address, setAddress] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/addMember', { address });
            onSuccess(response.data);
        } catch (error) {
            onError(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                margin="normal"
                fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
                Add Member
            </Button>
        </form>
    );
};

export default AddMemberForm;
