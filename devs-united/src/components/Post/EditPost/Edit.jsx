import { FaSdCard, FaBackward } from "react-icons/fa";
import "./Edit.css";

export const Edit = ({
  id,
  editPost,
  handleMessage,
  edittedMessage,
  setEdit,
  edit,
}) => {
  return (
    <div className="edit-box">
      <div>
        <input
          type="text"
          className="edit-input"
          value={edittedMessage}
          onChange={handleMessage}
          placeholder="Edit a post here..."
        />
      </div>
      <div className="edit-footer">
        <div className="icon" onClick={() => setEdit(!edit)}>
          <FaBackward />
        </div>
        <div className="icon" onClick={() => editPost(id)}>
          <FaSdCard />
        </div>
      </div>
    </div>
  );
};
