# Shabbat Alert

A location-aware SMS alert system for Shabbat and Jewish holidays.

Shabbat Alert is a mobile-optimized web application that sends personalized SMS reminders before Shabbat begins and before Jewish holidays, based on the user's location and notification preferences. Users complete a one-time setup in under a minute. The system handles all reminders automatically on a recurring basis.

---

## Features

- **Auto-detect location** — GPS detection on signup, with a manual location update available via a link included in every text message
- **Personalized SMS alerts** — includes the user's first name, the exact zman, and a Shabbat greeting
- **Flexible alert timing** — 18-minute default, fully custom interval, or up to 3 alerts per event
- **Full Jewish calendar** — covers Shabbat and all major Jewish holidays
- **Multiple zmanim opinions** — users select their preferred halachic opinion at signup
- **Easy opt-out** — reply STOP to any text, or manage preferences via the website
- **Minimal friction** — one-time setup, no ongoing interaction required

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Frontend | React | Mobile-optimized web application |
| Backend | Node.js + Express | JavaScript end-to-end |
| Database | PostgreSQL | Hosted on Render or AWS (decided after week 2) |
| Hosting | Render / AWS | At least one AWS service required per course requirements |
| SMS | Twilio | Free trial; low per-message cost for long-term use |
| Zmanim Data | Hebcal API | Free; covers all holidays and zmanim opinions |
| Project Management | Jira + Confluence | All commits linked to Jira tickets |

**Note:** The AWS hosting and database decision is deferred to after week 2, once the team has completed the relevant coursework. At minimum, one AWS service will be used to satisfy the course requirement.

**Stretch goal (time permitting):** AI-generated personalized Shabbat messages via the Claude or OpenAI API, which would also satisfy the course extra credit AI/ML requirement.

---

## How It Works

```
User visits the site
      |
One-time signup (under 1 minute):
  - First name
  - Phone number
  - Location (auto-detected via GPS)
  - Alert timing (18 min default, custom, or up to 3 alerts)
  - Zmanim opinion (e.g. Gra, Baal HaTanya)
  - Notification channel (SMS)
      |
User data saved to PostgreSQL
      |
Each Shabbat and holiday: backend queries Hebcal API
for zmanim based on the user's saved coordinates
      |
Twilio sends a personalized SMS at the scheduled time(s):
"Hey Sarah, Shabbat starts at 7:43 PM tonight. Shabbat Shalom!"
      |
User replies STOP to unsubscribe at any time,
or taps "Update my location" in any text to refresh their saved location
```

---

## Project Structure

```
shabbat-alert/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # SignupForm, AlertPreferences, LocationPicker
│   │   ├── pages/           # Home, Signup, ManageAlerts
│   │   └── App.jsx
│   └── package.json
├── server/                  # Node.js + Express backend
│   ├── routes/
│   │   ├── users.js         # Signup, preferences, opt-out
│   │   └── alerts.js        # Scheduler, SMS dispatch
│   ├── services/
│   │   ├── hebcal.js        # Zmanim and holiday fetching (External API 1)
│   │   ├── twilio.js        # SMS sending (External API 2)
│   │   └── scheduler.js     # Weekly cron job
│   ├── db/
│   │   └── schema.sql       # PostgreSQL schema
│   └── index.js
├── .env.example
├── .gitignore
└── README.md
```

---

## Database Schema (Overview)

```sql
users
  id, first_name, phone_number, location_lat, location_lng,
  location_label, zmanim_opinion, created_at, is_active

alert_preferences
  id, user_id, minutes_before    -- up to 3 rows per user

holidays_log
  id, user_id, event_name, alert_sent_at
```

---

## Local Development

### Prerequisites

- Node.js v18+
- PostgreSQL installed locally
- Twilio account (free trial): https://twilio.com
- Hebcal API (free, no key required for basic use): https://www.hebcal.com/home/developer-apis

### Setup

```bash
# Clone the repository
git clone https://github.com/[your-repo]/shabbat-alert.git
cd shabbat-alert

# Install dependencies
cd client && npm install
cd ../server && npm install

# Configure environment variables
cp .env.example .env
# Add Twilio credentials and database connection string

# Initialize the database
psql -U postgres -f server/db/schema.sql

# Start the application
# Terminal 1 - backend
cd server && npm run dev

# Terminal 2 - frontend
cd client && npm start
```

---

## Project Timeline

| Week | Dates | Goals |
|---|---|---|
| 1 | Apr 29 - May 5 | Repo and Jira setup, signup form UI, PostgreSQL schema, basic Express routes |
| 2 | May 6 - May 12 | Hebcal API integration, Twilio SMS, cron scheduler, Render deployment |
| 3 | May 13 - May 19 | AWS integration (TBD), full holiday support, zmanim options, location update flow |
| 4 | May 20 - May 28 | Testing, polish, bug fixes, stretch goal if ahead of schedule, final presentation |

**Due date: May 28, 2026**

---

## Course Requirements Checklist

| Requirement | Status | Implementation |
|---|---|---|
| Jira tracking | Complete | All commits reference ticket, e.g. `M3S-44: add signup form` |
| Web framework (backend) | Complete | Node.js + Express |
| UI framework (frontend) | Complete | React |
| Two or more external APIs | Complete | Hebcal API + Twilio API |
| Database hosted on AWS or Render | Pending | PostgreSQL on Render or AWS RDS (decided week 2) |
| Project hosted on AWS or Render | Pending | Decided week 2 |
| Clear AWS service usage | Pending | TBD week 2 |
| AI/ML extra credit | Stretch goal | Claude or OpenAI API for personalized messages, time permitting |

---

## Team

| Name | Role |
|---|---|
| Player One | Full-stack (mixed contributions) |
| Player Two | Full-stack (mixed contributions) |

Contributions are tracked via Jira. Both team members work across frontend and backend throughout the project.

---

## Compliance

- SMS alerts comply with TCPA regulations
- Users may opt out at any time by replying STOP to any text message
- Location data is used exclusively for zmanim calculation and is not shared or sold

---

## Links

- Jira: https://mcon152.atlassian.net/browse/M3S-44
- Hebcal Developer API: https://www.hebcal.com/home/developer-apis
- Twilio: https://www.twilio.com
