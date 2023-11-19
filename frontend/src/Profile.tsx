import React, {useState, useEffect} from 'react';
import { Avatar, IconButton, Button, Box, Typography, Stack, Divider } from '@mui/material';
import FeedPost from './components/Dashboard/FeedPost';
import { supabase } from './supabaseClient'
import {Post} from './Feed';
import EditIcon from '@mui/icons-material/Edit';
import EditProfileModal from './components/Dashboard/EditProfileModal';

const bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

export interface Profile {
    username: string;
    bio: string;
    user_id: number;
}

export interface User {
    id: number;
}

function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        // Fetch user data and posts from Supabase
        const fetchUserData = async () => {
            try {
                const { data: d, error: userError } = await supabase.auth.getUser();

                setUser(d.user);

                // Fetch user profile data
                const { data: profileData, error: profileError } = await supabase
                    .from('profiles')
                    .select('user_id, username, bio')
                    .eq('user_id', d.user.id)
                    .single();
                
                if (profileError) {
                    throw profileError;
                }
                
                setProfile(profileData);

                const { data: fetchedPosts, error } = await supabase
                    .from('posts')
                    .select('id, content, user_id')
                    .eq('user_id', d.user.id);

                if (error) {
                    throw error;
                }

                setPosts(fetchedPosts);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <Stack spacing={2}>
            {user && (
                <Stack spacing={1}>
                    <Stack direction="row" justifyContent="space-between"
                        sx={{
                            alignItems: 'flex-start',
                        }}
                    >
                        <Avatar
                            alt={'altcontent'}
                            src={'https://m.media-amazon.com/images/I/61hOiRFDCHL._AC_UF1000,1000_QL80_.jpg'}
                            sx={{ width: 100, height: 100 }}
                        />
                        <IconButton
                            onClick={handleOpen}
                            size="small"
                            sx={{
                                borderRadius: '50%',
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                    </Stack>
                    <Typography fontWeight="bold">{profile?.username}</Typography>
                    <Typography>{profile?.bio || bio}</Typography>
                </Stack>
            )}

            <Stack spacing={2}>
                {posts.map((post) => (
                    <div key={post.id}>
                        <FeedPost id={post.id} content={post.content} user_id={post.user_id} />
                    </div>
                ))}
            </Stack>
            <EditProfileModal open={open} handleClose={handleClose}/>
        </Stack>
    );
}

export default Profile
