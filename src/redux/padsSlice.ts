import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IpadsState } from './sliceTypes';

const initialState: IpadsState = {
    colors: [
        {
            id: 'green',
            component: 'GreenPad',
            active: false
        },
        {
            id: 'red',
            component: 'RedPad',
            active: false
        },
        {
            id: 'yellow',
            component: 'YellowPad',
            active: false
        },
        {
            id: 'blue',
            component: 'BluePad',
            active: false
        }
    ]
}

const reducers = {
    lightenPad: (state: IpadsState, action: PayloadAction<{ id: string }>) => {
        state.colors = state.colors.map(color => ({
            ...color,
            active: action.payload.id === color.id
        }));
    },
    lightenPadOff: (state: IpadsState, action: PayloadAction<undefined>) => {
        state.colors = state.colors.map(color => ({
            ...color,
            active: false
        }));
    }
}

const padsSlice = createSlice({
    name: 'pads',
    initialState,
    reducers
});

export const { lightenPad, lightenPadOff } = padsSlice.actions;

export default padsSlice.reducer;