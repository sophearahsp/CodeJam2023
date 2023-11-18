import React from 'react';

interface HomeScreenProps {
	createCall: () => Promise<string>;
	startHairCheck: (url: string) => Promise<void>; // Adjust the type based on your actual requirements
}

const HomeScreen = ({ createCall, startHairCheck }: HomeScreenProps) => {
    const startDemo = () => {
		createCall().then((url: string) => {
			startHairCheck(url);
		});
    };
  
    return (
        <div>
            <h1>Daily React custom video application</h1>
            <p>Start the demo with a new unique room by clicking the button below.</p>
                <button onClick={startDemo} type="button">
                	Click to start a call
                </button>
            <p>Select “Allow” to use your camera and mic for this call if prompted</p>
        </div>
    );
}

export default HomeScreen;