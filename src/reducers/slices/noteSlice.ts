import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { getLocalStorage, saveLocalStorage } from "../../utils/localStorage"

export type Note = {
  id: string
  title: string
  description: string
  category: string
  done: boolean
  date: string
}

const initialState: Note[] = getLocalStorage()

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.push(action.payload)
      saveLocalStorage(state)
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((note) => note.id === action.payload)
      state.splice(index, 1)
      saveLocalStorage(state)
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.findIndex((note) => note.id === action.payload.id)
      state[index] = action.payload
      saveLocalStorage(state)
    },
    toggleNote: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((note) => note.id === action.payload)
      state[index].done = !state[index].done
      saveLocalStorage(state)
    },
  },
})

export const { addNote, deleteNote, updateNote, toggleNote } = noteSlice.actions
