import React, {useState, useEffect} from 'react';
import { Avatar, IconButton, Button, Box, Typography, Stack, Divider } from '@mui/material';
import FeedPost from './components/Dashboard/FeedPost';
import { supabase } from './supabaseClient'
import {Post} from './Feed';
import EditIcon from '@mui/icons-material/Edit';
import EditProfileModal from './components/Dashboard/EditProfileModal';
import {useParams} from 'react-router-dom';

const bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

export interface Profile {
    username: string;
    bio: string;
    user_id: number;
    image_url: string;
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
    let { username } = useParams();

    useEffect(() => {
        // Fetch user data and posts from Supabase
        const fetchUserData = async () => {
            try {
                const { data: d, error: userError } = await supabase.auth.getUser();

                setUser(d.user);

                // Fetch user profile data
                const { data: profileData, error: profileError } = await supabase
                    .from('profiles')
                    .select('user_id, username, bio, image_url')
                    .eq('username', username || profile?.username)
                    .single();
                
                if (profileError) {
                    throw profileError;
                }
                
                setProfile(profileData);

                const { data: userFromUsername, error: userFromUsernameError } = await supabase
                    .from('profiles')
                    .select('username, user_id')
                    .eq('username', username || profile?.username)
                    .single();
                
                const { data: fetchedPosts, error } = await supabase
                    .from('posts')
                    .select('id, content, user_id, profile_id (username, image_url)')
                    .eq('user_id', userFromUsername?.user_id || d.user.id)

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
                            src={profile ? profile.image_url : ""}
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
                        <FeedPost id={post.id} content={post.content} user_id={post.profile_id.username}
                            image_url={post.profile_id.image_url || ""}
                        />
                    </div>
                ))}
            </Stack>
            <EditProfileModal open={open} handleClose={handleClose}/>
        </Stack>
    );
}

export default Profile
