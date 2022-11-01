<script lang="ts">
    function gameStepPromise() {
        return fetch("lines_songs.json")
            .then((response) => response.json())
            .then((data: any[]) => gameStep(data, 3));
    }

    const linePromise = gameStepPromise();

    interface SongOption {
        song: string,
        correct: boolean
    }

    function gameStep(songs: any[], options: number) {
        const line = sampleRandom(songs)
        const lyrics = line.line
        const song = line.song
        const songOptions: SongOption[] = [{song, correct: true}]

        while (songOptions.length <= (options - 1)) {
            const maybeSongOption = sampleRandom(songs).song
            if (!songOptions.map(songOption => songOption.song).includes(maybeSongOption)) {
                songOptions.push({song: maybeSongOption, correct: false})
            }
        }

        return {lyrics, songOptions}
    }

    function sampleRandom(list: any[]) {
        return list[Math.floor(Math.random() * list.length)];
    }
</script>

{#await linePromise}
    <div />
{:then line}
    <div class="line">{line.lyrics}</div>
    {#each line.songOptions as songOption }
        <button>{songOption.song}</button>
    {/each}
{/await}
