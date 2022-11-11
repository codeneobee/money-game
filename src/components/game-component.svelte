<script lang="ts">
    import { getRandomInt } from "../helpers/get-random-int";
    import type { Line } from "../types/line";
    import type { SongOption } from "../types/song-option";
    import ResultButton from "./ResultButton.svelte";
    import MediaQuery from "svelte-media-query";

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
        return list[getRandomInt(0, list.length)];
    }

    function onCorrect() {
        score += 1;
        line = game();
    }

    function onIncorrect() {
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
    <div class="line-container">
        {#if gameStarted}
            <span class="line">{line.lyrics}</span>
            <div class="button-container">
                {#each line.songOptions as songOption}
                    <ResultButton
                        {songOption}
                        on:correct={onCorrect}
                        on:incorrect={onIncorrect}
                    />
                {/each}
            </div>
        {:else}
            <div>
                <span class="lose-message"
                    >Frag nicht was für Score: {score}</span
                >
                <button on:click={resetGame}>Noch einmal</button>
            </div>
        {/if}
    </div>
    <MediaQuery query="(max-width: 768px)" let:matches>
        <span class="score-display" class:small="{matches}">{score}</span>
    </MediaQuery>
</div>

<style>
    .game-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .score-display {
        font-family: MadisonStreet;
        font-size: 128px;
        margin-top: 64px;
        color: rgb(70, 0, 110);
        text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff,
            1px 1px 0 #fff;
    }

    .score-display.small {
        font-size: 64px;
    }

    .line-container {
        font-family: "SuisseIntl";
        padding: 32px;
        border-radius: 15px;
        background-color: rgb(37, 0, 58);
        color: white;
    }

    .line,
    .lose-message {
        white-space: pre-line;
        display: block;
        margin-bottom: 2rem;
    }

    .button-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 2rem;
        width: 100%;
    }

    button {
        border: none;
        border-radius: 30px;
        padding: 8px;
        background-color: white;
        color: rgb(37, 0, 58);
        transition: background-color 100ms linear;
    }

    button:hover {
        background-color: darkgrey;
    }
</style>
