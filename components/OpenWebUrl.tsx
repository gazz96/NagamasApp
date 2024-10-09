import { StyleSheet, Text, View, Linking, Alert } from 'react-native'
import React, { useCallback } from 'react'

const OpenWebUrl = async (url) => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
    } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
    }
}

export default OpenWebUrl

const styles = StyleSheet.create({})