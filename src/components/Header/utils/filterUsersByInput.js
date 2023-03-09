export default function filterUsersByInput(usersInSearch, headerInputValue) {
    return usersInSearch.filter(user => (
        user.name.toLowerCase().includes(headerInputValue.toLowerCase()) && headerInputValue !== ""
    ))
}