<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";

    let userWeights = [0, 0, 0, 0, 0];
    let errorMessage = "";
    let plotContainer;
    let posteriorWeights = {};

    const models = ["Model 1", "Model 2", "Model 3", "Model 4", "Model 5"];

    onMount(async () => {
        try {
            const response = await fetch("weights.json");
            posteriorWeights = await response.json();
        } catch (error) {
            console.error("Error loading weights.json:", error);
        }
    });

    function validateWeights() {
        const sum = userWeights.reduce((acc, w) => acc + w, 0);
        if (sum !== 100) {
            errorMessage = `The total weight must be 100%. Current sum: ${sum}%.`;
        } else {
            errorMessage = "";
        }
    }

    function drawBarChart(showPosterior = false) {
        const margin = { top: 30, right: 40, bottom: 60, left: 50 };
        const width = 450 - margin.left - margin.right;
        const height = 250 - margin.top - margin.bottom;

        d3.select(plotContainer).select("svg").remove();

        const svg = d3
            .select(plotContainer)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const xScale = d3
            .scaleBand()
            .domain(models)
            .range([0, width])
            .padding(0.25);

        const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale));

        svg.append("g").call(d3.axisLeft(yScale));

        svg.selectAll(".bar-user")
            .data(userWeights)
            .enter()
            .append("rect")
            .attr("class", "bar-user")
            .attr("x", (d, i) => xScale(models[i]))
            .attr("y", (d) => yScale(d))
            .attr("width", xScale.bandwidth() / 2)
            .attr("height", (d) => height - yScale(d))
            .attr("fill", "#b4b6b8")
            .on("mouseover", function (event, d) {
                d3.select(this).attr("fill", "grey");
                const tooltip = d3.select("#tooltip");
                tooltip.style("visibility", "visible").text(`${d}%`);
            })
            .on("mousemove", function (event) {
                const tooltip = d3.select("#tooltip");
                tooltip
                    .style("top", event.pageY + 10 + "px")
                    .style("left", event.pageX + 10 + "px");
            })
            .on("mouseout", function () {
                d3.select(this).attr("fill", "#b4b6b8");
                d3.select("#tooltip").style("visibility", "hidden");
            });

        if (showPosterior) {
            svg.selectAll(".bar-posterior")
                .data(models.map((m) => posteriorWeights[m][0]))
                .enter()
                .append("rect")
                .attr("class", "bar-posterior")
                .attr("x", (d, i) => xScale(models[i]) + xScale.bandwidth() / 2)
                .attr("y", (d) => yScale(d))
                .attr("width", xScale.bandwidth() / 2)
                .attr("height", (d) => height - yScale(d))
                .attr("fill", "#fab948")
                .on("mouseover", function (event, d) {
                    d3.select(this).attr("fill", "darkorange");
                    const tooltip = d3.select("#tooltip");
                    tooltip
                        .style("visibility", "visible")
                        .text(`${d.toFixed(2)}%`);
                })
                .on("mousemove", function (event) {
                    const tooltip = d3.select("#tooltip");
                    tooltip
                        .style("top", event.pageY + 10 + "px")
                        .style("left", event.pageX + 10 + "px");
                })
                .on("mouseout", function () {
                    d3.select(this).attr("fill", "#fab948");
                    d3.select("#tooltip").style("visibility", "hidden");
                });
        }

        const legend = svg
            .append("g")
            .attr("transform", `translate(${width - 150}, -30)`);

        legend
            .append("rect")
            .attr("x", 110)
            .attr("y", 35)
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", "#b4b6b8");

        legend
            .append("text")
            .attr("x", 125)
            .attr("y", 40)
            .text("Your Prior")
            .style("font-size", 14)
            .style("alignment-baseline", "middle");

        legend
            .append("rect")
            .attr("x", 110)
            .attr("y", 55)
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", "#fab948");

        legend
            .append("text")
            .attr("x", 125)
            .attr("y", 60)
            .text("Posterior")
            .style("font-size", 14)
            .style("alignment-baseline", "middle");
    }

    function resetWeights() {
        userWeights = [0, 0, 0, 0, 0];
        errorMessage = "";
        d3.select(plotContainer).select("svg").remove();
    }

    function isValidInput() {
        return userWeights.some((weight) => weight > 0);
    }
</script>

<div class="feature-card">
    <h3>Belief Updating</h3>
    <p class="subheader">
        Enter weights based on your belief, then compare with the Bayesian
        agent's posterior weights.
    </p>

    <div class="input-grid">
        {#each models as model, i}
            <div class="input-group">
                <label for={`model-${i}`} class="model-name">{model}</label>
                <input
                    id={`model-${i}`}
                    type="number"
                    min="0"
                    max="100"
                    bind:value={userWeights[i]}
                    on:input={validateWeights}
                    class="weight-input"
                />
            </div>
        {/each}
    </div>

    {#if errorMessage}
        <p style="color: blue; font-size: 0.85rem;">{errorMessage}</p>
    {/if}

    <div class="button-container">
        <button
            on:click={() => {
                if (isValidInput() && !errorMessage) drawBarChart(true);
            }}
            disabled={!isValidInput() || !!errorMessage}
        >
            Compare with Posterior Weights
        </button>

        <button
            on:click={resetWeights}
            disabled={!isValidInput() || !!errorMessage}
        >
            Reset
        </button>
    </div>

    <div bind:this={plotContainer} style="flex-grow: 1;"></div>

    <div
        id="tooltip"
        style="position: absolute; background-color: #333; color: white; padding: 5px; border-radius: 4px; visibility: hidden;"
    ></div>
</div>

<style>
    .feature-card {
        border: 1px solid #ccc;
        padding: 1rem;
        border-radius: 6px;
        height: 450px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    h3 {
        font-size: 20px;
        font-weight: bold;
    }

    .subheader {
        font-size: 0.9rem;
        color: #666;
        margin-top: 0.2rem;
    }

    .input-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        margin-top: -0.5rem;
    }

    .input-group {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .model-name {
        font-weight: bold;
        font-size: 1rem;
        text-align: center;
    }

    .weight-input {
        width: 60px;
        text-align: center;
    }

    .button-container {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 1rem;
    }

    button {
        padding: 8px 16px;
        background-color: green;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    #tooltip {
        position: absolute;
        background-color: #333;
        color: white;
        padding: 0.5rem;
        border-radius: 5px;
        visibility: hidden;
        font-size: 0.7rem;
    }

    p[style*="color: blue"] {
        margin-top: 0.5rem;
        margin-bottom: -0.5rem;
    }
</style>
