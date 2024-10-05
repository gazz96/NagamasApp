import { StyleSheet, Text, View } from 'react-native'
import React, { Children } from 'react'

const LoadIf = (condition = false, children = null, defaultView = null) => {
  return (
    <>
        {
            (condition) ? children : defaultView
        }
    </>
  )
}

export default LoadIf

const styles = StyleSheet.create({})