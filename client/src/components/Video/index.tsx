import styled from "styled-components";

export const VideoContainer = styled.div<{ talking: boolean }>`
    width: ${props => props.talking ? "500px" : "150px"};
    height: ${props => props.talking ? "375px" : "113px"};
    border: ${props => props.talking ? "3px solid rgb(59,209,19)" : "3px solid rgb(33,33,33)"};
    overflow: hidden;
`

export const Video = styled.video`
    height: 100%;
`