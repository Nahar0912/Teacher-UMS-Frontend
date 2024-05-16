"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SignUp: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    department: '',
    uploadCV: null as File | null,
    address: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    department: '',
    uploadCV: '',
    address: '',
    phoneNumber: '',
  });

  const [apiError, setApiError] = useState<string | null>(null);

  const validate = () => {
    const newErrors = {
      username: '',
      email: '',
      password: '',
      fullName: '',
      department: '',
      uploadCV: '',
      address: '',
      phoneNumber: '',
    };

    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (formData.email.length < 5) {
      newErrors.email = 'Email must be at least 5 characters long';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase character';
    }
    if (!formData.fullName) {
      newErrors.fullName = 'Full Name is required';
    } else if (formData.fullName.length > 50) {
      newErrors.fullName = 'Name should be a maximum of 50 characters long';
    }
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^0\d{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must start with 0 and be 10 digits long';
    }
    if (!formData.uploadCV) {
      newErrors.uploadCV = 'File is required';
    } else if (!formData.uploadCV.name.endsWith('.pdf')) {
      newErrors.uploadCV = 'File must be a PDF';
    }

    setErrors(newErrors);

    // Check if there are any errors
    return Object.values(newErrors).every(error => error === '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        uploadCV: file,
      });
      setErrors({
        ...errors,
        uploadCV: file && file.name.endsWith('.pdf') ? '' : 'File must be a PDF',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('department', formData.department);
      if (formData.uploadCV) {
        formDataToSend.append('uploadCV', formData.uploadCV);
      }
      formDataToSend.append('address', formData.address);
      formDataToSend.append('phoneNumber', formData.phoneNumber);

      try {
        const response = await axios.post('http://localhost:3000/teacher/addUser', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Response:', response.data);
        router.push('/signin');  // Redirect to sign-in page
      } catch (error) {
        setApiError('Sign up failed. Please try again.');
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-3 py-2 border rounded"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border rounded"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="w-full px-3 py-2 border rounded"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              className="w-full px-3 py-2 border rounded"
              value={formData.department}
              onChange={handleChange}
              required
            />
            {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              className="w-full px-3 py-2 border rounded"
              value={formData.address}
              onChange={handleChange}
              required
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              className="w-full px-3 py-2 border rounded"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="file">Upload File</label>
            <input
              type="file"
              id="file"
              name="file"
              className="w-full"
              onChange={handleFileChange}
              required
            />
            {errors.uploadCV && <p className="text-red-500 text-sm mt-1">{errors.uploadCV}</p>}
          </div>
          {apiError && <p className="text-red-500 text-sm mt-1">{apiError}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
