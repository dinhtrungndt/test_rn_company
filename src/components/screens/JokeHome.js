import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Data joke
import {Data} from './Data';

const JokeHome = () => {
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);
  const [userVote, setUserVote] = useState(null);
  const [hasMoreJokes, setHasMoreJokes] = useState(true);

  useEffect(() => {
    loadUserVote();
  }, []);

  const loadUserVote = async () => {
    try {
      const vote = await AsyncStorage.getItem('userVote');
      if (vote !== null) {
        setUserVote(vote);
      }
    } catch (error) {
      console.error('Error loading user vote:', error);
    }
  };

  const handleVote = async vote => {
    setUserVote(vote);
    try {
      await AsyncStorage.setItem('userVote', vote);
    } catch (error) {
      console.error('Error storing user vote:', error);
    }
  };

  const getNextJoke = () => {
    if (currentJokeIndex < Data.length - 1) {
      setCurrentJokeIndex(currentJokeIndex + 1);
    } else {
      setHasMoreJokes(false);
    }
  };

  const currentJoke = Data[currentJokeIndex];

  return (
    <View style={styles.T}>
      {/* Header */}
      <View style={styles.header}>
        {/* logo */}
        <Image
          source={require('../../media/logo.png')}
          style={{width: 40, height: 40}}
        />
        {/* name and image*/}
        <View style={styles.name}>
          <View style={{paddingRight: 5, paddingTop: 5}}>
            <Text style={styles.by_name}>Handicrafted by</Text>
            <Text style={[styles.by_name, {color: '#000'}]}>Jim HLS</Text>
          </View>
          <Image
            source={require('../../media/account.png')}
            style={{width: 40, height: 40}}
          />
        </View>
      </View>

      {/* Body */}
      {hasMoreJokes ? (
        <View style={styles.body}>
          {/* content 01 */}
          <View style={styles.content_1}>
            <Text style={styles.ct_1_1}>
              A joke a day keeps the doctor away
            </Text>
            <Text style={[styles.ct_1_1, {fontSize: 14, paddingTop: 20}]}>
              If you joke wrong way, your teeth have to pay. (Serious)
            </Text>
          </View>
          {/* content 02 */}
          <View style={styles.content_2}>
            <Text style={styles.ct_2_text_1}>{currentJoke.content}</Text>
            {/* Button */}
            <View style={styles.ct_2_1}>
              <TouchableOpacity
                style={styles.ct_2_button_1}
                onPress={() => {
                  handleVote('funny');
                  getNextJoke();
                }}>
                <Text style={styles.ct_2_text_button_1}>This is Funny!</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.ct_2_button_1, {backgroundColor: '#29b363'}]}
                onPress={() => {
                  handleVote('notFunny');
                  getNextJoke();
                }}>
                <Text style={styles.ct_2_text_button_1}>
                  This is not funny.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.content_1}>
            <Text style={styles.ct_1_1}>
              A joke a day keeps the doctor away
            </Text>
            <Text style={[styles.ct_1_1, {fontSize: 14, paddingTop: 20}]}>
              If you joke wrong way, your teeth have to pay. (Serious)
            </Text>
          </View>
          <View style={styles.noMoreJokesContainer}>
            <Text style={styles.noMoreJokesMessage}>
              Hôm nay chỉ có vậy thôi! Hãy quay lại vào ngày khác!
            </Text>
          </View>
        </>
      )}
      {/* Footer*/}
      <View style={styles.footer}>
        {/* horizontal lines */}
        <View
          style={{borderBottomWidth: 1, borderColor: '#e0e0e0', marginTop: 20}}
        />
        {/* content 01 */}
        <Text style={styles.ft_ct_text_1}>
          This appis created as part of Hisolutions program. The materials
          contained on this website are provided for general information only
          and do not constitute any form of advice. HLS assumes no
          responsibility for the accuracy of any particular statement and
          accepts no liability for any loss or damage which may arise from
          reliance on the information contained on this site.
        </Text>
        {/* content 02 */}
        <Text style={styles.ft_ct_text_02}>Copyright 2021 HLS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  T: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    flexDirection: 'row',
  },
  by_name: {
    fontSize: 12,
    color: '#707070',
    textAlign: 'right',
  },
  content_1: {
    height: 130,
    backgroundColor: '#29b363',
  },
  ct_1_1: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '400',
    textAlign: 'center',
    paddingTop: 30,
  },
  content_2: {
    height: 400,
    backgroundColor: '#FFF',
  },
  ct_2_text_1: {
    color: '#666666',
    fontSize: 16,
    padding: 24,
    top: 20,
  },
  ct_2_1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 24,
    top: 60,
  },
  ct_2_button_1: {
    width: 150,
    height: 40,
    backgroundColor: '#2c7edb',
    marginTop: 20,
  },
  ct_2_text_button_1: {
    color: '#FFF',
    textAlign: 'center',
    paddingTop: 10,
  },
  noMoreJokesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMoreJokesMessage: {
    textAlign: 'center',
  },
  ft_ct_text_1: {
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 10,
  },
  ft_ct_text_02: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    paddingTop: 5,
  },
});
export default JokeHome;
