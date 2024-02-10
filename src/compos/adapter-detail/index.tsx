import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectComments} from '../../toolkit/create.adapter';
import {RootState} from '../../toolkit';

const AdapterDetails = (props: any) => {
  const {
    route: {params},
  } = props;
  const comment: any = useSelector<RootState>(state => {
    return selectComments.selectById(state, params.id);
  });

  useEffect(() => {
    console.log('Comment:: ', comment);
  }, [comment]);

  return (
    <View style={styles.view}>
      <Text style={styles.name}>{comment.name}</Text>
      <Text style={styles.email}>{comment.email}</Text>
      <Text style={styles.body}>{comment.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  name: {
    fontSize: 18,
    color: 'black',
    fontWeight: '700',
    marginBottom: 2,
  },
  email: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
    marginBottom: 6,
  },
  body: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
    textAlign: 'justify',
  },
});

export default AdapterDetails;
