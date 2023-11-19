// Router.tsx
import React, {ReactNode, useState, useEffect} from 'react';
import { Routes, Route, Navigate, useLocation, BrowserRouter } from 'react-router-dom';
import AuthPage from './AuthPage';
import DashboardPage from './DashboardPage';
import { create } from 'zustand'
import QuickJoinPage from './QuickJoinPage';

interface AuthStore {
    authenticated: boolean;
    setAuthenticated: (value: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    authenticated: false,
    setAuthenticated: (value) => set({ authenticated: value }),
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
                            <DashboardPage />
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
