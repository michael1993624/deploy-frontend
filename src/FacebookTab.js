import { useEffect, useState } from "react";
import CommonTab from "./CommonTab";

const FacebookTab = ({setStartDate, setEndDate, startDate, endDate}) =>  {
    const [userData, setUserData] = useState([]);

    const [activeTab, setActiveTab] = useState('first');

    const fetchUserData = async (token) => {
        const url = process.env.REACT_APP_SERVER + ""
        try {
          const response = await fetch(`${url}/facebook_callback`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": token
            },
          });
          const data = await response.json();
          setUserData(data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    const authToken = localStorage.getItem("facebook_access_token");

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
                console.log({authToken})
                fetchUserData(authToken)
            }
        }
    }


    const [tableData, setTableData] = useState([]);
    const [columns, setColumns] = useState([]);

    const fetchData = async (inputData, authToken) => {  
        const url = process.env.REACT_APP_SERVER + ""
        try {
          const response = await fetch(`${url}/get-fb-campaign-ids`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": authToken,
            },
            body: JSON.stringify(inputData)
          });
          const data = await response.json();
          if (data && Array.isArray(data) && data.length > 0) {
            const columnKeys = Object.keys(data[0]);
            const newColumns = columnKeys.map(key => ({ accessor: key, header: key }));
            setColumns(newColumns);
            setTableData(data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      const handleSubmit = (userId, selectedManagerId) => {
        const userData = {
          "customer_id": userId,
          "start_date": startDate,
          "end_date": endDate,
          "manager_id": selectedManagerId
        }
        if (authToken !== "null") {
            fetchData(userData, authToken);
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
        handleSubmit={handleSubmit}
    />
  );
};

export default FacebookTab;