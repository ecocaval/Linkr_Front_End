export default function filterArrayByInput(usersInSearch, headerInputValue) {
    return usersInSearch.filter(user => (
        user.name.toLowerCase().includes(headerInputValue.toLowerCase()) && headerInputValue !== ""
    ))
}