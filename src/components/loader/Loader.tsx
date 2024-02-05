import React from 'react';
import styled from 'styled-components';

// Define the styles for the loader and blurred background
const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(173, 173, 173, 0.759); /* Semi-transparent white background */
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(6px); /* Apply a blur effect to the background */
  z-index: 9999; /* Ensure the loader is on top of other elements */
`;

const Loader = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

interface Props {
  visible: boolean;
}

const BeautifulLoader: React.FC<Props> = ({ visible }) => {
  return visible ? (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  ) : null;
};

export default BeautifulLoader;
