import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const FirstPage = () => {
    return (
        // Adjusted gradient background classes for a whitish-blue gradient
        <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 shadow-2xl pl-16 pb-8  max-md:pl-5 ">
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
              <div className="flex gap-4">
                <Stack spacing={2} direction="row">
                  <Button variant="contained">Create Room</Button>
                  <Button variant="contained">Join Room</Button>
                </Stack>
              </div>
            </div>
            {/* Additional content can be added here */}
          </div>
        </div>
    );
}

export default FirstPage;
