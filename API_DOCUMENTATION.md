# BootCamp Tracker API Documentation

Base URL: `http://localhost:<PORT>/api`

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Roles
- **admin** - Full access to all endpoints
- **teacher** - Can manage announcements, assignments, grade submissions
- **student** - Can view content, submit assignments, track progress

---

## 1. User APIs

Base Path: `/users`

### 1.1 Add User (Register)
**POST** `/users/add-user`

**Auth Required:** No

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student",
  "domain": "Web Development",
  "bootcampId": "60d5ec49f8d2e30015c4b5a1"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | String | Yes | User's full name (3-50 chars) |
| email | String | Yes | Unique email address |
| password | String | Yes | Min 6 characters |
| role | String | No | "admin", "teacher", "student" (default: "student") |
| domain | String | Yes | User's domain/specialization |
| bootcampId | ObjectId | No | Associated bootcamp ID |

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "60d5ec49f8d2e30015c4b5a2",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "domain": "Web Development",
    "bootcampId": "60d5ec49f8d2e30015c4b5a1",
    "firstLogin": true,
    "createdAt": "2026-03-09T10:00:00.000Z",
    "updatedAt": "2026-03-09T10:00:00.000Z"
  }
}
```

---

### 1.2 Login
**POST** `/users/login`

**Auth Required:** No

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | String | Yes | Registered email |
| password | String | Yes | User password |

**Success Response (200):**
```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (401):**
```json
{
  "message": "Invalid email or password"
}
```

---

### 1.3 Get User Profile
**GET** `/users/profile`

**Auth Required:** Yes

**Success Response (200):**
```json
{
  "success": true,
  "message": "User profile retrieved successfully",
  "data": {
    "_id": "60d5ec49f8d2e30015c4b5a2",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "domain": "Web Development",
    "bootcampId": "60d5ec49f8d2e30015c4b5a1",
    "firstLogin": true,
    "createdAt": "2026-03-09T10:00:00.000Z",
    "updatedAt": "2026-03-09T10:00:00.000Z"
  }
}
```

---

### 1.4 Update User
**PUT** `/users/update/:id`

**Auth Required:** No (Consider adding auth)

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | ObjectId | User ID to update |

**Request Body:**
```json
{
  "name": "John Updated",
  "domain": "Full Stack Development"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "_id": "60d5ec49f8d2e30015c4b5a2",
    "name": "John Updated",
    "email": "john@example.com",
    "role": "student",
    "domain": "Full Stack Development",
    "bootcampId": "60d5ec49f8d2e30015c4b5a1"
  }
}
```

---

### 1.5 Get All Users
**GET** `/users/all-users`

**Auth Required:** No (Consider adding auth)

**Success Response (200):**
```json
{
  "success": true,
  "message": "All users retrieved successfully",
  "data": [
    {
      "_id": "60d5ec49f8d2e30015c4b5a2",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student",
      "domain": "Web Development"
    }
  ]
}
```

---

## 2. Bootcamp APIs

Base Path: `/bootcamps`

### 2.1 Create Bootcamp
**POST** `/bootcamps/create-bootcamp`

**Auth Required:** Yes  
**Roles:** admin

