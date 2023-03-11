import { useEffect, useState } from "react";
import emptyUserImage from "./assets/images/emptyUserImage.png"
import { Background } from "./components/BackGround/styles";
import { UserContext } from "./contexts/UserContext";
import { PostsContext } from "./contexts/PostsContext";
import { Router } from "./routes"
import getPosts from "./utils/getPosts";
import getUsers from "./utils/getUsers";
import { MobileSearchContext } from "./contexts/MobileSearchContext";

function App() {

  const [myUser, setMyUser] = useState({ image: emptyUserImage })
  const [posts, setPosts] = useState([])
  const [mustUpdatePosts, setMustUpdatePosts] = useState(false)
  const [sendPost, setSendPost] = useState(false)
  const [userSelected, setUserSelected] = useState(null)
  const [gotPosts, setGotPosts] = useState(false)
  const [showMobileSearchInput, setShowMobileSearchInput] = useState(true)

  async function handlePosts() {
    setGotPosts(await getPosts(setPosts))
  }

  useEffect(() => {
    getUsers(setMyUser, 'my_user')
    handlePosts()
  }, [])

  useEffect(() => {
    if (mustUpdatePosts) {
      getPosts(setPosts, setSendPost)
      setMustUpdatePosts(false)
    }
  }, [mustUpdatePosts])

  return (
    <>

      <UserContext.Provider value={{ myUser, userSelected, setUserSelected }}>
        <PostsContext.Provider value={{ posts, setPosts, setMustUpdatePosts, sendPost, setSendPost, gotPosts }}>
          <MobileSearchContext.Provider value={{ showMobileSearchInput, setShowMobileSearchInput }}>
            <Background>
              <Router />
            </Background>
          </MobileSearchContext.Provider>
        </PostsContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
