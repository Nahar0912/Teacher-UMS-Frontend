"use client";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function UpdateUser() {
    const { username } = useParams();
    const [user, setUser] = useState({
        email: "",
        fullName: "",
        department: "",
        address: "",
        phoneNumber: ""
    });

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get(`http://localhost:3000/teacher/updateUser/${username}`);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }
        fetchUser();
    }, [username]);

    const handleChange = (e:any) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/teacher/updateUser/${username}`, user);
            // Redirect or display a success message
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Update User</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                    />
                </div>
                {/* Add input fields for other user information */}
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}
