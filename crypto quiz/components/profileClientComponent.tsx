"use client";
import React from "react";
import { motion } from "framer-motion";

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
      className="bg-gray-800 rounded-lg p-6 m-4 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]"
    >
      <h1 className="text-4xl font-bold mb-4 text-white">{username}</h1>
      <div className="text-xl text-gray-300 mb-4">
        <p>Handle: {handle}</p>
        {bio && <p>Bio: {bio}</p>}
        <p>Join Date: {new Date(parseInt(joinDate)).toLocaleDateString()}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-lg font-semibold text-white">Level: {level}</p>
          <p className="text-lg font-semibold text-white">XP: {xp}</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-white">Challenges Completed: {challengesCompleted}</p>
          <p className="text-lg font-semibold text-white">Rank: {rank}</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-white">Badges: {badges}</p>
          <p className="text-lg font-semibold text-white">Streak: {streak}</p>
        </div>
      </div>
    </motion.div>
  );
}