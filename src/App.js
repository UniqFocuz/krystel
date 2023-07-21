import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routers from './routes/Routers';
import store from './redux/store/store';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import options from './lib/particles';
import "./index.css"
import Navbar from './components/navbar/Navbar';
function App() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar/>
        <div className="app-container">
          <Routers />
          <Particles id="tsparticles" init={particlesInit} options={options} />
        </div>
      </BrowserRouter>
    </Provider >
  );
}

export default App;
