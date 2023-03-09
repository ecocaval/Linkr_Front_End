import Header from "../../components/Header"
import UserPost from "../../components/UserPost"
import { HashtagArea } from "./styles"

export default function HashtagPage() {
    return (
        <>
            <Header />
            <HashtagArea>
                <UserPost />
                <UserPost />
                <UserPost />
                <UserPost />
                <UserPost />
            </HashtagArea>
        </>
    )
}