import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";

const CardContainer = styled.div`
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 0 auto;
  // max-width: 50%;
  padding: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const StyledTh = styled.th`
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  padding: 8px;
`;

const StyledTr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const StyledTd = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

function Table({ setStartDate, setEndDate, startDate, endDate, selectedDropdownValue, selectedManagerId, tableData, columns, handleSubmit }) {

    const handleStartDateChange = (date) => {
      const formattedDate = date
        .toLocaleDateString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .split("/")
        .reverse()
        .join("-");
      setStartDate(formattedDate);
    };

    const handleEndDateChange = (date) => {
      const formattedDate = date
        .toLocaleDateString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .split("/")
        .reverse()
        .join("-");
      setEndDate(formattedDate);
    };


  return (
    <CardContainer>
      <label>
        User ID:
        <input type="text" readOnly value={selectedDropdownValue} />
      </label>
      <DateContainer>
        <label>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          dateFormat="MM/dd/yyyy"
          placeholderText="Start Date"
        />
        <label>End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          dateFormat="MM/dd/yyyy"
          placeholderText="End Date"
        />
      </DateContainer>
      <Button onClick={() => handleSubmit(selectedDropdownValue, selectedManagerId)}  variant="primary">Submit</Button>{" "}
      <StyledTable>
        <thead>
          <StyledTr>
            {columns?.map((column, columnIndex) => (
              <StyledTh key={columnIndex}>{column.header}</StyledTh>
            ))}
          </StyledTr>
        </thead>
        <tbody>
          {tableData?.map((row, rowIndex) => (
            <StyledTr key={rowIndex}>
              {columns?.map((column, columnIndex) => (
                <StyledTd key={columnIndex}>{typeof column.accessor === 'function' ? column.accessor(row) : row[column.accessor]}</StyledTd>
              ))}
            </StyledTr>
          ))}
        </tbody>
      </StyledTable>
    </CardContainer>
  );
}

export default Table;
