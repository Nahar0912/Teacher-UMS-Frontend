"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function AllUser() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get("http://localhost:3000/teacher/allUsers");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        fetchUsers();
    }, []);

    const handleDelete = async (username:any) => {
        try {
            await axios.delete(`http://localhost:3000/teacher/deleteUser/${username}`);
            // Filter out the deleted user from the list
            const updatedUsers = users.filter((user: { username: any; }) => user.username !== username);
            console.log("Updated Users:", updatedUsers);
            setUsers(updatedUsers);
        } catch (error:any) {
            console.error("Error deleting user:", error);
            console.log("Error Response:", error.response);
            console.log("Request Details:", error.request);
            console.log("Error Message:", error.message);
        }
    };
    
    function handleUpdate(username: any): void {
        
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">User List</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user:any, index:any) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                        <p className="font-bold text-lg mb-2">ID: {user.id}</p>
                        <p className="text-gray-700"><span className="font-semibold">Username:</span> {user.username}</p>
                        <p className="text-gray-700"><span className="font-semibold">Email:</span> {user.email}</p>
                        <p className="text-gray-700"><span className="font-semibold">Full Name:</span> {user.fullName}</p>
                        <p className="text-gray-700"><span className="font-semibold">Department:</span> {user.department}</p>
                        <p className="text-gray-700"><span className="font-semibold">Address:</span> {user.address}</p>
                        <p className="text-gray-700"><span className="font-semibold">Phone:</span> {user.phoneNumber}</p>
                        <div className="flex justify-between mt-4">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleUpdate(user.username)}>Update</button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(user.username)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
