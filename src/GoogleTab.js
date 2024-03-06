import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import CommonTab from "./CommonTab";

const GoogleTab = ({setStartDate, setEndDate, startDate, endDate}) => {

    const [userData, setUserData] = useState([]);

    const [activeTab, setActiveTab] = useState('first');
    const [isUserGoogleDataLoad, setIsUserGoogleDataLoad] =  useState(false);
    const [isGoogleTableDataLoad, setIsGoogleTableDataLoad] = useState(false);

    const fetchUserData = async (token) => {
        const url = process.env.REACT_APP_SERVER + ""
        try {
          setIsUserGoogleDataLoad(true);
          const response = await fetch(`${url}/get_customer`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": token
            },
          });
          setIsUserGoogleDataLoad(false);
          const data = await response.json();
          setUserData(data)
        } catch (error) {
          setIsUserGoogleDataLoad(false);
          console.error('Error fetching data:', error);
        }
    };

    const authToken = localStorage.getItem("urlToken");

    useEffect(() => {
        if (authToken !== null) {
            setActiveTab('second')
        }
    },[authToken])

    useEffect(() => {
        if (authToken )
        if (activeTab == "second") {
            fetchUserData(authToken)
        }
    },[activeTab, authToken])

    const handleSelect = (key) => {
        setActiveTab(key)
        if (key == "second") {
            if (authToken !== "null") {
                fetchUserData(authToken)
            }
        }
    }

    const [tableData, setTableData] = useState([]);
    const [columns, setColumns] = useState([]);

    const fetchGoogleData = async (inputData, authToken) => {  
        const url = process.env.REACT_APP_SERVER + ""
        try {
          setIsGoogleTableDataLoad(true)
          const response = await fetch(`${url}/google_ads_by_id`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": authToken,
            },
            body: JSON.stringify(inputData)
          });
          setIsGoogleTableDataLoad(false)
          const data = await response.json();
          if (data && Array.isArray(data) && data.length > 0) {
            const columnKeys = Object.keys(data[0]);
            const newColumns = columnKeys.map(key => ({ accessor: key, header: key }));
            setColumns(newColumns);
            setTableData(data);
          }
        } catch (error) {
          setIsGoogleTableDataLoad(false)
          console.error('Error fetching data:', error);
        }
      };


  return (
    <CommonTab 
        setStartDate={setStartDate} 
        setEndDate={setEndDate} 
        startDate={startDate}  
        endDate={endDate}
        userData={userData}
        setActiveTab={setActiveTab} 
        fetchUserData={fetchUserData}
        activeTab={activeTab}
        handleSelect={handleSelect}
        columns={columns}
        tableData={tableData}
        fetchGoogleData={fetchGoogleData}
        googleAuth={authToken}
        isUserGoogleDataLoad={isUserGoogleDataLoad}
        isGoogleTableDataLoad={isGoogleTableDataLoad}
    />
  );
};

export default GoogleTab;
