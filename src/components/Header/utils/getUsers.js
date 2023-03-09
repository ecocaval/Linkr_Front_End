import axios from "axios";

export default async function getUsers(setUserFunction, mode) {
    if(!['users','my_user'].includes(mode)) return

    const token = localStorage.getItem('token')
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/${mode}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        setUserFunction(data)
    } catch (error) {
        console.error(error)
    }
}