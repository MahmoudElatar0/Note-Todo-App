import { configureStore } from "@reduxjs/toolkit"
import { noteSlice } from "./slices/noteSlice"
import { openAddNote } from "./slices/openAddNote"

export const store = configureStore({
  reducer: {
    notes: noteSlice.reducer,
    openAddNote: openAddNote.reducer,
  },
})
