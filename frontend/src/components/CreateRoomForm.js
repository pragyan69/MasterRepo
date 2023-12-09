// CreateRoomForm.js
import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const CreateRoomForm = ({ onSuccess, onError }) => {
    const [formData, setFormData] = useState({
        creator: '',
        name: '',
        description: '',
        memberlimit: '',
        validityindays: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/createRoom', formData);
            console.log(response.data);
            if (onSuccess) {
                onSuccess(response.data); // Call the onSuccess function passed as a prop
            }
            setFormData({ // Reset the form data
                creator: '',
                name: '',
                description: '',
                memberlimit: '',
                validityindays: ''
            });
        } catch (error) {
            console.error(error);
            if (onError) {
                onError(error); // Call the onError function passed as a prop
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2} direction="column" mt={2}>
                <TextField label="Creator" name="creator" value={formData.creator} onChange={handleChange} required />
                <TextField label="Room Name" name="name" value={formData.name} onChange={handleChange} required />
                <TextField label="Description" name="description" value={formData.description} onChange={handleChange} required />
                <TextField label="Member Limit" name="memberlimit" value={formData.memberlimit} onChange={handleChange} required type="number" />
                <TextField label="Validity (in days)" name="validityindays" value={formData.validityindays} onChange={handleChange} required type="number" />
                <Button type="submit" variant="contained">Submit</Button>
            </Stack>
        </form>
    );
};

export default CreateRoomForm;
