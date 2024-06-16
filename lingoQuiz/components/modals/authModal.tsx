"use client";

import React, { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Button,
    Divider,
    Spacer,
} from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import { motion } from 'framer-motion';
import { useAuth } from "@/context/AuthContext";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// AuthModal component
const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    // Handle form submission
    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsLoading(true);
        if (e) {e.preventDefault();}
        if (e) {
            e.preventDefault();
        }
        try {
            if (mode === 'signup') {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, email, password }),
                });

                if (response.ok) {
                    const data = await response.json();
                    toast("Registration successful!");
                    setMode('signin');
                } else {
                    const errorData = await response.json();
                    toast(errorData.error || "An error occurred.");
                }
            } else if (mode === 'signin') {
                try {
                    await login(email, password);
                    toast("Login successful!");
                    onClose();

                } catch (error) {
                    console.error("Login Error:", error);
                    toast("Incorrect email or password");
                }
            }
        } catch (error) {
            console.error("Error during authentication:", error);
            toast("An unexpected error occurred.");
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} backdrop={"blur"} scrollBehavior={"inside"} >
                <ModalContent>
                    {() => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ModalHeader className="flex flex-col gap-1 text-center pb-2">
                                <h2 className="text-2xl font-semibold text-black dark:text-white">
                                    {mode === 'signin' ? 'Welcome Back!' : 'Create an Account'}
                                </h2>
                                <p className="text-small text-default-500 dark:text-gray-300">
                                    {mode === 'signin'
                                        ? "Sign in to your account"
                                        : "Sign up to get started"}
                                </p>
                            </ModalHeader>
                            <Divider />
                            <ModalBody>
                                {mode === 'signup' && (
                                    <Input
                                        label="Username"
                                        placeholder="Your unique username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        variant="bordered"
                                    />
                                )}
                                <Input
                                    label="Email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    variant="bordered"
                                />
                                <Input
                                    label="Password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    variant="bordered"
                                />
                            </ModalBody>
                            <ModalFooter className="flex-col">
                                <Button className={`w-full text-white rounded py-2 px-4 transition duration-300 ${mode === 'signin' ? 'bg-teal-500 hover:bg-teal-700' : 'bg-gray-700 hover:bg-gray-800'}`}
                                    onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                                >
                                    {mode === 'signin' ? 'Sign Up' : 'Login'}
                                </Button>

                                <Spacer y={0.5} />
                                <Button
                                    color="primary"
                                    className="w-full text-white rounded py-2 px-4 transition duration-300"
                                    onClick={handleSubmit}
                                >
                                    {mode === 'signin' ? 'Sign In' : 'Sign Up'}
                                </Button>

                                {mode === 'signin' && (
                                    <>
                                        <Spacer y={0.5} />
                                        <div
                                            className="text-sm text-default-400 hover:text-default-500 text-center"
                                        >
                                            Forgot password?
                                        </div>
                                    </>
                                )}
                            </ModalFooter>
                        </motion.div>

                    )}
                </ModalContent>
                <ToastContainer position="top-right" />
            </Modal>
        </>
    );
};

export default AuthModal;