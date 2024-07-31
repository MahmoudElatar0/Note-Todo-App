import { Button, Stack } from "@mui/material"
import { useState } from "react"
import CircleIcon from "@mui/icons-material/Circle"
import AddIcon from "@mui/icons-material/Add"
import { mainColors } from "../utils/colors"
import { toggleOpenAddNote } from "../reducers/slices/openAddNote"
import { useDispatch } from "react-redux"

type ButtonsProps = {
  setCategory: (category: string) => void
}

const Buttons = ({ setCategory }: ButtonsProps) => {
  const [isActive, setIsActive] = useState("all")

  const dispatch = useDispatch()

  const openAddNote = () =>
    dispatch(toggleOpenAddNote({ openAddNote: true, existNote: null }))

  const handleActive = (category: string) => {
    setIsActive(category)
    setCategory(category)
  }

  const getButtonStyles = (isActive: string) => {
    const styles = {
      textTransform: "capitalize",
      width: 89,
      height: 35,
      lineHeight: 1.5,
      color: "black",
      opacity: 0.8,
      fontWeight: "light",
      backgroundColor: "",
      ":hover": { bgcolor: "grey.200" },
    }

    switch (isActive) {
      case "all":
        styles.color = "white"
        styles.backgroundColor = mainColors.all
        styles[":hover"] = { bgcolor: mainColors.all }
        break
      case "home":
        styles.color = "white"
        styles.backgroundColor = mainColors.home
        styles[":hover"] = { bgcolor: mainColors.home }
        break
      case "work":
        styles.color = "white"
        styles.backgroundColor = mainColors.work
        styles[":hover"] = { bgcolor: mainColors.work }
        break
      case "personal":
        styles.color = "white"
        styles.backgroundColor = mainColors.personal
        styles[":hover"] = { bgcolor: mainColors.personal }
        break
    }

    return styles
  }

  return (
    <Stack
      mt={4}
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      spacing={{ xs: 1, sm: 2, md: 4 }}
    >
      <Stack direction={"row"} spacing={2}>
        <Button
          onClick={() => handleActive("all")}
          variant={isActive === "all" ? "contained" : "text"}
          disableElevation
          sx={getButtonStyles(isActive === "all" ? "all" : "")}
        >
          All
        </Button>
        <Button
          onClick={() => handleActive("home")}
          variant={isActive === "home" ? "contained" : "text"}
          color="warning"
          disableElevation
          sx={getButtonStyles(isActive === "home" ? "home" : "")}
        >
          <CircleIcon
            sx={{
              position: "absolute",
              bottom: "-7px",
              left: "10",

              color: mainColors.home,
              width: "9px",
            }}
          />
          Home
        </Button>
        <Button
          onClick={() => handleActive("work")}
          variant={isActive === "work" ? "contained" : "text"}
          color="secondary"
          disableElevation
          sx={getButtonStyles(isActive === "work" ? "work" : "")}
        >
          <CircleIcon
            sx={{
              position: "absolute",
              bottom: "-7px",
              left: "10",

              color: mainColors.work,
              width: "9px",
            }}
          />
          Work
        </Button>
        <Button
          onClick={() => handleActive("personal")}
          variant={isActive === "personal" ? "contained" : "text"}
          color="success"
          disableElevation
          sx={getButtonStyles(isActive === "personal" ? "personal" : "")}
        >
          <CircleIcon
            sx={{
              position: "absolute",
              bottom: "-7px",
              left: "10",

              color: mainColors.personal,
              width: "9px",
            }}
          />
          Personal
        </Button>
      </Stack>
      <Button
        onClick={openAddNote}
        variant="contained"
        sx={{
          ml: "auto",
          bgcolor: mainColors.main,
          ":hover": { bgcolor: "#03A9F4 " },
        }}
        startIcon={<AddIcon />}
      >
        Add note
      </Button>
    </Stack>
  )
}

export default Buttons
