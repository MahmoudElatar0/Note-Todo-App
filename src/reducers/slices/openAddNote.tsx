import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Note } from "./noteSlice"

export type OpenAddNoteState = {
  openAddNote: boolean
  existNote: Note | null
}

const initialState: OpenAddNoteState = {
  openAddNote: false,
  existNote: null,
}

export const openAddNote = createSlice({
  name: "openAddNote",
  initialState,
  reducers: {
    toggleOpenAddNote: (state, action: PayloadAction<OpenAddNoteState>) => {
      state.openAddNote = action.payload.openAddNote
      state.existNote = action.payload.existNote
    },
  },
})

export const { toggleOpenAddNote } = openAddNote.actions
