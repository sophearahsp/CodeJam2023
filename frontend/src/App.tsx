import { useState, useEffect } from 'react'
import QuickJoinPage from './QuickJoinPage';
import DashboardPage from './DashboardPage';
import AuthPage from './AuthPage';
import { supabase } from './supabaseClient' 
import { Session, AuthChangeEvent } from '@supabase/supabase-js'; // Replace with your actual import paths

function App() {
	const [session, setSession] = useState<Session | null>(null)

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session: Session } }) => {
			setSession(session)
		})
	
		supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session) => {
			setSession(session)
		})
	}, [])

    return (
		<>
			{!session ? <AuthPage /> : <DashboardPage />}
			{/* <QuickJoinPage/> */}
		</>
    )
}

export default App
