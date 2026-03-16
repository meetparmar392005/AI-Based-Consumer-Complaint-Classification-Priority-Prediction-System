from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = "mongodb://localhost:27017"
DB_NAME = "complaint_db"

client = AsyncIOMotorClient(MONGO_URL)
database = client[DB_NAME]

complaints_collection = database["complaints"]
users_collection = database["users"]

# What this does:

# Connects to MongoDB running on your computer
# Creates a database called complaint_db
# Sets up two collections — complaints and users (like tables in SQL)