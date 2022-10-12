import {Box, Button, Input, Text} from 'native-base';
import React, {useState} from 'react';
import {useAuthContext} from '../../hooks/useAuthContext';
import {NavigateProps} from '../routes/Routes';
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();

type SigningProps = NavigateProps;
function Signing({navigation}: SigningProps) {
  const {isLogging, loginWithEmailAndPass, loginWithFb, loginWithGg} =
    useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    loginWithEmailAndPass(email, password, () => {
      navigation.navigate('Home');
    });
  }

  return (
    <Box p="5">
      <Text textAlign="center" fontSize="25" fontWeight="bold" mb="5">
        Login
      </Text>
      <Input
        bg="#fff"
        onChangeText={em => setEmail(em)}
        height="40px"
        placeholder="email"
      />
      <Input
        bg="#fff"
        type="password"
        mt="3"
        onChangeText={pass => setPassword(pass)}
        height="40px"
        placeholder="password"
      />
      <Button
        mt="5"
        onPress={handleLogin}
        isLoading={isLogging}
        leftIcon={<Ionicons name="log-in-outline" color="white" size={20} />}>
        Login
      </Button>
      <Button
        leftIcon={<Ionicons name="logo-facebook" color="white" size={20} />}
        mt="5"
        bg="blue.500"
        onPress={() => loginWithFb(() => navigation.navigate('Home'))}>
        Sign In with Facebook
      </Button>
      <Button
        mt="5"
        bg="white"
        leftIcon={<Ionicons name="logo-google" color="black" size={20} />}>
        <Text
          color="black"
          onPress={() => loginWithGg(() => navigation.navigate('Home'))}>
          Sign In with Google
        </Text>
      </Button>

      <Text
        color="blue.400"
        fontSize="25px"
        textAlign="center"
        mt="5"
        onPress={() => navigation.navigate('Register')}>
        Register
      </Text>
    </Box>
  );
}
export {Signing};
