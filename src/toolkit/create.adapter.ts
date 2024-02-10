import {RootState} from './index';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

export const fetchComments = createAsyncThunk(
  'adapter/comment',
  async (_, {fulfillWithValue}) => {
    const comments = await fetch(
      'https://jsonplaceholder.typicode.com/comments',
    ).then(async res => await res.json());
    return fulfillWithValue(comments);
  },
);

export const fetchPost = createAsyncThunk(
  'adapter/post',
  async (_, {fulfillWithValue}) => {
    const post = await fetch('https://jsonplaceholder.typicode.com/posts').then(
      async res => await res.json(),
    );
    return fulfillWithValue(post);
  },
);

const commentAdapter = createEntityAdapter({selectId: cmt => cmt.id});
const postAdapter = createEntityAdapter({selectId: post => post.id});

const adapterSlice = createSlice({
  name: 'adapter',
  initialState: {
    isLoading: false,
    comments: commentAdapter.getInitialState(),
    posts: postAdapter.getInitialState(),
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.isLoading = false;
      commentAdapter.setAll(state.comments, action.payload);
    });
    builder.addCase(fetchPost.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.isLoading = false;
      postAdapter.setAll(state.posts, action.payload);
    });
  },
});

export const selectComments = commentAdapter.getSelectors<RootState>(
  state => state.adapter.comments,
);

export const selectPosts = postAdapter.getSelectors<RootState>(
  state => state.adapter.posts,
);

export default adapterSlice.reducer;
