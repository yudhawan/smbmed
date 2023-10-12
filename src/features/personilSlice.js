import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import host from "./host";
export const getData = createAsyncThunk(
    "mrs/getData",
    async (payload, {getState}) => {
        const currentToken = localStorage.getItem("_ur_d_r");
        const { data } = await axios({
            method: "get",
            url: host+'/medical/getpersonil',
            headers: {
                'authorization': `Bearer ${currentToken}`,
            },
        })
        return data;
    }
);
const personilSlice = createSlice({
    name: "personil",
    initialState: {
        personil: [],
        isLoading: false,
        error: null,
        msg: null,
    },
    extraReducers:{
        [getData.fulfilled]:(state,action)=>{
            state.personil = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        [getData.pending]:(state,action)=>{
            state.isLoading = true;
            state.error = null;
        },
        [getData.rejected]:(state,action)=>{
            state.isLoading = false;
            state.error = action.error.message;
        },
        
    }
})
export default personilSlice.reducer;