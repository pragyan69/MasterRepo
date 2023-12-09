import React from 'react';
import Button from '@mui/material/Button';

const IntegrationButtons = () => {
    const handleHuddleIntegration = () => {
        // Integration logic for Huddle
    };

    const handleCeloIntegration = () => {
        // Integration logic for Celo SocialConnect
    };

    return (
        <div>
            <Button variant="contained" onClick={handleHuddleIntegration}>Integrate with Huddle</Button>
            <Button variant="contained" onClick={handleCeloIntegration}>Integrate with Celo SocialConnect</Button>
        </div>
    );
};

export default IntegrationButtons;
