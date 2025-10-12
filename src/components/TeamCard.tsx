import Image from 'next/image';
import { Team } from '@/types/team';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

interface TeamCardProps {
    team: Team;
}

export default function TeamCard({ team }: TeamCardProps) {
    const hasContract = team.contractAddress && team.contractAddress !== '';

    return (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-yellow-600/30 hover:border-yellow-500/50 hover:shadow-yellow-500/20">
            <div className="flex flex-col items-center text-center space-y-4">
                {/* Token Image */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                    <Image
                        src={team.image}
                        alt={team.name}
                        fill
                        className="object-contain rounded-full"
                        onError={(e) => {
                            // Fallback image if the token image fails to load
                            e.currentTarget.src = '/assets/cup.png';
                        }}
                    />
                </div>

                {/* Token Info */}
                <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                        {team.name}
                    </h3>
                    <p className="text-sm sm:text-base text-yellow-300 font-mono">
                        ${team.ticker}
                    </p>

                    {/* Contract Address */}
                    {hasContract && (
                        <div className="space-y-2">
                            <p className="text-xs text-gray-400 break-all">
                                {team.contractAddress}
                            </p>

                            {/* Pump.fun Link */}
                            <a
                                href={`https://pump.fun/coin/${team.contractAddress}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-1 text-yellow-400 hover:text-yellow-300 transition-colors text-sm"
                            >
                                <span>View on Pump.fun</span>
                                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
