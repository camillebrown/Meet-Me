import React, {useState, useEffect} from 'react'
import shortid from 'shortid'
import AuthService from '../../services/auth.service'

const CommentForm = ({eventId, saveComment,addToList})=>{

    const [newComment, setNewComment] = useState('')
    const [name, setName] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {
        const user = AuthService.getCurrentUser()
        setName(user.username)
    },[])

    const handleContentChange = (event) => {
        setContent(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let newID= shortid.generate()
        setNewComment({
            _id: newID,
            name: name,
            content: content
        })
        saveComment(eventId, newID, name, content)
        .then(()=>
        addToList(newComment))
    }


    return (
        <form className="input-group" onSubmit={handleSubmit}>
            <input
                type="hidden"
                name="formName"
                value={name}
            />
            <div className="col-12 row mb-3">
                <textarea
                    name="formContent"
                    type="text"
                    className="form-control"
                    value={content}
                    onChange={handleContentChange}
                    placeholder="Add a comment..."
                ></textarea>
            </div>
            <div className="col-12 mb-3">
                <button className="btn btn-outline-info btn-sm" onSubmit={handleSubmit}>Add Comment</button>
            </div>
        </form>
        
    );
}

export default CommentForm;