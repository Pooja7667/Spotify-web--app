import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  playList: JSON.parse(localStorage.getItem('playlist')) || [], // Initialize from localStorage
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setSongToPlayList: (state, action) => {
      const newSong = action.payload;
      state.playList.push(newSong); // Add new song to the Redux state
      localStorage.setItem('playlist', JSON.stringify(state.playList)); // Update localStorage
    },
    // Other reducers can be added here
  },
});

export const { setSongToPlayList } = playlistSlice.actions;
export default playlistSlice.reducer;
