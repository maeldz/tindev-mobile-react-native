import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import logo from '../../assets/logo.png';

import {
  Container,
  Logo,
  Input,
  SubmitButton,
  SubmitButtonText,
} from './styles';

export default function SignIn({ navigation }) {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    async function loadStorage() {
      const savedUsername = await AsyncStorage.getItem('userId');

      if (savedUsername) {
        navigation.navigate('Main', { savedUsername });
      } else {
        setUsername(['', { logged: false }]);
      }
    }
    loadStorage();
  }, [navigation]);

  async function handleSubmit() {
    const response = await api.post('/devs', { username: username[0] });

    const { _id } = response.data;

    await AsyncStorage.setItem('userId', _id);

    navigation.navigate('Main', { id: _id });
  }

  return username && !username[1].logged ? (
    <Container behavior="padding" enabled={Platform.OS === 'ios'}>
      <Logo source={logo} />
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Digite seu usuário do GitHub"
        placeholderTextColor="#999"
        value={username[0]}
        onChangeText={text => setUsername([text, { logged: false }])}
      />
      <SubmitButton onPress={handleSubmit}>
        <SubmitButtonText>Entrar</SubmitButtonText>
      </SubmitButton>
    </Container>
  ) : null;
}
