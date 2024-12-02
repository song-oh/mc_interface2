<script>
    const datasetInfo = {
        Name: "Student Performance",
        Target: "G1, G2, G3",
        Features: 30,
        Samples: 395,
        "Missing Value": "None",
        Source: "UCI ML Repository",
        Link: "https://archive.ics.uci.edu/dataset/320/student+performance",
    };
</script>

<div class="dataset-container">
    <h3>Dataset Info</h3>
    <div class="dataset-details">
        <p><strong>Name:</strong> {datasetInfo.Name}</p>
        <p><strong>Target:</strong> {datasetInfo.Target}</p>
        <p><strong># of Features:</strong> {datasetInfo.Features}</p>
        <p><strong># of Instances:</strong> {datasetInfo.Samples}</p>
        <p><strong>Missing Values:</strong> {datasetInfo["Missing Value"]}</p>
        <p>
            <strong>Source:</strong>
            <a href={datasetInfo.Link} target="_blank">{datasetInfo.Source}</a>
        </p>
    </div>
</div>

<style>
    .dataset-container {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 6px;
        background-color: #f5f5f5;
    }

    .dataset-details {
        line-height: 1.4;
        text-align: left;
        padding: 0.5rem;
    }

    .dataset-details p {
        margin: 0.5rem 0;
        border-bottom: 1px solid #ddd;
        padding-bottom: 0.3rem;
    }
</style>
