import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "400px",
  width: "75%",
  borderRadius: "1rem",
  bgcolor: "background.paper",
  p: 4,
  border: "none",
};

// eslint-disable-next-line react/prop-types
export default function Form({makeNewBoard}) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const setInputBox = () => setInput("");

  return (
    <div>
      <div
        style={{
          backgroundColor: "grey",
          opacity: ".4",
          height: "10rem",
          borderRadius: "0.5rem",
          fontSize: "1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={handleOpen}
      >
        <p style={{ margin: "3.5rem" }}>Create New Board</p>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="p">
            Create Board:
          </Typography>
          <TextField
            id="outlined-basic"
            label="Board Name"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: "100%", marginTop: "1.5rem" }}
          />
          <Button
            variant="contained"
            size="large"
            style={{ marginTop: "1.5rem" }}
            onClick={() => {
              handleClose(),
              setInputBox(),
              makeNewBoard(input)
            }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
