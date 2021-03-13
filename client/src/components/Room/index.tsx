import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer, { SignalData } from "simple-peer";
import { VideoContainer, Video } from "../Video";
import { Container } from "../Layout";
import { checkSpeaker } from "../../utils/media";

type peersRef = {
  peerID: string;
  peer: Peer.Instance;
};

type joined = {
  signal: SignalData;
  callerID: string;
};

const PeerVideo = (props: any): JSX.Element => {
  const ref = useRef<any>();
  useEffect(() => {
    props.peer.on("stream", (stream: MediaStream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return (
    <Video playsInline autoPlay ref={ref} />
  )
};

export const Room = (props: any): JSX.Element => {
  // eslint-disable-next-line
  const [peers, setPeers] = useState<any[]>([]);
  const [isTalking, setIsTalking] = useState<boolean>(false)
  const socketRef = useRef<any>();
  const userVideo = useRef<any>();
  const peersRef = useRef<Array<peersRef>>([]);
  const roomID = props.match.params.id;

  useEffect(() => {
    socketRef.current = io.connect("/");
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
          setPeers(peerArr);
        });

        socketRef.current.on("user joined", (payload: joined) => {
          const item: peersRef | undefined = peersRef.current.find(
            (p: peersRef) => p.peerID === payload.callerID
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
          const item: peersRef | undefined = peersRef.current.find(
            (p: peersRef) => p.peerID === payload.id
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
            <VideoContainer talking={false} key={peer.peerId}>
              <PeerVideo peer={peer.peer} />;
            </VideoContainer>
          )
        })}
      </div>
      <VideoContainer talking={false}>
        <Video
          muted
          ref={userVideo}
          autoPlay
          playsInline
        ></Video>
      </VideoContainer>
    </Container>

  );
};