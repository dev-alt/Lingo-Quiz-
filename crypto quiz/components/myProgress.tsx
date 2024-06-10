'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import NextImage from "next/image";
import { Image } from '@nextui-org/react';
import { SidebarItemProps } from '@/types/index';
import Link from 'next/link';


const SidebarItem: React.FC<SidebarItemProps> = ({
    avatar,
    username,
    handle,
    level,
    xp,
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
      <div className="bg-gray-800 p-4 rounded-lg shadow-md border-4 border-teal-500 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 px-4 py-2 rounded-full shadow-lg">
              <h3 className="text-white text-lg font-semibold">My Progress</h3>
          </div>
          <div className="p-4">
              <div className="flex items-center mb-4">
                  <Image
                      as={NextImage}
                      width={48}
                      height={48}
                      src={avatar}
                      alt="avatar"
                      className="w-12 h-12 rounded-full mr-4"
                  />
                  <div className="flex flex-col">
                      <p className="text-white font-semibold">{username}</p>
                      <p className="text-gray-400 text-sm">Level {level}</p>
                  </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-white bg-gray-700 rounded-lg p-4">
                      <p className="font-semibold">Total XP</p>
                      <div className="flex items-center">
                          <Icon icon="mdi:star-four-points-outline" className="mr-1 text-yellow-500" />
                          <p className="ml-1">{xp}</p>
                      </div>
                  </div>
                  <div className="text-white bg-gray-700 rounded-lg p-4">
                      <p className="font-semibold">Rank</p>
                      <div className="flex items-center">
                          <Icon icon={getRankIcon(rank)} className="mr-1 text-teal-400" />
                          <p className="ml-1">{rank}</p>
                      </div>
                  </div>
                  <div className="text-white bg-gray-700 rounded-lg p-4">
                      <p className="font-semibold">Badges</p>
                      <div className="flex items-center">
                          <Icon icon="mdi:shield-account-outline" className="mr-1 text-blue-400" />
                          <p className="ml-1">{badges}</p>
                      </div>
                  </div>
                  <div className="text-white bg-gray-700 rounded-lg p-4">
                      <p className="font-semibold">Streak</p>
                      <div className="flex items-center">
                          <Icon icon="mdi:fire" className="mr-1 text-red-500" />
                          <p className="ml-1">{streak}</p>
                      </div>
                  </div>
              </div>

            {/* My Profile button */}
            <div className="flex justify-center">
            <Link href={`/profile/${handle}`} 
            className="bg-blue-500 hover:bg-blue-900 text-white text-sm md:text-base font-bold py-2 px-4 rounded-md shadow-lg transition-colors duration-300">
            My Profile
              
            </Link>  
            </div>     
        </div>
        </div >
    );
};

export default SidebarItem;
