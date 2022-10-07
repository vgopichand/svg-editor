import './App.css';
import Chart from './chart';
import DashboardPlots from './DashboardPlots';
const DashBoardView = true

function App() {
  return (
    <div className="App">
      {!DashBoardView && <Chart /> }
      {DashBoardView && <DashboardPlots />}
    </div>
  );
}

export default App;
