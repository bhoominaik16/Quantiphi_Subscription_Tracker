# 💳 SubTracker Dash

### Personal Finance & SaaS Renewal Dashboard

**SubTracker Dash** is a full-stack personal finance dashboard built with the **MERN stack** that helps users manage recurring SaaS subscriptions and streaming services.

The application tracks subscription costs, monitors upcoming renewals, calculates the **real-time monthly cash-flow burn rate**, and provides an interactive savings simulation by allowing users to pause subscriptions without deleting them.

---

## 🚀 Features

### 💰 Real-Time Monthly Burn Rate

SubTracker Dash automatically converts monthly and yearly subscription costs into a unified **monthly cash-flow metric**.

For example:

* Monthly subscription → ₹999/month
* Yearly subscription → ₹12,000/year → ₹1,000/month

Only **active subscriptions** contribute to the total monthly burn rate.

---

### 🔔 Renewal Urgency Detection

The application automatically calculates the number of days remaining until each subscription's next renewal.

Subscriptions renewing within **7 days** are highlighted with an **amber warning badge**, allowing users to identify upcoming financial commitments quickly.

---

### 📊 Interactive Savings Simulation

Users can toggle a subscription between **ACTIVE** and **PAUSED**.

When a subscription is paused:

* The subscription remains stored in the database.
* Its row is visually dimmed.
* Its normalized cost is immediately removed from the monthly burn calculation.
* Users can reactivate it at any time.

This allows users to simulate potential savings without permanently deleting subscriptions.

---

### 🔄 Full CRUD Operations

The dashboard supports:

* Create new subscriptions
* Read subscription records
* Update subscription status
* Delete subscriptions
* Calculate analytics and financial metrics

---

### ⚡ Optimistic UI Updates

Subscription status changes are reflected immediately in the interface before the database operation completes.

This provides a faster and more responsive user experience while maintaining synchronization with MongoDB.

---

## 🛠️ Tech Stack

### Frontend

| Technology          | Purpose             |
| ------------------- | ------------------- |
| **React 18**        | User interface      |
| **Vite**            | Frontend build tool |
| **Tailwind CSS v4** | Styling             |
| **Lucide React**    | Icons               |
| **Axios**           | HTTP requests       |

### Backend

| Technology        | Purpose                         |
| ----------------- | ------------------------------- |
| **Node.js**       | JavaScript runtime              |
| **Express.js**    | REST API                        |
| **MongoDB Atlas** | Database                        |
| **Mongoose**      | MongoDB ODM                     |
| **CORS**          | Cross-origin requests           |
| **Dotenv**        | Environment variable management |

---

## 🏗️ Application Architecture

```text
                    ┌─────────────────────┐
                    │      React UI       │
                    │  React + Tailwind   │
                    └──────────┬──────────┘
                               │
                               │ Axios / REST API
                               ▼
                    ┌─────────────────────┐
                    │    Express Server   │
                    │      REST API       │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       Controllers          Services          Utils
       CRUD & Metrics       Cost Engine       Date Logic
              │                │                │
              └────────────────┼────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │      Mongoose       │
                    │    Subscription     │
                    │       Model         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    MongoDB Atlas    │
                    └─────────────────────┘
```

---

## 📁 Project Structure

```text
subscription-tracker/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── subscriptionController.js
│   │   │   └── analyticsController.js
│   │   │
│   │   ├── models/
│   │   │   └── Subscription.js
│   │   │
│   │   ├── routes/
│   │   │   ├── subscriptionRoutes.js
│   │   │   └── analyticsRoutes.js
│   │   │
│   │   ├── services/
│   │   │   └── costCalculator.js
│   │   │
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   │
│   │   ├── utils/
│   │   │   └── dateUtils.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   └── ToggleSwitch.jsx
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── MetricsRow.jsx
│   │   │   │   ├── MetricCard.jsx
│   │   │   │   ├── SubscriptionTable.jsx
│   │   │   │   └── SubscriptionRow.jsx
│   │   │   │
│   │   │   └── forms/
│   │   │       └── SubscriptionForm.jsx
│   │   │
│   │   ├── context/
│   │   │   └── SubscriptionContext.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useSubscriptions.js
│   │   │   └── useDashboardMetrics.js
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── utils/
│   │   │   ├── calculations.js
│   │   │   └── formatters.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Getting Started

## Prerequisites

Make sure the following are installed:

* **Node.js v18+**
* **npm**
* **MongoDB Atlas account** or a local MongoDB instance
* **Git**

---

## 1. Clone the Repository

```bash
git clone <repository-url>
cd subscription-tracker
```

---

# 🔧 Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file using the provided example:

```bash
cp .env.example .env
```

Add the required environment variables:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/subscription_db?retryWrites=true&w=majority
NODE_ENV=development
```

> **Important:** Never commit your `.env` file to GitHub. Add it to `.gitignore`.

### Start the Backend

```bash
npm run dev
```

The backend API will be available at:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/health
```

---

# 🎨 Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the URL displayed by Vite in your browser.

Typically:

```text
http://localhost:5173
```

---

# 🔌 API Documentation

## Subscription APIs

### Get All Subscriptions

```http
GET /api/subscriptions
```

Returns all subscriptions along with:

* Normalized monthly cost
* Renewal information
* Days remaining
* Renewal urgency status

---

### Create Subscription

```http
POST /api/subscriptions
```

Creates a new subscription record.

Example request:

```json
{
  "name": "Netflix",
  "cost": 649,
  "billingCycle": "MONTHLY",
  "renewalDate": "2026-09-10",
  "status": "ACTIVE"
}
```

---

### Toggle Subscription Status

```http
PATCH /api/subscriptions/:id/toggle-status
```

Changes the subscription status between:

```text
ACTIVE ↔ PAUSED
```

A paused subscription remains in the database but does not contribute to the active monthly burn rate.

---

### Delete Subscription

```http
DELETE /api/subscriptions/:id
```

Permanently removes a subscription.

---

## Analytics APIs

### Get Dashboard Metrics

```http
GET /api/analytics/metrics
```

Returns aggregated dashboard metrics such as:

* Total monthly burn rate
* Number of active subscriptions
* Number of paused subscriptions
* Upcoming renewal count

---

## Health Check

```http
GET /health
```

Used to verify that the backend server is running.

Example response:

```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

