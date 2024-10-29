/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import {
    MD3LightTheme as DefaultTheme,
    PaperProvider
} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import currency from 'currency.js';
import { Text, View } from 'react-native';

const toastConfig = {
    tomatoToast: ({ text1, props }) => (
        <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
            <Text>{text1}</Text>
            <Text>{props.uuid}</Text>
        </View>
    ),
    snackBarToast: ({ text1, props }) => (
        <View style={{
            paddingHorizontal: 16,
            shadowColor: '#171717',
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3
        }}>
            <View style={{
                height: 60, width: '100%', backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16,
                borderRadius: 8
            }}>
                <Text style={{ color: '#222' }}>{text1}</Text>
                <Text onPress={props.onPress} style={{ color: 'red' }}>{props.onPressText}</Text>
            </View>
        </View>
    )
}

const theme = {
    ...DefaultTheme,
    // Specify custom property in nested object
    "colors": {
    "primary": "rgb(217, 4, 4)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(240, 219, 255)",
    "onPrimaryContainer": "rgb(44, 0, 81)",
    "secondary": "rgb(102, 90, 111)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(237, 221, 246)",
    "onSecondaryContainer": "rgb(33, 24, 42)",
    "tertiary": "rgb(128, 81, 88)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(255, 217, 221)",
    "onTertiaryContainer": "rgb(50, 16, 23)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(255, 251, 255)",
    "onBackground": "rgb(29, 27, 30)",
    "surface": "rgb(255, 251, 255)",
    "onSurface": "rgb(29, 27, 30)",
    "surfaceVariant": "rgb(255, 234, 235)",
    "onSurfaceVariant": "rgb(74, 69, 78)",
    "outline": "rgb(124, 117, 126)",
    "outlineVariant": "rgb(204, 196, 206)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(50, 47, 51)",
    "inverseOnSurface": "rgb(245, 239, 244)",
    "inversePrimary": "rgb(220, 184, 255)",
    "elevation": {
        "level0": "transparent",
        "level1": "rgb(248, 242, 251)",
        "level2": "rgb(244, 236, 248)",
        "level3": "rgb(240, 231, 246)",
        "level4": "rgb(239, 229, 245)",
        "level5": "rgb(236, 226, 243)"
    },
    "surfaceDisabled": "rgba(29, 27, 30, 0.12)",
    "onSurfaceDisabled": "rgba(29, 27, 30, 0.38)",
    "backdrop": "rgba(51, 47, 55, 0.4)"
    }
  };

const Main = () => {
    return (
        <PaperProvider theme={theme}>
            <App />
            <Toast config={toastConfig} visibilityTime={1000} />
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
