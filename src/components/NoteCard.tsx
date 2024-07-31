import {
  Tooltip,
  IconButton,
  Box,
  Card,
  CardActions,
  Typography,
  Checkbox,
  styled,
  tooltipClasses,
  TooltipProps,
  Stack,
  Button,
  ClickAwayListener,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined"
import { useDispatch } from "react-redux"
import { deleteNote, updateNote, Note } from "../reducers/slices/noteSlice"
import { mainColors } from "../utils/colors"
import { useState } from "react"
import { toggleOpenAddNote } from "../reducers/slices/openAddNote"

// Custom styled tooltip component
const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: "0px 3px 6px #00000029",
    fontSize: 11,
    borderRadius: 0,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
  },
}))

const NoteCard = ({ note }: { note: Note }) => {
  const [checked, setChecked] = useState(note.done)
  const [openTooltip, setOpenTooltip] = useState(false)

  const dispatch = useDispatch()

  const color = note.done
    ? "#282E2999"
    : mainColors[note.category.toLowerCase() as keyof typeof mainColors]

  const handleChange = () => {
    setChecked(!checked)
    dispatch(updateNote({ ...note, id: note.id, done: !checked }))
  }

  const openAddNote = () => {
    dispatch(toggleOpenAddNote({ openAddNote: true, existNote: note }))
  }

  const handleDeleteClick = () => {
    setOpenTooltip((prev) => !prev)
  }

  function formatDate(dateString: string) {
    const parts = dateString.split(" ")
    if (parts.length === 3) {
      return `${parts[0]} ${parts[1]}, ${parts[2]}`
    }
    return dateString
  }

  const noteDate = formatDate(new Date(note.date).toDateString().slice(4, 17))

  return (
    <Card
      sx={{
        p: 1,
        boxShadow: "0px 3px 6px #00000029",
        height: "174px",
        bgcolor: color,
        color: "white",
      }}
    >
      <Box display="flex" alignItems="center">
        <Checkbox
          aria-label="note Checkbox"
          sx={{
            opacity: 0.6,
            mr: 1,
            color: "white",
            "&.Mui-checked": {
              color: "white",
            },
          }}
          checkedIcon={<CheckBoxOutlinedIcon />}
          checked={checked}
          onChange={handleChange}
        />
        <Typography
          sx={{
            fontWeight: "medium",
            textDecoration: note.done ? "line-through" : "none",
            overflow: "hidden",
          }}
        >
          {note.title}
        </Typography>
        <CardActions sx={{ ml: "auto" }}>
          <IconButton edge="end" onClick={openAddNote}>
            <EditIcon sx={{ opacity: 0.6, color: "white" }} />
          </IconButton>

          <LightTooltip
            title={
              <ClickAwayListener onClickAway={() => setOpenTooltip(false)}>
                <Stack
                  justifyContent={"space-between"}
                  sx={{ width: 300, height: 100, pt: 2, pl: 1 }}
                >
                  <Typography
                    color={mainColors.font}
                    sx={{ fontWeight: "500" }}
                  >
                    Delete note?
                  </Typography>
                  <Box ml={"auto"} mr={1}>
                    <Button
                      sx={{ color: "#03A9F4" }}
                      onClick={() => setOpenTooltip(false)}
                    >
                      cancel
                    </Button>
                    <Button
                      sx={{ color: "#03A9F4" }}
                      onClick={() => dispatch(deleteNote(note.id))}
                    >
                      Delete
                    </Button>
                  </Box>
                </Stack>
              </ClickAwayListener>
            }
            arrow
            placement="top"
            disableFocusListener
            disableHoverListener
            disableTouchListener
            open={openTooltip}
            onClose={() => setOpenTooltip(false)}
          >
            <IconButton edge="end" onClick={handleDeleteClick}>
              <DeleteIcon sx={{ opacity: 0.6, color: "white" }} />
            </IconButton>
          </LightTooltip>
        </CardActions>
      </Box>
      <Box
        sx={{
          p: 1,
          pt: 0,
          opacity: 0.8,
          height: "110px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            fontWeight: "300",
            lineHeight: 1.5,
            textDecoration: note.done ? "line-through" : "none",
          }}
        >
          {note.description}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            textDecoration: note.done ? "line-through" : "none",
          }}
        >
          {noteDate}
        </Typography>
      </Box>
    </Card>
  )
}

export default NoteCard
