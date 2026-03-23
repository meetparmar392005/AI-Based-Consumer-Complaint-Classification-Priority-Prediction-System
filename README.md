# AI-Based Consumer Complaint Classification & Priority Prediction

A full stack web app that uses ML models to classify consumer complaints 
and predict their priority level.

## Tech Stack
- **Frontend:** React + Vite
- **Backend:** FastAPI
- **Database:** MongoDB
- **ML Models:** Scikit-learn Pipelines (TF-IDF + Classifier)

## Setup Instructions

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables
Create `.env.local` inside `frontend/`:
```
VITE_API_URL=http://localhost:8000
```