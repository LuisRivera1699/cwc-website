import Image from 'next/image';
import { MatchWithTeams } from '@/types/match';

interface MatchCardProps {
    match: MatchWithTeams;
    matchNumber: number;
    isFinished?: boolean;
}

export default function MatchCard({ match, matchNumber, isFinished = false }: MatchCardProps) {
    const hasLocalTeam = match.local_team;
    const hasVisitantTeam = match.visitant_team;
    const hasWinner = match.winner_id && match.winner_team;

    if (!hasLocalTeam || !hasVisitantTeam) {
        return (
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="text-center text-gray-400">
                    <p className="text-sm">Match {matchNumber}</p>
                    <p className="text-xs">Teams TBD</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`rounded-lg p-4 border transition-all duration-300 ${isFinished
                ? 'bg-gradient-to-br from-green-800 to-green-900 border-green-600'
                : 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-blue-500'
            }`}>
            <div className="text-center text-xs text-gray-400 mb-3">
                Match {matchNumber}
            </div>

            <div className="flex items-center justify-between">
                {/* Local Team */}
                <div className="flex items-center space-x-2 flex-1">
                    <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                        <Image
                            src={match.local_team.image}
                            alt={match.local_team.name}
                            fill
                            className="object-contain rounded-full"
                            onError={(e) => {
                                e.currentTarget.src = '/assets/cup.png';
                            }}
                        />
                    </div>
                    <div className="text-left min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-bold text-white truncate">
                            {match.local_team.name}
                        </p>
                        <p className="text-xs text-blue-300 font-mono">
                            ${match.local_team.ticker}
                        </p>
                        <p className="text-xs text-gray-400">
                            MC: ${match.local_mc.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* VS or Winner */}
                <div className="flex flex-col items-center mx-2">
                    {hasWinner ? (
                        <div className="text-center">
                            <div className="text-xs text-yellow-400 font-bold">WINNER</div>
                            <div className="relative w-6 h-6 sm:w-8 sm:h-8 mt-1">
                                <Image
                                    src={match.winner_team!.image}
                                    alt={match.winner_team!.name}
                                    fill
                                    className="object-contain rounded-full"
                                    onError={(e) => {
                                        e.currentTarget.src = '/assets/cup.png';
                                    }}
                                />
                            </div>
                            <div className="text-xs text-yellow-400 font-mono">
                                ${match.winner_team!.ticker}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <div className="text-lg font-bold text-white">VS</div>
                            {isFinished && (
                                <div className="text-xs text-red-400 mt-1">FINISHED</div>
                            )}
                        </div>
                    )}
                </div>

                {/* Visitant Team */}
                <div className="flex items-center space-x-2 flex-1 justify-end">
                    <div className="text-right min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-bold text-white truncate">
                            {match.visitant_team.name}
                        </p>
                        <p className="text-xs text-blue-300 font-mono">
                            ${match.visitant_team.ticker}
                        </p>
                        <p className="text-xs text-gray-400">
                            MC: ${match.visitant_mc.toLocaleString()}
                        </p>
                    </div>
                    <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                        <Image
                            src={match.visitant_team.image}
                            alt={match.visitant_team.name}
                            fill
                            className="object-contain rounded-full"
                            onError={(e) => {
                                e.currentTarget.src = '/assets/cup.png';
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
