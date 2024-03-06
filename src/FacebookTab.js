import { useEffect, useState } from "react";
import CommonTab from "./CommonTab";

const FacebookTab = ({setStartDate, setEndDate, startDate, endDate}) =>  {

    const [activeTab, setActiveTab] = useState('first');

    const authToken = localStorage.getItem("facebook_access_token");
    const [isFacebookTableDataLoad, setIsFacebookTableDataLoad] = useState(false);

    useEffect(() => {
        if (authToken !== null) {
            setActiveTab('third')
        }
    },[authToken])

    const handleSelect = (key) => {
        setActiveTab(key)
    }


    const [tableData, setTableData] = useState([]);
    const [columns, setColumns] = useState([]);

    const fetchFacebookData = async (inputData, authToken) => {  
        const url = process.env.REACT_APP_SERVER + ""
        try {
          setIsFacebookTableDataLoad(true);
          const response = await fetch(`${url}/get-fb-campaign-ids`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": authToken,
            },
            body: JSON.stringify(inputData)
          });
          setIsFacebookTableDataLoad(false);
          const data = await response.json();
          if (data && Array.isArray(data) && data.length > 0) {
            const columnKeys = Object.keys(data[0]);
            const newColumns = columnKeys.map(key => ({ accessor: key, header: key }));
            setColumns(newColumns);
            setTableData(data);
          }
        } catch (error) {
          setIsFacebookTableDataLoad(false);
          console.error('Error fetching data:', error);
        }
    };
    
    // const handleSubmit = () => {
    //   const userData = {
    //     "start_date": startDate,
    //     "end_date": endDate
    //   }
    //   if (authToken !== "null") {
    //       fetchData(userData, authToken);
    //   }
    // };

  return (
    <CommonTab 
        setStartDate={setStartDate} 
        setEndDate={setEndDate} 
        startDate={startDate}  
        endDate={endDate}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        handleSelect={handleSelect}
        columns={columns}
        tableData={tableData}
        facebookAuth={authToken}
        fetchFacebookData={fetchFacebookData}
        isGoogleTableDataLoad={isFacebookTableDataLoad}
    />
  );
};

export default FacebookTab;