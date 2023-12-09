import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import axios from 'axios';

const CreateRoomForm = ({ onSuccess, onError }) => {
    const [formData, setFormData] = useState({
        creator: '',
        name: '',
        description: '',
        memberlimit: '',
        validityindays: ''
    });
    const [alertInfo, setAlertInfo] = useState(null); // Holds the alert information

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlertInfo(null); // Clear any existing alerts

        try {
            const response = await axios.post('http://localhost:3001/createRoom', formData);
            console.log(response.data); // Log the response data

            // Set the success alert
            setAlertInfo({ severity: 'success', message: 'Room created successfully!' });
            // Reset the form data
            setFormData({
                creator: '',
                name: '',
                description: '',
                memberlimit: '',
                validityindays: ''
            });

            // Call the onSuccess callback if provided
            if (onSuccess) {
                onSuccess(response.data);
            }
        } catch (error) {
            console.error(error);

            // Set the error alert
            setAlertInfo({ severity: 'error', message: 'Failed to create room.' });

            // Call the onError callback if provided
            if (onError) {
                onError(error);
            }
        }
    };

    return (
        <>
            {alertInfo && (
                <Alert 
                    severity={alertInfo.severity}
                    onClose={() => setAlertInfo(null)} // Allow the alert to be dismissed
                    sx={{ position: 'fixed', top: 0, width: '100%', zIndex: 1400 }}
                >
                    {alertInfo.message}
                </Alert>
            )}
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
        </>
    );
};

export default CreateRoomForm;
