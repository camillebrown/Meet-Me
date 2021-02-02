import { useHistory } from "react-router-dom";
import { updateComment, deleteComment } from "../../services/event.service"

const Comment = ({ name, content, comment, eventId }) => {

  let history = useHistory();

  const deleteCommentsList = () => {
    deleteComment(name, content, comment._id)
    history.push(`/event/comments/${eventId}`)
    window.location.reload()
  }
  const handleContentChange = (event) => {
    content = event.target.value
  }

  const handleUpdate = (event) => {
    event.preventDefault()
    comment.content = content
    updateComment(name, content, comment._id, eventId)
    history.push(`/event/comments/${eventId}`)
    window.location.reload()
  }

  return (
    <>
      <div className="row g-0">
        <div className="col-3M">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
            alt="Profile Avatar Placeholder"
            className="img-thumbnail mb-1"
            width="100%"
            style={{ maxWidth: "100px" }}
          />
        </div>
        <div className="col-8">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text text-muted mb-0">{content}</p>
          </div>
        </div>
      </div>
      <footer className="nav justify-content-end">
        <form className="input-group" onSubmit={handleUpdate}>
          <input
            type="hidden"
            name="formName"
            value={name}
          />
          <input
            type="hidden"
            name="formID"
            value={comment._id}
          />
          <div className="edit-comment">
            <textarea
              name="formContent"
              type="text"
              className="form-control"
              onChange={handleContentChange}
              placeholder="Type your updated comment..."
            ></textarea>
          </div>
          <div className="col-12 mb-3" id="update">
            <button className="btn btn-outline-info btn-sm" onClick={handleUpdate}>Update Comment</button>
          </div>
        </form>
        <button className="btn btn-outline-info btn-sm" id="delete" onClick={deleteCommentsList}>Delete Comment</button>
        <input type="hidden"/>
      </footer>
    </>
  )
}

export default Comment;
