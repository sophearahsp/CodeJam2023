import { useParticipantProperty, useLocalParticipant, useVideoTrack, useAudioTrack} from '@daily-co/daily-react';
import { Typography, Box, Stack } from "@mui/material";
import {useAuthStore, AuthStore } from '../../Router';

interface UsernameProps {
	id: string;
	isLocal: boolean;
}

const UsernameLabel = ({ id, isLocal }: UsernameProps) => {
    const username = useParticipantProperty(id, 'user_name');
    const profile = useAuthStore((state: AuthStore) => state.profile);

    const localParticipant = useLocalParticipant();
    const localVideo = useVideoTrack(localParticipant?.session_id || "");
    const localAudio = useAudioTrack(localParticipant?.session_id || "");
    const mutedVideo = localVideo.isOff;
    const mutedAudio = localAudio.isOff;

    return (
        <Box
            style={{
                position: 'absolute',
                top: '100%',
                left: '8px',
                transform: 'translate(0%, -150%)',
                // color: 'gray',
                // fontWeight: 'bold',
            }}
        >
            <Stack direction={'row'} sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography
                    style={{
                        // position: 'absolute',
                        // top: '100%',
                        // left: '8px',
                        // transform: 'translate(0%, -150%)',
                        color: 'lightgray',
                        fontWeight: 'bold',
                    }}
                >
                    {profile?.username || "Guest " + id} {isLocal && '(you)'}
                </Typography>
                
                {/* {
                    isLocal && <>
                        <Typography>mutedVideo: {mutedVideo.toString()}</Typography>
                        <Typography>mutedAudio: {mutedAudio.toString()}</Typography>
                    </>
                } */}
            </Stack>
        </Box>
    );
}

export default UsernameLabel;