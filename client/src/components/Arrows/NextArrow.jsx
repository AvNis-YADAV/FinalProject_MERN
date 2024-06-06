import { GrFormNext } from "react-icons/gr";
import "./Arrows.css";

const NextArrow = (props) => {
  const { onClick } = props;

  return <GrFormNext className="next" onClick={onClick} />;
};

export default NextArrow;
