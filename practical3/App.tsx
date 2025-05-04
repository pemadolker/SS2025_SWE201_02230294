import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import TodoScreen from './screens/TodoScreen'
import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const handleLogout = () => {
    setSession(null)
  }

  return (
    <View style={{ flex: 1 }}>
      {session && session.user ? (
        <TodoScreen onLogout={handleLogout} />
      ) : (
        <Auth />
      )}
    </View>
  )
}
