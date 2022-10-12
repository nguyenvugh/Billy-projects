import {ScrollView, VStack} from 'native-base';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {ARTICLES} from '../constants';
import {Article} from './Article';
import {News} from './News';
import {Search} from './Search';

function Newfeeds() {
  return (
    <SafeAreaView>
      <Search />
      <ScrollView>
        <VStack space={3}>
          <News />
          {ARTICLES.map(article => (
            <Article article={article} />
          ))}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}

export {Newfeeds};
