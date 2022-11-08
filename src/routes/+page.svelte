<script lang="ts">
    import type { Line } from "src/types/line";
    import GameComponent from "../components/game-component.svelte";

    async function loadData(): Promise<Line[]> {
        const response = await fetch("lines_songs.json");
        return await response.json();
    }

    let gameStarted = false;

    function startGame() {
        gameStarted = true;
    }
</script>

{#await loadData() then data}
    <div class="content">
        {#if !gameStarted}
        <div class="front-page">
            <h1 class="header">Guess the mbeezy line</h1>
            <button on:click={startGame}>Start</button>
        </div>
        {:else}
            <GameComponent {data} />
        {/if}
    </div>
{/await}

<style>
    .header {
        font-family: gangsta;
        font-size: 4rem;
    }

    .content {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
