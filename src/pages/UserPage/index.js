import Header from "../../components/Header"
import UserPost from "../../components/UserPost"
import { UserArea } from "./styles"

export default function UserPage() {
    return (
        <>
            <Header />
            <UserArea>
                <UserPost />
                <UserPost />
                <UserPost />
                <UserPost />
                <UserPost />
            </UserArea>
        </>
    )
}