export default function filterUsersByInput(usersInSearch, headerInputValue) {
    return usersInSearch.filter(user => (
        user.name.toLowerCase().includes(headerInputValue.toLowerCase()) && headerInputValue !== ""
    )).sort((a, b) => {
        if (a.imFollowing && b.imFollowing) return 0
        else if (a.imFollowing) return -1
        else if (b.imFollowing) return 1
        return 0
    })
}