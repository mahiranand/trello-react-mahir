import {
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import Cards from "./Cards";

const yourKey = "e329af9483b37135d074e667f5f48020";
const yourToken =
  "ATTA7b429b51abd4c5a77e17cc2148635edce084bc45b889d6a7c21bbadaea2709fc28232EFF";

const Lists = () => {
  let { id } = useParams();
  const [inputBox, setInputBox] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [listData, setListData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.trello.com/1/boards/${id}/lists?key=${yourKey}&token=${yourToken}`
      )
      .then((res) => {
        setListData(res.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddList = () => {
    axios
      .post(
        `https://api.trello.com/1/boards/${id}/lists?name=${inputValue}&key=${yourKey}&token=${yourToken}`
      )
      .then((res) => {
        setListData([...listData, res.data]);
      });
  };

  const handleCardInput = () => {
    setInputBox((prevVal) => !prevVal);
    setInputValue("");
  };

  return (
    <>
      <div
        style={{
          overflow: "hidden",
          height: "91vh",
          backgroundColor: "lightblue",
        }}
      >
        <Stack
          direction={"row"}
          overflow={"scroll"}
          height={"100%"}
          sx={{
            gap: "0.5rem",
            margin: "2rem",
            marginRight: "0",
          }}
        >
          {listData.map(({ id, name }) => (
            <List key={id}>
              <ListItem
                sx={{
                  width: "19rem",
                  flexDirection: "column",
                  backgroundColor: "lightsalmon",
                  borderRadius: "1rem",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <ListItemText>{name}</ListItemText>
                  <Button sx={{ color: "black" }}>
                    <MoreHorizIcon />
                  </Button>
                </div>
                <Cards id={id} />
              </ListItem>
            </List>
          ))}
          <List>
            <ListItem
              sx={{
                width: "19rem",
                flexDirection: "column",
                backgroundColor: "lightsalmon",
                borderRadius: "1rem",
                paddingTop: "1rem",
                paddingBottom: "1rem",
              }}
            >
              {inputBox ? (
                <>
                  <p
                    style={{
                      fontSize: "1.4rem",
                      marginBottom: "0.9rem",
                    }}
                  >
                    Create List
                  </p>
                  <TextField
                    id="outlined-basic"
                    label="List Name"
                    variant="outlined"
                    size="small"
                    value={inputValue}
                    onChange={handleInputValue}
                  />
                  <div
                    style={{
                      width: "70%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "0.8rem",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleAddList();
                        handleCardInput();
                      }}
                      sx={{ backgroundColor: "coral" }}
                      disabled={inputValue == "" ? true : false}
                    >
                      Add List
                    </Button>
                    <Button onClick={handleCardInput} sx={{ height: "100%" }}>
                      <CloseIcon />
                    </Button>
                  </div>
                </>
              ) : (
                <Button
                  onClick={handleCardInput}
                  sx={{
                    color: "darkcyan",
                    width: "100%",
                  }}
                >
                  Add New List
                </Button>
              )}
            </ListItem>
          </List>
        </Stack>
      </div>
    </>
  );
};

export default Lists;
