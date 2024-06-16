// community/page.tsx 
'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { title } from "@/components/primitives";


interface Update {
  title: string;
  date: string;
  content: string;
}

const CommunityPage: React.FC = () => {
  const [updates, setUpdates] = useState<Update[]>([
    {
      title: "New Course Released!",
      date: "May 28, 2024",
      content: "We've just added a new beginner Japanese course!",
    },
    {
        title: "New Course Released!",
        date: "May 28, 2024",
        content: "We've just added a new beginner Japanese course!",
      },
      {
        title: "New Course Released!",
        date: "May 28, 2024",
        content: "We've just added a new beginner Japanese course!",
      },
      {
        title: "New Course Released!",
        date: "May 28, 2024",
        content: "We've just added a new beginner Japanese course!",
      },
      {
        title: "New Course Released!",
        date: "May 28, 2024",
        content: "We've just added a new beginner Japanese course!",
      },
      {
          title: "New Course Released!",
          date: "May 28, 2024",
          content: "We've just added a new beginner Japanese course!",
        },
        {
          title: "New Course Released!",
          date: "May 28, 2024",
          content: "We've just added a new beginner Japanese course!",
        },
        {
          title: "New Course Released!",
          date: "May 28, 2024",
          content: "We've just added a new beginner Japanese course!",
        },
  ]);

  useEffect(() => {
  }, []);

  return (
    <section className="flex flex-col items-center gap-8 py-8 md:py-10">
      <div className="text-center overflow-hidden p-4 md:p-6 shadow-[5px_3px_5px_5px_#14b8a6] mr-4">
        <h1 className={title({ color: "violet" })}>LingoQuiz Community&nbsp;</h1>
      </div>

      {/* Updates List */}
      <div className="max-w-3xl w-full"> 
        {updates.map((update) => (
          <motion.div
            key={update.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 p-4 bg-gray-800 rounded-md shadow-md "
          >
            <h2 className="text-xl font-semibold mb-2 text-white">{update.title}</h2>
            <p className="text-gray-400 text-sm mb-2">{update.date}</p>
            <p className="text-gray-200">{update.content}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CommunityPage;
