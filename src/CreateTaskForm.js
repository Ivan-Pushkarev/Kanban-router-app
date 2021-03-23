import 'bootstrap/dist/css/bootstrap.css'
import { withRouter } from 'react-router';
import {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


function CreateTask() {
    
    const [taskName, setTaskName]= useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskPriority, setTaskPriority] = useState("");
    const [taskStatus, setTaskStatus] = useState("to do");
    
    const onChange = e => {
        const name = e.target.name;
        switch(name) {
            case "name": setTaskName(e.target.value); break;
            case "description": setTaskDescription(e.target.value); break;
            case "priority": setTaskPriority(e.target.value); break;
            case "status": setTaskStatus(e.target.value); break;
            
        }
    };
    
    const addToList = () => {
        axios.post('https://nazarov-kanban-server.herokuapp.com/card', {
            _id: Math.random(),
            name: taskName,
            description: taskDescription,
            priority: taskPriority,
            status: taskStatus,
        }).then((res)=> {
            
            console.log(res.data);
        })
    };
    
    return (
        <div>
            <center><h2 className ="p-3 mb-2 bg-secondary text-white">Create task form</h2></center>
            
            <form  className="container-sm" class="p-3 mb-2 bg-light text-dark" >
                <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"><h5>Name</h5></label>
                    <div className="col-sm-10">
                        <input name="name" className="form-control" id="inputEmail3" onChange={onChange} placeholder="Add name"/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label  className="col-sm-2 col-form-label"><h5>Description</h5></label>
                    <div className="col-sm-10">
                        <input name="description" className="form-control" id="inputPassword3" placeholder="Add description" onChange={onChange}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label"><h5>Priority</h5></label>
                    <div className="col-sm-10">
                        <select value={taskPriority} className="form-select" aria-label="Default select example" name="priority" onChange={onChange}>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            <option value="4">Four</option>
                            <option value="5">Five</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label"><h5>Status</h5></label>
                    <div className="col-sm-10">
                        <select value={taskStatus} name="status" className="form-select" aria-label="Default select example" onChange={onChange}>
                            <option value="to do">Todo</option>
                            <option value="progress">Progress</option>
                            <option value="review">Review</option>
                            <option value="done">Done</option>
                        
                        </select>
                    </div>
                </div>
                
                <Link to="/">
                    <button type="submit" className="btn btn-outline-secondary" onClick={addToList}>Create</button>
                </Link>
                <Link to ="/" className="btn btn-outline-secondary">Cancel</Link>
            </form>
        </div>
    )
    
}

export default withRouter(CreateTask)