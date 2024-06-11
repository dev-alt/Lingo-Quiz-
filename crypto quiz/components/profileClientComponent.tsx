"use client";
import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react"; 
export default function ProfileClientComponent({ profileData }: { profileData: any }) {
  const {
    username,
    handle,
    bio,
    joinDate,
    level,
    xp,
    challengesCompleted,
    rank,
    badges,
    streak,
    // Destructure other fields as needed
  } = profileData.profileByHandle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 rounded-lg p-6 m-4 shadow-[0_20px_50px_#14b8a6]"
    >
      <h1 className="text-4xl font-bold mb-4 text-white">Username: {username}</h1>
      <div className="text-xl text-gray-300 mb-4">
        <p className="text-teal-400">Handle: {handle}</p>
        {bio && <p className="mt-2 text-gray-400">Bio: {bio}</p>}
        <p className="mt-2">Join Date: {new Date(parseInt(joinDate)).toLocaleDateString()}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <p className="text-lg font-semibold text-teal-400 flex items-center">
            <Icon icon="mdi:star" className="mr-2" /> Level: {level}
          </p>
          <p className="text-lg font-semibold text-teal-400 flex items-center mt-2">
            <Icon icon="mdi:star" className="mr-2" /> XP: {xp}
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <p className="text-lg font-semibold text-teal-400 flex items-center">
            <Icon icon="mdi:trophy" className="mr-2" /> Challenges Completed: {challengesCompleted}
          </p>
          <p className="text-lg font-semibold text-teal-400 flex items-center mt-2">
            <Icon icon="mdi:trophy" className="mr-2" /> Rank: {rank}
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <p className="text-lg font-semibold text-teal-400 flex items-center">
            <Icon icon="mdi:medal" className="mr-2" /> Badges: {badges}
          </p>
          <p className="text-lg font-semibold text-teal-400 flex items-center mt-2">
            <Icon icon="mdi:medal" className="mr-2" /> Streak: {streak}
          </p>
        </div>
      </div>
    </motion.div>
  );
}