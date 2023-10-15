import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type ThumbnailState = {
  thumbnails: string[];
};
const initialState = {
  thumbnails: [],
} as ThumbnailState;
export const thumbnail = createSlice({
  name: "thumbnail",
  initialState,
  reducers: {
    addThumbnail: (state, action: PayloadAction<string>) => {
      return {
        thumbnails: [...state.thumbnails, action.payload],
      };
    },
    removeThumbnail: (state, action: PayloadAction<number>) => {
      const arr = [...state.thumbnails];
      arr.splice(action.payload, 1);
      return {
        thumbnails: arr,
      };
    },
    swapThumbnails: (state, action: PayloadAction<[number, number]>) => {
      const payloadSorted = action.payload.sort();
      return {
        thumbnails: state.thumbnails.map((thumbnail, index) => {
          switch (index) {
            case payloadSorted[0]:
              return (thumbnail = state.thumbnails[payloadSorted[1]]);
            case payloadSorted[1]:
              return (thumbnail = state.thumbnails[payloadSorted[0]]);
            default:
              return thumbnail;
          }
        }),
      };
    },
  },
});

export const { addThumbnail, removeThumbnail, swapThumbnails } =
  thumbnail.actions;
export default thumbnail.reducer;
