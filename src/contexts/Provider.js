import { LoginProvider } from "./LoginProvider";
import { MobileProvider } from "./MobileProvider";
import { PostsProvider } from "./PostsProvider";
import { UserProvider } from "./UserProvider";

export default function Provider({ children }) {
    return (
        <>
            <UserProvider>
                <LoginProvider>
                    <PostsProvider>
                        <MobileProvider>
                            {children}
                        </MobileProvider>
                    </PostsProvider>
                </LoginProvider>
            </UserProvider>
        </>
    )
}