import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) ?? false
}



export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, actions) => {
        localStorage.setItem('user', JSON.stringify(actions.payload));
        state.user = actions.payload;
    },
    logout: (state) => {
      localStorage.removeItem('user');
      state.user = false 
    }
  },
})



export const { login, logout } = auth.actions;

export default auth.reducer;