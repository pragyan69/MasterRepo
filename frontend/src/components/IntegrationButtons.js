import React from 'react';
import Button from '@mui/material/Button';

const IntegrationButtons = () => {
    const handleHuddleIntegration = () => {
        // Integration logic for Huddle
    };

    const handleCeloIntegration = () => {
        // Integration logic for Celo SocialConnect
    };
    const submitIdea = ()=>{

    }

    return (
        <div className="space-x-4"> {/* Add space between buttons */}
    <Button variant="contained" onClick={handleHuddleIntegration} className='mx-10'>
        Integrate with Huddle
    </Button>
    <Button variant="contained" onClick={handleCeloIntegration}>
        Integrate with Celo SocialConnect
    </Button>
    <Button variant="contained" onClick={submitIdea}>
        Submit your Idea
    </Button>
</div>


    );
};

export default IntegrationButtons;
