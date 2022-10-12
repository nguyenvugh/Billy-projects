import {Box, Button, Input, Text} from 'native-base';
import React, {useState} from 'react';
import {useAuthContext} from '../../hooks/useAuthContext';
import {NavigateProps} from '../routes/Routes';

type RegisterProps = NavigateProps;
function Register({navigation}: RegisterProps) {
  const {isRegistering, registerByEmailAndPass} = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleRegister() {
    registerByEmailAndPass(email, password, _user => {
      navigation.navigate('Signing');
    });
  }
  return (
    <Box p="5">
      <Text textAlign="center" fontSize="25" fontWeight="bold" mb="5">
        Register
      </Text>
      <Input onChangeText={em => setEmail(em)} height="40px" />
      <Input
        type="password"
        mt="3"
        onChangeText={pass => setPassword(pass)}
        height="40px"
      />
      <Button mt="5" onPress={handleRegister} isLoading={isRegistering}>
        Register
      </Button>
    </Box>
  );
}
export {Register};
