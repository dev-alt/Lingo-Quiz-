'use client'

import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface LoginFormProps {
    onClose: () => void;
    onLoginSuccess: () => void;

}
const LoginForm: React.FC<LoginFormProps> = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
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
      className="bg-white p-8 rounded-lg shadow-md w-80 space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center">Sign in to save your progress!</h2>

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