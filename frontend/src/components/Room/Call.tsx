import React, { useState, useCallback, useMemo } from 'react';
import {
  useParticipantIds,
  useScreenShare,
  useLocalParticipant,
  useDailyEvent,
  DailyAudio,
} from '@daily-co/daily-react';
import { Box, TextField, Typography, Grid, Button, Stack } from "@mui/material";

import VideoTile from './VideoTile';
import GridTile from './GridTile';

//import UserMediaError from '../UserMediaError/UserMediaError';

export default function Call() {
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

    return getUserMediaError ? <>USERMEDIAERROR</> : renderCallScreen();
}
