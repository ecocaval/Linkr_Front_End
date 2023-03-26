import { Background } from "./components/BackGround/styles";
import Provider from "./contexts/Provider";
import { Router } from "./routes"
import 'react-tooltip/dist/react-tooltip.css'

function App() {
  
  return (
    <>
      <Provider>
        <Background>
          <Router />
        </Background>
      </Provider>
    </>
  );
}

export default App;
