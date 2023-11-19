import React, { useState, MouseEvent, HTMLButtonElement } from 'react'
import { Box, Modal, TextField, Paper, Button, Grid, Stack, Typography } from "@mui/material";
import { supabase } from './supabaseClient'
import Feed from './Feed';
import CreateModal from './components/Dashboard/CreateModal';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';

function DashboardPage() {
    const [profileView, setProfileView] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    
    const handleProfile = (e: MouseEvent<HTMLButtonElement>) => {
        setProfileView(true)
    }

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            
            <CreateModal open={open} handleClose={handleClose}/>
            
            <Grid container sx={{height: '100%'}}>
                {/* Left Section */}
                <Grid item xs={3} p={2} sx={{height: '100%'}}>
                    {/* <Paper style={{ height: '100vh'}}> */}
                        {/* Left Section */}
                        <Stack
                            sx={{
                                justifyContent: 'space-between',
                                height: '100%'
                            }}
                        >
                            <Button size={"large"} style={{ width: '100%' }} variant="contained" color="primary"
                                onClick={() => navigate('/quickjoin')}
                            >
                                JOIN
                            </Button>
                            <Stack
                                spacing={2}
                            >
                                <Button
                                    size={"large"}
                                    style={{ width: '100%' }}
                                    variant="outlined" color="primary"
                                    onClick={handleOpen}
                                >
                                    Create
                                </Button>

                                <Button
                                    size={"large"}
                                    style={{ width: '100%' }}
                                    variant="outlined" color="primary"
                                    onClick={handleProfile}
                                >
                                    Profile
                                </Button>

                                <Button
                                    size={"large"}
                                    style={{ width: '100%' }}
                                    variant="outlined" color="primary"
                                    onClick={() => supabase.auth.signOut()}
                                >
                                    Sign Out
                                </Button>
                            </Stack>
                        </Stack>
                    {/* </Paper> */}
                </Grid>

                {/* Middle Section */}
                <Grid item xs={6} sx={{height: '100%', overflowY: 'auto', borderLeft: 1, borderRight: 1, borderColor: '#DEE2E6'}} p={2} >
                    {profileView ? <Profile/> : <Feed/>}
                </Grid>

                {/* Right Section */}
                <Grid item xs={3}>
                    {/* <Paper style={{ height: '100vh'}}> */}
                        {/* Right Section */}
                    {/* </Paper> */}
                </Grid>
            </Grid>
        </Box>
    )
}

export default DashboardPage
