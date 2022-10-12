import React, {useContext, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  webClientId:
    '142849813121-n800nb0id6sneg6prpibov21ehsffjlt.apps.googleusercontent.com',
});
type AuthInitState = {
  user: FirebaseAuthTypes.UserCredential | null;
  isLogging: boolean;
  isRegistering: boolean;
  registerByEmailAndPass: (
    email: string,
    pass: string,
    callback?: (user?: any) => void,
  ) => void;
  loginWithEmailAndPass: (
    email: string,
    pass: string,
    callback?: (user?: any) => void,
  ) => void;
  loginWithFb: (callback?: (user?: any) => void) => void;
  loginWithGg: (callback?: (user?: any) => void) => void;
  logout: () => void;
};
const AuthContext = React.createContext<AuthInitState>({
  user: null,
  isLogging: false,
  isRegistering: false,
  registerByEmailAndPass: () => {},
  loginWithEmailAndPass: () => {},
  loginWithFb: () => {},
  loginWithGg: () => {},
  logout: () => {},
});
function AuthProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<FirebaseAuthTypes.UserCredential | null>(
    null,
  );
  const [isRegistering, setRegistering] = useState(false);
  const [isLogging, setLogging] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        user,
        isLogging,
        isRegistering,
        async loginWithEmailAndPass(email: string, password: string, callback) {
          setLogging(true);
          try {
            const newUser = await auth().signInWithEmailAndPassword(
              email,
              password,
            );
            setUser(newUser);
            callback && callback(newUser);
          } catch (error) {
            console.log(error);
          }
          setLogging(false);
        },
        async registerByEmailAndPass(email, password, callback) {
          setRegistering(true);
          try {
            const newUser = await auth().createUserWithEmailAndPassword(
              email,
              password,
            );
            setUser(newUser);
            callback && callback(newUser);
          } catch (error) {
            console.log(error);
          }
          setRegistering(false);
        },
        async loginWithFb(callback) {
          setRegistering(true);
          const result = await LoginManager.logInWithPermissions([
            'public_profile',
            'email',
          ]);

          if (result.isCancelled) {
            throw 'User cancelled the login process';
          }
          // Once signed in, get the users AccesToken
          const data = await AccessToken.getCurrentAccessToken();

          if (!data) {
            throw 'Something went wrong obtaining access token';
          }

          // Create a Firebase credential with the AccessToken
          const facebookCredential = auth.FacebookAuthProvider.credential(
            data.accessToken,
          );

          // Sign-in the user with the credential
          const currentUser = await auth().signInWithCredential(
            facebookCredential,
          );
          setUser(currentUser);
          callback && callback(currentUser);
          setRegistering(false);
        },
        async loginWithGg(callback) {
          const {idToken} = await GoogleSignin.signIn();

          // Create a Google credential with the token
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);

          // Sign-in the user with the credential
          auth()
            .signInWithCredential(googleCredential)
            .then(data => {
              setUser(data);
              callback && callback(data);
            });
        },

        async logout() {
          try {
            await auth().signOut();
            setUser(null);
          } catch (error) {
            console.log(error);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  return {...useContext(AuthContext)};
}

export {useAuthContext, AuthProvider};
