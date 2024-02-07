import {createAsyncThunk} from '@reduxjs/toolkit';
const HOST: string = (import.meta.env.VITE_BACKEND_URL);
export const fetchProducts = createAsyncThunk(
    'products/fetchproducts',
    async (data, thunkAPI) => { 
        const response = await fetch(`${HOST}/books`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
        const result = await response.json();
   
        if (response.status === 200) {
            return result.data;
        } else {
            return thunkAPI.rejectWithValue(result);
        }
    }
);




// fetch tasks by id
export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id, thunkAPI) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
        const result = await response.json();
        if (response.status === 200) {
            return result;
        } else {
            return thunkAPI.rejectWithValue(result);
        }
    }
);


// create order
export const createOrder = createAsyncThunk(
    'products/createOrder',
    async (data, thunkAPI) => {
        const response = await fetch(`${HOST}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        if (response.status === 201) {
            return result;
        } else {
            return thunkAPI.rejectWithValue(result);
        }
    }
);


// fetch orders
export const fetchOrders = createAsyncThunk(
    'products/fetchOrders',
    async (data, thunkAPI) => {
        const response = await fetch(`${HOST}/orders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
        const result = await response.json();
        if (response.status === 200) {
            return result.data;
        } else {
            return thunkAPI.rejectWithValue(result);
        }
    }
);