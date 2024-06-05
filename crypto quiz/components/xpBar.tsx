
export default function XpBar({xp}: {xp: number}) {
  const currentXp = xp;
  const totalXpForNextLevel = 500;
  const xpToNextLevel = totalXpForNextLevel - currentXp;
  const progressPercentage = (currentXp / totalXpForNextLevel) * 100;

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-md text-white mb-4 border-4 border-teal-500">
      <h2 className="text-lg font-semibold text-center mb-2">Level Up</h2>

      {/* Progress Bar */}
      <div className="mb-2 relative rounded-full overflow-hidden h-4 bg-gray-600">
        <div 
          className="absolute top-0 left-0 h-full bg-blue-500" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* XP Information */}
      <div className="flex justify-between items-center text-sm">
        <span>{currentXp}/{totalXpForNextLevel} XP</span>
        <span>{xpToNextLevel} XP to next level</span>
      </div>
    </div>
  );
}
