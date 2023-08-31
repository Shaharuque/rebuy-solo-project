import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Back from '../../components/Back/Back';
import { io } from 'socket.io-client';

const AdBidding:React.FC = () => {
    const {adId}=useParams()
    const user=JSON.parse(localStorage.getItem('user') || '{}')

    //socket io
    const [socket, setSocket] = useState<any>(null);

    const userInfo=JSON.parse(localStorage.getItem('user') || '{}')
    console.log('from ad bidding user info',userInfo)

    useEffect(() => {
        setSocket(io('http://localhost:8080'));  //io thekey socket newa hoisey
    }, [])

    useEffect(() => {
        if (socket) {
            socket.emit('joinRoom', { userId: user?.email, room: adId });
        }
    }, [socket])

    
    
    console.log('from ad bidding',adId)
    return (
        <div>
            <Back></Back>
        </div>
    );
};

export default AdBidding;