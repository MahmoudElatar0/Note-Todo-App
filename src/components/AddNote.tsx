import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Container,
  Divider,
  Fade,
  FormHelperText,
  Grid,
  Input,
} from "@mui/material"
import { mainColors } from "../utils/colors"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addNote, updateNote } from "../reducers/slices/noteSlice"
import {
  OpenAddNoteState,
  toggleOpenAddNote,
} from "../reducers/slices/openAddNote"

const AddNote = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [titleError, setTitleError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)
  const [categoryError, setCategoryError] = useState(false)
  const dispatch = useDispatch()
  const { openAddNote, existNote } = useSelector(
    (state: { openAddNote: OpenAddNoteState }) => state.openAddNote
  )

  const onClose = () => {
    setTitleError(false)
    setDescriptionError(false)
    setCategoryError(false)
    setTitle("")
    setDescription("")
    setCategory("")
    dispatch(toggleOpenAddNote({ openAddNote: false, existNote: null }))
  }

  useEffect(() => {
    if (existNote) {
      setTitle(existNote.title)
      setDescription(existNote.description)
      setCategory(existNote.category)
    }
  }, [existNote])

  const handleSubmit = () => {
    if (existNote && title && description && category) {
      dispatch(
        updateNote({
          ...existNote,
          id: existNote.id,
          title,
          description,
          category: category.toLowerCase(),
          done: false,
          date: new Date().constructor(),
        })
      )
      onClose()
    } else if (title && description && category) {
      dispatch(
        addNote({
          id: Date.now().toString(),
          title,
          description,
          category: category.toLowerCase(),
          done: false,
          date: new Date().constructor(),
        })
      )
      onClose()
    } else {
      if (!title) setTitleError(true)
      if (!description) setDescriptionError(true)
      if (!category) setCategoryError(true)
    }
  }

  if (!openAddNote) return null

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          background: `${mainColors.font} 0% 0% no-repeat padding-box`,
          boxShadow: `0px 3px 6px ${mainColors.shadow}`,
          opacity: "0.4",
          backdropFilter: "blur(50px)",
        }}
      >
        {" "}
      </Box>
      <Container
        maxWidth="md"
        sx={{
          position: "absolute",
          top: "54%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Card
          sx={{
            backgroundColor: "white",
            height: "550px",
            boxShadow: `0px 3px 6px ${mainColors.shadow}`,
          }}
        >
          <CardHeader
            title="Add note"
            sx={{
              pl: 4,
              color: mainColors.font,
              // borderBottom: `0.5px solid ${mainColors.shadow}`,
              opacity: 0.8,
            }}
          />
          <Divider />
          <Grid
            spacing={2}
            container
            sx={{ height: "90%", px: 4, pt: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={8}>
              <Input
                sx={{
                  width: "100%",
                  backgroundColor: "#F4F4F4",
                  px: 2,
                  py: 0.8,
                  borderRadius: "4px 4px 0px 0px",
                  color: mainColors.font,
                  "& .MuiInputBase-input::placeholder": {
                    color: mainColors.font,
                    opacity: 1,
                  },
                }}
                placeholder="Add title..."
                disableUnderline
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                onBlur={() => setTitleError(!title)}
                onFocus={() => setTitleError(false)}
              />
              <Fade in={titleError}>
                <FormHelperText
                  sx={{ color: "red", position: "absolute", ml: 2 }}
                >
                  Input is required
                </FormHelperText>
              </Fade>

              <Input
                multiline
                sx={{
                  width: "100%",
                  mt: 3,
                  p: 2,
                  backgroundColor: "#F4F4F4",
                  borderRadius: "6px",
                  color: mainColors.font,
                  "& .MuiInputBase-input::placeholder": {
                    color: mainColors.font,
                    opacity: 1,
                  },
                }}
                placeholder="Enter description..."
                disableUnderline
                rows={10}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                onBlur={() => setDescriptionError(!description)}
                onFocus={() => setDescriptionError(false)}
              />
              <Fade in={descriptionError}>
                <FormHelperText
                  sx={{ color: "red", position: "absolute", ml: 2 }}
                >
                  Description is required
                </FormHelperText>
              </Fade>
            </Grid>
            <Grid
              item
              xs={4}
              columns={{ xs: 6 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Autocomplete
                  options={["Home", "Work", "Personal"]}
                  sx={{
                    "& .MuiAutocomplete-listbox": {
                      color: "blue", // Change the font color of the suggestions
                    },
                    "& .MuiAutocomplete-option": {
                      color: "red", // Change the font color of each option
                    },
                  }}
                  renderInput={(params) => (
                    <Input
                      disableUnderline
                      {...params.InputProps}
                      inputProps={{
                        ...params.inputProps,
                        placeholder: "Select Category",
                      }}
                      sx={{
                        width: "100%",
                        backgroundColor: "#F4F4F4",
                        px: 2,
                        py: 1.5,
                        borderRadius: "4px 4px 0px 0px",
                        "& .MuiInputBase-input": {
                          color: mainColors.font,
                        },
                        "& ::placeholder": {
                          color: mainColors.font,
                          opacity: 1,
                        },
                      }}
                    />
                  )}
                  value={category}
                  onBlur={() => setCategoryError(!category)}
                  onFocus={() => setCategoryError(false)}
                  onChange={(event, newValue: string | null) => {
                    setCategory(newValue || "")
                  }}
                />
                <Fade in={categoryError}>
                  <FormHelperText
                    sx={{ color: "red", position: "absolute", ml: 2 }}
                  >
                    Category is required
                  </FormHelperText>
                </Fade>
              </Box>
              <CardActions sx={{ justifyContent: "flex-end", pb: 2 }}>
                <Button onClick={onClose}>cancel</Button>
                <Button onClick={handleSubmit}>
                  {existNote ? "Update" : "Add"}
                </Button>
              </CardActions>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  )
}

export default AddNote
