import { combineReducers } from "@reduxjs/toolkit";
import AllSongsSlice from "./AllSongsSlice";
import artistsSlice from "./Artists";
import loginSlice from "./Login"
import searchSlice from "./Search"
import setSongToPlayList from "./Playlist"
const rootReducer = combineReducers({
    allSongs : AllSongsSlice,
    artists : artistsSlice,
    login : loginSlice,
    search : searchSlice,
    playlist: setSongToPlayList
})
export default rootReducer