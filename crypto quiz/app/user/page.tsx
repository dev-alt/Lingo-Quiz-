'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(email, password);
      console.log('Logged in successfully');
      onClose();
    } catch (err: any) {
      setError(err.message);
      toast.error('Incorrect email or password.');
    }
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.form
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center">Sign in to save your progress!</h2>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>} {/* Display error message */}

      <div>
        <label htmlFor="email" className="block text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
      </div>

      <button type="submit" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-full">
        Login
      </button>
    </motion.form>
  );
};

export default LoginForm;