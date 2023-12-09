import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const FirstPage = () => {
    return (
        <div className="shadow-2xl pl-16 pb-8 rounded-[30px] max-md:pl-5">
          <div className="flex flex-col items-stretch min-h-screen justify-center">
            <div className="text-black text-2xl font-medium leading-5 tracking-[18.11px] uppercase ml-6">
              let’s Make Easy
            </div>
            <div className="text-yellow text-9xl font-semibold leading-6 tracking-tighter uppercase ml-3.5 mt-10 max-md:text-4xl max-md:leading-loose">
              Connection
            </div>
            <div className="text-zinc-700 text-lg font-medium leading-8 tracking-normal ml-3.5 mt-16 max-md:ml-2.5 max-md:mt-10">
              Simple and sleek design with users in mind.
            </div>
            <div className="ml-6 mt-14 max-md:mt-10">
              <div className="flex gap-4 px-5">
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
