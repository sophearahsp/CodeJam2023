import React, { useState } from 'react';
import {Button, TextField, Typography, Box, Modal, Stack} from '@mui/material'
import { supabase } from '../../supabaseClient'

function EditProfileModal(props: { open: boolean; handleClose: () => void }) {
    const { open, handleClose } = props;

    const [bio, setBio] = useState('');
    const [username, setUsername] = useState('');

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
                    <Button variant="contained" color="primary" onClick={() => console.log("save")}>
                        Save
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}

export default EditProfileModal;
