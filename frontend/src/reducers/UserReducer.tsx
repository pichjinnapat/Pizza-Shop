import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../api'
import { ApiStatus, User, UserState } from '../types'

const initialState: UserState = {
  user: { first_name: '', last_name: '', email: '' },
  apiStatus: ApiStatus.idle,
}

const asyncReducers = {
  createUser: createAsyncThunk(
    'users/createUser',
    async (params: { first_name: string; last_name: string; email: string }) => {
      const data = { ...params }

      const response = await api.post(`/users`, data)

      return response.data
    }
  ),
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    initialUserState: () => {
      return initialState
    },
    'createUser/pending': (userState: UserState) => {
      return { ...userState, apiStatus: ApiStatus.pending }
    },
    'createUser/fulfilled': (userState: UserState, action: { payload: User; type: string }) => {
      return {
        ...userState,
        user: action.payload,
        apiStatus: ApiStatus.fulfilled,
      }
    },
    'createUser/rejected': (userState: UserState, action) => {
      return { ...userState, error: action.payload, apiStatus: ApiStatus.rejected }
    },
  },
})

export const { createUser } = asyncReducers

export const { initialUserState } = userSlice.actions

export default userSlice.reducer
