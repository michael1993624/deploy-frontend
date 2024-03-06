import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthTabs from "./AuthTab";
import FacebookTab from "./FacebookTab";
import GoogleTab from "./GoogleTab";


function App() {

  const currentDate = new Date();
  let tomorrowDate = new Date(currentDate);
  tomorrowDate.setDate(currentDate.getDate() + 1);

  const [startDate, setStartDate] = useState(currentDate.toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(tomorrowDate.toISOString().slice(0, 10));

  const [token, setToken] = useState('');


  function extractCodeFromUrl(urlString) {
    let url = new URL(urlString);
    let service_type = url.searchParams.get("service_type");
    let token = url.searchParams.get("access_token");
    
    if (service_type === "google") {
        return { service_type, access_token: token };
    } else {
        return { service_type, access_token: token };
    }
}
  const currentUrl = window.location.href;

  useEffect(() => {
    const {access_token, service_type} = extractCodeFromUrl(currentUrl);
    if (service_type !== null && service_type == "google") {
        setToken(access_token);
        localStorage.setItem('urlToken', access_token);
        window.location.href = "/google"
    } else {
      if (service_type !== null) {
        localStorage.setItem('facebook_access_token', access_token);
        window.location.href = "/facebook"
      }
    }
  }, [currentUrl]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AuthTabs />} />
          <Route path="/google" element={<GoogleTab
              setStartDate={setStartDate} 
              setEndDate={setEndDate} 
              startDate={startDate}  
              endDate={endDate}
            />} />
            <Route path="/facebook" element={<FacebookTab 
              setStartDate={setStartDate} 
              setEndDate={setEndDate} 
              startDate={startDate}  
              endDate={endDate}
            />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
