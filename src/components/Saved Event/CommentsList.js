import Comment from './Comment'

const CommentsList = ({comments, eventId}) => {

    return (
      <ul className="list-group list-group-flush">
      <div className="list-group-item list-group-item-info text-center">
          <h5 >Comments</h5>
      </div>
            {comments.map((comment, i)=>(
              <li key={i} className="list-group-item">
              < Comment 
                key= {comment._id}    
                name= {comment.name} 
                content= {comment.content} 
                comment= {comment}
                eventId={eventId}        
              />
            </li>
            ))}
      </ul>
    );
};
  
  export default CommentsList;
  