/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Demo from './components/Demo';
import Emoji from './components/Emoji';

AppRegistry.registerComponent(appName, () => Demo);
