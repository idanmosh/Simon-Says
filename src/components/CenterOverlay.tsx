import styled from 'styled-components/native';

const CenterOverlay = styled.View`
    position: absolute;
    margin: auto;
    top: 15%;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 6;
    height: 70%;
    width: 100%;
    textAlign: center;
    justifyContent: center;
    alignItems: center;
    backgroundColor: rgba(0, 0, 0, 0.9);
    opacity: 0.8;
`;

export default CenterOverlay;