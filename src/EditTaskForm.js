import { withRouter } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

function EditTask(props) {
    
    
    const [card, setCard] = useState({
        name: '',
        description: '',
        priority: '',
        status: ''
    });
    
    useEffect(() => {
        axios({
            method: 'GET',
            url: `https://nazarov-kanban-server.herokuapp.com/card/${props.match.params.cardId}`
        }).then(({ data }) => {
            setCard(data);
        });
        
    }, [props.match.params.cardId]);
    
    const onChange = e => {
        const name = e.target.name;
        let newCount;
        switch(name) {
            case "name":        newCount = {...card, name: e.target.value};
                setCard(newCount);
                break;
            case "description": newCount = {...card, description: e.target.value};
                setCard(newCount);
                break;
            case "priority":    newCount = {...card, priority: e.target.value};
                setCard(newCount);
                break;
            case "status":      newCount = {...card, status: e.target.value};
                setCard(newCount);
                break;
        }
    };
    
    
    const updateTask = () =>{
        axios.patch(`https://nazarov-kanban-server.herokuapp.com/card/${props.match.params.cardId}`,{
                name: card.name,
                description: card.description,
                priority: card.priority,
                status: card.status,
            }
        ).catch (error =>  console.log('error'))
    };
    
    return (
        <div>
            <center><h2 className="p-3 mb-2 bg-secondary text-white">Edit task form</h2></center>
            
            <form className="container-sm" class="p-3 mb-2 bg-light text-dark">
                <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"><h5>Name</h5></label>
                    <div className="col-sm-10">
                        <input name="name" className="form-control" id="inputEmail3" value={card.name} onChange={onChange}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label"><h5>Description</h5></label>
                    <div className="col-sm-10">
                        <input name="description" className="form-control" id="inputPassword3" value={card.description} onChange={onChange}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label"><h5>Priority</h5></label>
                    <div className="col-sm-10">
                        <select name="priority" value={card.priority} className="form-select" aria-label="Default select example" onChange={onChange}>
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
                        <select name="status" value={card.status} className="form-select" aria-label="Default select example" onChange={onChange}>
                            <option value="to do">Todo</option>
                            <option value="progress">Progress</option>
                            <option value="review">Review</option>
                            <option value="done">Done</option>
                        
                        </select>
                    </div>
                </div>
                
                <Link to="/">
                    <button type="submit" className="btn btn-outline-secondary" onClick={updateTask}>Update</button>
                </Link>
                <Link to ="/" className="btn btn-outline-secondary" >Cancel</Link>
                <Link to = "/" >
                    <button className="btn btn-outline-secondary" onClick={() =>
                        axios.delete(`https://nazarov-kanban-server.herokuapp.com/card/${props.match.params.cardId}`) }>Delete</button>
                </Link>
            </form>
        </div>
    
    )
}
export default withRouter(EditTask);