<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";

    let models = ["Model 1", "Model 2", "Model 3", "Model 4", "Model 5"];
    let selectedModel = "Model 1";
    let csvData = [];
    let plotContainer;

    function flickerEffect(selection) {
        selection
            .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .style("fill", "transparent")
            .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .style("fill", "orange")
            .on("end", function () {
                d3.select(this).call(flickerEffect);
            });
    }

    const loadCSV = async () => {
        try {
            const data = await d3.csv("pointwise_likelihood.csv", (d) => ({
                failures: +d.failures,
                target: +d.G3,
                M1_ratio: +d.M1_ratio,
                M2_ratio: +d.M2_ratio,
                M3_ratio: +d.M3_ratio,
                M4_ratio: +d.M4_ratio,
                M5_ratio: +d.M5_ratio,
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
            .domain(d3.extent(csvData, (d) => d.target))
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

        const modelRatio = `${selectedModel.replace("odel ", "")}_ratio`;
        const topPoints = csvData
            .slice()
            .sort((a, b) => b[modelRatio] - a[modelRatio])
            .slice(0, 10);

        svg.selectAll(".dot")
            .data(csvData)
            .enter()
            .append("circle")
            .attr("cx", (d) => xScale(d.failures))
            .attr("cy", (d) => yScale(d.target))
            .attr("r", 4)
            .attr("fill", "lightgrey")
            .attr("fill-opacity", 0.4)
            .attr("stroke", "white")
            .attr("stroke-width", 0.1);

        svg.selectAll(".highlight")
            .data(topPoints)
            .enter()
            .append("circle")
            .attr("cx", (d) => xScale(d.failures))
            .attr("cy", (d) => yScale(d.target))
            .attr("r", 4)
            .attr("fill", "orange")
            .attr("stroke", "black")
            .attr("stroke-width", 0.2)
            .call(flickerEffect);

        svg.append("text")
            .attr("x", width + 10)
            .attr("y", 0)
            .attr("text-anchor", "end")
            .attr("font-size", 14)
            .attr("font-weight", "bold")
            .attr("fill", "orange")
            .selectAll("tspan")
            .data(() => {
                const lines = [
                    "These data points most",
                    `strongly support ${selectedModel}!`,
                ];
                return lines;
            })
            .enter()
            .append("tspan")
            .attr("x", width + 10)
            .attr("dy", (d, i) => (i === 0 ? 0 : 20))
            .text((d) => d);
    };

    $: if (selectedModel) drawPlot();

    onMount(() => {
        loadCSV();
    });
</script>

<div class="feature-card">
    <h3>Point-Wise Model Compatibility</h3>
    <div class="compatibility-container">
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

    .compatibility-container {
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
