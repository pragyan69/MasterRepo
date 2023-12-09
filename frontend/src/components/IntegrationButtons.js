import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

const IntegrationButtons = ({ roomId, onIdeaSubmitted, onJoinedRoom }) => {
    const [open, setOpen] = useState(false);
    const [idea, setIdea] = useState('');
    const hardcodedAddress = "0xf7eD5AEd83921E1e1e19adb506954bE031D0E4b3";

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setIdea(''); // Reset the idea after closing the dialog
    };

    const handleHuddleIntegration = () => {
        // Integration logic for Huddle
    };

    const handleCeloIntegration = () => {
        // Integration logic for Celo SocialConnect
    };

    const submitIdea = async () => {
        try {
            const response = await axios.post('http://localhost:3001/submitIdea', {
                roomid: 0, // Use the roomId passed as a prop
                idea: idea,
                address: hardcodedAddress // Include the hardcoded address
            });
            if(onIdeaSubmitted) {
                onIdeaSubmitted(response.data); // Call only if onIdeaSubmitted is provided
            }
            handleClose();
        } catch (error) {
            console.error('Error submitting idea:', error);
        }
    };

    const joinRoom = () => {
        // This function would be called to join a room.
        axios.post(`http://localhost:3001/joinRoom`, { roomid: roomId })
            .then(response => {
                if(onJoinedRoom) {
                    onJoinedRoom(); // Call only if onJoinedRoom is provided
                }
            })
            .catch(error => {
                console.error('Error joining room:', error);
            });
    };

    return (
        <div className="space-x-4">
            <Button variant="contained" onClick={handleHuddleIntegration}>
                Integrate with Huddle
            </Button>
            <Button variant="contained" onClick={handleCeloIntegration}>
                Integrate with Celo SocialConnect
            </Button>
            <Button variant="contained" onClick={handleClickOpen}>
                Submit your Idea
            </Button>
            <Button variant="contained" onClick={joinRoom}>
                Join Room
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Submit an Idea</DialogTitle>
                <form onSubmit={(e) => { e.preventDefault(); submitIdea(); }}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="idea"
                            label="Idea"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={idea}
                            onChange={(e) => setIdea(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" color="primary" variant="contained">
                            Submit
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default IntegrationButtons;
