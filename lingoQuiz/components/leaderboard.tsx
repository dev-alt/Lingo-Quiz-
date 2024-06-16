"use client";

import { Avatar, Card, CardBody, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useState } from "react";
import { LeaderboardEntry } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";

function TopThree({ topPlayers }: { topPlayers: LeaderboardEntry[] }) {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 mb-4 relative">
      {/* Second Place (index 0 in the array) */}
      <motion.div
        key={topPlayers[0].id}
        className="p-3 text-center relative rounded-lg text-black md:w-1/3"
        style={{
          zIndex: topPlayers.length - 0,
          transform: "translateX(-20%)", 
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5, delay: 0 * 0.2 }}
      >
        <Card className="w-full bg-gradient-to-r from-slate-400 to-slate-500 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <CardBody className="flex flex-col items-center p-4">
            <div className="bg-slate-200 text-slate-800 rounded-full px-3 py-1 mb-2 shadow-inner">
              <span className="text-lg md:text-xl font-bold">2nd</span>
            </div>
            <Avatar src={topPlayers[0].avatar} alt="Avatar" size="lg" className="mb-2" />
            <h3 className="text-xl md:text-2xl font-bold mt-2">
              {topPlayers[0].username}
            </h3>
            <div className="text-md md:text-lg mt-1">
              XP: {topPlayers[0].xp}
            </div>
            <div className="text-md md:text-lg">
              Correct Answers: {topPlayers[0].correctAnswers}
            </div>
            <div className="mt-4">
              <span className="inline-block bg-slate-600 text-white rounded-full px-3 py-1 text-sm font-semibold">
                Outstanding Performer
              </span>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* First Place (index 1 in the array) */}
      <motion.div
        key={topPlayers[1].id}
        className="p-3 text-center relative rounded-lg text-black md:w-1/2 md:transform-none" 
        style={{ zIndex: topPlayers.length - 1 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5, delay: 1 * 0.2 }}
      >
        <Card className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <CardBody className="flex flex-col items-center p-4">
            <div className="bg-yellow-200 text-yellow-800 rounded-full px-3 py-1 mb-2 shadow-inner">
              <span className="text-lg md:text-xl font-bold">1st</span>
            </div>
            <Avatar src={topPlayers[1].avatar} alt="Avatar" size="lg" className="mb-2" /> 
            <h3 className="text-xl md:text-2xl font-bold mt-2">
              {topPlayers[1].username}
            </h3>
            <div className="text-md md:text-lg mt-1">
              XP: {topPlayers[1].xp}
            </div>
            <div className="text-md md:text-lg">
              Correct Answers: {topPlayers[1].correctAnswers}
            </div>
            <div className="mt-4">
              <span className="inline-block bg-yellow-600 text-white rounded-full px-3 py-1 text-sm font-semibold">
                Top Performer
              </span>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Third Place (index 2 in the array) */}
      <motion.div
        key={topPlayers[2].id}
        className="p-3 text-center relative rounded-lg text-black md:w-1/3"
        style={{
          zIndex: topPlayers.length - 2,
          transform: "translateX(20%)", 
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5, delay: 2 * 0.2 }}
      >
        <Card className="w-full bg-gradient-to-r from-orange-400 to-orange-600 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <CardBody className="flex flex-col items-center p-4">
            <div className="bg-orange-200 text-orange-800 rounded-full px-3 py-1 mb-2 shadow-inner">
              <span className="text-lg md:text-xl font-bold">3rd</span>
            </div>
            <Avatar src={topPlayers[2].avatar} alt="Avatar" size="lg" className="mb-2" />
            <h3 className="text-xl md:text-2xl font-bold mt-2">
              {topPlayers[2].username}
            </h3>
            <div className="text-md md:text-lg mt-1">
              XP: {topPlayers[2].xp}
            </div>
            <div className="text-md md:text-lg">
              Correct Answers: {topPlayers[2].correctAnswers}
            </div>
            <div className="mt-4">
              <span className="inline-block bg-orange-600 text-white rounded-full px-3 py-1 text-sm font-semibold">
                Great Job!
              </span>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}


function RemainingPlayers({ players }: { players: LeaderboardEntry[] }) {
  const columns = [
    { key: "rank", label: "Rank" },
    { key: "username", label: "Username" },
    { key: "xp", label: "XP" },
    { key: "correctAnswers", label: "Correct Answers" },
  ];

  return (
    <div className="mt-4">
      <Table
        aria-label="Leaderboard Table"
        selectionMode="single"
        classNames={{
          table: "min-w-full divide-y divide-gray-200 bg-gray-800 shadow-md rounded-lg",
          th: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
          td: "px-6 py-4 whitespace-nowrap text-sm text-gray-200",
          wrapper: "after:bg-foreground after:text-background text-background bg-gray-800 border-2",
        }}
      >
        <TableHeader columns={columns}>
          {column => (
            <TableColumn key={column.key}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={players}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.rank}</TableCell>
              <TableCell>{item.username}</TableCell>
              <TableCell>{item.xp}</TableCell>
              <TableCell>{item.correctAnswers}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function Leaderboard({ data }: { data: LeaderboardEntry[] }) {
  const sortedData = data.sort((a, b) => a.rank - b.rank);
  const topPlayers = sortedData.slice(0, 3);
  const remainingPlayers = sortedData.slice(3);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4,
      }
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="w-full p-4 overflow-x-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Top Three Players */}
      <AnimatePresence>
        <motion.div variants={itemVariants}>
          <TopThree topPlayers={topPlayers} />
        </motion.div>
      </AnimatePresence>
      <RemainingPlayers players={remainingPlayers} />
    </motion.div>
  );
}

export default Leaderboard;