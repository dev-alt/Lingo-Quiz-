"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { SidebarItemProps } from "@/types/index";
import Link from "next/link";
import { Avatar, Card, CardBody, Progress } from "@nextui-org/react";

const MyProgress: React.FC<SidebarItemProps> = ({
  avatar,
  username,
  handle,
  level,
  xp,
  rank,
  badges,
  streak,
  balance,
}) => {
  const nextLevelXP = level * 100;
  const xpPercentage = Math.round((xp / nextLevelXP) * 100);

  const iconStyle = "text-4xl text-white mr-2";

  return (
    <Card className="bg-gray-900 text-white p-6 rounded-xl shadow-lg border-4 border-teal-500">
      <CardBody>
        <h3 className="text-3xl font-bold text-teal-500 text-center mb-6">
          My Progress
        </h3>

        {/* Profile Section */}
        <div className="flex flex-col items-center mb-6">
          <Avatar src={avatar} alt={username} size="lg" className="mb-2" />
          <p className="text-white text-2xl font-semibold mb-1">{username}</p>
          <p className="text-gray-400 text-sm mb-4">
            Level {level} ({xp} XP / {nextLevelXP} XP)
          </p>
          <Progress color="success" value={xpPercentage} className="w-full" aria-label={`Current Level Progress: ${xpPercentage}%`} />
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Rank */}
          <div className="flex flex-col items-center bg-gray-800 rounded-lg p-4">
            <Icon icon="mdi:trophy-award" className={iconStyle} />
            <p className="font-semibold text-lg">Rank</p>
            <p className="text-teal-400">{rank}</p>
          </div>

          {/* Badges */}
          <div className="flex flex-col items-center bg-gray-800 rounded-lg p-4">
            <Icon icon="mdi:shield-account-outline" className={iconStyle} />
            <p className="font-semibold text-lg">Badges</p>
            <p className="text-teal-400">{badges}</p>
          </div>

          {/* Streak */}
          <div className="flex flex-col items-center bg-gray-800 rounded-lg p-4">
            <Icon icon="mdi:fire" className={iconStyle} />
            <p className="font-semibold text-lg">Streak</p>
            <p className="text-teal-400">{streak} Day Streak</p>
          </div>

          {/* Points */}
          <div className="flex flex-col items-center bg-gray-800 rounded-lg p-4">
            <Icon icon="ic:twotone-monetization-on" className={iconStyle} />
            <p className="font-semibold text-lg">Points</p>
            <p className="text-teal-400">{balance}</p>
          </div>
        </div>

        {/* My Profile Button */}
        <div className="flex justify-center">
          <Link
            href={`/profile/${handle}`}
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-md transition-colors duration-300"
          >
            My Profile
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default MyProgress;
