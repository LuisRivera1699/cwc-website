import { Team } from './team';

export interface Match {
    id: string;
    local_id: string;
    visitant_id: string;
    winner_id?: string;
    local_mc: number;
    visitant_mc: number;
    isCurrent?: boolean;
}

export interface MatchWithTeams extends Match {
    local_team?: Team;
    visitant_team?: Team;
    winner_team?: Team;
}
