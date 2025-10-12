'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Team } from '@/types/team';

export function useTeams() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                setLoading(true);
                const teamsCollection = collection(db, 'teams');
                const teamsSnapshot = await getDocs(teamsCollection);

                const teamsData: Team[] = teamsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Team));

                setTeams(teamsData);
                setError(null);
            } catch (err) {
                setError('Failed to fetch teams');
                console.error('Error fetching teams:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    return { teams, loading, error };
}
