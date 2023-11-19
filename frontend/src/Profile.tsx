import React, {useState, useEffect} from 'react';
import { Avatar, Box, Typography, Stack, Divider } from '@mui/material';
import FeedPost from './components/Dashboard/FeedPost';
import { supabase } from './supabaseClient'
import {Post} from './Feed';

const bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

export interface User {
    id: number;
}

function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        // Fetch user data and posts from Supabase
        const fetchUserData = async () => {
            try {
                const { data: d, error: userError } = await supabase.auth.getUser();

                setUser(d.user);

                const { data: fetchedPosts, error } = await supabase
                    .from('posts')
                    .select('id, content, user_id')
                    .eq('user_id', d.user.id);
                if (error) {
                    throw error;
                }

                setPosts(fetchedPosts);
            } catch (error) {
                console.error('Error fetching posts', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <Stack spacing={2}>
            {user && (
                <Stack spacing={1}>
                    <Avatar alt={"altcontent"} src={"https://m.media-amazon.com/images/I/61hOiRFDCHL._AC_UF1000,1000_QL80_.jpg"} sx={{ width: 100, height: 100 }} />
                    <Typography fontWeight={"bold"}>{"username"}</Typography>
                    <Typography>{bio}</Typography>
                </Stack>
            )}

            <Stack spacing={2}>
                {posts.map((post) => (
                    <div key={post.id}>
                        <FeedPost id={post.id} content={post.content} user_id={post.user_id} />
                    </div>
                ))}
            </Stack>
        </Stack>
    );
}

export default Profile
