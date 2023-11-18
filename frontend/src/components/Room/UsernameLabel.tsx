import { useParticipantProperty } from '@daily-co/daily-react';

interface UsernameProps {
	id: string;
	isLocal: boolean;
}

const UsernameLabel = ({ id, isLocal }: UsernameProps) => {
    const username = useParticipantProperty(id, 'user_name');
  
    return (
        <div className="username">
            {username || id} {isLocal && '(you)'}
        </div>
    );
}

export default UsernameLabel;