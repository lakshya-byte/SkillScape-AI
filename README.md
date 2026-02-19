# VelionAI — Neural Operations & Skill Intelligence Platform

## 🔗 Project Resources

- 🎨 **Figma Design**:  
  https://www.figma.com/design/LxaJjWXqwbDYgUSNNSR7gS/skillscape?node-id=0-1&t=3uFifdsvqvRYbU7P-1

- 📊 **Project Presentation (PPT)**:  
  https://drive.google.com/file/d/1x_aCUa8amRO2cUeUUxgHSh5gXNMAR5K4/view?usp=sharing

---

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.0-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.0-black?style=flat-square&logo=socket.io)](https://socket.io/)

---

> **Where Human Potential Meets Neural Intelligence.**
>
> VelionAI is the world's first **Neural Operations Platform** designed to decode, visualize, and accelerate human skill acquisition through AI-driven intelligence graphs and realtime neural collaboration.

---

## 1. Executive Overview

**VelionAI** is not just a platform; it is a **Neural Operating System** for human capital. In an era where linear learning is obsolete, VelionAI introduces **Skill Intelligence Graphs**—dynamic, AI-generated neural networks that map user capabilities, predict future potential, and generate optimal learning pathways in real-time.

We solve the fundamental problem of **disconnected growth**. Traditional platforms offer static courses and isolated profiles. VelionAI builds a living, breathing **Neural Ops** ecosystem where users can:

- **Visualize** their skill DNA through interactive force-directed graphs.
- **Generate** AI-powered roadmaps tailored to their exact cognitive profile.
- **Collaborate** in realtime with a global network of peers through our low-latency socket infrastructure.
- **Accelerate** mastery through predictive AI that identifies the most high-leverage skills to acquire next.

Built on an elite stack of **Next.js 16**, **React 19**, and **Socket.IO**, VelionAI delivers a sub-100ms latency experience indistinguishable from native desktop applications.

---

## 2. Core Features

### 🧠 Neural Ops Engine
The heart of VelionAI. A sophisticated generative AI system that ingests user goals and outputs complex, multi-node learning roadmaps. It uses:
- **Streaming AI responses** for instant feedback.
- **React Flow & Dagre** for intelligent, auto-layout graph visualization.
- **Persistent State Management** to track progress across nodes.

### 🌐 Skill Intelligence Graph
A 3D/2D interactive visualization of a user's professional identity.
- Nodes represent skills, projects, and domains.
- Edges represent relationships (mastery, interest, prerequisite).
- powered by **D3.js** and **Three.js** logic for physics-based rendering.

### ⚡ Realtime Chat System
A production-grade, socket-based communication layer.
- **Sub-30ms latency** messaging.
- **JWT-authenticated** socket connections for bank-grade security.
- **Optimistic UI updates** for perceived zero-latency interaction.
- **Persistent history** via MongoDB with paginated hydration.

### 🤝 Friend Network System
A complete social graph implementation.
- **Discover**: AI-recommended peer discovery.
- **Connect**: Friend request/accept/reject flows.
- **Status**: Realtime online/offline indicators.

### 🤖 AI Integration Layer
Seamless integration with LLMs (OpenAI/Anthropic) to:
- Analyze GitHub repositories for automated skill verification.
- Generate project ideas based on current skill gaps.
- Provide intelligent, context-aware coding assistance.

---

## 3. Architecture Overview

VelionAI employs a **Modern Monorepo Architecture** designed for horizontal scalability and high availability.

```mermaid
graph TD
    User[Clients (Web/Mobile)] -->|HTTPS/WSS| CDN[Cloudflare CDN]
    CDN -->|Load Balancing| FE[Next.js Frontend Cluster]
    
    subgraph "Application Core"
        FE -->|REST API| API[Express Backend Cluster]
        FE -->|Socket.IO| Socket[Socket.IO Server]
        API -->|Read/Write| DB[(MongoDB Replica Set)]
        Socket -->|Pub/Sub| Redis[Redis Adapter]
        API -->|Inference| AI[AI Model Layer]
    end
    
    subgraph "External Services"
        AI --> OpenAI[OpenAI API]
        API --> GitHub[GitHub API]
    end
```

### 1. Frontend Layer (The Experience)
- **Next.js 16 (App Router)**: Server-side rendering for optimal SEO and initial load performance.
- **React 19**: Utilizing the latest concurrent features and server actions.
- **TailwindCSS + Framer Motion**: fluid, GPU-accelerated animations.

### 2. Backend Layer (The Logic)
- **Node.js + Express**: High-throughput event loop architecture.
- **Socket.IO**: Realtime event-driven communication.
- **JWT Middleware**: Stateless, secure authentication logic.

### 3. Database Layer (The Memory)
- **MongoDB**: Flexible schema design for complex, nested skill graphs.
- **Mongoose**: Strict type modeling and validation.

---

## 4. System Architecture Deep Dive

### 🔄 Data Flow Strategy
We utilize a **unidirectional data flow** with optimistic updates.
1. **Action**: User sends a message.
2. **Optimistic Update**: UI updates instantly via local state.
3. **Socket Emit**: Event `send_message` emitted to server.
4. **Server Validation**: JWT checked, room participation verified.
5. **Persistence**: Message saved to MongoDB `messages` collection.
6. **Broadcast**: Server emits `receive_message` to room members.
7. **Ack/Error**: Client receives confirmation or rollback instruction.

### 🤖 AI Generation Lifecycle
1. **Prompt**: User defines a goal ("Learn Rust Systems Programming").
2. **Contextualization**: Backend appends user's current skill graph context.
3. **Inference**: Prompt sent to LLM with specific JSON schema constraints.
4. **Streaming**: Response streamed to client chunk-by-chunk.
5. **Parsing**: Client parses partial JSON and renders nodes progressively in React Flow.

---

## 5. Project Structure

A clean, standardized structure designed for team scalability.

```
/
├── app/                  # Next.js App Router (Pages & Layouts)
│   ├── dashboard/        # Protected routes
│   └── api/              # Next.js API Routes (Proxy/Edge)
├── components/           # React Components
│   ├── chat/             # Chat-specific UI
│   ├── friends/          # Social graph UI
│   ├── neural-ops/       # Roadmap & Graph interactive elements
│   └── ui/               # Shared design system (shadcn/ui extended)
├── lib/                  # Shared Utilities
│   ├── socket.ts         # Socket.IO client singleton
│   └── api.ts            # Axios instance with interceptors
├── server/               # Express Backend
│   ├── controllers/      # Request logic
│   ├── models/           # Mongoose schemas
│   ├── routes/           # REST endpoints
│   ├── socket.js         # Socket.IO event handlers
│   └── index.js          # Server entry point
└── public/               # Static assets
```

---

## 6. Installation Guide

**Prerequisites**: Node.js v20+, MongoDB, Git.

1. **Clone the Repository**
   ```bash
   git clone https://github.com/organization/velion-ai.git
   cd velion-ai
   ```

2. **Install Dependencies**
   ```bash
   # Install root/frontend deps
   npm install
   
   # Install server deps
   cd server && npm install
   cd ..
   ```

3. **Configure Environment**
   Create `.env.local` (root) and `.env` (server/). See section below.

4. **Start Backend Server**
   ```bash
   cd server
   npm run dev
   # Runs on localhost:8000
   ```

5. **Start Frontend Client**
   ```bash
   # In root terminal
   npm run dev
   # Runs on localhost:3000
   ```

---

## 7. Environment Variables

**Frontend (`.env.local`)**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

**Backend (`server/.env`)**
```env
PORT=8000
MONGODB_URI=mongodb+srv://...  # Production MongoDB Connection String
ACCESS_TOKEN_SECRET=...        # 64-byte random hex string
REFRESH_TOKEN_SECRET=...       # 64-byte random hex string
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
OPENAI_API_KEY=sk-...          # For Neural Ops
GITHUB_CLIENT_ID=...           # For OAuth
GITHUB_CLIENT_SECRET=...
```

---

## 8. Neural Ops System Deep Dive

The **Neural Ops Roadmap Generator** is a feat of engineering. We moved beyond simple lists to **Directed Acyclic Graphs (DAGs)**.

- **Storage**: Roadmaps are stored as `Roadmap` documents containing `nodes` and `edges` arrays, compliant with React Flow's data structure.
- **Rendering**: We use `reactflow` for the canvas and `dagre` for automatic layout calculation, ensuring that AI-generated nodes don't overlap and flow logically from top to bottom.
- **Streaming**: The roadmap is generated via a `ReadableStream` from the server, allowing the user to see the roadmap "growing" in real-time as the AI writes code.

---

## 9. Realtime Chat System Deep Dive

Our chat architecture is designed for **high concurrency**.

- **Connection**: Established via `socket.io-client`. Handshakes are authenticated via HTTP cookies containing the JWT.
- **Rooms**:
  - `user:{userId}`: Personal channel for notifications (friend requests, system alerts).
  - `chat:{chatId}`: Collaborative channel for realtime messaging.
- **Delivery Guarantee**: Messages are ACK'd by the server. If a socket disconnects, the client queues messages and retries upon reconnection.

---

## 10. Database Schema Overview

We use a normalized relational pattern implemented in MongoDB throughout references (ObjectIds).

- **User**: The central identity. Stores profile, auth tokens, and specific skill graph metadata.
- **FriendRequest**: Tracks social connections. `status: 'pending' | 'accepted' | 'rejected'`. Compound index on `[sender, receiver]` ensures uniqueness.
- **Chat**: Represents a conversation. `participants: [User]`, `lastMessage` (for efficient list rendering without joining).
- **Message**: Individual chat units. `chatId` index for fast pagination.
- **Roadmap**: AI-generated graphs. Contains broad `prompt` context and granular `graph` data.

---

## 11. Security Architecture

Security is not an afterthought; it is foundational.

1. **JWT Strategy**: Dual-token architecture (Access + Refresh). Access tokens are short-lived (15m). Refresh tokens are secure, HTTP-only cookies.
2. **Socket Auth**: Middleware enables strict handshake verification. No socket connection is allowed without a valid token.
3. **CORS Policy**: Strict allowlist for trusted domains only.
4. **Data Isolation**: All API endpoints enforce `req.user._id` checks. Users can NEVER access data they do not own or participate in.

---

## 12. Scalability Strategy

VelionAI is designed to scale to millions of users.

- **Horizontal Scaling**: The Express backend is stateless (except for sockets). It can be scaled behind a Load Balancer (NGINX/AWS ALB).
- **Socket Scaling**: For multiple server instances, we use the **Redis Adapter** for Socket.IO, allowing events to propagate across the cluster.
- **Database Sharding**: MongoDB is ready for sharding based on `userId` keys for massive data distribution.

---

## 13. Performance Strategy

- **Code Splitting**: Next.js automatically splits code by route.
- **Image Optimization**: Using `next/image` for WebP conversion and lazy loading.
- **Debounced Search**: Friend discovery uses efficient debouncing to minimize database load.
- **Index Optimization**: All MongoDB queries utilize compound indexes (e.g., `{ participants: 1, updatedAt: -1 }` for chat lists).

---

## 14. Future Roadmap

- **Mobile App**: Native React Native application reusing the logic/hooks layer.
- **Voice Mode**: Realtime voice collaboration in Neural Ops rooms.
- **Enterprise SSO**: SAML/OIDC integration for corporate clients.
- **Graph Federation**: Allow users to "fork" and merge skill graphs.

---

## 15. Contribution Guide

We demand excellence.

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/neural-engine-v2`).
3. Commit your changes with conventional commits (`feat: add advanced neural pruning`).
4. Push to the branch.
5. Open a Pull Request.

**Note**: All PRs must pass the CI/CD pipeline (Lint, Typecheck, Unit Tests) and maintain 100% test coverage for core utilities.

---

## 16. License

VelionAI is open-source software licensed under the [MIT license](LICENSE).

---

### VelionAI — Architecting the Future of Human Intelligence.

*Designed and Engineered by the VelionAI Team.*
