import Header from './layout/Header';
import Footer from './layout/Footer';
import TournamentBracket from './TournamentBracket';
import CurrentMatch from './CurrentMatch';
import { useMatches } from '@/hooks/useMatches';

export default function HomePage() {
    const { currentMatch } = useMatches();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-8 flex-1">
                {currentMatch && <CurrentMatch match={currentMatch} />}
                <TournamentBracket />
            </main>
            <Footer />
        </div>
    );
}
