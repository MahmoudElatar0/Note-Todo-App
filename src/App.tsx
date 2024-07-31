import Container from "@mui/material/Container"
import SearchIcon from "@mui/icons-material/Search"
import { Box, Input, InputAdornment } from "@mui/material"
import CardsContainer from "./components/CardsContainer"
import Buttons from "./components/Buttons"
import AddNote from "./components/AddNote"
import { useState, useMemo } from "react"
import { useSelector } from "react-redux"
import { Note } from "./reducers/slices/noteSlice"
import { mainColors } from "./utils/colors"
import { OpenAddNoteState } from "./reducers/slices/openAddNote"
import NotFound from "./components/NotFound"

const App = () => {
  const [searchNote, setSearchNote] = useState("")
  const [category, setCategory] = useState("all")
  const notes = useSelector((state: { notes: Note[] }) => state.notes)
  const isAddNoteOpen = useSelector(
    (state: { openAddNote: OpenAddNoteState }) => state.openAddNote.openAddNote
  )

  const categoryNotes = useMemo(() => {
    return notes.filter((note) =>
      category === "all" ? note : note.category === category
    )
  }, [notes, category])

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchNote.toLowerCase())
  )

  const doneNumber = notes.filter((note) => note.done).length
  const notesLength = notes.length

  const noScrolling = isAddNoteOpen
    ? { height: "100vh", overflow: "hidden" }
    : {}

  return (
    <Box sx={noScrolling}>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Input
          sx={{
            color: mainColors.font,
            bgcolor: "white",
            px: 2,
            py: 1,
            boxShadow: "0px 3px 6px #00000029",
          }}
          placeholder="Search notes..."
          fullWidth
          disableUnderline
          value={searchNote}
          onChange={(e) => setSearchNote(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon sx={{ opacity: 0.8, mr: 1, my: 0.5 }} />
            </InputAdornment>
          }
        />
        <Buttons setCategory={setCategory} />
        {notes.length === 0 ? (
          <NotFound type={"home"} />
        ) : (
          <CardsContainer
            doneNumber={doneNumber}
            notesLength={notesLength}
            notes={searchNote ? filteredNotes : categoryNotes}
          />
        )}
        <AddNote />
      </Container>
    </Box>
  )
}

export default App
