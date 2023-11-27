import { createSlice } from '@reduxjs/toolkit'

const moviesSlice = createSlice({
  name: 'movies',
  initialState: [],
  reducers: {
    setMovies: (state, action) => { // setMovies is an action that stores the list of movies from the API
      // state.movies = action.payload
      return action.payload
    }
  }
})

export const { setMovies } = moviesSlice.actions

export default moviesSlice.reducer
