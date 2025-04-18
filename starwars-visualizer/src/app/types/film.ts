export interface Film {
    title: string;
    episode_id: number;
    director: string;
    producer: string;
    release_date: Date;
    opening_crawl: string;
    characters: string[];
    planets: string[];
    starships: string[];
    vehicles: string[];
    species: string[];
    created: Date;
    edited: Date;
    url: string;
}