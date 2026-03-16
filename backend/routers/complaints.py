from fastapi import APIRouter, HTTPException
from models import ComplaintInput, ComplaintOutput
from database import complaints_collection
from services.ml_service import classify_complaint, predict_priority
from datetime import datetime
from bson import ObjectId

router = APIRouter()

@router.post("/complaints", response_model=ComplaintOutput)
async def submit_complaint(complaint: ComplaintInput):
    # Run ML models
    category = classify_complaint(complaint.text)
    priority = predict_priority(complaint.text)

    # Build document to save in MongoDB
    doc = {
        "text": complaint.text,
        "submitted_by": complaint.submitted_by,
        "category": category,
        "priority": priority,
        "status": "Open",
        "created_at": datetime.utcnow()
    }

    # Save to MongoDB
    result = await complaints_collection.insert_one(doc)

    return ComplaintOutput(
        id=str(result.inserted_id),
        text=complaint.text,
        category=category,
        priority=priority,
        submitted_by=complaint.submitted_by,
        status="Open",
        created_at=doc["created_at"]
    )

@router.get("/complaints")
async def get_all_complaints():
    complaints = []
    async for doc in complaints_collection.find():
        doc["id"] = str(doc["_id"])
        del doc["_id"]
        complaints.append(doc)
    return complaints