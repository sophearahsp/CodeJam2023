import { useParticipantProperty } from '@daily-co/daily-react';
import { Box } from "@mui/material";

interface UsernameProps {
	id: string;
	isLocal: boolean;
}

const UsernameLabel = ({ id, isLocal }: UsernameProps) => {
    const username = useParticipantProperty(id, 'user_name');
  
    return (
        <Box>
            {username || id} {isLocal && '(you)'}
        </Box>
    );
}

export default UsernameLabel;