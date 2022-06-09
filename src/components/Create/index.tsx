import React, { Fragment, useState, useEffect } from "react";
import { Modal, MButton } from "../Modal";
import { user } from "../../Interface/user";
import { Toast } from "../Layout";
import Api from "../../API";
import { Link } from "react-router-dom";

interface createProps {
  info: user
}
interface Irooms {
  members: string[];
  roomOwner: string
  _id: string
}
export const Create = (props: createProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [rooms, setRooms] = useState<Irooms[]>([])
  const [toast, showToast] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")

  useEffect(() => {
    setTimeout(() => {
      console.log("toasting ;)")
      showToast(false)
    }, 2000)
  }, [toast])

  useEffect(() => {
    getRooms()
  }, [])

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const getRooms = async () => {
    let list: Irooms[] = []
    try {
      list = await Api.viewRooms().then(res => res.json())

    } catch (error) {
      console.error(error)
    } finally {
      setRooms(prev => [...prev, ...list])
    }
  }

  const openRoom = async (name: string) => {
    try {
      const room = await Api.createRoom(name).then(async (res: Response) => {
        return await res.json()
      })
      if (room) {
        setRooms(prevState => [...prevState, room])
      }
    } catch (err) {
      setShowModal(false)
      setMessage("Failed to Create Room")
      showToast(true)
    }
  }

  return (
    <Fragment>
      <Toast dis={toast}>{message}</Toast>
      <Modal show={showModal} handleClose={closeModal}>
        <div>
          <MButton onClick={() => openRoom(props.info.username)}>Create a new Room</MButton>
        </div>
        <div>
          <p>Did you mean to join a room?</p>
          <ul>
            {rooms.length > 0 ? (rooms.map((room: Irooms) => (
              <li key={room._id}><Link to={`/room/${room._id}`}>{room.roomOwner}</Link></li>
            ))) : (<li>no rooms</li>)}
          </ul>
        </div>
      </Modal>
      <div>
        <button onClick={openModal}>View/Create Room</button>
      </div>
    </Fragment>
  );
};
