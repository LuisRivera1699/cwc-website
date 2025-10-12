'use client';

import { useTeams } from '@/hooks/useTeams';
import TeamCard from '@/components/TeamCard';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ParticipantsPage() {
    const { teams, loading, error } = useTeams();

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-yellow-900 flex flex-col">
                <Header />
                <main className="container mx-auto px-4 py-8 flex-1">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center text-white">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
                            <p className="text-lg">Loading participants...</p>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-yellow-900 flex flex-col">
                <Header />
                <main className="container mx-auto px-4 py-8 flex-1">
                    <div className="text-center text-white">
                        <h2 className="text-2xl font-bold mb-4">Error Loading Participants</h2>
                        <p className="text-red-500">{error}</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-yellow-900 flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-8 flex-1">
                <div className="text-center text-white mb-12">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 mb-8 border border-yellow-600/30 shadow-lg shadow-yellow-500/20">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                            🏆 Tournament Participants 🏆
                        </h1>
                        <p className="text-lg sm:text-xl text-yellow-200 font-semibold">
                            {teams.length} tokens competing for the championship
                        </p>
                        <div className="mt-4 text-2xl">⚔️</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {teams.map((team) => (
                        <TeamCard key={team.id} team={team} />
                    ))}
                </div>

                {teams.length === 0 && (
                    <div className="text-center text-white py-12">
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-yellow-600/30 shadow-lg shadow-yellow-500/10">
                            <h2 className="text-2xl font-bold mb-4">No Participants Yet</h2>
                            <p className="text-yellow-200 mb-4">Check back later for tournament participants.</p>
                            <div className="text-4xl">⏳</div>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
