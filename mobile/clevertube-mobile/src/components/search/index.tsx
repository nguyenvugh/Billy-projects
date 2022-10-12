import React from 'react'
import { VStack } from 'native-base'
import { SafeAreaView } from 'react-native'
import SearchHistory from './SearchHistory'
import SearchInput from './SearchInput'
import SearchRecommend from './SearchRecommend'


const SearchPage = () => {
  return (
    <SafeAreaView>
      <VStack>
        <SearchInput />
        <SearchHistory />
        <SearchRecommend />
      </VStack>
    </SafeAreaView>
  )
}

export default SearchPage

