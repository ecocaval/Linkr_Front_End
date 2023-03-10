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
  const [mustUpdatePosts, setMustUpdatePosts] = useState([])
  const [sendPost, setSendPost] = useState(false)

  useEffect(() => {
    getUsers(setMyUser, 'my_user')
    getPosts(setPosts)
  }, [])

  useEffect(() => {
    if (mustUpdatePosts) {
      getPosts(setPosts, setSendPost)
      setMustUpdatePosts(false)
    }
  }, [mustUpdatePosts])

  return (
    <>
      <MyUserContext.Provider value={{ myUser }}>
        <PostsContext.Provider value={{ posts, setPosts, setMustUpdatePosts, sendPost, setSendPost }}>
          <Background>
            <Router />
          </Background>
        </PostsContext.Provider>
      </MyUserContext.Provider>
    </>
  );
}

export default App;
