import React from 'react';
import { connect } from 'react-redux';
import { Text, VStack } from 'native-base';

const Account = () => {
  //TODO: With how we're handling Hasura, we should just be able to get everything from redux
  return (
    <VStack safeArea>
      <Text>Account Screen</Text>
    </VStack>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(Account);
