import { Background } from "./components/BackGround/styles";
import { PostsProvider } from "./contexts/PostsProvider";
import { Router } from "./routes"
import { MobileProvider } from "./contexts/MobileProvider";
import { LoginProvider } from "./contexts/LoginProvider";
import { UserProvider } from "./contexts/UserProvider";

function App() {

  return (
    <>
      <UserProvider>
        <LoginProvider>
          <PostsProvider>
            <MobileProvider>
              <Background>
                <Router />
              </Background>
            </MobileProvider>
          </PostsProvider>
        </LoginProvider>
      </UserProvider>
    </>
  );
}

export default App;
