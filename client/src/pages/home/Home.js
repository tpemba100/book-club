import CurrentBook from "../../components/CurrentBook/CurrentBook";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <CurrentBook />
    </div>
  );
};

export default Home;
