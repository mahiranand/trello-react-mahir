import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  LinearProgress,
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
const CheckItems = ({ id, cardId }) => {
  const [checkItemsData, setCheckitemsData] = useState([]);
  const [showInputBox, setShowInputBox] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [taskDone, setTaskDone] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://api.trello.com/1/checklists/${id}/checkItems?key=${yourKey}&token=${yourToken}`
      )
      .then((res) => {
        setCheckitemsData(res.data);
        for (let i in res.data) {
          if (res.data[i].state == "complete") {
            setTaskDone((prev) => prev + 1);
          }
        }
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

  const deleteCheckItem = (itemId, state) => {
    axios
      .delete(
        `https://api.trello.com/1/checklists/${id}/checkItems/${itemId}?key=${yourKey}&token=${yourToken}`
      )
      .then(() => {
        setCheckitemsData(checkItemsData.filter(({ id }) => id !== itemId));
        if (state == "complete") {
          setTaskDone((prev) => prev - 1);
        }
      });
  };
  const updataCheckItems = (itemId, state) => {
    const newState = state == "complete" ? "incomplete" : "complete";
    axios
      .put(
        `https://api.trello.com/1/cards/${cardId}/checkItem/${itemId}?state=${newState}&key=${yourKey}&token=${yourToken}`
      )
      .then((res) => {
        if (state == "complete") {
          setTaskDone((prev) => prev - 1);
        } else {
          setTaskDone((prev) => prev + 1);
        }
        setCheckitemsData(
          checkItemsData.map((list) => {
            if (list.id == res.data.id) {
              return res.data;
            }
            return list;
          })
        );
      });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "0.5rem 0",
          marginLeft: "0.2rem",
          gap: "1rem",
        }}
      >
        <span>
          {taskDone ? ((taskDone / checkItemsData.length) * 100).toFixed(2) : 0}
          %
        </span>
        <LinearProgress
          sx={{ width: "70%" }}
          variant="determinate"
          value={
            taskDone ? ((taskDone / checkItemsData.length) * 100).toFixed(2) : 0
          }
        />
      </div>
      <FormGroup sx={{ marginTop: "0.5rem" }}>
        {checkItemsData.map(({ name, id, state }) => {
          return (
            <div
              key={id}
              style={{
                display: "flex",
                alignItems: "center",
                width: "30%",
                minWidth: "12rem",
                justifyContent: "space-between",
              }}
            >
              <FormControlLabel
                sx={{ margin: "0px", padding: "0px", height: "1.5rem" }}
                control={
                  <Checkbox
                    onChange={() => {
                      updataCheckItems(id, state);
                    }}
                    checked={state == "complete" ? true : false}
                    size="small"
                  />
                }
                label={name}
              />
              <Button
                sx={{ color: "black" }}
                onClick={() => {
                  deleteCheckItem(id, state);
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
