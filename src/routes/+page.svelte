<script lang="ts">
    import GameComponent from "../components/game-component.svelte";

    let gameStarted = false;

    function startGame() {
        gameStarted = true;
    }
</script>

<div class="content">
    {#if !gameStarted}
        <button on:click={startGame}>Start</button>
    {:else}
        <GameComponent />
    {/if}
</div>

<style>
    .content {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
