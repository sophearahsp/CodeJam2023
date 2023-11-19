import { useParticipantProperty } from '@daily-co/daily-react';
import { Typography } from "@mui/material";

interface UsernameProps {
	id: string;
	isLocal: boolean;
}

const UsernameLabel = ({ id, isLocal }: UsernameProps) => {
    const username = useParticipantProperty(id, 'user_name');
  
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
            {username || id} {isLocal && '(you)'}
        </Typography>
    );
}

export default UsernameLabel;