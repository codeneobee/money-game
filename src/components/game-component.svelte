<script lang="ts">
    import type { Line } from "src/types/line";
    import type { SongOption } from "src/types/song-option";

    export let data: Line[];

    let score = 0;
    let gameStarted = true;

    let line = game();

    function game() {
        return gameStep(data, 3);
    }

    function gameStep(songs: Line[], options: number) {
        const line = sampleRandom(songs);
        const songOptions: SongOption[] = [{ song: line.song, correct: true }];

        while (songOptions.length <= options - 1) {
            const maybeSongOption = sampleRandom(songs).song;
            if (
                !songOptions
                    .map((songOption) => songOption.song)
                    .includes(maybeSongOption)
            ) {
                songOptions.push({ song: maybeSongOption, correct: false });
            }
        }

        return { lyrics: line.line, songOptions: shuffle(songOptions) };
    }

    function sampleRandom(list: Line[]) {
        const index = Math.floor(Math.random() * list.length);
        console.log(index);
        return list[index];
    }

    function onCorrect() {
        score += 1;
        line = game();
    }

    function onFailure() {
        gameStarted = false;
    }

    function resetGame() {
        gameStarted = true;
        score = 0;
        line = game();
    }

    function shuffle(songs: SongOption[]) {
        return songs.sort(() => 0.5 - Math.random());
    }
</script>

<div class="game-container">
    {#if gameStarted}
        <span>Score: {score}</span>
        <span class="line">{line.lyrics}</span>
        <div class="button-container">
            {#each line.songOptions as songOption}
                <button
                    on:click={() =>
                        songOption.correct ? onCorrect() : onFailure()}
                >
                    {songOption.song}
                </button>
            {/each}
        </div>
    {:else}
        <div>
            <span class="lose-message">Frag nicht was für Score: {score}</span>
            <button on:click={resetGame}>Noch einmal</button>
        </div>
    {/if}
</div>

<style>
    .game-container {
        padding: 32px;
        border-radius: 15px;
        background-color: #373a36;
        color: white;
    }

    .line, .lose-message{
        display: block;
        margin-bottom: 2rem;
    }

    .button-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 2rem;
        width: 100%;
    }
</style>
