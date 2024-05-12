"use client";

interface SidebarItemProps {
    avatar: string;
    username: string;
    level: number;
    totalXP: number;
    rank: number;
    badges: number;
    streak: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    avatar,
    username,
    level,
    totalXP,
    rank,
    badges,
    streak,
}) => {
    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-md text-white border-4 border-teal-500">
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-white text-lg font-semibold mb-4">My Progress</h3>
                <div className="flex items-center">
                    <div className="mr-4">
                        {/* <img src="/images/boy.gif" alt="Character" className="w-16 h-16 rounded-full"> */}
                    </div>
                    <div>
                        <p className="text-white font-semibold">andrewlogan59511</p>
                        <p className="text-white text-sm">Level 3</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-white">
                        <p className="font-semibold">Total XP</p>
                        <div className="flex items-center">
                            <i className="nes-icon heart icon"></i>
                            <p className="ml-2">385</p>
                        </div>
                    </div>
                    <div className="text-white">
                        <p className="font-semibold">Rank</p>
                        <div className="flex items-center">
                            {/* <img src="/images/rank_badges/level_1.png" alt="Rank badge" className="w-6 h-6"> */}
                            <p className="ml-2">Bronze</p>
                        </div>
                    </div>
                    <div className="text-white">
                        <p className="font-semibold">Badges</p>
                        <div className="flex items-center">
                            <i className="nes-icon trophy icon"></i>
                            <p className="ml-2">4</p>
                        </div>
                    </div>
                    <div className="text-white">
                        <p className="font-semibold">Streak</p>
                        <div className="flex items-center">
                            <i className="nes-icon star icon"></i>
                            <p className="ml-2">1</p>
                        </div>
                    </div>
                </div>
                <a href="/@andrewlogan59511" className="block mt-4">
                    <button className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded">My Profile</button>
                </a>
            </div>
        </div>

    );
};

export default SidebarItem;