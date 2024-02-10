import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchComments, selectComments} from '../../toolkit/create.adapter';
import {RootState} from '../../toolkit';
import {AppDispatch} from '../../toolkit/index';

const HaveAdapter = (props: any) => {
  const {navigation} = props;
  const dispatch: AppDispatch = useDispatch();
  const comments = useSelector(selectComments.selectAll);
  const isLoading = useSelector<RootState>(
    (state: RootState) => state.adapter.isLoading,
  );

  useEffect(() => {
    dispatch(fetchComments());
  }, []);

  const onPress = (id: any) => () => {
    navigation.navigate('detail', {id: id});
  };

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity onPress={onPress(item.id)} style={styles.view}>
        <Text>{item.body}</Text>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <Text style={styles.title}>Fetching</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        contentContainerStyle={styles.flatContent}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  view: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#D1EFE3',
    marginBottom: 8,
  },
  flatContent: {
    paddingHorizontal: 16,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 23,
    color: 'black',
    fontWeight: '700',
  },
});

export default HaveAdapter;
