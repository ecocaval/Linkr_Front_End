import axios from "axios";

export default async function getPageUser(setUserSelected, id) {
    const token = localStorage.getItem('token')
    if (!token) return
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/users?id=${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        setUserSelected(data)
    } catch (error) {
        console.error(error)
    }
    return
}