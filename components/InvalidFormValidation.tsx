import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Toast from 'react-native-toast-message'

const InvalidFormValidation = (errors: object) => {
  for(let err in errors) {
    Toast.show({
      text1: errors[err],
      type: 'error'
    })
  }
}

export default InvalidFormValidation;

const styles = StyleSheet.create({})