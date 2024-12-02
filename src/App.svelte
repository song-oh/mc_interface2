<script>
  import Model from "./Model.svelte";
  import Dataset from "./Dataset.svelte";
  import Bar from "./Bar.svelte";
  import Predictors from "./Predictors.svelte";
  import ModelCheck from "./ModelCheck.svelte";
  import Compatibility from "./Compatibility.svelte";
  import Prior from "./Prior.svelte";
  import Belief from "./Belief.svelte";
</script>

<div class="container">
  <div class="left">
    <Model />
    <Dataset />
  </div>
  <div class="right">
    <div class="features-grid">
      <ModelCheck />
      <Compatibility />
      <Prior />
      <Belief />
    </div>
    <Bar />
    <Predictors />
  </div>
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 1rem;
    height: 100vh;
  }

  .left {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: fixed;
  }

  .right {
    margin-left: 20rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .features-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    width: 100%;
  }
</style>
