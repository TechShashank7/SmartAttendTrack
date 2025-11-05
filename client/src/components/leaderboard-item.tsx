interface LeaderboardItemProps {
  rank: number;
  name: string;
  department: string;
  percentage: number;
  isCurrentUser?: boolean;
  medal?: string;
}

export default function LeaderboardItem({ 
  rank, 
  name, 
  department, 
  percentage, 
  isCurrentUser = false,
  medal 
}: LeaderboardItemProps) {
  const getBgClass = () => {
    if (medal === "🥇") return "bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-2xl mb-3 transform hover:scale-[1.02] transition-all duration-300";
    if (medal === "🥈") return "bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-2xl mb-3 transform hover:scale-[1.02] transition-all duration-300";
    if (medal === "🥉") return "bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-2xl mb-3 transform hover:scale-[1.02] transition-all duration-300";
    if (isCurrentUser) return "bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-2xl mb-3 transform hover:scale-[1.02] transition-all duration-300 shadow-lg";
    return "rounded-2xl mb-3 transform hover:scale-[1.02] transition-all duration-300";
  };

  const getTextClass = () => {
    if (medal === "🥇") return "text-yellow-600";
    if (medal === "🥈") return "text-gray-600";
    if (medal === "🥉") return "text-amber-600";
    if (isCurrentUser) return "text-blue-600";
    return "";
  };

  return (
    <div className={`leaderboard-item ${getBgClass()}`} data-testid={`row-leaderboard-${rank}`}>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${medal ? 'bg-gradient-warning text-white' : isCurrentUser ? 'bg-gradient-primary text-white' : 'bg-gray-200 text-gray-600'}`} data-testid={`text-rank-${rank}`}>
          {medal || rank}
        </div>
        <div className="flex-1">
          <div className={`font-semibold text-lg ${isCurrentUser ? 'text-blue-600' : 'text-gray-800'}`} data-testid={`text-name-${rank}`}>
            {name} {isCurrentUser && <span className="text-blue-500 font-normal">(You)</span>}
          </div>
          <div className="text-sm text-gray-500" data-testid={`text-department-${rank}`}>
            {department}
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className={`font-bold text-2xl ${getTextClass() || 'text-gray-800'}`} data-testid={`text-percentage-${rank}`}>
          {percentage}%
        </div>
        <div className="text-xs text-gray-500 uppercase tracking-wide">Attendance</div>
      </div>
    </div>
  );
}
