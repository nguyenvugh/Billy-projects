import { Box, Button, Container, HStack, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { WebView } from 'react-native-webview';
import TrackPlayer, {
  Capability,
  useProgress,
} from 'react-native-track-player';

const { width, height } = Dimensions.get('window');
const AudioBook = () => {
  const progress = useProgress();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    preparePlayer();
  }, []);

  const preparePlayer = async () => {
    //NOTE: need to await the track player to be ready
    await TrackPlayer.setupPlayer();

    TrackPlayer.updateOptions({
      // Media controls capabilities
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
        // Capability.JumpBackward,
        // Capability.JumpForward,
      ],

      // Capabilities that will show up when the notification is in the compact form on Android
      // compactCapabilities: [
      //   Capability.Play,
      //   Capability.Pause,
      //   Capability.SkipToNext,
      //   Capability.SkipToPrevious,
      //   Capability.Stop,
      //   Capability.JumpForward,
      //   Capability.JumpBackward,
      // ],
    });
    //TODO: Need to check if track player state is ready
    // Add a track to the queue
    await TrackPlayer.add([
      {
        id: 'trackId',
        url: 'https://www.gutenberg.org/files/22982/mp3/22982-01.mp3',
        title: 'Track Title',
        artist: 'Track Artist',
        artwork:
          'https://www.gutenberg.org/cache/epub/15660/pg15660.cover.medium.jpg',
      },
      {
        id: 'trackId-2',
        url: 'https://www.gutenberg.org/files/22982/mp3/22982-02.mp3',
        title: 'Track Title',
        artist: 'Track Artist',
        artwork:
          'https://www.gutenberg.org/cache/epub/15660/pg15660.cover.medium.jpg',
      },
    ]);
  };

  const startAudio = async () => {
    // Start playing it
    await TrackPlayer.play();
  };

  const stopAudio = async () => {
    await TrackPlayer.stop();
  };

  const pauseAudio = async () => {
    await TrackPlayer.pause();
  };

  const downloadFile = () => {
    //
  };

  const jsInjected = `let customCSS = "p { font-weight: bold; font-size: 40px; } pre { display: none;}"
    let headTag = document.getElementsByTagName('head')[0];
    let h1Tag = document.getElementsByTagName("h1")[0]
    h1Tag.onclick = function() {
      setTimeout(function () {
        window.ReactNativeWebView.postMessage(h1Tag.innerHTML);
      }, 0);
    }
    let pTags = Array.from(document.getElementsByTagName('p'));
    pTags.map(pTag => {
      pTag.onclick = function() {
        setTimeout(function () {
          window.ReactNativeWebView.postMessage(pTag.textContent);
        }, 0);
      }
    })
    let styleTag = document.createElement('style')
    headTag.appendChild(styleTag);
    styleTag.type = 'text/css';
    styleTag.appendChild(document.createTextNode(customCSS));
    true; // note: this is required, or you'll sometimes get silent failures
    `;

  return (
    <Container flex={1}>
      <VStack space={2}>
        <Text>Audio Book</Text>
        <Text>{progress.position}</Text>

        <HStack space={4} justifyContent={'center'}>
          <Button colorScheme="primary" onPress={startAudio}>
            Start
          </Button>

          <Button colorScheme="primary" onPress={pauseAudio}>
            Pause
          </Button>

          <Button colorScheme="primary" onPress={stopAudio}>
            Stop
          </Button>
        </HStack>

        <WebView
          source={{
            uri: 'https://www.gutenberg.org/files/15660/15660-h/15660-h.htm',
          }}
          style={{ marginTop: 20, width }}
          injectedJavaScript={jsInjected}
          scalesPageToFit={true}
          onMessage={event => {
            alert(`${event.nativeEvent.data}`);
          }}
        />
      </VStack>
    </Container>
  );
};

export default AudioBook;
