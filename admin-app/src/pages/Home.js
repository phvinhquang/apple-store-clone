import GerneralInfo from "../components/HomePage/GeneralInfo";
import OrdersList from "../components/HomePage/OrdersList";

const HomePage = function () {
  return (
    <div>
      <GerneralInfo />
      <OrdersList resultsPerPage="8" title="History" />
    </div>
  );
};

export default HomePage;
