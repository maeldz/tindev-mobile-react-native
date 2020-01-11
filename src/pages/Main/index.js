import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import logo from '../../assets/logo.png';
import dislike from '../../assets/dislike.png';
import like from '../../assets/like.png';
import itsamatch from '../../assets/itsamatch.png';

import {
  Container,
  LogoutButton,
  Logo,
  EmptyText,
  CardContainer,
  Card,
  Avatar,
  Footer,
  Name,
  Bio,
  ButtonsContainer,
  DislikeButton,
  DislikeImage,
  LikeButton,
  LikeImage,
  MatchContainer,
  ItsaMatchImage,
  MatchAvatar,
  MatchName,
  MatchBio,
  CloseButton,
  CloseButtonText,
} from './styles';

export default function Main({ navigation }) {
  const [devs, setDevs] = useState(null);
  const [userId, setUserId] = useState('');
  const [matchDev, setMatchDev] = useState(null);

  useEffect(() => {
    async function loadDevs() {
      const id = await AsyncStorage.getItem('userId');

      setUserId(id);

      const response = await api.get('/devs', { headers: { user: id } });

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  useEffect(() => {
    async function loadSocket() {
      const id = await AsyncStorage.getItem('userId');
      const socket = io(api.defaults.baseURL, {
        query: { user: id },
      });

      socket.on('match', dev => {
        setMatchDev(dev);
      });
    }

    loadSocket();
  }, []);

  async function handleLike() {
    const [dev, ...rest] = devs;

    await api.post(`/devs/${dev._id}/likes`, null, {
      headers: { user: userId },
    });

    setDevs(rest);
  }

  async function handleDislike() {
    const [dev, ...rest] = devs;

    await api.post(`/devs/${dev._id}/dislikes`, null, {
      headers: { user: userId },
    });

    setDevs(rest);
  }

  async function handleLogout() {
    await AsyncStorage.clear();
    navigation.navigate('SignIn');
  }

  return (
    <Container>
      <LogoutButton onPress={handleLogout}>
        <Logo source={logo} />
      </LogoutButton>
      <CardContainer>
        {devs &&
          (devs.length === 0 ? (
            <>
              <EmptyText>Acabou :(</EmptyText>
            </>
          ) : (
            devs.map((dev, index) => (
              <Card key={dev._id} zIndex={devs.length - index}>
                <Avatar source={{ uri: dev.avatar }} />
                <Footer>
                  <Name>{dev.name}</Name>
                  <Bio numberOfLines={3}>{dev.bio}</Bio>
                </Footer>
              </Card>
            ))
          ))}
      </CardContainer>
      {devs && devs.length > 0 && (
        <ButtonsContainer>
          <DislikeButton style={styles.shadow} onPress={handleDislike}>
            <DislikeImage source={dislike} />
          </DislikeButton>
          <LikeButton style={styles.shadow} onPress={handleLike}>
            <LikeImage source={like} />
          </LikeButton>
        </ButtonsContainer>
      )}

      {matchDev && (
        <MatchContainer>
          <ItsaMatchImage source={itsamatch} />
          <MatchAvatar source={{ uri: matchDev.avatar }} />

          <MatchName>{matchDev.name}</MatchName>
          <MatchBio>{matchDev.bio}</MatchBio>

          <CloseButton onPress={() => setMatchDev(null)}>
            <CloseButtonText>FECHAR</CloseButtonText>
          </CloseButton>
        </MatchContainer>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  shadow: {
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
