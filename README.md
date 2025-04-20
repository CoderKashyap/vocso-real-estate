# Real Estate Scraper

A Next.js web application designed to scrape and display real estate property listings from Magic Bricks.

## Overview

This application provides a user-friendly interface for searching and viewing real estate properties and its location on map. It uses Next.js for the frontend and backend, integrates with Positionstack for geocoding services, and includes web scraping capabilities to gather property data from sites like Magic Bricks.

## Features

- Dynamic Routing – City extracted from URL (e.g., /city/Hyderabad)
- Real-Time Updates – Shows loading spinner and incremental results while scraping
- Interactive Map – Projects plotted using coordinates from PositionStack API and Leaflet
- Responsive Design – Optimized for all devices
- Data Caching – Faster load times with cached results


## Getting Started

### Prerequisites

- Node.js (v18.0.0 or later)
- npm package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/CoderKashyap/vocso-real-estate.git
   cd vocso-real-estate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with:
   ```
   POSITIONSTACK_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.


## Important Notes & Limitations

### API Usage Limits

The application uses Positionstack's API for geocoding services. Please note:
- The free tier of Positionstack only allows 100 API calls per month
- After reaching this limit, the geocoding functionality will stop working
- You will need to either upgrade to a paid plan or replace the API key

### Web Scraping Limitations

Due to security measures implemented by real estate websites:
- The scraping functionality for Magic Bricks may not work in production environments
- The application includes fallback mechanisms for cases where scraping is blocked
- We recommend implementing appropriate rate limiting and respecting robots.txt rules

## Development Decisions

1. **Next.js Framework**: Selected for its SSR capabilities, API routes, and developer experience.

2. **Data Scraping Approach**: We implemented scraping through server-side functions to avoid CORS issues and browser limitations.

3. **Caching Strategy**: Property data is cached to reduce the number of scraping operations and improve performance.

4. **Error Handling**: Comprehensive error handling is included for both API failures and scraping limitations.

5. **Geocoding Service**: Positionstack was chosen for its straightforward API, but the implementation allows for easy replacement if needed.

## Deployment

To deploy the application to production you can use Vercel or another Next.js-compatible hosting platform.