# 🧮 Core Engineering Logic

## 1. Cost Normalization

Since subscriptions can have different billing cycles, yearly costs are converted into a monthly equivalent.

### Formula

```text
Monthly Subscription:
Normalized Cost = Cost

Yearly Subscription:
Normalized Cost = Cost / 12
```

Mathematically:

$$
\text{Normalized Monthly Cost} =
\begin{cases}
\frac{\text{Cost}}{12}, & \text{if billing cycle is YEARLY}\
\text{Cost}, & \text{if billing cycle is MONTHLY}
\end{cases}
$$

### Example

```text
Spotify
₹119/month
→ ₹119 monthly burn

Adobe Creative Cloud
₹12,000/year
→ ₹1,000 monthly burn
```

This allows subscriptions with different billing cycles to be compared consistently.

---

# 📊 2. Monthly Burn Rate

The total monthly burn rate is calculated using only **ACTIVE** subscriptions.

$$
\text{Total Monthly Burn Rate}
==============================

\sum_{\text{ACTIVE subscriptions}}
\text{Normalized Monthly Cost}
$$

### Example

```text
Netflix       ₹649/month
Spotify       ₹119/month
Adobe         ₹12,000/year → ₹1,000/month

Total Burn Rate
= 649 + 119 + 1000
= ₹1,768/month
```

If Adobe is paused:

```text
New Burn Rate
= 649 + 119
= ₹768/month
```

The Adobe record is not deleted; it is simply excluded from the active burn calculation.

---

# 🔔 3. Renewal Alert Engine

The application calculates the number of days remaining until a subscription renews.

$$
\text{Days Remaining}
=====================

\left\lceil
\frac{\text{Renewal Date} - \text{Current Date}}
{86,400,000}
\right\rceil
$$

Where:

```text
86,400,000 ms = 24 hours
```

An amber renewal warning is displayed when:

```text
0 ≤ Days Remaining ≤ 7
```

and:

```text
Status = ACTIVE
```

This prevents paused subscriptions from generating unnecessary renewal alerts.

---

# ⚡ Optimistic UI

SubTracker Dash uses optimistic updates for subscription status changes.

### Traditional approach

```text
User clicks toggle
        ↓
API request
        ↓
Database update
        ↓
Response
        ↓
UI updates
```

### SubTracker Dash

```text
User clicks toggle
        ↓
UI updates immediately
        ↓
API request
        ↓
MongoDB update
        ↓
State synchronized
```

This makes the dashboard feel faster and more responsive.

If the backend request fails, the application can revert the optimistic state and notify the user.

---

# 🧠 Key Engineering Concepts Demonstrated

This project demonstrates practical implementation of:

* REST API design
* MERN stack architecture
* MongoDB data modeling
* Mongoose schemas
* CRUD operations
* React component architecture
* React Context API
* Custom React hooks
* Axios API integration
* Optimistic UI updates
* Derived state and calculations
* Financial metric normalization
* Date calculations
* Conditional rendering
* API error handling
* Environment variable management
* CORS configuration
* Responsive dashboard UI
* Tailwind CSS v4

---

# 🔐 Environment Variables

The backend requires the following variables:

| Variable      | Description               | Example             |
| ------------- | ------------------------- | ------------------- |
| `PORT`        | Backend server port       | `5000`              |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `NODE_ENV`    | Application environment   | `development`       |

Never expose your MongoDB credentials in source control.

---

# 🧪 Example User Flow

```text
1. User opens dashboard
        ↓
2. React fetches subscriptions
        ↓
3. Express API retrieves MongoDB records
        ↓
4. Backend calculates normalized costs
        ↓
5. Renewal dates are evaluated
        ↓
6. Dashboard displays:
      • Monthly Burn Rate
      • Active Subscriptions
      • Upcoming Renewals
        ↓
7. User pauses a subscription
        ↓
8. UI updates immediately
        ↓
9. Monthly burn rate decreases
        ↓
10. Backend persists the new status
```

---

# 📈 Future Enhancements

Potential improvements include:

* 🔐 User authentication and authorization
* 👤 Individual subscription accounts
* 📧 Renewal reminder notifications
* 📱 Mobile-responsive PWA
* 📊 Spending analytics and charts
* 💳 Payment method tracking
* 🏷️ Subscription categories
* 📅 Calendar-based renewal view
* 💰 Monthly/yearly spending reports
* 📤 CSV/PDF expense export
* 🌐 Multi-currency support
* 🤖 AI-powered subscription recommendations
* ☁️ Production deployment with CI/CD

---

# 🚀 Production Deployment

The application can be deployed using platforms such as:

### Frontend

* Vercel
* Netlify

### Backend

* Render
* Railway
* AWS

### Database

* MongoDB Atlas

A production deployment should use environment-specific variables and a production MongoDB connection string.

---

# 👩‍💻 Author

**Bhoomi Naik**

Built as a full-stack MERN project to explore **personal finance management, REST APIs, data normalization, interactive dashboards, and responsive frontend architecture**.

---

## 📄 License

This project is available for educational and personal use.

---
