import getUsers from "./getUsers";

export default async function handleMyUser(setMyUser, setReturnToSignUp) {
    await getUsers(setMyUser, 'my_user', setReturnToSignUp)
}