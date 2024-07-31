import { Stack, Typography } from "@mui/material"
import { mainColors } from "../utils/colors"
import emptyNotes from "../assets/add-note-illustration.svg"
import emptySearchNotes from "../assets/search-image.svg"

const NotFound = ({ type }: { type: string }) => {
  return (
    <Stack alignItems="center" mt={5}>
      <Typography
        sx={{ color: mainColors.font, opacity: 0.6 }}
        variant="h4"
        mb={8}
      >
        {type === "search"
          ? "Couldn’t find any notes"
          : "You don't have any notes"}
      </Typography>
      <img src={type === "search" ? emptySearchNotes : emptyNotes} alt="" />
    </Stack>
  )
}

export default NotFound
