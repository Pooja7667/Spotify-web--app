import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"
export const allSongsFetch = createAsyncThunk("allsongs", async ()=>{
    const options = {
      method: "GET",
      url: "https://spotify23.p.rapidapi.com/recommendations",
      params: {
        limit: "20",
        seed_tracks: "0c6xIDDpzE81m2q797ordA",
        seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
        seed_genres: "bollywood,indian-pop",
      },
      headers: {
        "x-rapidapi-key": "6bcb7fa722msh8b8ab3e692da89cp18260cjsn73a5a735a056",
        "x-rapidapi-host": "spotify23.p.rapidapi.com",
      },
    };
      
      try {
          const response = await axios.request(options);
          console.log(response.data.tracks);
          return response.data.tracks
      } catch (error) {
          console.error(error);
      }


})
export const getSongById = createAsyncThunk("getSong", async (id)=>{
    const options = {
      method: "GET",
      url: "https://spotify23.p.rapidapi.com/tracks/",
      params: {
        ids: id,
      },
      headers: {
        "x-rapidapi-key": "6bcb7fa722msh8b8ab3e692da89cp18260cjsn73a5a735a056",
        "x-rapidapi-host": "spotify23.p.rapidapi.com",
      },
    };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
          return response.data
      } catch (error) {
          console.error(error);
      }
} )
const initialState = {
    songs : null,
    songById : null,
    isLoading : false
}
const allSongsSlice = createSlice({
    name:"allSongsSlice",
    initialState,
   extraReducers : (builder)=>{
    builder.addCase(allSongsFetch.fulfilled ,(state, action)=>{
        state.songs = action.payload
    }).addCase(allSongsFetch.pending , (state)=>{
        state.isLoading = true
    }).addCase(allSongsFetch.rejected , (state)=>{
        state.isLoading = false
    }).addCase(getSongById.fulfilled , (state, action)=>{
        state.songById = action.payload
    }).addCase(getSongById.pending , (state)=>{
        state.isLoading = true
    }).addCase(getSongById.rejected , (state)=>{
        state.isLoading = false
    })
   }
})
export default allSongsSlice.reducer