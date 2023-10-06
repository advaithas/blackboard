import CreateRoomForm from "./CreateRoomForm";
import JoinRoomForm from "./JoinRoomForm";

import "./index.css";

const Forms = ({ uuid, socket, setUser, setMyPeer }) => {
  return (
    <div className="row h-100 pt-5">
      <div className="col-md-4 mt-5 form-box p-5 border rounded-2 mx-auto d-flex flex-column align-items-center createbox">
        <h1 className="fw-bold create">Create Room</h1>
        <CreateRoomForm
          uuid={uuid}
          setMyPeer={setMyPeer}
          socket={socket}
          setUser={setUser}
        />
      </div>
      <div className="col-md-4 mt-5 form-box p-5 border rounded-2 mx-auto d-flex flex-column align-items-center joinbox">
        <h1 className="fw-bold join">Join Room</h1>
        <JoinRoomForm
          uuid={uuid}
          setMyPeer={setMyPeer}
          socket={socket}
          setUser={setUser}
        />
      </div>
    </div>
  );
};

export default Forms;
