'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import NextImage from "next/image";
import { Image } from '@nextui-org/react';
import { SidebarItemProps } from '../types/sidebar.types';


const SidebarItem: React.FC<SidebarItemProps> = ({
    avatar,
    username,
    level,
    totalXP,
    rank,
    badges,
    streak,
}) => {
    // Function to get the appropriate icon based on the rank
    function getRankIcon(rank: string) {
        switch (rank) {
            case "Bronze":
                return "mdi:medal-outline";
            case "Silver":
                return "mdi:medal";
            case "Gold":
                return "mdi:trophy-award";
            default:
                return "mdi:medal-outline";
        }
    }

    return (
        <div className="bg-gray-800 p-2 rounded-lg shadow-md border-4 border-teal-500 relative">
            {/* My Progress section */}
            <div className="absolute top-0 left-8 -mt-8 -ml-8 bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-white text-lg font-semibold">My Progress</h3>
            </div>
            <div className="p-6">
            {/* Avatar and user info */}
            <div className="flex items-center">
                <Image
						as={NextImage}
						width={300}
						height={200}src={avatar} alt="avatar" className="w-12 h-12 rounded-full mr-4" />
                <div className="flex flex-col">
                    <p className="text-white font-semibold whitespace-nowrap">{username}</p>
                    <div className="flex items-start">
                        <p className="text-white text-sm">Level {level}</p>
                    </div>
                </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-white">
                    <p className="font-semibold">Total XP</p>
                    <div className="flex items-center">
                        <Icon icon="mdi:star-four-points-outline" className="mr-1 text-yellow-500" />
                        <p className="ml-1">{totalXP}</p>
                    </div>
                </div>
                <div className="text-white">
                    <p className="font-semibold">Rank</p>
                    <div className="flex items-center">
                        <Icon icon={getRankIcon(rank)} className="mr-1 text-teal-400" />
                        <p className="ml-1">{rank}</p>
                    </div>
                </div>
                <div className="text-white">
                    <p className="font-semibold">Badges</p>
                    <div className="flex items-center">
                        <Icon icon="mdi:shield-account-outline" className="mr-1 text-blue-400" />
                        <p className="ml-1">{badges}</p>
                    </div>
                </div>
                <div className="text-white">
                    <p className="font-semibold">Streak</p>
                    <div className="flex items-center">
                        <Icon icon="mdi:fire" className="mr-1 text-red-500" />
                        <p className="ml-1">{streak}</p>
                    </div>
                </div>
            </div>

            {/* My Profile button */}

            <a href="/profile" className="block mt-4 flex justify-center">
                <button className="bg-blue-500 hover:bg-blue-900 text-white text-sm rounded-md md:text-base font-bold py-2 px-4 border-2 border-black shadow-lg">
                    My Profile
                </button>
            </a>
        </div>
        </div >
    );
};

export default SidebarItem;
