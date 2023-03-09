import { useEffect, useState } from "react";
import emptyUserImage from "./assets/images/emptyUserImage.png"
import { Background } from "./components/BackGround/styles";
import { MyUserContext } from "./contexts/MyUserContext";
import { Router } from "./routes"
import getUsers from "./components/Header/utils/getUsers";

function App() {

  const [myUser, setMyUser] = useState({ image: emptyUserImage })

  useEffect(() => {
    getUsers(setMyUser, 'my_user')
  }, [])

  return (
    <>
      <MyUserContext.Provider value={{
        myUser
      }}>
        <Background>
          <Router />
        </Background>
      </MyUserContext.Provider>
    </>
  );
}

export default App;
