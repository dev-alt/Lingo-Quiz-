"use client";

import { Modal, ModalContent, Input, Button, useModal, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { useAuth } from "@/app/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from 'framer-motion'; // Import Framer Motion

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginDialog: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(email, password);
      toast.success("Login successful!");
      onClose();
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Incorrect email or password");
    }
  };

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };



  return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="flex items-center justify-center"
    >
        <ModalContent className="border-4 border-teal-500 p-8 rounded shadow-md space-y-4" >

            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                Sign in to save your progress!
            </h2>
            {/* Error Message */}
            {/* Remove the reference to 'error' */}
            {/* {error && <p className="text-red-500 text-sm text-center">{error}</p>} */}
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Input */}
                <div>
                    <label htmlFor="email" className="block text-gray-800 font-semibold">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 p-2 block w-full text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-teal-500 focus:ring-teal-500"
                    />
                </div>

                {/* Password Input */}
                <div>
                    <label htmlFor="password" className="block text-gray-800 font-semibold">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 p-2 block w-full text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-teal-500 focus:ring-teal-500"
                    />
                </div>

                {/* Login Button */}
                <motion.button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
        </form>
      </ModalContent>
      <ToastContainer />
    </Modal>
  );
};

export default LoginDialog;
