import React, { useCallback, useState } from 'react';
import {
  useDaily,
  useScreenShare,
  useLocalParticipant,
  useVideoTrack,
  useAudioTrack,
  useDailyEvent,
} from '@daily-co/daily-react';
import { Box, TextField, Button, Stack } from "@mui/material";
import Call from './Call';
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
            <Stack direction={"row"}
                sx={{
                    height: '100%',
                    width: '100%'
                }}
            >
                <Stack
                    sx={{
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <Call/>
                    <Tray leaveCall={leaveCall}/>
                </Stack>
                <Chat showChat={true} toggleChat={() => console.log()}/>
            </Stack>
        </Box>
    );
}

export default RoomScreen;