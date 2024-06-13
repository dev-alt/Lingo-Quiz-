import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import Link from 'next/link';

const CTACard = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 mb-4 md:gap-8 mx-auto px-4 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:max-w-3xl"> 
        <Link href="/learn">
          <motion.div
            className="relative flex flex-col items-center text-center h-full p-8 bg-gradient-to-br from-teal-400 to-teal-600 text-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-black opacity-20 rounded-lg" />

            <div className="relative z-10 flex flex-col items-center"> 
              <div className="flex items-center mb-4">
                <Icon icon="bi:book" className="w-8 h-8 mr-2" /> 
                <h3 className="text-xl md:text-2xl font-semibold">Explore Courses</h3>
              </div>
              <p className="text-sm md:text-base">
                Discover a wide range of language courses tailored to your level and interests.
              </p>
            </div>
          </motion.div>
        </Link>

        <Link href="/store">
          <motion.div
            className="relative flex flex-col items-center text-center h-full p-8 bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-black opacity-20 rounded-lg" />

            <div className="relative z-10 flex flex-col items-center">
            <div className="flex items-center mb-4">
                <Icon icon="mdi:storefront-outline" className="w-8 h-8 mr-2" /> 
                <h3 className="text-xl md:text-2xl font-semibold">Visit Our Store</h3>
              </div>
              <p className="text-sm md:text-base">
                Find additional resources, tools, and materials to enhance your language learning experience.
              </p>
            </div>
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default CTACard;
