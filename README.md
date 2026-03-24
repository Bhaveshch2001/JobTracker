#  Fastify Job Tracker API

A production-ready REST API built using **Fastify, Prisma, PostgreSQL, and JWT authentication**.
This project demonstrates Fastify plugin architecture, schema validation, authentication, and performance best practices.


##  Tech Stack

* **Framework:** Fastify (v4)
* **Language:** TypeScript 
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Authentication:** JWT (@fastify/jwt)
* **Validation:** Fastify JSON Schema



##  Setup Instructions

### 1 Clone the repository

```
git clone https://github.com/Bhaveshch2001/JobTracker.git
cd job-tracker
```

---

### 2 Install dependencies

```
npm install
```

---

### 3 Setup environment variables

Create a `.env` file:

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/jobtracker"
JWT_SECRET="your-secret-key"
PORT=3000
```

---

### 4 Run Prisma migrations

```
npx prisma migrate dev --name init
```

---

### 5 Generate Prisma client

```
npx prisma generate
```

---

### 6 Start the server

```
npx ts-node-dev src/server.ts
```

---

##  API Endpoints

###  Auth Routes

#### Signup

```
POST /auth/signup
```

#### Login

```
POST /auth/login
```

---

###  Job Routes (Protected)

> Requires: `Authorization: Bearer <token>`

#### Get all jobs (pagination)

```
GET /jobs?page=1&limit=10
```

#### Get single job

```
GET /jobs/:id
```

#### Create job

```
POST /jobs
```

#### Update job

```
PATCH /jobs/:id
```

#### Delete job

```
DELETE /jobs/:id
```

---

##  Authentication

* JWT-based authentication
* Token expiry: configurable (default: 24h)
* Protected routes use Fastify `onRequest` hook

