import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import Link from 'next/link';

const LeaderboardCTA = () => {
  return (
    <div className="mt-12 bg-gradient-to-br from-blue-900 to-purple-900 text-white p-6 rounded-lg shadow-lg w-full md:w-1/2 mx-auto border-2 border-teal-600">
      <Link href="/leaderboard">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-4 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon icon="mdi:trophy" className="w-12 h-12 md:w-16 md:h-16 text-yellow-400" />
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">See How You Stack Up</h2>
            <p className="text-md md:text-lg">Join the Leaderboard Challenge!</p>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

export default LeaderboardCTA;