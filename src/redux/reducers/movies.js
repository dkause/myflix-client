import { createSlice } from '@reduxjs/toolkit'

const moviesSlice = createSlice({
  name: 'movies',
  initialState: [], // leeres Array
  reducers: {
    setMovies: (state, action) => { // speichert die Liste der Filme von der API
      return action.payload
    }
  }
})

export const { setMovies } = moviesSlice.actions
export default moviesSlice.reducer
