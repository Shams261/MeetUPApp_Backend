# MeetUp App Backend

A RESTful API service for managing meetup events, built with Node.js, Express, and MongoDB.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Server](#running-the-server)
- [API Reference](#api-reference)
  - [Base URL](#base-url)
  - [Endpoints](#endpoints)
- [Data Models](#data-models)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This backend service provides APIs to:

- Fetch all meetup events with filtering and search capabilities
- Retrieve detailed information for a specific event
- Create new events

---

## Tech Stack

| Technology | Version | Purpose                         |
| ---------- | ------- | ------------------------------- |
| Node.js    | -       | Runtime environment             |
| Express    | 5.2.1   | Web framework                   |
| MongoDB    | -       | Database                        |
| Mongoose   | 9.0.2   | ODM for MongoDB                 |
| dotenv     | 17.2.3  | Environment variable management |
| cors       | 2.8.5   | Cross-Origin Resource Sharing   |

---

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│   Routes    │────▶│ Controllers │────▶│   Models    │
│             │◀────│             │◀────│             │◀────│             │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                                                   │
                                                                   ▼
                                                            ┌─────────────┐
                                                            │  MongoDB    │
                                                            └─────────────┘
```

---

## Getting Started

### Prerequisites

- **Node.js** (v18.x or higher recommended)
- **npm** (v9.x or higher)
- **MongoDB** (local instance or MongoDB Atlas)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/meetup-app
```

| Variable    | Description               | Default |
| ----------- | ------------------------- | ------- |
| `PORT`      | Server port number        | `3000`  |
| `MONGO_URI` | MongoDB connection string | -       |

### Running the Server

**Development mode:**

```bash
npm run dev
```

The server will start at `http://localhost:3000` (or your configured PORT).

---

## API Reference

### Base URL

```
http://localhost:3000/api
```

### Endpoints

#### Events

| Method | Endpoint      | Description                |
| ------ | ------------- | -------------------------- |
| `GET`  | `/events`     | Fetch all events           |
| `GET`  | `/events/:id` | Fetch a single event by ID |
| `POST` | `/events`     | Create a new event         |

---

### `GET /events`

Retrieves all events with optional filtering and search.

**Query Parameters:**

| Parameter | Type     | Description                                                    |
| --------- | -------- | -------------------------------------------------------------- |
| `type`    | `string` | Filter by event type: `Online`, `Offline`, or `Both` (default) |
| `search`  | `string` | Search in title and tags (case-insensitive)                    |

**Example Request:**

```bash
curl "http://localhost:3000/api/events?type=Online&search=javascript"
```

**Example Response:**

```json
[
  {
    "_id": "64abc123...",
    "title": "JavaScript Meetup",
    "date": "2025-01-15T18:00:00.000Z",
    "type": "Online",
    "topic": "Web Development",
    "description": "A meetup for JavaScript enthusiasts",
    "image": "https://example.com/image.jpg",
    "sessions": [
      {
        "time": "6:00 PM",
        "speaker": "John Doe"
      }
    ],
    "price": 0,
    "speakers": [
      {
        "name": "John Doe",
        "role": "Senior Developer",
        "image": "https://example.com/speaker.jpg"
      }
    ],
    "hostedBy": "Tech Community",
    "venue": {
      "name": "Virtual",
      "address": "Zoom"
    },
    "additionalInfo": "Bring your laptop!",
    "tags": ["javascript", "web", "frontend"],
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
]
```

**Response Codes:**

| Status | Description  |
| ------ | ------------ |
| `200`  | Success      |
| `500`  | Server error |

---

### `GET /events/:id`

Retrieves a single event by its ID.

**Path Parameters:**

| Parameter | Type     | Description                   |
| --------- | -------- | ----------------------------- |
| `id`      | `string` | MongoDB ObjectId of the event |

**Example Request:**

```bash
curl "http://localhost:3000/api/events/64abc123..."
```

**Response Codes:**

| Status | Description     |
| ------ | --------------- |
| `200`  | Success         |
| `404`  | Event not found |
| `500`  | Server error    |

---

### `POST /events`

Creates a new event.

**Request Body:**

```json
{
  "title": "React Conference 2025",
  "date": "2025-03-20T10:00:00.000Z",
  "type": "Offline",
  "topic": "Frontend Development",
  "description": "Annual React conference with industry experts",
  "image": "https://example.com/react-conf.jpg",
  "sessions": [
    {
      "time": "10:00 AM",
      "speaker": "Dan Abramov"
    }
  ],
  "price": 50,
  "speakers": [
    {
      "name": "Dan Abramov",
      "role": "React Core Team",
      "image": "https://example.com/dan.jpg"
    }
  ],
  "hostedBy": "React Community",
  "venue": {
    "name": "Convention Center",
    "address": "123 Main St, San Francisco, CA"
  },
  "additionalInfo": "Lunch included",
  "tags": ["react", "javascript", "frontend"]
}
```

**Response Codes:**

| Status | Description          |
| ------ | -------------------- |
| `201`  | Created successfully |
| `400`  | Validation error     |

---

## Data Models

### Event Schema

```javascript
{
  title: String,          // Required, trimmed
  date: Date,             // Required
  type: String,           // Required, enum: ["Online", "Offline"]
  image: String,
  topic: String,          // Required
  description: String,    // Required
  sessions: [{
    time: String,
    speaker: String
  }],
  price: Number,          // Default: 0
  speakers: [{
    name: String,
    role: String,
    image: String
  }],
  hostedBy: String,
  venue: {
    name: String,
    address: String
  },
  additionalInfo: String,
  tags: [String],
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

---

## Project Structure

```
Backend/
├── server.js              # Entry point - starts the server
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (not committed)
└── src/
    ├── app.js             # Express app configuration
    ├── config/
    │   └── db.js          # MongoDB connection setup
    ├── controllers/
    │   └── event.controller.js  # Business logic for events
    ├── models/
    │   └── Event.model.js       # Mongoose schema for Event
    └── routes/
        └── event.routes.js      # API route definitions
```

| Directory/File     | Purpose                                                           |
| ------------------ | ----------------------------------------------------------------- |
| `server.js`        | Application entry point; initializes DB and starts Express server |
| `src/app.js`       | Express app setup with middleware and route mounting              |
| `src/config/db.js` | Database connection configuration                                 |
| `src/controllers/` | Request handlers with business logic                              |
| `src/models/`      | Mongoose schemas and models                                       |
| `src/routes/`      | API endpoint definitions                                          |

---

## Error Handling

All API responses follow a consistent format:

**Success Response:**

```json
{
  "_id": "...",
  "title": "...",
  ...
}
```

**Error Response:**

```json
{
  "message": "Error description"
}
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the ISC License.

---

## Contact

For questions or support, please open an issue in the repository.
