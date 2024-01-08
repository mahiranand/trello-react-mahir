import './Board.css';
// eslint-disable-next-line react/prop-types
const Board = ({name , bgClr}) => {
  return (
   <div className="board" style={ {backgroundColor: bgClr}}>
    <p>{name}</p>
   </div>
  )
}

export default Board