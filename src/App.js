import { Background } from "./components/BackGround/styles";
import Provider from "./contexts/Provider";
import { Router } from "./routes"

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
