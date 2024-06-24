Leaflet Challenge  Repository

The USGS is interested in building a new set of tools that will allow them to visualise their earthquake data. They collect a massive amount of data from all over the world each day,
but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualise USGS data that will allow them to better educate the public
and other government organisations (and hopefully secure more funding) on issues facing our planet.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Usage](#usage)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

1. Key Elements
    **Base Maps**:
    - **Street Map**: The current map shown uses a street map view.
    - **Topographic Map**: Another base map option available for selection.

   **Overlays**:
    - **Tectonic Plates**: The yellow lines representing tectonic plate boundaries.
    - **Earthquakes**: Various colored circles representing earthquake data points.

    **Layer Control**:
    - The ability to toggle layers (Tectonic Plates and Earthquakes) on and off using checkboxes in the top right corner.

   **Legend**:
    - A legend in the bottom right corner explaining the color coding for earthquake depths:
        - Light green for depths ≤ 10 km
        - Yellow for depths between 10 km and 30 km
        - Orange for depths between 30 km and 50 km
        - Red for depths between 50 km and 70 km
        - Dark red for depths between 70 km and 90 km
        - Dark purple for depths > 90 km

    **Map Controls**:
    - Zoom in and zoom out buttons on the top left.

    **Popups**:
    - Each earthquake data point likely has a popup showing details such as location, time, magnitude, and depth.
   
2. External Scripts
   * D3.js: A JavaScript library for producing dynamic, interactive data visualizations.
   * leaflet.js: open-source JavaScript library for mobile-friendly interactive maps .
   * Custom JavaScript: Links to custom JavaScript files (logic.js) for additional functionality.

### Features:

1. **Base Map Options**:
    - Street Map
    - Topographic Map
2. **Overlays**:
    - Tectonic Plates (yellow lines)
    - Earthquakes (colored circles)
3. **Layer Control**:
    - Checkboxes to toggle Tectonic Plates and Earthquakes layers
4. **Legend**:
    - Color-coded legend for earthquake depths
5. **Map Controls**:
    - Zoom in and zoom out buttons
6. **Popups**:
    - Popups for earthquake details

## Usage

Follow these general steps:
1. download the file.
2. run the web server
3. open the file index.html


## Scripts

Feel free to explore and modify these files to suit your specific needs.

## Contributing

Contributions to this repository are welcome! If you have any useful SQL queries or improvements to existing ones, please feel free to submit a pull request.

Before contributing, please ensure that your code adheres to the repository's coding standards and practices.

## License

This repository is licensed under the [MIT License](LICENSE).

## Contact

If you have any questions, suggestions, or concerns regarding this repository, please don't hesitate to contact the repository owner:

- Email: [nam_son14@yahoo.com](mailto:nam_son14@yahoo.com
- GitHub: [songuyen89](https://github.com/sonnguyen89)