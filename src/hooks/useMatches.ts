'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Match, MatchWithTeams } from '@/types/match';
import { Team } from '@/types/team';

export function useMatches() {
    const [matches, setMatches] = useState<MatchWithTeams[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Get teams first
        const getTeams = async () => {
            try {
                const teamsCollection = collection(db, 'teams');
                const teamsSnapshot = await getDocs(teamsCollection);

                const teamsData: Team[] = teamsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Team));

                setTeams(teamsData);
            } catch (err) {
                console.error('Error fetching teams:', err);
            }
        };

        getTeams();
    }, []);

    useEffect(() => {
        if (teams.length === 0) return;

        // Listen to matches in real-time
        const matchesQuery = collection(db, 'matches');

        const unsubscribe = onSnapshot(matchesQuery, (snapshot) => {
            try {
                const matchesData: Match[] = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Match));

                // Combine matches with team data
                const matchesWithTeams: MatchWithTeams[] = matchesData.map(match => {
                    const localTeam = teams.find(team => team.id === match.local_id);
                    const visitantTeam = teams.find(team => team.id === match.visitant_id);
                    const winnerTeam = match.winner_id ? teams.find(team => team.id === match.winner_id) : undefined;

                    return {
                        ...match,
                        local_team: localTeam,
                        visitant_team: visitantTeam,
                        winner_team: winnerTeam
                    };
                });

                setMatches(matchesWithTeams);
                setError(null);
            } catch (err) {
                setError('Failed to fetch matches');
                console.error('Error fetching matches:', err);
            } finally {
                setLoading(false);
            }
        }, (err) => {
            setError('Failed to fetch matches');
            console.error('Error in matches listener:', err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [teams]);

    // Find current match
    const currentMatch = matches.find(match => match.isCurrent === true);

    return { matches, teams, currentMatch, loading, error };
}
