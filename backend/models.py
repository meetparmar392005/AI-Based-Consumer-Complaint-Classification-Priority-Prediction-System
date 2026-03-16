from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ComplaintInput(BaseModel):
    text: str
    submitted_by: Optional[str] = "anonymous"

class ComplaintOutput(BaseModel):
    id: Optional[str] = None
    text: str
    category: Optional[str] = None
    priority: Optional[str] = None
    submitted_by: Optional[str] = "anonymous"
    status: str = "Open"
    created_at: Optional[datetime] = None

#     What this does:

# ComplaintInput — defines what data the user sends (just the complaint text)
# ComplaintOutput — defines what we send back (text + category + priority from your ML models)