**Request Body:**
```json
{
  "name": "Full Stack Web Development Bootcamp",
  "description": "Learn full stack development in 12 weeks",
  "startDate": "2026-04-01",
  "endDate": "2026-06-30",
  "status": "upcoming",
  "domains": ["Frontend", "Backend", "DevOps"],
  "mentors": ["60d5ec49f8d2e30015c4b5a2"]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | String | Yes | Bootcamp name |
| description | String | No | Bootcamp description |
| startDate | Date | Yes | Start date |
| endDate | Date | Yes | End date |
| status | String | No | "upcoming", "active", "completed" (default: "upcoming") |
| domains | Array[String] | Yes | List of domain names |
| mentors | Array[ObjectId] | No | List of mentor user IDs |

**Success Response (201):**
```json
{
  "success": true,
  "message": "Bootcamp created successfully",
  "data": {
    "_id": "60d5ec49f8d2e30015c4b5a3",
    "name": "Full Stack Web Development Bootcamp",
    "description": "Learn full stack development in 12 weeks",
    "startDate": "2026-04-01T00:00:00.000Z",
    "endDate": "2026-06-30T00:00:00.000Z",
    "status": "upcoming",
    "domains": ["Frontend", "Backend", "DevOps"],
    "mentors": ["60d5ec49f8d2e30015c4b5a2"],
    "createdAt": "2026-03-09T10:00:00.000Z"
  }
}
```

---

### 2.2 Get All Bootcamps
**GET** `/bootcamps/get-bootcamps`

**Auth Required:** No

**Success Response (200):**
```json
{
  "success": true,
  "message": "Bootcamps retrieved successfully",
  "data": [
    {
      "_id": "60d5ec49f8d2e30015c4b5a3",
      "name": "Full Stack Web Development Bootcamp",
      "status": "upcoming",
      "startDate": "2026-04-01T00:00:00.000Z",
      "endDate": "2026-06-30T00:00:00.000Z"
    }
  ]
}
```

---

### 2.3 Get Single Bootcamp
**GET** `/bootcamps/get-bootcamp/:id`

**Auth Required:** No

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | ObjectId | Bootcamp ID |

**Success Response (200):**
```json
{
  "success": true,
  "message": "Single Bootcamp retrieved successfully",
  "data": {
    "_id": "60d5ec49f8d2e30015c4b5a3",
    "name": "Full Stack Web Development Bootcamp",
    "description": "Learn full stack development in 12 weeks",
    "startDate": "2026-04-01T00:00:00.000Z",
    "endDate": "2026-06-30T00:00:00.000Z",
    "status": "upcoming",
    "domains": ["Frontend", "Backend", "DevOps"],
    "mentors": ["60d5ec49f8d2e30015c4b5a2"]
  }
}
```

---

### 2.4 Update Bootcamp
**PUT** `/bootcamps/update-bootcamp/:id`

**Auth Required:** Yes  
**Roles:** admin

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | ObjectId | Bootcamp ID |

**Request Body:**
```json
{
  "status": "active",
  "description": "Updated description"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Bootcamp updated successfully",
  "data": { ... }
}
```

---

### 2.5 Delete Bootcamp
**DELETE** `/bootcamps/delete-bootcamp/:id`

**Auth Required:** Yes  
**Roles:** admin

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | ObjectId | Bootcamp ID |

**Success Response (200):**
```json
{
  "success": true,
  "message": "Bootcamp deleted successfully",
  "data": { ... }
}
```

---

## 3. Announcement APIs

Base Path: `/announcements`

### 3.1 Create Announcement
**POST** `/announcements/`

**Auth Required:** Yes  
**Roles:** admin, teacher

**Request Body:**
```json
{
  "title": "Important Update",
  "description": "Please note the schedule change for next week",
  "bootcampId": "60d5ec49f8d2e30015c4b5a3",
  "domainId": "60d5ec49f8d2e30015c4b5a4"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | String | Yes | Announcement title |
| description | String | Yes | Announcement content |
| bootcampId | ObjectId | Yes | Associated bootcamp |
| domainId | ObjectId | Yes | Associated domain |

**Note:** `createdBy` is automatically set from the authenticated user.

**Success Response (201):**
```json
{
  "success": true,
  "message": "Announcement created successfully",
  "data": {
    "_id": "60d5ec49f8d2e30015c4b5a5",
    "title": "Important Update",
    "description": "Please note the schedule change for next week",
    "bootcampId": "60d5ec49f8d2e30015c4b5a3",
    "domainId": "60d5ec49f8d2e30015c4b5a4",
    "createdBy": "60d5ec49f8d2e30015c4b5a2",
    "createdAt": "2026-03-09T10:00:00.000Z"
  }
}
```

---

### 3.2 Get All Announcements
**GET** `/announcements/`

**Auth Required:** Yes

**Success Response (200):**
```json
{
  "success": true,
  "message": "All announcements retrieved successfully",
  "data": [
    {
      "_id": "60d5ec49f8d2e30015c4b5a5",
      "title": "Important Update",
      "description": "Please note the schedule change for next week",
      "bootcampId": { "_id": "...", "name": "Full Stack Bootcamp" },
      "domainId": { "_id": "...", "name": "Frontend" },
      "createdBy": { "_id": "...", "name": "John Doe", "email": "john@example.com" },
      "createdAt": "2026-03-09T10:00:00.000Z"
    }
  ]
}
```

---

### 3.3 Get Announcement by ID
**GET** `/announcements/:id`

**Auth Required:** Yes

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | ObjectId | Announcement ID |

---

### 3.4 Get Announcements by Bootcamp
**GET** `/announcements/bootcamp/:bootcampId`

**Auth Required:** Yes

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| bootcampId | ObjectId | Bootcamp ID |

---

### 3.5 Get Announcements by Domain
**GET** `/announcements/domain/:domainId`

**Auth Required:** Yes

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| domainId | ObjectId | Domain ID |

---

### 3.6 Update Announcement
**PUT** `/announcements/:id`

**Auth Required:** Yes  
**Roles:** admin, teacher

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | ObjectId | Announcement ID |

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated content"
}
```

---

### 3.7 Delete Announcement
**DELETE** `/announcements/:id`

**Auth Required:** Yes  
**Roles:** admin, teacher

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | ObjectId | Announcement ID |

---

## 4. Domain APIs

Base Path: `/domains`

### 4.1 Create Domain
**POST** `/domains/`

**Auth Required:** Yes  
**Roles:** admin

**Request Body:**
```json
{
  "name": "Frontend Development",
  "description": "HTML, CSS, JavaScript, React",
  "bootcampId": "60d5ec49f8d2e30015c4b5a3",
  "mentor": "60d5ec49f8d2e30015c4b5a2",
  "status": "active"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | String | Yes | Domain name (unique) |
| description | String | No | Domain description |
| bootcampId | ObjectId | Yes | Associated bootcamp |
| mentor | ObjectId | No | Assigned mentor user ID |
| status | String | No | "active", "inactive" (default: "active") |

**Success Response (201):**
```json
{
  "success": true,
  "message": "Domain created successfully",
  "data": {
    "_id": "60d5ec49f8d2e30015c4b5a4",
    "name": "Frontend Development",
    "description": "HTML, CSS, JavaScript, React",
    "bootcampId": "60d5ec49f8d2e30015c4b5a3",
    "mentor": "60d5ec49f8d2e30015c4b5a2",
    "status": "active",
    "createdAt": "2026-03-09T10:00:00.000Z"
  }
}
```

---

### 4.2 Get All Domains
**GET** `/domains/`

**Auth Required:** Yes

---

### 4.3 Get Domain by ID
**GET** `/domains/:id`

**Auth Required:** Yes

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | ObjectId | Domain ID |

---

### 4.4 Get Domains by Bootcamp
**GET** `/domains/bootcamp/:bootcampId`

**Auth Required:** Yes

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| bootcampId | ObjectId | Bootcamp ID |

---

### 4.5 Update Domain
**PUT** `/domains/:id`

**Auth Required:** Yes  
**Roles:** admin

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | ObjectId | Domain ID |

---

### 4.6 Delete Domain
**DELETE** `/domains/:id`

**Auth Required:** Yes  
**Roles:** admin

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | ObjectId | Domain ID |

---

## 5. Assignment APIs

Base Path: `/assignments`

### 5.1 Create Assignment
**POST** `/assignments/`

**Auth Required:** Yes  
**Roles:** admin, teacher

**Request Body:**
```json
{
  "title": "Build a React Todo App",
  "description": "Create a fully functional todo application using React hooks",
  "bootcampId": "60d5ec49f8d2e30015c4b5a3",
  "domainId": "60d5ec49f8d2e30015c4b5a4",
  "dueDate": "2026-03-20",
  "maxScore": 100,
  "status": "active"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | String | Yes | Assignment title |
| description | String | Yes | Assignment description |
| bootcampId | ObjectId | Yes | Associated bootcamp |
| domainId | ObjectId | Yes | Associated domain |
| dueDate | Date | Yes | Submission deadline |
| maxScore | Number | No | Maximum score (default: 100) |
| status | String | No | "active", "closed" (default: "active") |

**Note:** `createdBy` is automatically set from the authenticated user.

**Success Response (201):**
```json
{
  "success": true,
  "message": "Assignment created successfully",
  "data": {
    "_id": "60d5ec49f8d2e30015c4b5a6",
    "title": "Build a React Todo App",
    "description": "Create a fully functional todo application using React hooks",
    "bootcampId": "60d5ec49f8d2e30015c4b5a3",
    "domainId": "60d5ec49f8d2e30015c4b5a4",
    "createdBy": "60d5ec49f8d2e30015c4b5a2",
    "dueDate": "2026-03-20T00:00:00.000Z",
    "maxScore": 100,
    "status": "active",
    "createdAt": "2026-03-09T10:00:00.000Z"
  }
}
```

---

### 5.2 Get All Assignments
**GET** `/assignments/`

**Auth Required:** Yes

---

### 5.3 Get Assignment by ID
**GET** `/assignments/:id`

**Auth Required:** Yes

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | ObjectId | Assignment ID |

---

### 5.4 Get Assignments by Bootcamp
**GET** `/assignments/bootcamp/:bootcampId`

**Auth Required:** Yes

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| bootcampId | ObjectId | Bootcamp ID |

---

### 5.5 Get Assignments by Domain
**GET** `/assignments/domain/:domainId`

**Auth Required:** Yes

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| domainId | ObjectId | Domain ID |

---

### 5.6 Update Assignment
**PUT** `/assignments/:id`

**Auth Required:** Yes  
**Roles:** admin, teacher

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | ObjectId | Assignment ID |

---

### 5.7 Delete Assignment
**DELETE** `/assignments/:id`

**Auth Required:** Yes  
**Roles:** admin, teacher

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | ObjectId | Assignment ID |

---

## 6. Submission APIs

Base Path: `/submissions`

### 6.1 Create Submission
**POST** `/submissions/`

**Auth Required:** Yes

**Request Body:**
```json
{
  "assignmentId": "60d5ec49f8d2e30015c4b5a6",
  "submissionUrl": "https://github.com/user/react-todo-app",
  "submissionText": "Completed all requirements including bonus features"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| assignmentId | ObjectId | Yes | Assignment being submitted |
| submissionUrl | String | Yes | URL to submission (GitHub, etc.) |
| submissionText | String | No | Additional notes/comments |

**Note:** `userId` is automatically set from the authenticated user.

**Success Response (201):**
```json
{
  "success": true,
  "message": "Submission created successfully",
  "data": {
    "_id": "60d5ec49f8d2e30015c4b5a7",
    "assignmentId": "60d5ec49f8d2e30015c4b5a6",
    "userId": "60d5ec49f8d2e30015c4b5a2",
    "submissionUrl": "https://github.com/user/react-todo-app",
    "submissionText": "Completed all requirements including bonus features",
    "status": "submitted",
    "createdAt": "2026-03-09T10:00:00.000Z"
  }
}
```

---

### 6.2 Get All Submissions
**GET** `/submissions/`

**Auth Required:** Yes  
**Roles:** admin, teacher

---

### 6.3 Get Submission by ID
**GET** `/submissions/:id`

**Auth Required:** Yes

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | ObjectId | Submission ID |

---

### 6.4 Get Submissions by Assignment
**GET** `/submissions/assignment/:assignmentId`

**Auth Required:** Yes

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| assignmentId | ObjectId | Assignment ID |

---

### 6.5 Get Submissions by User
**GET** `/submissions/user/:userId`

**Auth Required:** Yes

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| userId | ObjectId | User ID |

---

### 6.6 Update Submission
**PUT** `/submissions/:id`

**Auth Required:** Yes

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | ObjectId | Submission ID |

**Request Body:**
```json
{
  "submissionUrl": "https://github.com/user/react-todo-app-v2",
  "submissionText": "Updated with additional features"
}
```

---

### 6.7 Grade Submission
**PUT** `/submissions/grade/:id`

**Auth Required:** Yes  
**Roles:** admin, teacher

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | ObjectId | Submission ID |

**Request Body:**
```json
{
  "score": 85,
  "feedback": "Great work! Consider adding error handling for better UX."
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| score | Number | Yes | Score awarded (0 to maxScore) |
| feedback | String | No | Feedback comments |

**Note:** `gradedBy` and `gradedAt` are automatically set.

**Success Response (200):**
```json
{
  "success": true,
  "message": "Submission graded successfully",
  "data": {
    "_id": "60d5ec49f8d2e30015c4b5a7",
    "assignmentId": { "_id": "...", "title": "Build a React Todo App", "dueDate": "..." },
    "userId": { "_id": "...", "name": "John Doe", "email": "john@example.com" },
    "submissionUrl": "https://github.com/user/react-todo-app",
    "score": 85,
    "feedback": "Great work! Consider adding error handling for better UX.",
    "status": "graded",
    "gradedBy": { "_id": "...", "name": "Teacher Name", "email": "teacher@example.com" },
    "gradedAt": "2026-03-10T14:00:00.000Z"
  }
}
```

---

### 6.8 Delete Submission
**DELETE** `/submissions/:id`

**Auth Required:** Yes  
**Roles:** admin, teacher

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | ObjectId | Submission ID |

---

## 7. Daily Progress APIs

Base Path: `/progress`

### 7.1 Create Progress Entry
**POST** `/progress/`

**Auth Required:** Yes

**Request Body:**
```json
{
  "bootcampId": "60d5ec49f8d2e30015c4b5a3",
  "domainId": "60d5ec49f8d2e30015c4b5a4",
  "date": "2026-03-09",
  "tasksCompleted": "Completed todo app UI, implemented state management",
  "hoursWorked": 6,
  "blockers": "Facing issues with API integration",
  "notes": "Need to discuss API structure with mentor"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| bootcampId | ObjectId | Yes | Associated bootcamp |
| domainId | ObjectId | Yes | Associated domain |
| date | Date | Yes | Date of progress (default: today) |
| tasksCompleted | String | Yes | Description of completed tasks |
| hoursWorked | Number | Yes | Hours worked (min: 0) |
| blockers | String | No | Any blockers faced |
| notes | String | No | Additional notes |

**Note:** `userId` is automatically set from the authenticated user.

**Success Response (201):**
```json
{
  "success": true,
  "message": "Progress created successfully",
  "data": {
    "_id": "60d5ec49f8d2e30015c4b5a8",
    "userId": "60d5ec49f8d2e30015c4b5a2",
    "bootcampId": "60d5ec49f8d2e30015c4b5a3",
    "domainId": "60d5ec49f8d2e30015c4b5a4",
    "date": "2026-03-09T00:00:00.000Z",
    "tasksCompleted": "Completed todo app UI, implemented state management",
    "hoursWorked": 6,
    "blockers": "Facing issues with API integration",
    "notes": "Need to discuss API structure with mentor",
    "createdAt": "2026-03-09T18:00:00.000Z"
  }
}
```

---

### 7.2 Get All Progress
**GET** `/progress/`

**Auth Required:** Yes  
**Roles:** admin, teacher

---

### 7.3 Get Progress by ID
**GET** `/progress/:id`

**Auth Required:** Yes

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | ObjectId | Progress entry ID |

---

### 7.4 Get Progress by User
**GET** `/progress/user/:userId`

**Auth Required:** Yes

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| userId | ObjectId | User ID |

---

### 7.5 Get Progress by Bootcamp
**GET** `/progress/bootcamp/:bootcampId`

**Auth Required:** Yes  
**Roles:** admin, teacher

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| bootcampId | ObjectId | Bootcamp ID |

---

### 7.6 Get Progress by Date
**GET** `/progress/date/:date`

**Auth Required:** Yes  
**Roles:** admin, teacher

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| date | String | Date in YYYY-MM-DD format |

---

### 7.7 Update Progress
**PUT** `/progress/:id`

**Auth Required:** Yes

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | ObjectId | Progress entry ID |

**Request Body:**
```json
{
  "tasksCompleted": "Updated task description",
  "hoursWorked": 8
}
```

---

### 7.8 Delete Progress
**DELETE** `/progress/:id`

**Auth Required:** Yes  
**Roles:** admin, teacher

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| id | ObjectId | Progress entry ID |

---

## Error Responses

All endpoints return errors in the following format:

**400 Bad Request:**
```json
{
  "message": "Validation error message"
}
```

**401 Unauthorized:**
```json
{
  "message": "Invalid email or password"
}
```

**403 Forbidden:**
```json
{
  "message": "Access denied. Insufficient permissions."
}
```

**404 Not Found:**
```json
{
  "message": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "message": "Failed to perform operation",
  "error": "Error details (in development mode)"
}
```

---

## API Summary Table

| Resource | Endpoint | Method | Auth | Roles |
|----------|----------|--------|------|-------|
| **Users** |
| Add User | `/users/add-user` | POST | No | - |
| Login | `/users/login` | POST | No | - |
| Get Profile | `/users/profile` | GET | Yes | All |
| Update User | `/users/update/:id` | PUT | No | - |
| Get All Users | `/users/all-users` | GET | No | - |
| **Bootcamps** |
| Create | `/bootcamps/create-bootcamp` | POST | Yes | admin |
| Get All | `/bootcamps/get-bootcamps` | GET | No | - |
| Get One | `/bootcamps/get-bootcamp/:id` | GET | No | - |
| Update | `/bootcamps/update-bootcamp/:id` | PUT | Yes | admin |
| Delete | `/bootcamps/delete-bootcamp/:id` | DELETE | Yes | admin |
| **Announcements** |
| Create | `/announcements/` | POST | Yes | admin, teacher |
| Get All | `/announcements/` | GET | Yes | All |
| Get One | `/announcements/:id` | GET | Yes | All |
| By Bootcamp | `/announcements/bootcamp/:bootcampId` | GET | Yes | All |
| By Domain | `/announcements/domain/:domainId` | GET | Yes | All |
| Update | `/announcements/:id` | PUT | Yes | admin, teacher |
| Delete | `/announcements/:id` | DELETE | Yes | admin, teacher |
| **Domains** |
| Create | `/domains/` | POST | Yes | admin |
| Get All | `/domains/` | GET | Yes | All |
| Get One | `/domains/:id` | GET | Yes | All |
| By Bootcamp | `/domains/bootcamp/:bootcampId` | GET | Yes | All |
| Update | `/domains/:id` | PUT | Yes | admin |
| Delete | `/domains/:id` | DELETE | Yes | admin |
| **Assignments** |
| Create | `/assignments/` | POST | Yes | admin, teacher |
| Get All | `/assignments/` | GET | Yes | All |
| Get One | `/assignments/:id` | GET | Yes | All |
| By Bootcamp | `/assignments/bootcamp/:bootcampId` | GET | Yes | All |
| By Domain | `/assignments/domain/:domainId` | GET | Yes | All |
| Update | `/assignments/:id` | PUT | Yes | admin, teacher |
| Delete | `/assignments/:id` | DELETE | Yes | admin, teacher |
| **Submissions** |
| Create | `/submissions/` | POST | Yes | All |
| Get All | `/submissions/` | GET | Yes | admin, teacher |
| Get One | `/submissions/:id` | GET | Yes | All |
| By Assignment | `/submissions/assignment/:assignmentId` | GET | Yes | All |
| By User | `/submissions/user/:userId` | GET | Yes | All |
| Update | `/submissions/:id` | PUT | Yes | All |
| Grade | `/submissions/grade/:id` | PUT | Yes | admin, teacher |
| Delete | `/submissions/:id` | DELETE | Yes | admin, teacher |
| **Progress** |
| Create | `/progress/` | POST | Yes | All |
| Get All | `/progress/` | GET | Yes | admin, teacher |
| Get One | `/progress/:id` | GET | Yes | All |
| By User | `/progress/user/:userId` | GET | Yes | All |
| By Bootcamp | `/progress/bootcamp/:bootcampId` | GET | Yes | admin, teacher |
| By Date | `/progress/date/:date` | GET | Yes | admin, teacher |
| Update | `/progress/:id` | PUT | Yes | All |
| Delete | `/progress/:id` | DELETE | Yes | admin, teacher |

---

**Total Endpoints: 47**
