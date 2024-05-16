# MeetingNotes REST API

## Overview

This project implements a RESTful API for managing meeting notes, allowing users to fetch, filter, add, update, and delete meeting notes. Developed using Node.js and Express, it leverages MongoDB for data persistence, offering a structured way to handle meeting information, including titles, content, action items, and creation dates.

## Features

- Fetch all existing meeting notes.
- Filter meeting notes by keywords in title, content, action items, and creation date range.
- Add new meeting notes.
- Update existing meeting notes, including action items.
- Delete meeting notes.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later recommended)
- MongoDB (Local or cloud-based instance)

### Installation

1. Clone the repository or download the project files.
2. Navigate to the project directory and install dependencies:

   ```bash
   npm install
   ```

3. Set up your MongoDB connection string in `mongoConnection.js`. If you're using a cloud-based MongoDB service like Atlas, replace the connection string accordingly.

4. Start the server:

   ```bash
   npm start
   ```

   The API will be available at `http://localhost:3000`.

## API Endpoints

### Fetch All Meeting Notes

- **GET** `/api/meetingNotes/getAllNotes`

### Filter Meeting Notes by Date Range

- **GET** `/api/meetingNotes/filter?keywords={keywords}&startDate={startDate}&endDate={endDate}`
### Filter Meeting Notes by title, content or action items

 -**GET** `/api/meetingNotes/filterNote?keywords=value

### Add a Meeting Note

- **POST** `/api/meetingNotes/createNote`
  
  Body:
  ```json
  {
    "title": "Meeting Title",
    "content": "Meeting Content",
    "actionItems": ["Action Item 1", "Action Item 2"],
    "createdDate": "YYYY-MM-DD"
  }
  ```

### Update a Meeting Note

- **PUT** `/api/meetingNotes/note/:id`
  
  Replace `:id` with the meeting note's ID.
  
  Body:
  ```json
  {
    "title": "Updated Title",
    "content": "Updated Content",
    "actionItems": ["Updated Action Item 1", "Updated Action Item 2"],
    "createdDate": "YYYY-MM-DD"
  }
  ```

### Delete a Meeting Note

- **DELETE** `/api/meetingNotes/note/:id`
  
  Replace `:id` with the meeting note's ID.




