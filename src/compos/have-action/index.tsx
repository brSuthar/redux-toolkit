import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState, importData, increment} from '../../toolkit';
import {decrement, loading} from '../../toolkit/index';

export const HaveAction = (props: any) => {
  const {navigation} = props;
  const counter = useSelector((state: RootState) => state.counter.counter);
  const {loading: isloading} = useSelector((state: RootState) => state.cart);
  const dispatch: AppDispatch = useDispatch();

  const onIncrement = () => {
    dispatch(increment());
  };

  const onDecrement = () => {
    dispatch(decrement());
  };

  const onImportData = () => {
    dispatch(importData({id: 1, name: 'Name', quantity: 10}));
  };

  const asyncAction = () => {
    dispatch(loading())
      .unwrap()
      .then(res => {
        console.log('Running::: ', res);
      })
      .catch(() => {
        console.log('Catching::: ');
      });
  };

  const onAdapter = () => {
    navigation.navigate('adapter');
  };

  return (
    <View style={styles.view}>
      <Text style={styles.title}>{counter}</Text>
      <Text style={styles.title}>{isloading ? 'Loading' : 'Stopped'}</Text>
      <TouchableOpacity onPress={onIncrement} style={styles.btn}>
        <Text style={styles.text}>Increment</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDecrement} style={styles.btn}>
        <Text style={styles.text}>Decrement</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onImportData} style={styles.btn}>
        <Text style={styles.text}>import</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={asyncAction} style={styles.btn}>
        <Text style={styles.text}>async</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onAdapter} style={styles.btn}>
        <Text style={styles.text}>Adapter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  text: {
    color: 'white',
  },
  btn: {
    width: '100%',
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C6B78',
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
    marginVertical: 20,
  },
  dec: {
    width: '100%',
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C6B78',
  },
});
