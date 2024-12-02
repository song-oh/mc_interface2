<script>
    const predictors = [
        {
            name: "studytime",
            values: [false, false, true, true, true],
            description: "Weekly study time",
        },
        {
            name: "failures",
            values: [true, true, true, true, true],
            description: "# of class failures",
        },
        {
            name: "higher",
            values: [false, true, false, true, true],
            description: "Wants higher education",
        },
        {
            name: "absences",
            values: [true, true, false, false, true],
            description: "# of school absences",
        },
        {
            name: "Medu",
            values: [false, false, true, true, true],
            description: "Mother's education",
        },
        {
            name: "internet",
            values: [false, false, true, true, true],
            description: "Internet access at home",
        },
    ];
</script>

<div class="predictor-table">
    <div class="header">Predictor</div>
    {#each [1, 2, 3, 4, 5] as model}
        <div class="header model-header">Model {model}</div>
    {/each}

    {#each predictors as predictor}
        <div class="row-name" title={predictor.description}>
            {predictor.name}
        </div>
        {#each predictor.values as value, i}
            <div class="cell">
                <span class="circle {value ? 'filled' : 'empty'}"></span>
            </div>
        {/each}
    {/each}
</div>

<style>
    .predictor-table {
        display: grid;
        grid-template-columns: 1fr repeat(5, 1fr);
        gap: 0.5rem;
        padding: 0rem 1rem;
        font-size: 0.9rem;
        border-collapse: collapse;
        margin-top: -0.5rem;
        margin-left: -1rem;
        margin-bottom: 2rem;
    }

    .header {
        font-weight: bold;
        text-align: center;
        padding: 0.5rem;
        background-color: #f9f9f9;
        border-bottom: 1px solid #ccc;
    }

    .model-header {
        background-color: green;
        color: white;
        font-size: 16px;
    }

    .row-name {
        text-align: center;
        padding: 0.2rem;
        background-color: #f9f9f9;
        border-bottom: 1px solid #ddd;
        position: relative;
        transition: background-color 0.2s ease;
    }

    .row-name:hover {
        background-color: #e9f7df;
    }

    .cell {
        text-align: center;
        padding: 0.2rem;
        position: relative;
        border-right: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        transition: background-color 0.2s ease;
    }

    .cell:hover {
        background-color: #f7f5f5;
    }

    .circle {
        display: inline-block;
        width: 14px;
        height: 14px;
        border-radius: 50%;
    }

    .filled {
        background-color: #92c28a;
    }

    .empty {
        background-color: transparent;
        border: 1px solid #ddd;
    }

    .row-name:hover::after {
        content: attr(title);
        position: absolute;
        top: -25px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #333;
        color: white;
        padding: 0.5rem;
        border-radius: 5px;
        font-size: 0.7rem;
        white-space: nowrap;
        z-index: 9999;
    }
</style>
