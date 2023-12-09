import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import CreateRoomForm from './CreateRoomForm'; // Ensure this path is correct
import AddMemberForm from './AddMemberForm';
const FirstPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [showCreateRoomForm, setShowCreateRoomForm] = useState(false);
    const [showAddMemberForm, setShowAddMemberForm] = useState(false);
 // useHistory called inside the component
 const navigate = useNavigate();
    const handleSuccess = (data) => {
        console.log('Room created successfully:', data);
        setShowForm(false); // Hide form on success
        // Additional success logic here
    };

    const handleError = (error) => {
        console.error('Error creating room:', error);
        // Additional error logic here
    };

    const handleJoinRooms = () => {
        navigate('/rooms'); // Navigate to rooms page using useNavigate
    };

    return (
        <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 shadow-2xl pl-16 pb-8 max-md:pl-5">
            <div className="flex flex-col items-start min-h-screen justify-start pt-10">
                <div className="text-black text-2xl font-medium leading-5 tracking-[18.11px] uppercase ml-6 mt-6">
                    let’s Make Easy
                </div>
                <div className="text-yellow text-9xl font-semibold leading-none tracking-tighter uppercase ml-3.5 mt-4 max-md:text-4xl max-md:leading-loose">
                    Connection
                </div>
                <div className="text-gray-700 text-lg font-medium leading-8 tracking-normal ml-3.5 mt-6 max-md:ml-2.5 max-md:mt-4">
                    Simple and sleek design with users in mind.
                </div>
                <div className="ml-6 mt-8 max-md:mt-6">
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" onClick={() => setShowForm(!showForm)}>Create Room</Button>
                        <Button variant="contained" onClick={handleJoinRooms}>Join Existing Rooms</Button>
                        <Button variant="contained" >Member List</Button>
                        <Button variant="contained" onClick={() => setShowAddMemberForm(!showAddMemberForm)}>Add Member</Button>

                    </Stack>
                    {showForm && <CreateRoomForm onSuccess={handleSuccess} onError={handleError} />}
                    {showCreateRoomForm && <CreateRoomForm onSuccess={handleSuccess} onError={handleError} />}
            {showAddMemberForm && <AddMemberForm onSuccess={handleSuccess} onError={handleError} />}
                </div>
                {/* Additional content can be added here */}
            </div>
        </div>
    );
};

export default FirstPage;
