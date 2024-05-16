'use client'
import React, { useState, memo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import RewardBox from '@/components/rewardBox';

interface RewardSelectionProps {
    onRewardSelect: (rewardNumber: number) => void;
}

const RewardSelection: React.FC<RewardSelectionProps> = ({ onRewardSelect }) => {
    const [selectedReward, setSelectedReward] = useState<number | null>(null);

    const handleRewardSelect = (rewardNumber: number) => {
        setSelectedReward(rewardNumber);
        onRewardSelect(rewardNumber);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                role="group"
                className="mt-8 flex justify-between w-full max-w-md mx-auto"
            >
                <RewardBox onClick={() => handleRewardSelect(1)} reward="/rewardItem1.png" isSelected={selectedReward !== null} />
                <RewardBox onClick={() => handleRewardSelect(2)} reward="/rewardItem2.png" isSelected={selectedReward !== null} />
                <RewardBox onClick={() => handleRewardSelect(3)} reward="/rewardItem3.png" isSelected={selectedReward !== null} />
            </motion.div>
        </AnimatePresence>
    );
};

export default RewardSelection;