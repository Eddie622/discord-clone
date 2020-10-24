import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    channels: [],
    channelId: null,
    channelName: null,
  },
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload.channels;
    },
    setChannelInfo: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
    }
  },
});

export const { setChannels, setChannelInfo } = appSlice.actions;

export const selectChannels = state => state.app.channels;
export const selectChannelId = state => state.app.channelId;
export const selectChannelName = state => state.app.channelName;

export default appSlice.reducer;