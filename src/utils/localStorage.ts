import { Note } from "../reducers/slices/noteSlice"

function parseDate(dateString: string): Date {
  return new Date(dateString)
}

function compareNotesByDateAndDone(note1: Note, note2: Note): number {
  // If one note is done and the other is not, the done note goes to the end
  if (note1.done && !note2.done) return 1
  if (!note1.done && note2.done) return -1

  // If both notes are done or not done, sort by date in descending order
  const date1 = parseDate(note1.date)
  const date2 = parseDate(note2.date)
  return date2.getTime() - date1.getTime()
}

function sortNotesByDate(notes: Note[]): Note[] {
  return notes.sort(compareNotesByDateAndDone)
}

const saveLocalStorage = (value: Note[]) => {
  const sortedArray = sortNotesByDate(value)
  localStorage.setItem("notes", JSON.stringify(sortedArray))
}

const getLocalStorage = () => {
  if (!localStorage.getItem("notes")) return []
  return JSON.parse(localStorage.getItem("notes")!)
}

export { saveLocalStorage, getLocalStorage }
