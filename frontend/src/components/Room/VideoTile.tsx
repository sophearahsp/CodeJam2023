import { DailyVideo, useDevices, useLocalParticipant, useVideoTrack, useAudioTrack, useMediaTrack } from '@daily-co/daily-react';
import UsernameLabel from './UsernameLabel';
import GridTile from './GridTile';
import { Typography, Box, Avatar } from '@mui/material';
import { useAuthStore, AuthStore } from '../../Router';

interface TileProps {
	id: string;
	isScreenShare: boolean;
    isLocal: boolean;
    isAlone: boolean;
}

const VideoTile = ({ id, isScreenShare, isLocal, isAlone }: TileProps) => {
    const profile = useAuthStore((state: AuthStore) => state.profile);

    const localParticipant = useLocalParticipant();
    const localVideo = useVideoTrack(localParticipant?.session_id || "");
    const localAudio = useAudioTrack(localParticipant?.session_id || "");
    const mutedVideo = localVideo.isOff;
    const mutedAudio = localAudio.isOff;

    return (
        <GridTile>
            {
                isLocal && !mutedVideo ? <>
                    <DailyVideo automirror sessionId={id} type={isScreenShare ? 'screenVideo' : 'video'} style={{width: '100%', borderRadius: '8px'}}/>   
                </> : <>
                    <Box sx={{width: 800, height: 300, backgroundColor: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar
                            src={profile ? profile.image_url : ""}
                            sx={{
                                height: '100%',
                                width: '100%',
                                borderRadius: 0,
                            }}
                        />
                    </Box>
                </>
            }
            <UsernameLabel id={id} isLocal={isLocal} />
            {/* {
                isLocal && <>
                    <Typography>mutedVideo: {mutedVideo.toString()}</Typography>
                    <Typography>mutedAudio: {mutedAudio.toString()}</Typography>
                </>
            } */}
        </GridTile>
    );
}

export default VideoTile;