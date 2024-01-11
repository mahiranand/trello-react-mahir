import { Box, Button, Modal, Popover, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

const yourKey = "e329af9483b37135d074e667f5f48020";
const yourToken =
  "ATTA7b429b51abd4c5a77e17cc2148635edce084bc45b889d6a7c21bbadaea2709fc28232EFF";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  backgroundColor: "lightblue",
  boxShadow: 24,
  borderRadius: "2rem",
  p: 4,
};

// eslint-disable-next-line react/prop-types
const CheckList = ({ cardId, name, open, handleClose }) => {
  const [checklistData, setChecklistData] = useState([]);
  const [displayTextArea, setDisplayTextArea] = useState(null);
  const [checkListName, setCheckListName] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.trello.com/1/cards/${cardId}/checklists?key=${yourKey}&token=${yourToken}`
      )
      .then((res) => {
        setChecklistData(res.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addCheckList = () => {
    axios
      .post(
        `https://api.trello.com/1/cards/${cardId}/checklists?name=${checkListName}&key=${yourKey}&token=${yourToken}`
      )
      .then((res) => {
        setChecklistData([...checklistData, res.data]);
      });
  };

  const deleteCheckList = (cListId) => {
    axios
      .delete(
        `https://api.trello.com/1/cards/${cardId}/checklists/${cListId}?key=${yourKey}&token=${yourToken}`
      )
      .then(() => {
        setChecklistData(checklistData.filter(({ id }) => id !== cListId));
      });
  };

  const handleAddBtnClose = () => {
    setDisplayTextArea(null);
  };

  const handleAddBtnOpen = (e) => {
    setDisplayTextArea(e.currentTarget);
  };

  const displayBtnId = displayTextArea ? "simple-popover" : undefined;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span
            style={{
              fontSize: "1.5rem",
              backgroundColor: "blanchedalmond",
              borderRadius: "0.5rem",
              padding: "0.5rem 1rem",
            }}
            id="modal-modal-title"
          >
            Card Name: {name}
          </span>
          <Button
            sx={{ backgroundColor: "blanchedalmond" }}
            onClick={handleClose}
          >
            <CloseIcon sx={{ color: "black" }} />
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "1.5rem",
            justifyContent: "space-between",
          }}
        >
          <p style={{ fontSize: "1.5rem" }}>CheckLists</p>
          <Button
            aria-describedby={displayBtnId}
            variant="contained"
            size="small"
            endIcon={<AddIcon />}
            onClick={handleAddBtnOpen}
          >
            Add
          </Button>
          <Popover
            id={displayBtnId}
            open={displayTextArea ? true : false}
            anchorEl={displayTextArea}
            onClose={handleAddBtnClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            {" "}
            <div
              style={{
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TextField
                value={checkListName}
                id="outlined-basic"
                label="CheckList Name"
                variant="outlined"
                size="small"
                sx={{ paddingBottom: "0.5rem" }}
                onChange={(e) => setCheckListName(e.target.value)}
              />
              <Button
                sx={{ color: "black", backgroundColor: "lightsteelblue" }}
                disabled={checkListName ? false : true}
                onClick={() => {
                  addCheckList();
                  setCheckListName("");
                }}
              >
                Add
              </Button>
            </div>
          </Popover>
        </div>
        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.7rem",
          }}
        >
          {checklistData.map(({ name, id }) => (
            <div
              key={id}
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <CheckBoxOutlinedIcon />
                <p style={{ fontSize: "1.2rem" }}>{name}</p>
              </div>
              <Button
                size="small"
                variant="outlined"
                startIcon={<DeleteIcon />}
                sx={{
                  color: "red",
                  border: "1px solid red",
                }}
                onClick={() => {
                  deleteCheckList(id);
                }}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      </Box>
    </Modal>
  );
};

export default CheckList;
