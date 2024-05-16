import axios from "axios";

export default async function SearchUser() {
    const response = await axios.get("localhost:3000/teacher/searchUser");
    const jsonData = response.data;
    console.log(jsonData);
    return (
        <>
            <h1> this is Dashboard</h1>
            {jsonData.message}
        </>
    );
}