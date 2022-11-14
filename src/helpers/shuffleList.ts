    export function shuffle(songs: any[]) {
        return songs.sort(() => 0.5 - Math.random());
    }