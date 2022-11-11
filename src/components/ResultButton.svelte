<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { SongOption } from "../types/song-option";
    import { getRandomInt } from "../helpers/get-random-int";

    export let songOption: SongOption;

    const dispatch = createEventDispatcher();

    let showQuestionResult = false;

    
    const positiveSounds = 15;
    const negativeSounds = 10;
    
    function startTimer(func: () => void) {
        setTimeout(func, 1000);
    }

    function onCorrect() {
        const soundfile = new Audio(
            `sounds/positive/${getRandomInt(1, positiveSounds)}.mp3`
        );
        soundfile.play();
        showQuestionResult = true;

        startTimer(() => {
            showQuestionResult = false;
            dispatch("correct")
        })
    }

    function onFailure() {
        const soundfile = new Audio(
            `sounds/negative/${getRandomInt(1, negativeSounds)}.mp3`
        );
        soundfile.play();
        showQuestionResult = true;

        startTimer(() => {
            showQuestionResult = false
            dispatch("incorrect");
        })
    }
</script>

<button
    class:correct={songOption.correct && showQuestionResult}
    class:incorrect={!songOption.correct && showQuestionResult}
    disabled={showQuestionResult}
    on:click={() => (songOption.correct ? onCorrect() : onFailure())}
>
    {songOption.song}
</button>

<style>
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

    .correct, .correct:hover {
        background-color: rgb(0, 107, 32);
    }

    .incorrect, .incorrect:hover {
        background-color: rgb(124, 18, 18);
    }
</style>
