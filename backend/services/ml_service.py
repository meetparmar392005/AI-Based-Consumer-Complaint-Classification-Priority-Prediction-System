import joblib
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Points to backend/models/
category_model = joblib.load(os.path.join(BASE_DIR, "models", "model1.pkl"))
priority_model = joblib.load(os.path.join(BASE_DIR, "models", "model2.pkl"))


def classify_complaint(text: str) -> str:
    result = category_model.predict([text])
    return str(result[0])


def predict_priority(text: str) -> str:
    result = priority_model.predict([text])
    return str(result[0])
