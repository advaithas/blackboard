import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "peerjs";

const CreateRoomForm = ({ uuid, socket, setUser, setMyPeer }) => {
  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleCreateRoom = (e) => {
    e.preventDefault();

    // {name,roomId, userId, host, presenter}

    const myPeer = new Peer(undefined, {
      host: "localhost",
      port: 5001,
      path: "/",
      secure: false,
    });

    setMyPeer(myPeer);

    myPeer.on("open", (id) => {
      const roomData = {
        name,
        roomId,
        userId: id,
        host: true,
        presenter: true,
      };
      setUser(roomData);
      navigate(`/${roomId}`);
      console.log(roomData);
      socket.emit("userJoined", roomData);
    });
    // myPeer.on("error", (err) => {
    //   console.log("peer connection error", err);
    //   this.myPeer.reconnect();
    // });
  };

  return (
    <form className="form col-md-12 mt-5">
      <div className="form-group">
        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group border">
        <div className="input-group d-flex align-items-center jusitfy-content-center ms-1">
          <input
            type="text"
            value={roomId}
            className="form-control my-2 border-0"
            disabled
            placeholder="Generate room code"
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-light btn-sm me-1 ms-2"
              onClick={() => setRoomId(uuid())}
              type="button"
            >
              Generate
            </button>
            <CopyToClipboard
              text={roomId}
            >
                  <button
                    className="btn btn-outline-light btn-sm me-2"
              	    type="button">
                    Copy
                  </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
      <button
        type="submit"
        onClick={handleCreateRoom}
        className="mt-4 btn-outline-dark form-control bold"
      >
        Generate Room
      </button>
    </form>
  );
};

export default CreateRoomForm;
