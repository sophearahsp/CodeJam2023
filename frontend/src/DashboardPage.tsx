import { useState } from 'react'
import { Box, TextField, Paper, Button, Grid, Stack, Typography } from "@mui/material";
import { supabase } from './supabaseClient'
import FeedPost from './FeedPost';

const Feed = () => {
    return (
        <Stack
            p={3}
            spacing={4}
        >
            <FeedPost/>
            <FeedPost/>
            <FeedPost/>
            <FeedPost/>
            <FeedPost/>
        </Stack>
    )
}

function DashboardPage() {
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
                            <Button size={"large"} style={{ width: '100%' }} variant="contained" color="primary">
                                JOIN
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
                    {/* </Paper> */}
                </Grid>

                {/* Middle Section */}
                <Grid item xs={6} sx={{height: '100%', overflowY: 'auto'}}>
                    <Feed/>
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
