import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'native-base';
import { connect } from 'react-redux'



const Layout = ({children}) => {

  return (
    <View style={styles.container}>
      <Text fontSize='5xl'>I am Layout (wrapper)</Text>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '100%',
    width: '100%',
  }
})

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)