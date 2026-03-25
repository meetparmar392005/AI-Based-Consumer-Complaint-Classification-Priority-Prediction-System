const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function submitComplaint(form) {
  const response = await fetch(`${BASE_URL}/api/complaints`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: form.complaint,     
      submitted_by: form.name,  
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.detail || `Server error: ${response.status}`);
  }

  return response.json();
}

export async function fetchComplaints() {
  const response = await fetch(`${BASE_URL}/api/complaints`);

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  return response.json();
}