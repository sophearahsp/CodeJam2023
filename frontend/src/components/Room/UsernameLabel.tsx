import { useParticipantProperty } from '@daily-co/daily-react';
import { Typography } from "@mui/material";
import {useAuthStore, AuthStore } from '../../Router';

interface UsernameProps {
	id: string;
	isLocal: boolean;
}

const UsernameLabel = ({ id, isLocal }: UsernameProps) => {
    const username = useParticipantProperty(id, 'user_name');
    const profile = useAuthStore((state: AuthStore) => state.profile);

    return (
        <Typography
            style={{
                position: 'absolute',
                top: '100%',
                left: '8px',
                transform: 'translate(0%, -150%)',
                color: 'white',
                fontWeight: 'bold',
            }}
        >
            {profile?.username || "Guest " + id} {isLocal && '(you)'}
        </Typography>
    );
}

export default UsernameLabel;