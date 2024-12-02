<script>
    let models = ["Model 1", "Model 2", "Model 3", "Model 4", "Model 5"];
    let selectedModel = "Model 1";
    const modelInfo = {
        "Model 1": {
            type: "GLM (Bayesian)",
            link: "Identity",
            family: "Gaussian",
            target: "G3 (Final Grade)",
            predictors: "2",
        },
        "Model 2": {
            type: "GLM (Bayesian)",
            link: "Identity",
            family: "Gaussian",
            target: "G3 (Final Grade)",
            predictors: "3",
        },
        "Model 3": {
            type: "GLM (Bayesian)",
            link: "Identity",
            family: "Gaussian",
            target: "G3 (Final Grade)",
            predictors: "4",
        },
        "Model 4": {
            type: "GLM (Bayesian)",
            link: "Identity",
            family: "Gaussian",
            target: "G3 (Final Grade)",
            predictors: "5",
        },
        "Model 5": {
            type: "GLM (Bayesian)",
            link: "Identity",
            family: "Gaussian",
            target: "G3 (Final Grade)",
            predictors: "6",
        },
    };
</script>

<div class="model-container">
    <h3>Model Summary</h3>
    <select bind:value={selectedModel}>
        {#each models as model}
            <option value={model}>{model}</option>
        {/each}
    </select>
    <div class="model-details">
        <p><strong>Model Type:</strong> {modelInfo[selectedModel].type}</p>
        <p><strong>Link Function:</strong> {modelInfo[selectedModel].link}</p>
        <p>
            <strong>Distribution Family:</strong>
            {modelInfo[selectedModel].family}
        </p>
        <p>
            <strong>Predicted Variable:</strong>
            {modelInfo[selectedModel].target}
        </p>
        <p>
            <strong># of Predictors:</strong>
            {modelInfo[selectedModel].predictors}
        </p>
    </div>
</div>

<style>
    .model-container {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 6px;
        background-color: #f5f5f5;
    }

    select {
        width: 100%;
        padding: 0.4rem;
        font-size: 0.9rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-bottom: 1rem;
    }

    .model-details {
        line-height: 1.4;
        text-align: left;
        padding: 0.5rem;
    }

    .model-details p {
        margin: 0.5rem 0;
        border-bottom: 1px solid #ddd;
        padding-bottom: 0.3rem;
    }
</style>
