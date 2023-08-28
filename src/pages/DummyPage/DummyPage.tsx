import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DummyPage: React.FC = () => {

    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
      const timer = setTimeout(() => {
        setRedirect(true);
      }, 10000); // 10 seconds
      return () => clearTimeout(timer);
    }, []);

    return (
        <div className='bg-red-400 h-[100vh] flex justify-center items-center'>
            <div className='text-white bg-red-200'>
                {redirect ? <Link to="/login" /> : <p>Rebuy</p>}
            </div>
        </div>
    );
};

export default DummyPage;