# Model Comparison Interfaces  

This project provides two web pages built with **Svelte**, designed to support data analysts in comparing multiple models more effectively. The interfaces embody six design goals that bridge traditional diagnostic metrics and conceptual reasoning, offering an enhanced approach to model evaluation.  

- **Interface 1**: Focuses on comparing model specifications and quantitative performance metrics, designed to reflect common modeling practices.
- **Interface 2**: Extends functionality with tools for interactive visualizations and alternative workflows such as prior predictive checks and belief updating.

## Try the Interfaces  
Both interfaces are deployed online via Netlify and ready to use:  
- [Interface 1](https://sparkly-clafoutis-eaecdf.netlify.app/)  
- [Interface 2](https://funny-kleicha-41faf8.netlify.app/)  

No setup is needed to explore these web applications.

## Features  
### Interface 1  
- **Model Summary**: Summarizes each model using a dropdown feature.  
- **Dataset Info**: Provides key dataset information.  
- **Model Performance Metrics**: Allows users to view performance for a selected metric via a dropdown, highlighting the best-performing model using distinct color encoding and a flickering notification.  
- **Table for Predictor Sets**: Displays a comparative table of predictors included in each candidate model.  

### Interface 2  
- **Model Summary**: Summarizes each model using a dropdown feature.  
- **Dataset Info**: Provides key dataset information.
- **Model Checking Visualization**: Displays the fit between observed data and model predictions for a specific model. Users can naviagte across models by clicking a button to activate the visualization.
- **Pointwise Model Compatibility**: Highlights data points with the highest log-likelihood ratios using a flickering effect, indicating that these points strongly distinguish between competing models.
- **Prior Predictive Check**: Compares observed data with hypothetical data generated from author-defined priors, enabling exploration of prior assumptions.
- **Belief Updating**: Enables users to input model weights reflecting prior beliefs and compare them with precomputed posterior weights via an interactive bar plot.
- **Model Performance Metrics**: Provides the same functionality as in Interface 1, with dropdown-based metric selection and visual emphasis on the best-performing model.  
- **Table for Predictor Sets**: Also mirrors the functionality of Interface 1 with a tabular comparison of predictors.

## Note
The five candidate models used in the interfaces were built using the **brms** package in R based on the Student Performance dataset sourced from the [UCI Machine Learning Repository](https://archive.ics.uci.edu/dataset/320/student+performance).

