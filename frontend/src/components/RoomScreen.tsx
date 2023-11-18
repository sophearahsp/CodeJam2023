import React, { useCallback, useState } from 'react';
import {
  useDaily,
  useScreenShare,
  useLocalParticipant,
  useVideoTrack,
  useAudioTrack,
  useDailyEvent,
} from '@daily-co/daily-react';
import { Box, TextField, Button, Grid, Stack } from "@mui/material";
import Call from './Room/Call';
import Tray from './Room/Tray';
import Chat from './Room/Chat';

interface RoomScreenProps {
	leaveCall: () => void;
}

const RoomScreen = ({ leaveCall }: RoomScreenProps) => {
    
    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            
            <Grid container columns={16}>
                <Grid item md={13} lg={13}>
                    <Stack
                        sx={{
                            height: '100%',
                            width: '100%',
                        }}
                    >
                        <Call/>
                        <Tray leaveCall={leaveCall}/>
                    </Stack>
                </Grid>

                <Grid item md={3} lg={3}>
                    <Chat showChat={true} toggleChat={() => console.log()}/>
                </Grid>
            </Grid>
        </Box>
    );
}

export default RoomScreen;