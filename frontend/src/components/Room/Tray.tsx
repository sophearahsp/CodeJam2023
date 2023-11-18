import React, { useCallback, useState } from 'react';
import {
  useDaily,
  useScreenShare,
  useLocalParticipant,
  useVideoTrack,
  useAudioTrack,
  useDailyEvent,
} from '@daily-co/daily-react';
import { Box, IconButton, Paper, Typography, TextField, ButtonGroup, Button, Stack } from "@mui/material";
import Chat from './Chat';
import {
    PlaceholderOnIcon,
    PlaceholderOffIcon,
    PlaceholderOtherIcon
} from '../Icons';
import {Videocam, VideocamOff, Mic, MicOff} from '@mui/icons-material';

interface TrayProps {
	leaveCall: () => void;
}

const Tray = ({ leaveCall }: TrayProps) => {
    const callObject = useDaily();
    const { isSharingScreen, startScreenShare, stopScreenShare } = useScreenShare();

    const [showMeetingInformation, setShowMeetingInformation] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [newChatMessage, setNewChatMessage] = useState(false);

    const localParticipant = useLocalParticipant();
    const localVideo = useVideoTrack(localParticipant?.session_id || "");
    const localAudio = useAudioTrack(localParticipant?.session_id || "");
    const mutedVideo = localVideo.isOff;
    const mutedAudio = localAudio.isOff;

    /* When a remote participant sends a message in the chat, we want to display a differently colored
    * chat icon in the Tray as a notification. By listening for the `"app-message"` event we'll know
    * when someone has sent a message. */
    useDailyEvent(
        'app-message',
        useCallback(() => {
        /* Only light up the chat icon if the chat isn't already open. */
        if (!showChat) {
            setNewChatMessage(true);
        }
        }, [showChat]),
    );

    const toggleVideo = useCallback(() => {
        if (callObject)
        callObject.setLocalVideo(mutedVideo);
    }, [callObject, mutedVideo]);

    const toggleAudio = useCallback(() => {
        if (callObject)
        callObject.setLocalAudio(mutedAudio);
    }, [callObject, mutedAudio]);

    const toggleScreenShare = () => (isSharingScreen ? stopScreenShare() : startScreenShare());

    const toggleMeetingInformation = () => {
        setShowMeetingInformation(!showMeetingInformation);
    };

    const toggleChat = () => {
        setShowChat(!showChat);
        if (newChatMessage) {
            setNewChatMessage(!newChatMessage);
        }
    };

    return (
        <Stack
            direction="row"
            p={2}
            sx={{
                justifyContent: 'space-between'
            }}
        >
            <Paper sx={{
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'none',
            }}>
                <Typography sx={{ fontWeight: 'bold', color: 'black' }}>
                    Time left: 20:00
                </Typography>
            </Paper>
            <Stack direction={'row'} spacing={2}>
                <IconButton
                    onClick={toggleVideo}
                    size={'large'}
                    sx={{
                        backgroundColor: mutedVideo ? '#fa5252' : '#ffffff',
                        borderRadius: '4px',
                    }}
                >
                    {mutedVideo ? <VideocamOff /> : <Videocam />}
                </IconButton>
                <IconButton
                    size={'large'}
                    onClick={toggleAudio}
                    sx={{
                        backgroundColor: mutedAudio ? '#fa5252' : '#ffffff',
                        borderRadius: '4px',
                    }}
                >
                    {mutedAudio ? <MicOff /> : <Mic />}
                </IconButton>
            </Stack>
            <Button
                onClick={leaveCall}
                sx={{
                    backgroundColor: "#fa5252",
                    '&:hover': {
                        backgroundColor: '#ff7675', // Change to the desired color on hover
                    },
                }}
                size={'large'}
                
            >
                <Typography sx={{ fontWeight: 'bold', color: 'white' }}>
                    Leave call
                </Typography>
            </Button>
        </Stack>
    );
}

export default Tray;