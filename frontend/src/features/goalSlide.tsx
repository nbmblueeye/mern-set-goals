import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { Goal, GoalInput, GoalType } from '../types/Alltypes'
import axios from 'axios';


const initialGoal: GoalType = {
    error: false,
    loading: false,
    success: false,
    message: "",
    goal: {} as Goal,
    goals: [],
}

const goalApi = "/api/goals";

export const getGoals = createAsyncThunk(
    "goal/getGoals",
    async(_, thunkApi) => {
        try {
            const response = await axios.get(goalApi);
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

export const getGoal = createAsyncThunk(
    "goal/getGoal",
    async(goalId:string, thunkApi) => {
        try {
            const response = await axios.get( `${goalApi}/${goalId}`);
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

export const createGoal = createAsyncThunk(
    "goal/createGoal",
    async(goal:GoalInput, thunkApi:any) => {
        try {

            let token:any = "";
            if( thunkApi.getState() && typeof thunkApi.getState() === 'object'){
                if( thunkApi.getState().hasOwnProperty('auth')){
                    token = thunkApi.getState().auth.user.token
                }
            }
            const config = {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
            const response = await axios.post(goalApi, goal, config);
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

export const updateGoal = createAsyncThunk(
    "goal/updateGoal",
    async(goal:Goal, thunkApi:any) => {
        try {

            let token:any = "";
            if( thunkApi.getState() && typeof thunkApi.getState() === 'object'){
                if( thunkApi.getState().hasOwnProperty('auth')){
                    token = thunkApi.getState().auth.user.token
                }
            }
            const config = {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
            const response = await axios.put(`${goalApi}/${goal.id}`, goal, config);
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

export const deleteGoal = createAsyncThunk(
    "goal/deleteGoal",
    async(id:string, thunkApi:any) => {
        try {

            let token;
            if( thunkApi.getState() && typeof thunkApi.getState() === 'object'){
                if( thunkApi.getState().hasOwnProperty('auth')){
                    token = thunkApi.getState().auth.user.token
                }
            }
            const config = {
                headers: {
                    Authorization: "Bearer " + token
                }
            }

            const response = await axios.delete(`${goalApi}/${id}`, config);
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

const goalSlide = createSlice({
    name: "goal",
    initialState: initialGoal,
    reducers:{
        resetGoal: (state) => {
            state.error =false,
            state.loading = false,
            state.success = false,
            state.message = "",
            state.goal = {} as Goal
        },
        resetGoals: (state) => {
            state.error =false,
            state.loading = false,
            state.success = false,
            state.message = "",
            state.goal = {} as Goal,
            state.goals = []
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getGoals.pending, (state) => {
            state.error = false,
            state.loading = true,
            state.success = false,
            state.message = "",
            state.goals = []
        })
        .addCase(getGoals.fulfilled, (state, action: PayloadAction<any>) => {
            state.error = false,
            state.loading = false,
            state.success = true,
           
            state.goals = action.payload.length > 0 ? action.payload.map((goal:any) => {
                return{
                    id: goal._id,
                    title: goal.title, 
                    description: goal.description,
                    createdAt: goal.createdAt,
                }
            })
            :
            []
            
        })
        .addCase(getGoals.rejected, (state, action: PayloadAction<any>) => {
            state.error = true,
            state.loading = false,
            state.success = false,
            state.message = action.payload,
            state.goals = []
        })
        .addCase(createGoal.pending, (state) => {
            state.error = false,
            state.loading = true,
            state.success = false,
            state.message = "",
            state.goal = {} as Goal
        })
        .addCase(createGoal.fulfilled, (state, action: PayloadAction<any>) => {
            state.error = false,
            state.loading = false,
            state.success = true,
            state.message = action.payload.message ? action.payload.message:"Goal is added successfully",
            state.goal = action.payload.message ? {} as Goal: {
                user: action.payload.user,
                id: action.payload._id,
                title: action.payload.title, 
                description: action.payload.description,
                createdAt: action.payload.createdAt,
            },
            state.goals = Object.keys(state.goal).length > 0 ? [...state.goals, state.goal]: state.goals
        })
        .addCase(createGoal.rejected, (state, action: PayloadAction<any>) => {
            state.error = true,
            state.loading = false,
            state.success = false,
            state.message = action.payload,
            state.goal = {} as Goal
        })
        .addCase(deleteGoal.pending, (state) => {
            state.error = false,
            state.loading = true,
            state.success = false,
            state.message = ""
        })
        .addCase(deleteGoal.fulfilled, (state, action: PayloadAction<any>) => {
            state.error = false,
            state.loading = false,
            state.success = true,
            state.message = "Goal deleted",
            state.goal = {} as Goal,
            state.goals = state.goals.filter(goal => goal.id != action.payload._id)
        })
        .addCase(deleteGoal.rejected, (state, action: PayloadAction<any>) => {
            state.error = true,
            state.loading = false,
            state.success = false,
            state.goal = {} as Goal,
            state.message = action.payload
        })
        .addCase(getGoal.pending, (state) => {
            state.error = false,
            state.loading = true,
            state.success = false,
            state.message = "",
            state.goal = {} as Goal
        })
        .addCase(getGoal.fulfilled, (state, action: PayloadAction<any>) => {
            state.error = false,
            state.loading = false,
            state.success = true,
            state.message = action.payload.message ? action.payload.message:"Please proceed to update selected goal",
            state.goal = action.payload.message ? {} as Goal: {
                user: action.payload.user,
                id: action.payload._id,
                title: action.payload.title, 
                description: action.payload.description,
                createdAt: action.payload.createdAt,
            }
        })
        .addCase(getGoal.rejected, (state, action: PayloadAction<any>) => {
            state.error = true,
            state.loading = false,
            state.success = false,
            state.message = action.payload,
            state.goal = {} as Goal
        })
        .addCase(updateGoal.pending, (state) => {
            state.error = false,
            state.loading = true,
            state.success = false
        })
        .addCase(updateGoal.fulfilled, (state, action: PayloadAction<any>) => {
            state.error = false,
            state.loading = false,
            state.success = true,
            state.message = action.payload.message ? action.payload.message:"Goal is updated successfully",
            state.goal = {...state.goal,
                ...{title: action.payload.title, 
                description: action.payload.description,
                createdAt: action.payload.updatedAt}
            },
            state.goals = state.goals.map((goal) => state.goal.id == goal.id ? {...goal, ...state.goal}:goal)
        })
        .addCase(updateGoal.rejected, (state, action: PayloadAction<any>) => {
            state.error = true,
            state.loading = false,
            state.success = false,
            state.message = action.payload,
            state.goal = {} as Goal
        })
    },
})

export const { resetGoal, resetGoals } = goalSlide.actions;
export default goalSlide.reducer;