import emptyUserImage from "../../../assets/images/emptyUserImage.png"

export default function cleanStates({
    setSentLogin,
    setPosts,
    setUserPosts,
    setHashtagPosts,
    setUpdatedPosts,
    setPostsToUpdate,
    setMustUpdatePosts,
    setSendPost,
    setGotPosts,
    setMyUser,
    setUserSelected
}) {
    if(!!setSentLogin) setSentLogin(false)
    if(!!setPosts) setPosts([])
    if(!!setUserPosts) setUserPosts([])
    if(!!setHashtagPosts) setHashtagPosts([])
    if(!!setUpdatedPosts) setUpdatedPosts([])
    if(!!setPostsToUpdate) setPostsToUpdate(0)
    if(!!setMustUpdatePosts) setMustUpdatePosts(false)
    if(!!setSendPost) setSendPost(false)
    if(!!setGotPosts) setGotPosts(false)
    if(!!setMyUser) setMyUser({ image: emptyUserImage })
    if(!!setUserSelected) setUserSelected(null)
}