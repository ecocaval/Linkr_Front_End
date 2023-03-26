export function getUserLikesText(usersThatLiked, userId) {
    let userIndex
    let response
    
    if(!usersThatLiked || !usersThatLiked.length) return

    const usersThatLikedCopy = [...usersThatLiked]

    const includesOwnUser = usersThatLiked.filter((user, index) => {
        if (user.user_id === userId) {
            userIndex = index
            return true
        }
        return false
    })

    if (includesOwnUser.length) {
        usersThatLikedCopy.splice(userIndex, 1)
        if (usersThatLikedCopy.length === 0) {
            response = `You`
        } else if (usersThatLikedCopy.length === 1) {
            response = `You and ${usersThatLikedCopy[0]?.name}`
        } else {
            response = `You, ${usersThatLikedCopy[0]?.name} and other ${usersThatLikedCopy.length - 1} people`
        }
    } else {
        if (usersThatLiked.length === 1) {
            response = `${usersThatLiked[0]?.name}`
        } else if (usersThatLiked.length === 2) {
            response = `${usersThatLiked[0]?.name} and ${usersThatLiked[1]?.name}`
        } else {
            response = `${usersThatLiked[0]?.name}, ${usersThatLiked[1]?.name} and other ${usersThatLiked.length - 2} people`
        }
    }
    return response
}