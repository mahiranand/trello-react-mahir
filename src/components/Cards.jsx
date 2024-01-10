import { Box, Button, Chip } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
const yourKey = "e329af9483b37135d074e667f5f48020";
const yourToken =
  "ATTA7b429b51abd4c5a77e17cc2148635edce084bc45b889d6a7c21bbadaea2709fc28232EFF";

// eslint-disable-next-line react/prop-types
const Cards = ({ id }) => {
  const [cardsData, setCardData] = useState([]);
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

  return (
    <>
      <Box
        sx={{
          maxHeight: "30rem",
          overflowY: "scroll",
          width: "100%",
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
              }}
            />
          );
        })}
      </Box>

      <Button
        variant="text"
        sx={{
          color: "cyan",
          width: "100%",
          backgroundColor: "coral",
        }}
      >
        Add New Card
      </Button>
    </>
  );
};

export default Cards;
