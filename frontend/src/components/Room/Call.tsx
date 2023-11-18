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
                    width: '100%',
                    height: remoteParticipantIds?.length > 0 ? '100%' : '50%',
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
                {remoteParticipantIds?.length > 0 || screens?.length > 0 ? (
                    <>
                        {remoteParticipantIds.map((id) => (
                            <VideoTile key={id} id={id} isScreenShare={false} isAlone={false} isLocal={false}/>
                        ))}
                        {screens.map((screen) => (
                            <VideoTile key={screen.screenId} id={screen.session_id} isScreenShare isAlone={false} isLocal={false}/>
                        ))}
                        <DailyAudio />
                    </>
                ) : (
                    <GridTile>
                        <Box
                            padding={2}
                            sx={{
                                height: '100%',
                                backgroundColor: 'lightblue',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '8px',
                            }}
                        >
                            <Stack>
                                <Typography sx={{fontWeight: 'bold'}}>
                                    Waiting for others
                                </Typography>

                                <Typography>
                                    Invite someone by sharing this link: {window.location.href}
                                </Typography>
                            </Stack>
                        </Box>
                    </GridTile>
                )}
            </Grid>
        </Box>
    );

    return getUserMediaError ? <>USERMEDIAERROR</> : renderCallScreen();
}
