import { useEffect, useState } from "react";
import emptyUserImage from "./assets/images/emptyUserImage.png"
import { Background } from "./components/BackGround/styles";
import { MyUserContext } from "./contexts/MyUserContext";
import { PostsContext } from "./contexts/PostsContext";
import { Router } from "./routes"
import getPosts from "./utils/getPosts";
import getUsers from "./utils/getUsers";

function App() {

  const [myUser, setMyUser] = useState({ image: emptyUserImage })
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getUsers(setMyUser, 'my_user')
    getPosts(setPosts)
  }, [])

  return (
    <>
      <MyUserContext.Provider value={{ myUser }}>
        <PostsContext.Provider value={{ posts, setPosts }}>
          <Background>
            <Router />
          </Background>
        </PostsContext.Provider>
      </MyUserContext.Provider>
    </>
  );
}

export default App;
