import React, { useState } from 'react'
import { Alert, StyleSheet, View, ActivityIndicator } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Input } from '@rneui/themed'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both fields.')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert('Login Error', error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both fields.')
      return
    }

    setLoading(true)
    const { data: { session }, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert('Signup Error', error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
          keyboardType="email-address"
          errorMessage={!email ? 'Email is required' : undefined}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
          errorMessage={!password ? 'Password is required' : undefined}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title="Sign in"
          disabled={loading}
          onPress={signInWithEmail}
          buttonStyle={styles.button}
          loading={loading}
          loadingProps={{ size: 'small', color: 'white' }}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title="Sign up"
          disabled={loading}
          onPress={signUpWithEmail}
          buttonStyle={styles.button}
          loading={loading}
          loadingProps={{ size: 'small', color: 'white' }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
    backgroundColor: '#F9F9FB', // Lighter background color
    flex: 1,
    justifyContent: 'center',
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4CAF50', // Custom green for button
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
})
