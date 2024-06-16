import { motion } from "framer-motion";
import { SidebarItemProps } from "@/types";
import { Avatar } from "@nextui-org/avatar";
import { Progress } from "@nextui-org/progress";
import { Card, CardBody } from "@nextui-org/card";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { Spacer } from "@nextui-org/react";

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
    const nextLevelXP = level * 100; // Example calculation, adjust as needed
    const xpPercentage = Math.round((xp / nextLevelXP) * 100);
  
    // Rank icon mapping
    const rankIcon = {
      Bronze: "mdi:medal-outline",
      Silver: "mdi:medal",
      Gold: "mdi:trophy-award",
    }[rank] || "mdi:medal-outline";
  
    // Framer Motion variants
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };
  
    const itemVariants = {
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0 },
    };
  
    return (
      <motion.div
        className="bg-gradient-to-b from-gray-800 to-gray-900 p-4 rounded-lg shadow-lg border-4 border-teal-500"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 px-4 py-2 rounded-full shadow-lg">
          <h3 className="text-white text-lg font-semibold">My Progress</h3>
        </div>
  
        <div className="p-4">
          {/* Profile Section */}
          <motion.div variants={itemVariants} className="flex items-center mb-4">
            <Avatar src={avatar} alt={username} size="lg" />
            <div className="flex-col ml-4">
              <p className="text-white text-2xl font-semibold">{username}</p>
              <p className="text-gray-400 text-sm">
                Level {level} ({xp} / {nextLevelXP} XP)
              </p>
              <Progress
                color="success"
                value={xpPercentage}
                className="w-full mt-2 rounded-full"
              />
            </div>
          </motion.div>
  
          {/* Progress Cards Section */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            <Card className="bg-blue-600 rounded-lg shadow-md">
              <CardBody className="flex flex-col items-center text-white">
                <Icon icon={rankIcon} className="text-5xl mb-2" />
                <p className="font-semibold text-lg">{rank}</p>
              </CardBody>
            </Card>
  
            <Card className="bg-green-600 rounded-lg shadow-md">
              <CardBody className="flex flex-col items-center text-white">
                <Icon icon="mdi:shield-account-outline" className="text-5xl mb-2" />
                <p className="font-semibold text-lg">{badges} Badges</p>
              </CardBody>
            </Card>
  
            {/* Streak Card */}
            <Card className="bg-red-600 rounded-lg shadow-md">
              <CardBody className="flex flex-col items-center text-white">
                <Icon icon="mdi:fire" className="text-5xl mb-2" />
                <p className="font-semibold text-lg">{streak} Day Streak</p>
              </CardBody>
            </Card>
  
            {/* Points Card */}
            <Card className="bg-yellow-500 rounded-lg shadow-md">
              <CardBody className="flex flex-col items-center text-gray-800">
                <Icon icon="ic:twotone-monetization-on" className="text-5xl mb-2" />
                <p className="font-semibold text-lg">{balance} Points</p>
              </CardBody>
            </Card>
          </motion.div>
          <Spacer y={1} />
  
          {/* My Profile Button */}
          <motion.div variants={itemVariants}>
            <Link
              href={`/profile/${handle}`}
              className="bg-teal-500 hover:bg-teal-700 text-white text-sm md:text-base font-bold py-2 px-4 rounded-md shadow-lg transition-colors duration-300 w-full block text-center"
            >
              My Profile
            </Link>
          </motion.div>
        </div>
      </motion.div>

    );
  };
  