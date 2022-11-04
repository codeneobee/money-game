<script lang="ts">
    import type { Line } from "src/types/line";
    import GameComponent from "../components/game-component.svelte";

    async function loadData(): Promise<Line[]> {
        const response = await fetch("lines_songs.json");
        return await response.json()
    }

    let gameStarted = false;

    function startGame() {
        gameStarted = true;
    }
</script>
{#await loadData() then data}
<div class="content">
    {#if !gameStarted}
        <button on:click={startGame}>Start</button>
    {:else}
        <GameComponent {data} />
    {/if}
</div>
{/await}


<style>
    .content {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
