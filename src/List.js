import { withRouter } from 'react-router';
import { useState, useEffect} from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'
import ChangeStatus from "./Card";
const currentStatus = ['to do','progress','review','done'];


function List(props) {
    
    console.log('props', props);
    const [list, setList] = useState([]);
    
    useEffect(() => {
        setTimeout(()=>
                axios
                    .get('https://nazarov-kanban-server.herokuapp.com/card')
                    .then((res)=> {
                        setList(res.data);
                        console.log(res.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            , 200);
        
    }, []);
    
    const leftButtonPushed = (id) => {
        const newList = list.map(el => el._id === id ? ({...el, status:  currentStatus[currentStatus.indexOf(el.status) - 1]}) : el);
        setList(newList );
        const arr = list.filter(el => el._id === id);
        const newStatus = currentStatus[currentStatus.indexOf(arr[0].status) - 1];
        
        axios.patch(`https://nazarov-kanban-server.herokuapp.com/card/${id}`,{
                status: `${newStatus}`
            }
        )
    }
    
    
    const rightButtonPushed = (id) => {
        const newList = list.map(el => el._id === id ? ({...el, status: currentStatus[currentStatus.indexOf(el.status) + 1]}) : el);
        setList(newList );
        const arr = list.filter(el => el._id === id);
        const newStatus = currentStatus[currentStatus.indexOf(arr[0].status) + 1];
        
        axios.patch(`https://nazarov-kanban-server.herokuapp.com/card/${id}`,{
                status: `${newStatus}`
            }
        ).catch (error =>  console.log('error'))
    }
    
    const removeTask = (id) => {
        const newList = list.map(el => el._id === id ? ({...el, status: null}) : el);
        setList(newList );
        axios.delete(`https://nazarov-kanban-server.herokuapp.com/card/${id}`)
    }
    
    return <div>
        <h2><center className ="p-3 mb-2 bg-secondary text-white"> Kanban App</center></h2>
        <div className="container">
            <div className="row justify-content-around">
                
                <div className="col">
                    <h3> todo ⇒ </h3>
                    <hr/>
                    <div>
                        
                        <ChangeStatus list={list} status={'to do'} currentStatus={currentStatus}
                                      leftButtonPushed={leftButtonPushed}  rightButtonPushed={rightButtonPushed}/>
                    
                    </div>
                </div>
                <div className="col">
                    <h3> progress ⇒ </h3>
                    <hr/>
                    <div>
                        <ChangeStatus list={list} status={'progress'} currentStatus={currentStatus}
                                      leftButtonPushed={leftButtonPushed}  rightButtonPushed={rightButtonPushed}/>
                    
                    </div>
                </div>
                <div className="col">
                    <h3> review ⇒ </h3>
                    <hr/>
                    <div>
                        <ChangeStatus list={list} status={'review'} currentStatus={currentStatus}
                                      leftButtonPushed={leftButtonPushed}  rightButtonPushed={rightButtonPushed}/>
                    
                    </div>
                </div>
                <div className="col">
                    <h3> done </h3>
                    <hr/>
                    <div>
                        {
                            <ChangeStatus list={list} status={'done'} currentStatus={currentStatus}
                                          leftButtonPushed={leftButtonPushed}  rightButtonPushed={rightButtonPushed} removeTask={removeTask} />
                            
                        }
                    </div>
                </div>
            </div>
        </div>
    
    </div>
    
}
export default withRouter(List);
