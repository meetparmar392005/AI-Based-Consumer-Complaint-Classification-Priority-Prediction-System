import { useState } from "react";
import LandingPage from "./pages/landingpage";
import ComplaintForm from "./pages/complaintform";
import ResultPage from "./pages/ResultPage";
import HistoryPage from "./pages/HistoryPage"; 

// console.log(import.meta.env.VITE_API_URL);

export default function App() {
  const [page, setPage] = useState("landing"); // 3 states: landing | form | result
  const [result, setResult] = useState(null);  // stores AI response from backend

  return (
    <div>
      {page === "landing" && (
        <LandingPage 
        onStart={() => setPage("form")}
        onHistory={() => setPage("history")}  />
      )}

      {page === "form" && (
        <ComplaintForm
          onResult={(data) => {
            setResult(data);       // save backend response
            setPage("result");     // go to result page
          }}
          onBack={() => setPage("landing")}
        />
      )}

      {page === "result" && (
        <ResultPage
          result={result}
          onNew={() => { setResult(null); setPage("form"); }}
          onHome={() => { setResult(null); setPage("landing"); }}
        />
      )}
       {page === "history" && (
        <HistoryPage onHome={() => setPage("landing")} /> // ← ADD
      )}
    </div>
  );
}