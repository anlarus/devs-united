import { ReactComponent as BigLogo } from "../assets/images/bigLogo.svg";
import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";

const DevsBigLogo = () => {
  const BigLogoWrapper = styled.div`
    svg {
      width: 200px;
    }
  `;

  return (
    <BigLogoWrapper>
      <Link to="/">
        <BigLogo />
      </Link>
    </BigLogoWrapper>
  );
};

export default DevsBigLogo;
