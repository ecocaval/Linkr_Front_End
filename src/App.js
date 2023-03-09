import PageHeader from "./components/PageHeader/PageHeader";
import { PageBackground } from "./components/PageBackGround/styles";
import PagePublishPost from "./components/PagePublishPost/PagePublishPost";

function App() {
  return (
    <>
      <PageBackground>
        <PagePublishPost/>
        {/* <PageHeader /> */}

      </PageBackground>
    </>
  );
}

export default App;
