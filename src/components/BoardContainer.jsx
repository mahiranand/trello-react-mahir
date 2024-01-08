import axios from "axios";
import { useEffect, useState } from "react";
import Board from "./Board";
import "./BoardContainer.css";
import Form from "./Form";
const yourKey = "e329af9483b37135d074e667f5f48020";
const yourToken =
  "ATTA7b429b51abd4c5a77e17cc2148635edce084bc45b889d6a7c21bbadaea2709fc28232EFF";

const BoardContainer = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.trello.com/1/members/me/boards?key=${yourKey}&token=${yourToken}`
      )
      .then((res) => {
        setData(res.data);
      });
  }, []);
  const makeNewBoard = (name) => {
    axios
      .post(
        `https://api.trello.com/1/boards/?name=${name}&key=${yourKey}&token=${yourToken}`
      )
      .then((res) => {
        setData([...data, res.data]);
      });
  };

  console.log(data);
  return data.length == 0 ? (
    <h1>Loading...</h1>
  ) : (
    <div className="board-container">
      <Form makeNewBoard={makeNewBoard} />
      {data.map((board, i) => (
        <Board name={board.name} bgClr={board.prefs.backgroundColor} key={i} />
      ))}
    </div>
  );
};

export default BoardContainer;
