# We will load your real ML models here later
# For now this returns dummy predictions so we can test the API

def classify_complaint(text: str) -> str:
    """Returns the category of the complaint"""
    # Replace this with: model.predict([text])[0]
    return "General"

def predict_priority(text: str) -> str:
    """Returns the priority level of the complaint"""
    # Replace this with: priority_model.predict([text])[0]
    return "Medium"