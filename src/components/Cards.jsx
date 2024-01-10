import { Box, Button, Chip, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

const yourKey = "e329af9483b37135d074e667f5f48020";
const yourToken =
  "ATTA7b429b51abd4c5a77e17cc2148635edce084bc45b889d6a7c21bbadaea2709fc28232EFF";

// eslint-disable-next-line react/prop-types
const Cards = ({ id }) => {
  const [cardsData, setCardData] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.trello.com/1/lists/${id}/cards?key=${yourKey}&token=${yourToken}`
      )
      .then((res) => {
        setCardData(res.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddButton = () => {
    setShowButton((prevVal) => !prevVal);
  };

  const handleDelete = (cardId) => {
    axios
      .delete(
        `https://api.trello.com/1/cards/${cardId}?key=${yourKey}&token=${yourToken}`
      )
      .then(() => {
        setCardData(cardsData.filter(({ id }) => id != cardId));
      });
  };

  const addNewCard = () => {
    axios
      .post(
        `https://api.trello.com/1/cards?name=${inputValue}&idList=${id}&key=${yourKey}&token=${yourToken}`
      )
      .then((res) => {
        setCardData([...cardsData, res.data]);
      });
  };

  return (
    <>
      <Box
        sx={{
          marginBottom: "0.5rem",
          maxHeight: "25rem",
          overflowY: "scroll",
          width: "100%",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {cardsData.map(({ name, id }) => {
          return (
            <Chip
              label={name}
              key={id}
              sx={{
                width: "100%",
                height: "2.5rem",
                margin: "0.4rem 0",
                cursor: "pointer",
                fontSize: "1.1rem",
                display: "flex",
                justifyContent: "space-between",
              }}
              onDelete={() => {
                handleDelete(id);
              }}
              deleteIcon={<DeleteIcon />}
            />
          );
        })}
      </Box>
      {showButton ? (
        <Button
          variant="text"
          sx={{
            color: "cyan",
            width: "100%",
            backgroundColor: "coral",
          }}
          onClick={handleAddButton}
        >
          Add New Card
        </Button>
      ) : (
        <>
          <TextField
            sx={{ width: "90%" }}
            id="outlined-basic"
            label="Card Name"
            variant="outlined"
            size="small"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <div
            style={{
              width: "90%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "0.8rem",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                setInputValue("");
                handleAddButton();
                addNewCard();
              }}
              sx={{ backgroundColor: "coral" }}
              disabled={inputValue == "" ? true : false}
            >
              Add Card
            </Button>
            <Button
              onClick={() => {
                handleAddButton();
              }}
              sx={{ height: "100%" }}
            >
              <CloseIcon />
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default Cards;
