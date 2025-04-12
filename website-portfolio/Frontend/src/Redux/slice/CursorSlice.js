import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    position: { x: 0, y: 0 },
    size: 0,
    color: '',
    visible: true
  };
export const CursorSlice = createSlice({
    name: 'cursor',
    initialState,
    reducers: {
      setPosition: (state, action) => {
        state.position = action.payload;
      },
      setSize: (state, action) => {
        state.size = action.payload;
      },
      setColor: (state, action) => {
        state.color = action.payload;
      },
      setVisibility: (state, action) => {
        state.visible = action.payload;
      }
    }
    
})
export const{ setPosition, setSize, setColor, setVisibility } = CursorSlice.actions

export default CursorSlice.reducer