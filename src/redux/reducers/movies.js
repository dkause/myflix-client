import { createSlice } from '@reduxjs/toolkit'

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    filter: ''
  }, // leeres Array
  reducers: {
    setMovies: (state, action) => { // speichert die Liste der Filme von der API
      state.list = action.payload
    },
    setFilter: (state, action) => {
      state.filter = action.payload
    }
  }
})

export const { setMovies, setFilter } = moviesSlice.actions
export default moviesSlice.reducer
