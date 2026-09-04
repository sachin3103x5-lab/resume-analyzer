# NLP-Based ATS Resume Analyzer & Career Recommendation Framework

> **Framework**: *An NLP-Based Framework for Applicant Tracking System Compatible Resume Analysis and Career Recommendation*  
> **Technology Stack**: **MERN** (MongoDB, Express.js, React.js, Node.js) with Natural Language Processing & Vector Space Embeddings.  
> **Deployment Ready**: **Netlify** (Client Frontend) & **Render** (Server Backend API).

---

## 🚀 Key Framework Modules & Architecture

1. **Module 1: Resume Acquisition & Preprocessing ($T = P(R)$, $T_c = \{w_1, ..., w_n\}$)**
   - PDF & text parsing with structural preservation.
   - Text cleaning, tokenization, stop-word elimination, and lemmatization.
   - Rule-based section detection (Skills, Experience, Education, Projects, Certifications).

2. **Module 2: NLP Semantic Feature Extraction ($E = \{e_1, ..., e_m\}$, $V_r = f(T_c)$, $V_j = f(J)$)**
   - Named Entity Recognition (NER) mapped against 500+ standardized skill ontologies.
   - Contextual vector space representation and cosine similarity:
     $$\text{Sim}(V_r, V_j) = \frac{V_r \cdot V_j}{\|V_r\| \|V_j\|}$$

3. **Module 3: ATS Compatibility Scoring Engine (Table II & Section IV-D)**
   $$\text{ATS}_{\text{score}} = \alpha S_k + \beta S_s + \gamma S_c + \delta S_f$$
   - $\alpha = 0.30$: Keyword Matching Score $S_k = \frac{|E \cap K_j|}{|K_j|}$
   - $\beta = 0.35$: Semantic Similarity Score $S_s = \text{Sim}(V_r, V_j)$
   - $\gamma = 0.20$: Section Completeness Score $S_c = \frac{N_p}{N_t}$
   - $\delta = 0.15$: Formatting & Readability Score $S_f$

4. **Module 4: Personalized Feedback Generation Algorithm (Section IV-E)**
   - Skill Gap Analysis: $G = K_j - E$
   - Priority-ranked actionable feedback based on estimated ATS score boost.
   - Real-time XYZ impact bullet writing suggestions.

5. **Module 5: Career Trajectory & Role Recommendations (Section IV-F & Table III)**
   - Role matching: $\text{Match}_i = \text{Sim}(V_r, V_i)$, $R_{\text{rec}} = \text{TopK}(\text{Match}_i)$
   - Accuracy benchmarks: Top-1 (72%), Top-3 (86%), Top-5 (93%).
   - Preference filters for target locations and salary requirements.

---

## 🛠️ Project Structure

```
ai-resume-analysier/
├── client/                     # React + Vite Frontend (Netlify Ready)
│   ├── src/
│   │   ├── components/         # Dashboard, Scorecard, Skill Matrix, Feedback, Modals
│   │   ├── services/           # API Client & In-Browser NLP Fallback Engine
│   │   ├── App.jsx
│   │   ├── index.css           # Glassmorphic Tailwind Design System
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── server/                     # Node.js + Express API Backend (Render Ready)
│   ├── src/
│   │   ├── nlp/                # Preprocessor, Skill Ontology, Semantic Matcher, ATS Scorer
│   │   ├── models/             # Mongoose Models (AnalysisResult, JobRole)
│   │   ├── routes/             # Express API Endpoints (/api/resume/*)
│   │   └── server.js           # Server entry point & health check
│   ├── package.json
│   └── .env.example
├── netlify.toml                # Netlify Zero-Config Deployment Blueprint
├── render.yaml                 # Render Zero-Config Infrastructure Blueprint
├── Procfile                    # Render / PaaS Process file
├── package.json                # Root monorepo orchestration
└── README.md                   # Complete Documentation
```

---

## 🌐 Deployment Instructions

### 1. Deploy Frontend to Netlify

1. Push this repository to GitHub / GitLab / Bitbucket.
2. Log in to [Netlify](https://app.netlify.com/) and click **"Add new site"** > **"Import an existing project"**.
3. Select your repository.
4. Netlify will automatically detect the settings from `netlify.toml`:
   - **Base directory**: `client`
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `dist`
5. (Optional) Set the environment variable in Netlify Site Settings > Environment Variables:
   - `VITE_API_URL`: `https://your-render-backend.onrender.com`
6. Click **Deploy Site**!

---

### 2. Deploy Backend API to Render

1. Log in to [Render Dashboard](https://dashboard.render.com/).
2. Click **"New"** > **"Web Service"** (or use **"Blueprint"** with `render.yaml`).
3. Connect your repository and configure:
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Health Check Path**: `/api/health`
4. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `CLIENT_URL`: `https://your-netlify-app.netlify.app`
   - `MONGODB_URI`: (Optional) Your MongoDB Atlas connection string e.g. `mongodb+srv://<user>:<password>@cluster0.mongodb.net/resume_analyzer?retryWrites=true&w=majority`
5. Click **Create Web Service**!

---

## 💻 Local Development Setup

### Prerequisites
- Node.js `v18+` or `v20+` or `v24+`
- (Optional) MongoDB Atlas account or local MongoDB instance

### Step 1: Install Dependencies
```bash
# In the root directory:
npm run install:all
```

### Step 2: Configure Environment Variables
```bash
# In server/ directory:
cp .env.example .env
```

### Step 3: Run Full-Stack Simultaneously
```bash
# From root directory:
npm run dev
```
- Frontend will be live at: `http://localhost:5173`
- Backend API will be live at: `http://localhost:5000`
- API Health check: `http://localhost:5000/api/health`

---

## 📊 Evaluation & Benchmarks (from Research Paper)

| Scoring Component | Weight | Baseline ATS | Proposed NLP Framework | Improvement |
|---|---|---|---|---|
| Keyword Matching ($S_k$) | 0.30 | 0.70 | **0.88** | +25.7% |
| Semantic Similarity ($S_s$) | 0.35 | 0.55 | **0.90** | +63.6% |
| Section Completeness ($S_c$) | 0.20 | 0.76 | **0.85** | +11.8% |
| Formatting & Readability ($S_f$) | 0.15 | 0.72 | **0.82** | +13.9% |
| **Overall ATS Score** | **1.00** | **0.66** | **0.87** | **+31.8%** |

### Top-K Career Recommendation Accuracy
- **Top-1 Role Accuracy**: 72% (Avg. Similarity: 0.81)
- **Top-3 Roles Accuracy**: 86% (Avg. Similarity: 0.85)
- **Top-5 Roles Accuracy**: 93% (Avg. Similarity: 0.89)

---

## 📜 Architecture & Citation
```bibtex
@article{atsnlp2026,
  title={An NLP-Based Framework for Applicant Tracking System Compatible Resume Analysis and Career Recommendation},
  year={2026}
}
```
