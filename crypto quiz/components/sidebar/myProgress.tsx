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
    <Card className="bg-gray-900 text-white p-4 rounded-lg shadow-md border-4 border-teal-500">
      <CardBody>
        <h3 className="text-2xl font-bold text-teal-500 text-center">
          My Progress
        </h3>

        {/* Profile Section */}
        <div className="flex flex-col items-center mt-4">
          <Avatar src={avatar} alt={username} size="lg" />
          <p className="text-white text-2xl font-semibold mt-2">
            {username}
          </p>
          <p className="text-gray-400 text-sm mb-2">
            Level {level} ({xp} XP / {nextLevelXP} XP)
          </p>
          <Progress color="success" value={xpPercentage} className="w-full" />
        </div>

        {/* Progress Section */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {/* Rank */}
          <div className=" rounded-lg p-0">
            <div className="flex items-center justify-center">
              <Icon icon={"mdi:trophy-award"} className={iconStyle} />
              <div className="flex-col">
                <p className="font-semibold text-lg">Rank</p>
                <p>{rank}</p>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className=" rounded-lg p-0">
            <div className="flex items-center justify-center">
              <Icon icon="mdi:shield-account-outline" className={iconStyle} />
              <div className="flex-col">
                <p className="font-semibold text-lg">Badges</p>
                <p>{badges}</p>
              </div>
            </div>
          </div>

          {/* Streak */}
          <div className=" rounded-lg p-0">
            <div className="flex items-center justify-center">
              <Icon icon="mdi:fire" className={iconStyle} />
              <div className="flex-col">
                <p className="font-semibold text-lg">Streak</p>
                <p>{streak} Day Streak</p>
              </div>
            </div>
          </div>

          {/* Points */}
          <div className=" rounded-lg p-0">
            <div className="flex items-center justify-center">
              <Icon icon="ic:twotone-monetization-on" className={iconStyle} />
              <div className="flex-col">
                <p className="font-semibold text-lg">Points</p>
                <p>{balance}</p>
              </div>
            </div>
          </div>
        </div>

        {/* My Profile Button */}
        <div className="flex justify-center mt-4">
          <Link
            href={`/profile/${handle}`}
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
          >
            My Profile
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default MyProgress;

