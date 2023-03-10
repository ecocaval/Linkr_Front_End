import Header from "../../components/Header"
import PagePublishPost from "../../components/PublishPost/PagePublishPost"
import UserPost from "../../components/UserPost"
import { HomeArea } from "./styles"

export default function Home() {
    return (
        <>
            <Header />
            <HomeArea>
                <PagePublishPost />
                <UserPost />
                <UserPost />
                <UserPost />
                <UserPost />
                <UserPost />
            </HomeArea>
        </>
    )
}