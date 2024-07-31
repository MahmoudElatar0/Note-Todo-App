import { Box, Grid, LinearProgress, Stack, Typography } from "@mui/material"
import NoteCard from "./NoteCard"
import { Note } from "../reducers/slices/noteSlice"
import { mainColors } from "../utils/colors"
import NotFound from "./NotFound"

type CardsProps = {
  notes: Note[]
  doneNumber: number
  notesLength: number
}

const CardsContainer = ({ notes, doneNumber, notesLength }: CardsProps) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Stack>
        <Typography
          sx={{
            mb: 1,
            color: "#00000099",
            fontWeight: "medium",
          }}
        >
          {doneNumber / notesLength === 1
            ? "You have completed all your notes"
            : `You have ${doneNumber}/${notesLength} notes completed`}
        </Typography>
        <LinearProgress
          sx={{
            ".MuiLinearProgress-bar": {
              background: mainColors.main,
              opacity: 1,
            },
          }}
          variant="determinate"
          value={(doneNumber / notesLength) * 100 || 0}
        />
      </Stack>
      {notes.length === 0 ? (
        <NotFound type="search" />
      ) : (
        <Grid
          container
          justifyContent={"center"}
          rowSpacing={3}
          columnSpacing={2}
          mt={0.1}
        >
          {notes.map((note) => (
            <Grid key={note.id} item md={6} sm={7} xs={12}>
              <NoteCard note={note} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default CardsContainer
