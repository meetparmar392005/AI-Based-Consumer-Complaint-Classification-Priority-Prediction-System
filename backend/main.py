from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import complaints

app = FastAPI(title="Complaint Management System")

# Allow React frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(complaints.router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Complaint Management API is running!"}