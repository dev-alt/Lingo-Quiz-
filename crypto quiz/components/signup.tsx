'use client';

import React, { useState } from "react";
import { Input, Button, Spacer } from "@nextui-org/react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

export function SignupFormDemo() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  //Framer motion Logic
  const radius = 100; 
  const [visible, setVisible] = useState(false);
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) => {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-md bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Aceternity
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to aceternity if you can because we don't have a login flow
        yet
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            style={{
              background: useMotionTemplate`
              radial-gradient(
              ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
              var(--blue-500),
              transparent 80%
              )
          `,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            className="p-[2px] rounded-lg transition duration-300"
          >
            <Input
              id="firstname"
              label="First name"
              placeholder="Tyler"
              type="text"
              variant="bordered"
              className="dark:text-white"
            />
          </motion.div>

          <motion.div
            style={{
              background: useMotionTemplate`
              radial-gradient(
              ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
              var(--blue-500),
              transparent 80%
              )
          `,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            className="p-[2px] rounded-lg transition duration-300"
          >
            <Input
              id="lastname"
              label="Last name"
              placeholder="Durden"
              type="text"
              variant="bordered"
              className="dark:text-white"
            />
          </motion.div>
        </div>
        <motion.div
            style={{
              background: useMotionTemplate`
              radial-gradient(
              ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
              var(--blue-500),
              transparent 80%
              )
          `,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            className="p-[2px] rounded-lg transition duration-300 mb-4" 
          >
            <Input
              id="email"
              label="Email Address"
              placeholder="projectmayhem@fc.com"
              type="email"
              variant="bordered"
              className="dark:text-white"
            />
          </motion.div>
        <motion.div
            style={{
              background: useMotionTemplate`
              radial-gradient(
              ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
              var(--blue-500),
              transparent 80%
              )
          `,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            className="p-[2px] rounded-lg transition duration-300 mb-4" 
          >
        <Input
          id="password"
          label="Password"
          placeholder="••••••••"
          type="password"
          variant="bordered"
          className="mb-4 dark:text-white"
        />
        </motion.div>
        <motion.div
            style={{
              background: useMotionTemplate`
              radial-gradient(
              ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
              var(--blue-500),
              transparent 80%
              )
          `,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            className="p-[2px] rounded-lg transition duration-300 mb-8" 
          >
        <Input
          id="twitterpassword"
          label="Your password"
          placeholder="••••••••"
          type="password"
          variant="bordered"
          className="mb-4 dark:text-white"
        />
        </motion.div>

        {/* Button with BottomGradient effect */}
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;

        </button>
      </form>
    </div>
  );
}
