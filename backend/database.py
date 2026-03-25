import os
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = "complaint_db"

client = AsyncIOMotorClient(MONGO_URL)
database = client[DB_NAME]

complaints_collection = database["complaints"]
users_collection = database["users"]