import styled from "styled-components";

export const VideoContainer = styled.div<{ talking: boolean }>`
    width: ${props => props.talking ? "500px" : "150px"};
    height: ${props => props.talking ? "375px" : "113px"};
    border: ${props => props.talking ? "3px solid rgb(59,209,19)" : "3px solid rgb(33,33,33)"};
    overflow: hidden;
    position: relative;
`

export const Name = styled.span<{ talking: boolean }>`
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: ${props => props.talking ? "15px" : "10px"};
    color: rgb(244,244,244);
    z-index: 5;
`

export const Video = styled.video`
    height: 100%;
    z-index: -1;
`