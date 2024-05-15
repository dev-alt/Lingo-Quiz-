'use client'
import React, { useState, memo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface RewardSelectionProps {
    onRewardSelect: (rewardNumber: number) => void;
}

const RewardBox = memo(
    ({ onClick, reward, isSelected }: { onClick: () => void; reward: string; isSelected: boolean }) => {
        const [isExploded, setIsExploded] = useState(isSelected);

        const handleBoxClick = () => {
            if (!isSelected) {
                setIsExploded(true);
                onClick();
            }
        };

        return (
            <motion.div
                whileHover={{ scale: isExploded ? 1.1 : 1.05 }}
                whileTap={isSelected ? {} : { scale: 0.95 }}
                animate={isSelected ? {} : { y: [-10, 10], transition: { duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' } }}
                className={`mx-2 ${isSelected ? '' : 'cursor-pointer'}`}
                onClick={handleBoxClick}
            >
                <AnimatePresence>
                    {!isExploded ? (
                        <motion.div
                            key="box"
                            initial={{ scale: 1 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 3, opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
                        >
                            <Image src="/questionMark.jpg" alt="Reward" width={100} height={100} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="reward"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1, transition: { duration: 0.5, ease: 'easeInOut', delay: 0.1 } }}
                            className="shadow-[2px_2px_5px_0px_#3182ce]"
                        >
                            <Image src={reward} alt="Reward Item" width={150} height={150} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        );
    }
);

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