import React, { useEffect, useState } from 'react';

const DummyPage: React.FC = () => {
  const [redirecting, setRedirecting] = useState(true);

  useEffect(() => {
    // Simulate work completion and delay
    const timeoutId = setTimeout(() => {
      setRedirecting(false); // Stop redirecting
      // Redirect to another page after a delay (e.g., 2 seconds)
      setTimeout(() => {
        window.location.replace('/login'); // Replace '/destination' with your desired route
      }, 1000);
    }, 1000);

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  if (redirecting) {
    return (
      null
    );
  }

  // Return something else or nothing once the redirection is complete
  return (
    <div className='bg-red-400 h-[100vh] flex justify-center items-center'>
      <div className='text-white bg-red-200'>
        <p>Rebuy</p>
      </div>
    </div>
  );
};

export default DummyPage;