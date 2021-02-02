import { View } from 'react-native';
import styled from 'styled-components/native';

const Header = styled.View`
    position: absolute;
    zIndex: 1;
    justifyContent: center;
    alignItems: center;
    top: 0;
    left: 0;
    backgroundColor: black;
    width: 100%;
    height: 10%;
    display: flex;
`;

export default Header;