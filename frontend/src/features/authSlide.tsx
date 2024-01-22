import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserRegister, UserLogin, User, AuthType } from "../types/Alltypes";
import axios from "axios";

const safeParse = (jsonString: string | null): User|null => {
    if(jsonString){
        return JSON.parse(jsonString)
    }else{
        return null;
    }
}

const initialAuth: AuthType = {
    error: false,
    loading: false,
    success: false,
    message: "",
    user: safeParse(localStorage.getItem("user"))
}

const apiUrl = "/api/users"

export const userRegister = createAsyncThunk(
    "auth/userRegister",
    async(userData:UserRegister, thunkApi) => {
        try {
            let response = await axios.post( `${apiUrl}/register`, userData )
            if(response.data){
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        } catch (error:any) {
            const message = (error.response && error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const userLogin = createAsyncThunk(
    "auth/userLogin",
    async(userData:UserLogin, thunkApi) => {
        try {
            let response = await axios.post( `${apiUrl}/login`, userData )
            if(response.data){
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
            
        } catch (error:any) {
            const message = (error.response && error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
            console.log(error);
            return thunkApi.rejectWithValue(message)
        }
    }
)

export const userLogout = createAsyncThunk(
    "auth/logout",
    async() => {
        localStorage.removeItem('user')
    }
)

export const authSlide = createSlice({
    name: "auth",
    initialState: initialAuth,
    reducers:{
        resetAuth: (state) => {
            state.error = false,
            state.loading = false,
            state.success = false,
            state.message = ""
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(userRegister.pending, (state) => {
            state.loading = true
        })
        .addCase(userRegister.fulfilled, (state, action: PayloadAction<User>) => {
            state.error = false,
            state.loading = false
            state.success = true,
            state.user = action.payload,
            state.message = "Thanks for registering"
        })
        .addCase(userRegister.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false
            state.error = true,
            state.success = false,
            state.user = {} as User,
            state.message = action.payload
        })
        .addCase(userLogin.pending, (state) => {
            state.loading = true
        })
        .addCase(userLogin.fulfilled, (state, action: PayloadAction<User>) => {
            state.error = false,
            state.loading = false
            state.success = true,
            state.user = action.payload,
            state.message = "Login is success"
        })
        .addCase(userLogin.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false
            state.error = true,
            state.success = false,
            state.user = null,
            state.message = action.payload
        })
        .addCase(userLogout.pending, (state) => {
            state.loading = true
        })
        .addCase(userLogout.fulfilled, (state) => {
            state.error = false,
            state.loading = false
            state.success = true,
            state.user = null,
            state.message = "You have logged out"
        })
        .addCase(userLogout.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false
            state.error = true,
            state.success = false,
            state.user = {} as User,
            state.message = action.payload
        })
       
    },
});

export const { resetAuth } = authSlide.actions;
export default authSlide.reducer;
