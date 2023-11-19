// Router.tsx
import React, {ReactNode, useState, useEffect} from 'react';
import { Routes, Route, Navigate, useLocation, BrowserRouter } from 'react-router-dom';
import AuthPage from './AuthPage';
import DashboardPage from './DashboardPage';
import { create } from 'zustand'
import QuickJoinPage from './QuickJoinPage';

export interface Profile {
    username: string;
    bio: string;
    user_id: number;
}

export interface User {
    id: number;
}

interface AuthStore {
    authenticated: boolean;
    setAuthenticated: (value: boolean) => void;
    user: User | null;
    profile: Profile | null;
    setUser: (value: User) => void;
    setProfile: (value: Profile) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    authenticated: false,
    setAuthenticated: (value) => set({ authenticated: value }),
    user: null,
    profile: null,
    setUser: (value: User) => set({user: value}),
    setProfile: (value: Profile) => set({profile: value}),
}));
  
const Router = () => {
    const authenticated = useAuthStore((state) => state.authenticated);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        authenticated ? <Navigate to="/home" replace={true} /> : <Navigate to="/login" replace={true} />
                    }
                />

                <Route
                    path="/home"
                    element={
                        <RequireAuth>
                            <DashboardPage profile={false}/>
                        </RequireAuth>
                    }
                />

                <Route
                    path="/user/:username"
                    element={
                        <RequireAuth>
                            <DashboardPage profile={true}/>
                        </RequireAuth>
                    }
                />

                <Route
                    path="/quickjoin"
                    element={
                        <QuickJoinPage />
                    }
                />
                <Route path="/login" element={<AuthPage />} />
            </Routes>
        </BrowserRouter>
    );
};

function RequireAuth({ children }: { children: JSX.Element }) {
    const authenticated = useAuthStore((state) => state.authenticated);
    let location = useLocation();
  
    if (!authenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
  }

export default Router;
