import { configureStore } from "@reduxjs/toolkit";
import mrsReducer from "./features/dataSlice";
import authReducer from "./features/authSlice";
import personilReducer from "./features/personilSlice";
export default configureStore({
    reducer:{
        auth:authReducer,
        data:mrsReducer,
        personil:personilReducer
    },
    devTools: false
})