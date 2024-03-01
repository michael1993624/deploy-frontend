import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const CardContainer = styled.div`
  display: flex;
`;

const Card = styled.div`
  width: 200px;
  height: 100px;
  margin: 10px;
  padding: 20px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const FacebookCard = ({ onClick }) => (
    <Card onClick={onClick}>
      Facebook Authentication
    </Card>
  );
  
  const GoogleCard = ({ onClick }) => (
    <Card onClick={onClick}>
      Google Authentication
    </Card>
  );

const AuthTabs = () => {

    const navigate = useNavigate();


    const handleFacebookClick = () => {
        navigate("/facebook")
    };
    
      const handleGoogleClick = () => {
        navigate("/google")
      };
    
      return (
        <CardContainer>
          <FacebookCard onClick={handleFacebookClick} />
          <GoogleCard onClick={handleGoogleClick} />
        </CardContainer>
      );
};

export default AuthTabs;
