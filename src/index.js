import React from 'react';
import { YellowBox } from 'react-native';

import Routes from './routes';

YellowBox.ignoreWarnings(['Unrecognized WebSocket connection option(s)']);

export default function App() {
  return <Routes />;
}
