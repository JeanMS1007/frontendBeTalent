import Employees from "./pages/employees";
import Header from "./templates/header";
import './app.css';

function App() {
  return (
    <>
      <Header />
      <div className="content">
        <Employees />
      </div>
    </>
  );
}

export default App;
