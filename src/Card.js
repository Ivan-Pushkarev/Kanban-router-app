import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { withRouter } from 'react-router'
import { Link } from "react-router-dom";

function Message(props) {
    let index = props.currentStatus.indexOf(props.status);
    let leftButton = props.currentStatus[index - 1];
    let rightButton =props.currentStatus[index +1];
    
    return (
        <div>
            
            <center className="p-3 mb-2 bg-light text-dark">
                
                {
                    props.list
                        .filter(el=> el.status === props.status)
                        .map(el => <div key={el._id}>  <span> <h5 className="p-3 mb-2 bg-secondary text-white"> {el.name} </h5> </span>
                            <div><b>Description:</b> {el.description}</div>
                            <div>
                                {
                                    props.status !== 'to do' &&  props.status !== 'done' && <button type="button" className="btn btn-outline-secondary"
                                                                                                    onClick={() => props.leftButtonPushed(el._id)}> ⇦{leftButton}</button>
                                }
                                <Link to= {`/edit/${el._id}`}>
                                    <button className="btn btn-outline-secondary" >Edit</button>
                                </Link>
                                {
                                    props.status !== 'done'? <button type="button" className="btn btn-outline-secondary"
                                                                     onClick={() => props.rightButtonPushed(el._id)}>{rightButton}⇨</button> :
                                        <button type="button" className="btn btn-outline-secondary" onClick={()=> props.removeTask(el._id)}>Delete</button>
                                }
                                
                                <hr/>
                            </div>
                        </div>)
                }
            </center>
        
        </div>
    
    );
    
}
export default withRouter(Message);
