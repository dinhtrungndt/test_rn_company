/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import JokeHome from './src/components/screens/JokeHome';

AppRegistry.registerComponent(appName, () => JokeHome);
