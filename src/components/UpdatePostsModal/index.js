import { useContext } from "react";
import { IoReload } from "react-icons/io5";
import { PostsContext } from "../../contexts/PostsProvider";
import { StyledModal } from "./styles";

export default function UpdatePostsModal() {

    const {
        postsToUpdate,
    } = useContext(PostsContext)

    return (
        <StyledModal>
            <p>{String(postsToUpdate)} new posts, load more!</p>
            <IoReload
                style={{
                    color: "#FFFFFF"
                }}
            />
        </StyledModal>
    )
}
