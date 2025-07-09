<script>
  let count = 0;
  const add = () => count++;
</script>

<div class="counter">
  <p>This is an interactive island!</p>
  <button on:click={add}>
    You have clicked me {count} {count === 1 ? 'time' : 'times'}
  </button>
</div>

<style>
  .counter {
    border: 2px dashed #ff5d01;
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 8px;
    background-color: #fef8f4;
  }
  button {
    background-color: #ff5d01;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }
</style>