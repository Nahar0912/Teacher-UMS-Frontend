"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SignIn: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [apiError, setApiError] = useState<string | null>(null);

  const validate = () => {
    const newErrors = {
      email: '',
      password: '',
    };

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
    }

    setErrors(newErrors);

    // Check if there are any errors
    return Object.values(newErrors).every(error => error === '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('http://localhost:3000/teacher/login', {
          email: formData.email,
          password: formData.password,
        });
        console.log('Response:', response.data);

        // Assuming the response contains a token or user data, store it if needed
        // For example: localStorage.setItem('token', response.data.token);

        // Redirect to dashboard
        router.push('/dashboard');
      } catch (error) {
        setApiError('Login failed. Please check your credentials and try again.');
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSubmit}>
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
          {apiError && <p className="text-red-500 text-sm mt-1">{apiError}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
