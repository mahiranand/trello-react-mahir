import { Link } from "react-router-dom";
import "./Board.css";
// eslint-disable-next-line react/prop-types
const Board = ({ id, name, bgClr }) => {
  return (
    <Link to={`/${id}`} style={{ textDecoration: 'none'}}>
      <div className="board" style={{ backgroundColor: bgClr }}>
        <p>{name}</p>
      </div>
    </Link>
  );
};

export default Board;
