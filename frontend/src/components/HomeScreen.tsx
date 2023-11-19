import React, {useEffect, useState} from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:3000');

interface HomeScreenProps {
	createCall: () => Promise<string>;
	startHairCheck: (url: string) => Promise<void>; // Adjust the type based on your actual requirements
}


interface SocketMessage {
    id: number;
    text: string;
}

const HomeScreen = ({ createCall, startHairCheck }: HomeScreenProps) => {
    
    const [inputMessage, setInputMessage] = useState<string>('');
    // const [chatMessages, setChatMessages] = useState<SocketMessage[]>([]);
    
    // useEffect(() => {
    //     socket.on('chat message', (msg: string) => {
    //         setChatMessages((prevMessages) => [
    //             ...prevMessages,
    //             { id: prevMessages.length, text: msg },
    //         ]);
    //     });
      
    //     // Clean up the socket connection when the component unmounts
    //     return () => {
    //         socket.disconnect();
    //     };
    // }, []);

    // const handleSendSocketMessage = () => {
    //     socket.emit('chat message', "socket message here");
    // };
    
    const startDemo = () => {
		createCall().then((url: string) => {
			startHairCheck(url);
		});
    };
  
    return (
        <div>
            {/* <h1>Daily React custom video application</h1>
            <p>Start the demo with a new unique room by clicking the button below.</p> */}
                <button onClick={startDemo} type="button">
                	Click to start a session
                </button>
                {/* <button onClick={handleSendSocketMessage} type="button">
                	send message
                </button> */}
            {/* <p>Select “Allow” to use your camera and mic for this call if prompted</p> */}
        </div>
    );
}

export default HomeScreen;