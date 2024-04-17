import Tab from "react-bootstrap/Tab";
import Spinner from 'react-bootstrap/Spinner';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import styled from "styled-components";

const FacebookSubTab = ({
  handleSelectChange,
  facebookDataList,
  isUserFacebookDataLoad,
  setActiveTab,
  selectedDropdownValue,
}) => {
  return (
    <Tab.Pane eventKey="second">
      <OuterDiv>
        <div className="add_account_outer">
          <h5>Authorized with {facebookDataList[0]?.account_id}</h5>
          <div className="d-flex align-items-center gap-2">
            <Form.Select
              onChange={(e) => handleSelectChange(e)}
              aria-label="Default select example"
            >
              <option>Open this select menu</option>
              {facebookDataList.map((item, index) => {
                return (
                  <>
                    <option
                      data-mid={item.m_id}
                      key={index}
                      value={item.id}
                    >
                    {item.business_name ? item.business_name : "user"} -  ({item.account_id})
                    </option>
                  </>
                );
              })}
            </Form.Select>
            {isUserFacebookDataLoad && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </div>
          <div className="d-flex justify-content-end mt-3">
            <Button
              disabled={selectedDropdownValue == ""}
              onClick={() => setActiveTab("third")}
              variant="primary"
            >
              Continue
            </Button>{" "}
          </div>
        </div>
      </OuterDiv>
    </Tab.Pane>
  );
};


export default FacebookSubTab;


const OuterDiv = styled.div`
  background-color: #fff;
  padding: 20px 20px;
  margin: 20px 0px 0px;
  border-radius: 5px;
  
  button {
    padding: 10px 30px;
  }

  h5 {
    color: #4c4949;
    font-size: 16px;
    font-weight: 400;
    padding-bottom: 10px;
  }
 
`;