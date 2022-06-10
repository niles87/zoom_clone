import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer, { SignalData } from "simple-peer";
import { VideoContainer, Video, Name } from "../Video";
import { Container } from "../Layout";
import { useParams } from "react-router-dom";
// import { checkSpeaker } from "../../utils/media";

type peerRef = {
  peerID: string;
  peer: Peer.Instance;
};

type joined = {
  signal: SignalData;
  callerID: string;
};

interface peerProps {
  peer: Peer.Instance;
  peerId: string;
  talking: boolean;
}

const PeerVideo = (props: peerProps): JSX.Element => {
  const ref = useRef<any>();
  useEffect(() => {
    props.peer.on("stream", (stream: MediaStream) => {
      ref.current.srcObject = stream;
    });
    // eslint-disable-next-line
  }, []);

  return (
    <VideoContainer talking={props.talking}>
      <Name talking={props.talking}>{props.peerId}</Name>
      <Video playsInline autoPlay ref={ref} />
    </VideoContainer>
  );
};

export const Room = (props: any): JSX.Element => {
  // eslint-disable-next-line
  const [peers, setPeers] = useState<any[]>([]);
  // eslint-disable-next-line
  const [isTalking, setIsTalking] = useState<boolean>(false);
  const socketRef = useRef<any>();
  const userVideo = useRef<any>();
  const peersRef = useRef<Array<peerRef>>([]);
  const { id: roomID } = useParams();

  useEffect(() => {
    socketRef.current = io(`/`);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("joining room", roomID);
        socketRef.current.on("all users", (users: any) => {
          const peerArr: Peer.Instance[] = [];
          users.forEach((userID: string) => {
            const peer: Peer.Instance = createPeer(
              userID,
              socketRef.current.id,
              stream
            );
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peerArr.push(peer);
          });
          console.log(peersRef);
          setPeers(peerArr);
        });

        socketRef.current.on("user joined", (payload: joined) => {
          const item: peerRef | undefined = peersRef.current.find(
            (p: peerRef) => p.peerID === payload.callerID
          );
          if (!item) {
            const peer: Peer.Instance = addPeer(
              payload.signal,
              payload.callerID,
              stream
            );
            peersRef.current.push({
              peerID: payload.callerID,
              peer,
            });

            setPeers((users) => [...users, peer]);
          }
        });

        socketRef.current.on("receiving signal", (payload: any) => {
          const item: peerRef | undefined = peersRef.current.find(
            (p: peerRef) => p.peerID === payload.id
          );
          if (item) item.peer.signal(payload.signal);
        });

        socketRef.current.on("user disconnect", (id: any) => {
          console.log("peerRef", peersRef.current);
          const peerObj = peersRef.current.find((p) => p.peerID === id);
          if (peerObj) peerObj.peer.destroy();

          const peersArr = peersRef.current.filter((p) => p.peerID !== id);
          peersRef.current = peersArr;
          setPeers(peersArr);
        });
      });
    // eslint-disable-next-line
  }, []);

  const createPeer = (
    userToSignal: string,
    callerID: string,
    stream: MediaStream
  ): Peer.Instance => {
    const peer: Peer.Instance = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal: SignalData) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  };

  const addPeer = (
    incomingSignal: SignalData,
    callerID: string,
    stream: MediaStream
  ): Peer.Instance => {
    const peer: Peer.Instance = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal: SignalData) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  };

  return (
    <Container>
      <div>
        {peersRef.current.map((peer: any) => {
          return (
            <PeerVideo
              peer={peer.peer}
              key={peer.peerId}
              talking={isTalking}
              peerId={peer.peerId}
            />
          );
        })}
      </div>
      <VideoContainer talking={false}>
        <Name talking={false}>{roomID}</Name>
        <Video muted ref={userVideo} autoPlay playsInline></Video>
      </VideoContainer>
    </Container>
  );
};
