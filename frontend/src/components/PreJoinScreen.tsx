import React, { useCallback, useState, MouseEvent, FormEvent, ChangeEvent } from 'react';
import { Box, TextField, Button, Stack } from "@mui/material";
import {
    useLocalParticipant,
    useDevices,
    useDaily,
    useDailyEvent,
    DailyVideo,
} from '@daily-co/daily-react';
//import UserMediaError from '../UserMediaError/UserMediaError';


interface PreJoinScreenProps {
    joinCall: () => void;
    cancelCall: () => void;
}

const PreJoinScreen = ({ joinCall, cancelCall }: PreJoinScreenProps) => {
    const localParticipant = useLocalParticipant();
    const { microphones, speakers, cameras, setMicrophone, setCamera, setSpeaker } = useDevices();
    const callObject = useDaily();

    const [getUserMediaError, setGetUserMediaError] = useState(false);

    useDailyEvent(
        'camera-error',
        useCallback(() => {
        setGetUserMediaError(true);
        }, []),
    );

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (callObject)
        callObject.setUserName(e.target.value);
    };

    const join = (e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        joinCall();
    };

    const updateMicrophone = (e: ChangeEvent<HTMLSelectElement>) => {
        setMicrophone(e.target.value);
    };

    const updateSpeakers = (e: ChangeEvent<HTMLSelectElement>) => {
        setSpeaker(e.target.value);
    };

    const updateCamera = (e: ChangeEvent<HTMLSelectElement>) => {
        setCamera(e.target.value);
    };

    return getUserMediaError ? (
        // <UserMediaError />
        <>error</>
    ) : (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Stack spacing={{lg: 2}}>
                {/* Video preview */}
                <Box sx={{width: 800, height: 450, backgroundColor: 'lightgray'}}>
                    {localParticipant &&
                        <DailyVideo
                            type="video"
                            sessionId={localParticipant.session_id}
                            mirror
                            style={{
                                width: 800
                            }}
                        />
                    }
                </Box>

                {/* <TextField
                    label="Username"
                    placeholder="Username"
                    onChange={(e) => onChange(e)}
                    value={localParticipant?.user_name || ''}
                /> */}
                
                <TextField label="Room" placeholder="Room"/>

                <Button variant="contained" onClick={join} size="large">
                    Join
                </Button>

                <Button variant="outlined" onClick={cancelCall} size="large">
                    Back to start
                </Button>
            </Stack>
        </Box>

        // <form className="hair-check" onSubmit={join}>
        //     <h1>Setup your hardware</h1>
        //     {/* Video preview */}
        //     {localParticipant && <DailyVideo type="video" sessionId={localParticipant.session_id} mirror />}

        //     {/* Username */}
        //     <div>
        //         <label htmlFor="username">Your name:</label>
        //         <input
        //             name="username"
        //             type="text"
        //             placeholder="Enter username"
        //             onChange={(e) => onChange(e)}
        //             value={localParticipant?.user_name || ' '}
        //         />
        //     </div>

        //     {/* Microphone select */}
        //     <div>
        //         <label htmlFor="micOptions">Microphone:</label>
        //         <select name="micOptions" id="micSelect" onChange={updateMicrophone}>
        //         {microphones?.map((mic) => (
        //             <option key={`mic-${mic.device.deviceId}`} value={mic.device.deviceId}>
        //             {mic.device.label}
        //             </option>
        //         ))}
        //         </select>
        //     </div>

        //     {/* Speakers select */}
        //     <div>
        //         <label htmlFor="speakersOptions">Speakers:</label>
        //         <select name="speakersOptions" id="speakersSelect" onChange={updateSpeakers}>
        //         {speakers?.map((speaker) => (
        //             <option key={`speaker-${speaker.device.deviceId}`} value={speaker.device.deviceId}>
        //             {speaker.device.label}
        //             </option>
        //         ))}
        //         </select>
        //     </div>

        //     {/* Camera select */}
        //     <div>
        //         <label htmlFor="cameraOptions">Camera:</label>
        //         <select name="cameraOptions" id="cameraSelect" onChange={updateCamera}>
        //         {cameras?.map((camera) => (
        //             <option key={`cam-${camera.device.deviceId}`} value={camera.device.deviceId}>
        //             {camera.device.label}
        //             </option>
        //         ))}
        //         </select>
        //     </div>

        //     <button onClick={join} type="submit">
        //         Join call
        //     </button>
        //     <button onClick={cancelCall} className="cancel-call" type="button">
        //         Back to start
        //     </button>
        // </form>
    );
}

export default PreJoinScreen;