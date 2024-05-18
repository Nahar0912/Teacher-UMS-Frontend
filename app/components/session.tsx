"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface User {
    username: string,
    email: string,
    password: string,
    fullName: string,
    department: string,
    uploadCV: File | null,
    address: string,
    phoneNumber: string,
}

export default function Session () {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
 
  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const username = localStorage.getItem('email');
            const response = await axios.get("http://localhost:3000/teacher/getUser/"+username);
            setUser(response.data);
          } 
          catch (error) {
            console.error('Error fetching user data:', error);
            router.push('/signin');
          } 
    };

    fetchUserData();
  }, [router]);

  if (!user) {
    return <div></div>;
  }

  const handleLogout = () => {
    localStorage.removeItem('email');
    router.push('/signin');
  };


  return (
    <div className="navbar bg-base-100">
    <div className="flex-1">
      <a className="btn btn-ghost text-xl">Hii, {user && user.username}</a>
    </div>
    <div className="flex-none gap-2">
      <div className="form-control">
        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
      </div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" src={'http://localhost:8000/admin/getimage/'+user.uploadCV} />
          </div>
        </div>
        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <a className="justify-between">
              Profile
             
            </a>
          </li>
          <li><a>Settings</a></li>
          <li>
          <button
      className="bg-gray-300 hover:bg-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={handleLogout}
    >
      Logout
    </button>

          </li>
        </ul>
      </div>
    </div>
  </div>
  );
};



