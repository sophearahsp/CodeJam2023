// AuthPage.tsx
import React, { useState, useEffect } from 'react';
import { Session, createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate, BrowserRouter } from 'react-router-dom';
import { supabase } from './supabaseClient'
import {useAuthStore} from './Router';

const AuthPage: React.FC = () => {
    const authenticated = useAuthStore((state) => state.authenticated);
    const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
    const setUser = useAuthStore((state) => state.setUser);
    const setProfile = useAuthStore((state) => state.setProfile);
    const navigate = useNavigate();
  
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                setAuthenticated(true);
                navigate('/home'); // Redirect to /dashboard if authenticated
            }
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setAuthenticated(true);
                navigate('/home'); // Redirect to /dashboard if authenticated
            } else {
                setAuthenticated(false);
                navigate('/login');
            }
        })

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
                
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchUserData();
    }, [setAuthenticated, navigate]);
  
    return (
        <>
            {!authenticated ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
                    <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
                </div>

            ) : (
                <div>Redirecting to Dashboard...</div>
            )}
        </>
    );
};

export default AuthPage;
