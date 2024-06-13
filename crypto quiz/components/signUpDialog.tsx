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
  Link
} from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";


interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpDialog: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:7100/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Registration successful!");
        onClose(); // Close the modal after successful registration
      } else {
        const errorData = await response.json();
        toast.error("Registration failed");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error( "Registration failed" );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">Sign Up</ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="bordered"
              />
              <Input
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                variant="bordered"
              />
              <Input
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                variant="bordered"
              />
            </ModalBody>
            <ModalFooter>
              <Link href="/auth/login" >
                <Button variant="flat" color="default" className="mr-2">
                  Login
                </Button>
              </Link>
              <Button color="primary" onPress={handleSignup}>
                Sign Up
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SignUpDialog;
