'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';

export const CommunityBar = () => {
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-md text-white border-4 border-teal-500">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Make friends and learn together in the LingoQuiz Community
      </h3>
      <div className="opc-stats">
        <ul className="list-none p-0"> 
          <li className="flex items-center mb-2"> 
            <Icon icon="mdi:account-group-outline" className="mr-2 text-teal-400" />
            <p>398 Members</p>
          </li>
          <li className="flex items-center mb-2">
            <Icon icon="mdi:forum-outline" className="mr-2 text-purple-400" />
            <p>76 New Posts</p>
          </li>
          <li className="flex items-center">
            <Icon icon="mdi:calendar-range" className="mr-2 text-blue-400" />
            <p>3 Upcoming Events</p>
          </li>
        </ul>
      </div>
      <div className="mt-4 text-center">
        <Link href="/community">
      <button className="arrow bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md flex items-center">
        <span className="mr-2">Join the Community</span>
        <Icon icon="mdi:arrow-right" />
      </button>
    </Link>
      </div>
    </div>
  );
};
