export type Game = {
    id: number;
    title: string;
    genre: string;
    developed: string;
}

export type Query = {
    allGames: Game[];
}