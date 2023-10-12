import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import host from "./host";
export const getData = createAsyncThunk(
    "mrs/getData",
    async (payload, {getState}) => {
        const currentToken = localStorage.getItem("_ur_d_r");
        const {user} = getState().auth;
        const { data } = await axios({
            method: "get",
            url: host+'/medical/mrs',
            headers: {
                'authorization': `Bearer ${currentToken}`,
            },
            params: {id:user.id}
        })
        return data;
    }
);
export const addData = createAsyncThunk(
    "mrs/addData",
    async (payload, {dispatch}) => {
        const currentToken = localStorage.getItem("_ur_d_r");
        let formdata=new FormData();
        if(payload.image) for(let i=0;i<payload.image.length;i++) formdata.append('images',payload.image[i])
        formdata.append('data',JSON.stringify(payload.data))
        const response = await axios({
            method: "post",
            url: host+'/medical/mrs',
            headers: {
                'authorization': `Bearer ${currentToken}`,
            },
            data: formdata,
        })
        window.location.replace('/logactivity')
        return response.data;
    }
);

export const deleteData = createAsyncThunk(
    "mrs/deleteData",
    async (payload, {dispatch}) => {
        const currentToken = localStorage.getItem("_ur_d_r");
        await axios({
            method: "delete",
            url: host+'/medical/mrs',
            headers: {
                Authorization: `Bearer ${currentToken}`,
            },
            data: {id:payload},
        })
        dispatch(getData());
        return 
    }
);
const mrsSlice = createSlice({
    name: "mrs",
    initialState: {
        mrs: [],
        isLoading: false,
        error: null,
        msg: null,
    },
    extraReducers:{
        [getData.fulfilled]:(state,action)=>{
            state.mrs = action.payload;
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
        [addData.pending]:(state,action)=>{
            state.isLoading = true;
            state.error = null;
        },
        [addData.fulfilled]:(state,action)=>{
            state.isLoading = false;
            state.error = null;
            state.msg = action.payload.message;
        },
        [addData.rejected]:(state,action)=>{
            state.isLoading = false;
            state.error = action.error.message;
        },
        
    }
})
export default mrsSlice.reducer;