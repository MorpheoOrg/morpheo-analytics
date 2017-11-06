import {onlyUpdateForKeys} from 'recompose';
import styled from 'react-emotion';


const Dragger = styled.div`
position: absolute;
z-index: 1;
opacity: 100;
height: 100%;
width: 10px;
right: -5px;
top: 0px;
cursor: col-resize;
`;

export default onlyUpdateForKeys([])(Dragger);
