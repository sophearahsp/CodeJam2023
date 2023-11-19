import React, { useState, useCallback, useMemo } from 'react';
import {
  useParticipantIds,
  useScreenShare,
  useLocalParticipant,
  useDailyEvent,
  DailyAudio,
} from '@daily-co/daily-react';
import { Box, TextField, Typography, Grid, Button, IconButton, Stack } from "@mui/material";
import {useAuthStore, AuthStore } from '../../Router';
import CloseIcon from '@mui/icons-material/Close';
import VideoTile from './VideoTile';
import GridTile from './GridTile';

//import UserMediaError from '../UserMediaError/UserMediaError';

const TempDirections = () => {
    const [isClosed, setIsClosed] = useState(false);

    const handleClose = () => {
        setIsClosed(true);
    };

    return (
        // <Box
        //     sx={{
        //         position: "absolute",
        //         right: 0,
        //         bottom: 0,
        //         zIndex: 2,
        //         transform: 'translate(0%, -100%)',
        //         backgroundColor: 'red'
        //     }}
        // >
        //     <Typography>
        //         Three rules:
        //     </Typography>
        //     1. Each user is prompted to share their goals by the end of the session
        //     2. When the work session starts, everyone works on their tasks
        //     3. When the work session ends, each user is prompted to review their work
        // </Box>
        <>
            {!isClosed && (
                <Stack
                    sx={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        zIndex: 2,
                        padding: 2,
                        borderRadius: 2,
                        transform: 'translate(-100%, 20%)',
                        maxWidth: 300,
                        backgroundColor: '#E8ECEF'
                    }}
                    spacing={1}
                >
                    <Stack direction={'row'} sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                        <Typography fontSize={18} fontWeight={"bold"}>
                            Three reminders:
                        </Typography>
                        <IconButton onClick={handleClose} color="inherit">
                            <CloseIcon/>
                        </IconButton>
                    </Stack>
                    <Typography>
                        1. Each person should share what they want to complete by the end of the session
                    </Typography>
                    <Typography>
                        2. When the work session starts, everyone works on their tasks
                    </Typography>
                    <Typography>
                        3. When the work session ends, each person should review their work during the session
                    </Typography>
                </Stack>
            )}
        </>
    )
}

export default function Call() {
    const profile = useAuthStore((state: AuthStore) => state.profile);

    /* If a participant runs into a getUserMedia() error, we need to warn them. */
    const [getUserMediaError, setGetUserMediaError] = useState(false);

    /* We can use the useDailyEvent() hook to listen for daily-js events. Here's a full list
    * of all events: https://docs.daily.co/reference/daily-js/events */
    useDailyEvent(
        'camera-error',
        useCallback(() => {
            setGetUserMediaError(true);
        }, []),
    );

    /* This is for displaying remote participants: this includes other humans, but also screen shares. */
    const { screens } = useScreenShare();
    const remoteParticipantIds = useParticipantIds({ filter: 'remote' });

    /* This is for displaying our self-view. */
    const localParticipant = useLocalParticipant();
    const isAlone = useMemo(
        () => remoteParticipantIds?.length < 1 || screens?.length < 1,
        [remoteParticipantIds, screens],
    );

    const renderCallScreen = () => (
        <Box
            padding={4}
            sx={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Grid container columns={16}
                sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                {localParticipant && (
                    <VideoTile
                        id={localParticipant.session_id}
                        isLocal
                        isAlone={isAlone}
                        isScreenShare={false}
                    />
                )}
                <>
                    {remoteParticipantIds.map((id) => (
                        <VideoTile key={id} id={id} isScreenShare={false} isAlone={false} isLocal={false}/>
                    ))}
                    {screens.map((screen) => (
                        <VideoTile key={screen.screenId} id={screen.session_id} isScreenShare isAlone={false} isLocal={false}/>
                    ))}
                    <DailyAudio />
                </>
            </Grid>
        </Box>
    );

    return (<>
        {getUserMediaError ? <>USERMEDIAERROR</> : renderCallScreen()}
        <TempDirections/>
    </>);
}
