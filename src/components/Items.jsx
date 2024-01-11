import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

const yourKey = "e329af9483b37135d074e667f5f48020";
const yourToken =
  "ATTA7b429b51abd4c5a77e17cc2148635edce084bc45b889d6a7c21bbadaea2709fc28232EFF";

// eslint-disable-next-line react/prop-types
const CheckItems = ({ id }) => {
  const [checkItemsData, setCheckitemsData] = useState([]);
  const [showInputBox, setShowInputBox] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.trello.com/1/checklists/${id}/checkItems?key=${yourKey}&token=${yourToken}`
      )
      .then((res) => {
        setCheckitemsData(res.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addItemsInCheckList = () => {
    axios
      .post(
        `https://api.trello.com/1/checklists/${id}/checkItems?name=${inputValue}&key=${yourKey}&token=${yourToken}`
      )
      .then((res) => {
        setCheckitemsData([...checkItemsData, res.data]);
      });
  };

  const deleteCheckItem = (itemId) => {
    axios
      .delete(
        `https://api.trello.com/1/checklists/${id}/checkItems/${itemId}?key=${yourKey}&token=${yourToken}`
      )
      .then(() => {
        setCheckitemsData(checkItemsData.filter(({ id }) => id !== itemId));
      });
  };

  return (
    <div>
      <FormGroup sx={{ marginTop: "0.5rem" }}>
        {checkItemsData.map(({ name, id, state }) => {
          return (
            <div
              key={id}
              style={{
                display: "flex",
                alignItems: "center",
                width: "30%",
                justifyContent: "space-between",
              }}
            >
              <FormControlLabel
                sx={{ margin: "0px", padding: "0px", height: "1.5rem" }}
                control={
                  <Checkbox
                    checked={state == "complete" ? true : false}
                    size="small"
                  />
                }
                label={name}
              />
              <Button
                sx={{ color: "black" }}
                onClick={() => {
                  deleteCheckItem(id);
                }}
              >
                <DeleteIcon sx={{ fontSize: "1.2rem" }} />
              </Button>
            </div>
          );
        })}
      </FormGroup>
      {showInputBox ? (
        <div
          style={{
            display: "flex",
            marginLeft: "0.75rem",
            marginTop: "0.75rem",
            alignItems: "center",
          }}
        >
          <TextField
            value={inputValue}
            id="outlined-basic"
            label="Item Name"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <Button
            sx={{
              marginLeft: "0.5rem",
              height: "2.5rem",
              backgroundColor: "lightsteelblue",
            }}
            disabled={inputValue.trim() ? false : true}
            onClick={() => {
              setShowInputBox(false);
              setInputValue("");
              addItemsInCheckList();
            }}
          >
            <SendIcon sx={{ color: "black" }} />
          </Button>
        </div>
      ) : (
        <Button
          variant="contained"
          size="small"
          sx={{ marginLeft: "0.75rem", marginTop: "0.75rem" }}
          onClick={() => setShowInputBox(true)}
        >
          Add Item
        </Button>
      )}
    </div>
  );
};

export default CheckItems;
