<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";

    let models = ["Model 1", "Model 2", "Model 3", "Model 4", "Model 5"];
    let selectedModel = "Model 1";
    let csvData = [];
    let plotContainer;

    const loadCSV = async (model) => {
        const fileName = `priorchecking${models.indexOf(model) + 1}.csv`;
        try {
            const data = await d3.csv(fileName, (d) => ({
                failures: +d.failures,
                observed_target: +d.G3,
                predicted_target: +d.prior_pred,
                source: d.source,
            }));
            csvData = data;
            drawPlot();
        } catch (error) {
            console.error("Error loading CSV file:", error);
        }
    };

    const drawPlot = () => {
        const margin = { top: 20, right: 10, bottom: 40, left: 40 };
        const width = 400 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        d3.select(plotContainer).select("svg").remove();

        const svg = d3
            .select(plotContainer)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const xScale = d3.scaleLinear().domain([-1, 4]).range([0, width]);

        const yScale = d3
            .scaleLinear()
            .domain(d3.extent(csvData, (d) => d.observed_target))
            .range([height, 0]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale));

        svg.append("g").call(d3.axisLeft(yScale));

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 5)
            .attr("text-anchor", "middle")
            .attr("font-size", 14)
            .text("X (failures)");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", -margin.left + 10)
            .attr("text-anchor", "middle")
            .attr("font-size", 14)
            .text("Y (G3)");

        svg.selectAll(".dot-observed")
            .data(csvData)
            .enter()
            .append("circle")
            .attr("cx", (d) => xScale(d.failures))
            .attr("cy", (d) => yScale(d.observed_target))
            .attr("r", 4)
            .attr("fill", "lightgrey")
            .attr("fill-opacity", 0.4)
            .attr("stroke", "white")
            .attr("stroke-width", 0.1);

        svg.selectAll(".dot-predicted")
            .data(csvData)
            .enter()
            .append("circle")
            .attr("cx", (d) => xScale(d.failures))
            .attr("cy", (d) => yScale(d.predicted_target))
            .attr("r", 4)
            .attr("fill", "green")
            .attr("fill-opacity", 0.4)
            .attr("stroke", "white")
            .attr("stroke-width", 0.1);

        const legend = svg
            .selectAll(".legend")
            .data(["Observed", "Predicted"])
            .enter()
            .append("g")
            .attr("transform", (d, i) => `translate(0,${i * 20})`);

        legend
            .append("circle")
            .attr("cx", width - 60)
            .attr("cy", 9)
            .attr("r", 4)
            .attr("fill", (d) => (d === "Observed" ? "lightgrey" : "green"));

        legend
            .append("text")
            .attr("x", width + 10)
            .attr("y", 9)
            .attr("dy", "0.35em")
            .attr("text-anchor", "end")
            .attr("font-size", 14)
            .text((d) => d);
    };

    $: if (selectedModel) loadCSV(selectedModel);

    onMount(() => {
        loadCSV(selectedModel);
    });
</script>

<div class="feature-card">
    <h3>Prior Predictive Check</h3>
    <div class="prior-check-container">
        <div class="button-container">
            {#each models as model}
                <button
                    class="model-button"
                    on:click={() => (selectedModel = model)}
                    class:selected={selectedModel === model}
                >
                    {model}
                </button>
            {/each}
        </div>
        <div bind:this={plotContainer}></div>
    </div>
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

    .prior-check-container {
        padding: 0.5rem;
        border: none;
        background-color: white;
    }

    .button-container {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
    }

    .model-button {
        padding: 0.5rem;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: white;
        cursor: pointer;
        transition:
            background-color 0.3s,
            color 0.3s;
    }

    .model-button:hover {
        background-color: #f0f0f0;
    }

    .model-button.selected {
        background-color: green;
        color: white;
    }

    .model-button:focus {
        outline: none;
    }
</style>
