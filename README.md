# YouTube Video Album

## Description

This is a solution to a technical challenge involving the development of a web application to create an online album for YouTube videos. Users can paste YouTube video links, and the application will display them as cards with thumbnails and information. The frontend is a Single Page Application (SPA) built with React.js, Vite, and Tailwind CSS, while the backend is implemented as a RESTful API using Node.js and Express.js, with MongoDB as the database.

## Problem Description

The challenge is to develop both the frontend and backend components of the web application. The frontend should allow users to paste YouTube video links and display them as cards with thumbnails and information. The backend should provide endpoints for saving and retrieving video data from the database. Additionally, the application should integrate with the YouTube API to fetch video details based on the provided links.

## Solution Overview

### Frontend Features:
- Single Page Application (SPA) built using Vite and React.js.
- User interface elements including input field for pasting YouTube video links, a layout to display videos as cards, and integration with backend API endpoints.
- Utilizes Tailwind CSS for styling.

### Backend Features:
- RESTful API built using Node.js and Express.js.
- Endpoints for:
  - Saving video data (`POST /api/videos`).
  - Retrieving all saved videos (`GET /api/videos`).
  - Fetching video details from YouTube API (`GET /api/videos/:videoId`).
- MongoDB database to store video data.

## Installation

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed locally or accessible remotely.

### Steps

1. Clone this repository.
2. Navigate to the `frontend` folder and run `npm install` to install dependencies.
3. Navigate to the `backend` folder and run `npm install` to install dependencies.
4. Set up MongoDB locally or configure connection details for a remote MongoDB instance.
5. Run `npm run dev` in the `frontend` folder to start the React app with Vite and Tailwind CSS.
6. Run `npm run dev` in the `backend` folder to start the Express.js server.

## Usage

1. Open your browser and navigate to the URL where the React app is running.
2. Paste YouTube video links into the input field to add them to your online album.
3. The application will fetch details such as thumbnail and title from YouTube API.
4. View all saved videos as cards with thumbnails and information.
5. Play or delete videos as needed.

## Technologies Used

### Frontend

- React
- Vite
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB

## Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests to suggest improvements or fix any issues.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.