# Clipboard Web App

A lightweight, privacy-focused clipboard application. Users can create text items that can be fetched once, expire automatically, and be retrieved through browser or cURL.
Built with Next.js (App Router), MongoDB, Redis, and native Google OAuth.

---

## Features

-   **Private Access**
    Only the creator of an item can view or retrieve it.

-   **cURL Support**
    Each item includes a direct-access cURL command.

-   **One-Time Fetch**
    Items are deleted immediately after being fetched once through the API or UI.

-   **Auto-Clear in 40 Minutes**
    Every item is automatically removed after 40–45 minutes of inactivity.

-   **Native Google OAuth**
    Authentication is handled manually without NextAuth.

-   **Redis for Rate Limiting and Caching**
    Prevents abuse and speeds up fetch operations.

-   **API-Driven Architecture**
    Clipboard operations are accessed through REST-like endpoints inside the Next.js App Router.

---

## Tech Stack

-   Next.js (App Router)
-   MongoDB
-   Redis (rate limiting and caching)
-   Node.js
-   JSON Web Tokens (JWT)
-   Native Google OAuth

---

## Installation

Clone the repository:

```
git clone https://github.com/IsayAyase/global-clipboard.git
cd your-repo
```

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

App runs at:

```
http://localhost:3000
```

---

## Environment Variables

Create a `.env` file:

```
NODE_ENV="development"

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

MONGODB_URI=
JWT_SECRET=

NEXT_PUBLIC_APP_URL=

REDIS_URL=
REDIS_TOKEN=
```

---

# API Reference

This project provides REST-style API endpoints using the Next.js App Router.
Below are all supported request/response formats based on the following TypeScript interfaces:

```ts
// types/clipBoard.ts
export type ClipBoardAccess = "PUBLIC" | "PRIVATE";

export interface IClipBoard {
    _id: string | mongoose.Types.ObjectId;
    id: string;
    userId: string | mongoose.Types.ObjectId;
    code: string;
    text?: string;
    fileUrl?: string;
    access: ClipBoardAccess;
    enableCurl: boolean;
    enableOneFetch: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type ClipBoardPayloadType = Pick<
    IClipBoard,
    "text" | "fileUrl" | "access" | "enableCurl" | "enableOneFetch"
>;
```

---

# Endpoints

## 1. Create Clipboard Item

### POST `/api/clipboard`

Creates a new clipboard entry.

### Request Body

```json
{
    "text": "optional text content", // there should be at least text or fileUrl(not implemented yet!)
    "fileUrl": "optional file url",
    "access": "PRIVATE",
    "enableCurl": true,
    "enableOneFetch": false
}
```

### Response (200)

```json
{
    "_id": "6790c0916f...",
    "id": "6790c0916f...",
    "userId": "678ffaf169..",
    "code": "a1B9x",
    "text": "hello world",
    "fileUrl": null,
    "access": "PRIVATE",
    "enableCurl": true,
    "enableOneFetch": false,
    "createdAt": "2025-01-01T12:00:00.000Z",
    "updatedAt": "2025-01-01T12:00:00.000Z"
}
```

### Notes

-   At least **one** of `text` or `fileUrl` must be present.
-   `code` is a short(4 chars) unique identifier used for sharing and fetching.
-   PRIVATE items require authentication to view (unless fetched once).
-   Items auto-expire after 40–45 minutes(30 min ttl in db, 10 min ttl in redis).

---

## 2. Get All Clipboard Items (User Only)

### GET `/api/clipboard`

Returns every clipboard item created by the authenticated user.

### Response

```json
[
    {
        "_id": "6790c0916f...",
        "id": "6790c0916f...",
        "userId": "678ffaf169...",
        "code": "wX8dK",
        "text": "Sample text",
        "fileUrl": null,
        "access": "PRIVATE",
        "enableCurl": true,
        "enableOneFetch": false,
        "createdAt": "2025-01-01T12:00:00.000Z",
        "updatedAt": "2025-01-01T12:00:00.000Z"
    }
]
```

---

## 3. Fetch a Clipboard Item

### GET `/cb?code=SHORTCODE&mode=api`

Fetch an item by its shortcode.

### Query Parameters

| Name       | Description                                 |
| ---------- | ------------------------------------------- |
| `code`     | The unique code of the clipboard item       |
| `mode=api` | Forces JSON response (instead of just text) |

### Response

```json
{
    "_id": "6790c0916f...",
    "id": "6790c0916f...",
    "userId": "678ffaf169...",
    "code": "a1B9x",
    "text": "hello world",
    "fileUrl": null,
    "access": "PUBLIC",
    "enableCurl": true,
    "enableOneFetch": true,
    "createdAt": "2025-01-01T12:00:00.000Z",
    "updatedAt": "2025-01-01T12:00:00.000Z"
}
```

### One-Time Fetch Rules

-   If `enableOneFetch = true`, the item is permanently deleted immediately after this response.
-   If expired (40–45 minutes), returns **404**.
-   PRIVATE items require correct authentication unless accessed via one-time fetch.

---

## 4. Delete a Single Clipboard Item

### DELETE `/api/clipboard?code=SHORTCODE`

Deletes an item owned by the authenticated user.

### Response

```json
{
    "success": true
}
```

---

## 5. Delete All Clipboard Items

### DELETE `/api/clipboard?all=true`

Deletes all clipboard entries belonging to the authenticated user.

### Response

```json
{
    "success": true
}
```

---

# Additional Behaviors

## Access Levels

| Access  | Description                                                                     |
| ------- | ------------------------------------------------------------------------------- |
| PUBLIC  | Anyone with the link can fetch (still subject to one-time fetch and expiration) |
| PRIVATE | Only the authenticated owner may fetch/view                                     |

## Curl Access

If `enableCurl = true`, an additional formatted cURL link is generated:

```
curl -s https://yourapp.com/cb?code=SHORTCODE
```

## Expiration Window

All items (regardless of options) auto-delete after roughly 40–45 minutes.

## Redis Caching

-   Frequently fetched items are cached.
-   Reduces MongoDB load.
-   Combined with rate limiting for protection.

## Rate Limiting

Rate limits apply to:

-   Creating items
-   Fetching items
-   Deleting items

Returning:

```
429 Too Many Requests
```

---

That's it ig!
