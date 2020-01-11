import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SignIn from './pages/SignIn';
import Main from './pages/Main';

export default createAppContainer(
  createSwitchNavigator({
    SignIn,
    Main,
  }),
);
