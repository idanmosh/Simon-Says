
export interface IgameState {
    singing: boolean;
    gameOver: boolean;
    score: number;
    guessed: Array<string>;
    all: Array<string>;
}

export interface IpadsState {
    colors: Array<{ 
        id: string, 
        component: string, 
        active: boolean 
    }>
}

export interface IscoresState {
    topScores: Array<{
        name: string;
        score: number;
    }>;
    highest: number;
    lowest: number;
}