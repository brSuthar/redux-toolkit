import adapterSlice from './create.adapter';
import {
  configureStore,
  createAction,
  createAsyncThunk,
  createReducer,
  createSlice,
} from '@reduxjs/toolkit';

interface InsertAction {
  id: number;
  name: string;
  quantity: number;
}

export const increment = createAction('increment');
export const decrement = createAction('decrement');
export const insert = createAction<InsertAction>('insert');
export const importData = createAction<InsertAction>('importData');

export const loading = createAsyncThunk<number, void>(
  'loading',
  async (data, {fulfillWithValue}) => {
    await new Promise((resolve: any) => {
      setTimeout(() => {
        resolve('');
      }, 3000);
    });
    return fulfillWithValue(50);
  },
);

const counter = createReducer({counter: 0}, builder => {
  builder.addCase(increment, state => {
    state.counter++;
  });
  builder.addCase(decrement, state => {
    state.counter--;
  });
  builder.addCase(importData, (state, action) => {
    console.log('ExtraBuildCounter:: ');
    state.counter = state.counter + action.payload.quantity;
  });
});

type state = {
  list: any[];
  loading: boolean;
};

const initState: state = {
  list: [],
  loading: false,
};

const cart = createSlice({
  initialState: initState,
  name: 'cart',
  reducers: {
    importData(state) {
      state.list = [];
    },
  },
  extraReducers: buidler => {
    buidler.addCase(importData, (state, action) => {
      console.log('ExtraBuild:: ');
      state.list.push(action.payload);
    });
    buidler.addCase(loading.pending, state => {
      state.loading = true;
    });
    buidler.addCase(loading.fulfilled, state => {
      state.loading = false;
    });
    buidler.addCase(loading.rejected, state => {
      state.loading = false;
    });
  },
});

const store = configureStore({
  reducer: {
    cart: cart.reducer,
    counter: counter,
    adapter: adapterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
