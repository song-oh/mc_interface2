<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";

    let metric = "MSE";
    let metrics = ["MSE", "MAE", "RMSE", "R-Squared", "WAIC"];
    let data;

    onMount(async () => {
        const response = await fetch("metrics.json");
        data = await response.json();
        drawBarChart();
    });

    function flickerEffect(selection) {
        selection
            .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .style("opacity", 1)
            .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .style("opacity", 0)
            .on("end", function () {
                d3.select(this).call(flickerEffect);
            });
    }

    function drawBarChart() {
        if (!data) return;

        const svg = d3.select("#bar-chart");
        svg.selectAll("*").remove();

        const width = 1000,
            height = 250;
        const margin = { top: 10, right: 20, bottom: 3, left: 130 };

        const x = d3
            .scaleBand()
            .domain(["Model 1", "Model 2", "Model 3", "Model 4", "Model 5"])
            .range([margin.left, width - margin.right])
            .padding(0.3);

        const y = d3
            .scaleLinear()
            .domain(
                metric === "WAIC"
                    ? [-904, -898]
                    : metric === "R-Squared"
                      ? [0, 0.2]
                      : [0, d3.max(data[metric])],
            )
            .nice()
            .range([height - margin.bottom, margin.top]);

        svg.append("g")
            .selectAll("rect")
            .data(data[metric])
            .join("rect")
            .attr("x", (_, i) => x(`Model ${i + 1}`))
            .attr("y", (d) => (d < 0 ? y(0) : y(d)))
            .attr("height", (d) => Math.abs(y(0) - y(d)))
            .attr("width", x.bandwidth())
            .attr("fill", (d, i) =>
                (metric === "R-Squared" && d === d3.max(data[metric])) ||
                (metric !== "R-Squared" && d === d3.min(data[metric]))
                    ? "#fab948"
                    : "#b4b6b8",
            );

        svg.append("g")
            .call(d3.axisLeft(y))
            .attr("transform", `translate(${margin.left},0)`);

        svg.append("g")
            .selectAll("text")
            .data(data[metric])
            .join("text")
            .attr("x", (_, i) => x(`Model ${i + 1}`) + x.bandwidth() / 2)
            .attr("y", (d) => (d < 0 ? y(d) + 20 : y(d) - 5))
            .attr("text-anchor", "middle")
            .attr("fill", (d, i) =>
                (metric === "R-Squared" && d === d3.max(data[metric])) ||
                (metric !== "R-Squared" && d === d3.min(data[metric]))
                    ? "#fab948"
                    : "#b4b6b8",
            )
            .text((d) => d.toFixed(3));

        const bestIndex =
            metric === "R-Squared"
                ? data[metric].findIndex((d) => d === d3.max(data[metric]))
                : data[metric].findIndex((d) => d === d3.min(data[metric]));

        const bestX = x(`Model ${bestIndex + 1}`) + x.bandwidth() / 2;

        svg.append("text")
            .attr("x", bestX)
            .attr("y", height)
            .attr("text-anchor", "middle")
            .attr("fill", "#555")
            .attr("font-size", 16)
            .attr("font-weight", "bold")
            .text("This looks best!")
            .call(flickerEffect);
    }
</script>

<div class="bar-chart">
    <h3>Model Performance Metrics</h3>
    <select bind:value={metric} on:change={drawBarChart}>
        {#each metrics as m}
            <option>{m}</option>
        {/each}
    </select>
    <svg id="bar-chart" width="975" height="250"></svg>
</div>

<style>
    select {
        margin-bottom: 1rem;
        font-size: 14px;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #ddd;
    }

    h3 {
        font-size: 20px;
        font-weight: bold;
    }
</style>
