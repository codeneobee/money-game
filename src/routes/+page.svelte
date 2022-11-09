<script lang="ts">
    import type { Line } from "../types/line";
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
                <button class=start-button on:click={startGame}>Start</button>
            </div>
        {:else}
            <GameComponent {data} />
        {/if}
    </div>
{/await}

<style>
    .front-page {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .header {
        width: calc(100% - 60px);
        font-family: MadisonStreet;
        font-size: 4rem;
        color:rgb(106, 1, 167);
        text-shadow: -1px -1px 0 #FFF, 1px -1px 0 #FFF, -1px 1px 0 #FFF,
            1px 1px 0 #FFF;
    }

    .content {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button {
        border: none;
        border-radius: 30px;
        padding: 8px 16px;
        background-color: rgb(37, 0, 58);
        color: white;
    }
    
    button:hover {
        background-color: rgb(106, 1, 167);
        color: white;
    }
    
</style>
