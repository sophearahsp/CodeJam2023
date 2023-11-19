import React, { useEffect, useState } from 'react';
import {Button, TextField, Typography, Box, Modal, Stack} from '@mui/material'
import { supabase } from '../../supabaseClient'

export interface Profile {
    username: string;
    bio: string;
    user_id: number;
}

export interface User {
    id: number;
}

function EditProfileModal(props: { open: boolean; handleClose: () => void }) {
    const { open, handleClose } = props;

    const [bio, setBio] = useState('');
    const [username, setUsername] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);

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
                setUsername(profileData.username);
                setBio(profileData.bio);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchUserData();
    }, []);

    const handleSave = async () => {
        try {
            // Ensure user and profile data are available
            if (!user || !profile) {
                console.error('User or profile data is missing');
                return;
            }

            // Update the profile data in the 'profiles' table
            const { data, error } = await supabase
                .from('profiles')
                .update({ username, bio })
                .eq('user_id', user.id);

            if (error) {
                throw error;
            }

            console.log('Profile updated successfully:', data);
            handleClose(); // Close the modal after successful update
        } catch (error) {
            console.error('Error updating profile', error);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                p={3}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    backgroundColor: 'white',
                    boxShadow: 24,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                    Edit Profile
                </Typography>

                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <TextField
                    label="Bio"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <Stack direction={"row"} spacing={1} sx={{justifyContent: 'flex-end'}}>
                    <Button variant="outlined" color="primary" onClick={() => console.log("cancel")}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}

export default EditProfileModal;
