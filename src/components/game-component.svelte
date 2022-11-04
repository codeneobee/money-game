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

<div>
    {#if gameStarted}
        <span>Score: {score}</span>
        <div class="line">{line.lyrics}</div>
        {#each line.songOptions as songOption}
            <button
                on:click={() =>
                    songOption.correct ? onCorrect() : onFailure()}
            >
                {songOption.song}
            </button>
        {/each}
    {:else}
        <div>
            <span>Frag nicht was für Score: {score}</span>
            <button on:click={resetGame}>Noch einmal</button>
        </div>
    {/if}
</div>
