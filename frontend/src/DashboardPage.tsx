import { useState } from 'react'
import { Box, TextField, Paper, Button, Grid, Stack } from "@mui/material";

function DashboardPage() {
    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Grid container>
                {/* Left Section */}
                <Grid item xs={3} p={2}>
                    {/* <Paper style={{ height: '100vh'}}> */}
                        {/* Left Section */}
                        <Button size={"large"} style={{ width: '100%' }} variant="contained" color="primary">
                            JOIN
                        </Button>
                    {/* </Paper> */}
                </Grid>

                {/* Middle Section */}
                <Grid item xs={6}>
                    <Paper style={{ height: '100vh'}}>
                        {/* Middle Section */}
                    </Paper>
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
