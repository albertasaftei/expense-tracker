import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { decrement, increment } from "./homepageSlice";

const Homepage: React.FC = () => {
  const count = useSelector((state: RootState) => state.homepage.value);
  const dispatch = useDispatch();

  return (
    <>
      <h1>Homepage</h1>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </>
  );
};

export default Homepage;
