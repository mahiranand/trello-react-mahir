import { Box, Button, Modal, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";

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

  const addCheckList = (cId) => {
    axios
      .post(
        `https://api.trello.com/1/cards/${cId}/checklists?name=mahir&key=${yourKey}&token=${yourToken}`
      )
      .then((res) => {
        setChecklistData([...checklistData, res.data]);
      });
  };

  console.log(checklistData);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          sx={{
            fontSize: "1.5rem",
            backgroundColor: "blanchedalmond",
            borderRadius: "0.5rem",
          }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Card Name: {name}
        </Typography>
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
            variant="contained"
            size="small"
            endIcon={<AddIcon />}
            onClick={() => {
              addCheckList(cardId);
            }}
          >
            Add
          </Button>
        </div>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {checklistData.map(({ name, id }, idx) => (
            <Typography key={id}>
              {idx + 1}: {name}
            </Typography>
          ))}
        </div>
      </Box>
    </Modal>
  );
};

export default CheckList;
