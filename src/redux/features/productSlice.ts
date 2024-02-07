import {createSlice} from '@reduxjs/toolkit';
import { fetchProducts,fetchProductById ,createOrder,fetchOrders} from './actions/products';

const initialState = {
    products: [],
    error: { payload: null, status: false },
    loading: false,
    product: {},
    orders: [],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setTasks(state, action) {
            state.products = action.payload;
        },
        setTask(state, action) {
            state.product = action.payload;
        },
        addTask(state, action) {
            state.products.push(action.payload);
        },
        updateTask(state, action) {
            const index = state.products.findIndex((task) => task.id === action.payload.id);
            state.products[index] = action.payload;
        },
        deleteTask(state, action) {
            const index = state.products.findIndex((task) => task.id === action.payload);
            state.products.splice(index, 1);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.error = { payload: null, status: false };
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = { payload: action.payload, status: true };
        }
        );
        builder.addCase(fetchProductById.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.error = { payload: null, status: false };
        });
        builder.addCase(fetchProductById.rejected, (state, action) => {
            state.loading = false;
            state.error = { payload: action.payload, status: true };
        }

        );
        builder.addCase(createOrder.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.error = { payload: null, status: false };
        });
        builder.addCase(createOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = { payload: action.payload, status: true };
        }
        );
        builder.addCase(fetchOrders.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
            state.error = { payload: null, status: false };
        });
        builder.addCase(fetchOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = { payload: action.payload, status: true };
        }
        );
        
    },
});

export const { setTasks, setTask, addTask, updateTask, deleteTask } = productsSlice.actions;
export default productsSlice.reducer;