# TrueVoice

TrueVoice is a web-based application designed to visualize and analyze election data for Nevada and Colorado. Its core objective is to demonstrate the effectiveness of Multi-Member Districts (MMD) using the Fully Representative Allocation (FRA) method over Single Member Districts (SMD). The project leverages large-scale simulations and data processing to provide insightful comparisons between electoral systems.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Data & Simulations](#data--simulations)
- [Installation](#installation)
- [Usage](#usage)
- [Future Plans](#future-plans)
- [Contributors](#contributors)

## Overview

TrueVoice showcases election simulation data generated from over 5,000 different election scenarios. The simulations are computed using SeaWulf—a supercluster available to Stony Brook University students. These simulations involve randomly generated plans that cluster precinct units into districts, which are then used to compare the outcomes of MMD (with FRA) against SMD. The processed results are stored as large JSON files and visualized in the application.

## Tech Stack

- **Frontend:** React  
  The frontend provides interactive maps and charts that display district boundaries, election results, and comparative visualizations.

- **Backend:** Spring Boot  
  The backend serves RESTful APIs that supply data from a MongoDB database, processing and delivering large JSON files containing district and simulation data.

- **Database:** MongoDB  
  Election data for Nevada and Colorado, along with simulation results, are stored and managed using MongoDB.

- **Mapping & Visualization:**  
  Libraries such as Leaflet or D3.js (or similar) are used for rendering district maps and interactive charts.

## Data & Simulations

- **Geographical Focus:** Nevada and Colorado  
- **Simulations:**  
  - Over 5,000 different election scenarios computed using SeaWulf.
  - Randomly generated district plans based on clustering precinct units.
  - Comparisons of electoral outcomes under MMD (FRA) and SMD.
- **Post-Processing:**  
  - Large JSON files are generated from simulation results.
  - These files are further processed to be efficiently rendered in the web application.

## Installation

Follow these instructions to set up TrueVoice on your local machine.

### Prerequisites

- **Node.js and npm:** Ensure that Node.js (v14 or higher) and npm are installed on your system.
- **Java Development Kit (JDK):** JDK 11 or higher is required.
- **Maven:** For building the Spring Boot backend.
- **MongoDB:** A running instance of MongoDB (local or cloud).

### Clone the Repository

```bash
git clone https://github.com/your-username/truevoice.git
cd truevoice
```

### Setup the Backend

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Configure MongoDB Connection:**

   Edit the `application.properties` file (or equivalent configuration) with your MongoDB connection details:

   ```properties
   spring.data.mongodb.uri=mongodb://localhost:27017/truevoice
   ```

3. **Build and Run the Backend:**

   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   The backend server should now be running on [http://localhost:8080](http://localhost:8080).

### Setup the Frontend

1. **Navigate to the frontend directory:**

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Run the Frontend Application:**

   ```bash
   npm start
   ```

   The frontend application will typically be available at [http://localhost:3000](http://localhost:3000).

## Usage

- **Interactive Visualizations:**  
  Access maps, charts, and detailed election data for Nevada and Colorado. Use the interactive tools to compare the outcomes of MMD (FRA) against SMD.

- **Data Exploration:**  
  Dive into simulation results, view district boundaries, and explore demographic information as well as voting patterns.

- **API Endpoints:**  

The backend exposes RESTful endpoints structured as follows:  

```
/{state}/{district_type}/{data_type}
```

Where:  
- **`{state}`** → `NV` (Nevada) or `CO` (Colorado)  
- **`{district_type}`** → `SMD` (Single-Member District) or `MMD` (Multi-Member District)  
- **`{data_type}`** (depends on request type):  
  - **Geographical Data:** `ENACTED`, `AVERAGE`, `REPFAVORED`, `DEMFAVORED`, `FAIR`  
  - **Charts & Visualizations:** `BOXWHIS`, `BAR`, `SEATVOTE`  

### **Example API Requests**  
- Retrieve the **GeoJSON for Nevada's average MMD plan:**  
  ```
  GET /NV/MMD/AVERAGE
  ```
- Retrieve a **summary bar chart for Colorado's SMD plan:**  
  ```
  GET /CO/SMD/BAR
  ```

For additional endpoints and data formats, refer to the backend code or contact the development team.

  

## Future Plans

- **Enhanced Analytics:**  
  Additional comparative metrics and advanced statistical analysis of electoral systems.

- **More Interactive Visualizations:**  
  Integrate more dynamic charting libraries and allow users to customize data views.

- **Expanded Data Coverage:**  
  Extend analysis to more states and incorporate historical election data for broader comparisons.

- **User Feedback Integration:**  
  Implement features based on community and user feedback to improve the overall experience.

## Contributors
- Hojun Kwak – Project lead, backend development, and API design.
- Clark Fischer – Frontend development, interactive visualizations, and UI/UX design.
- Hanseung Choi – Data processing, simulation analysis, and integration with SeaWulf.
- Melissa Sanchez Pena – Research and documentation, including the comparative analysis of MMD and SMD.
