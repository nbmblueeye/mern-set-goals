import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import GoalForm from "../components/GoalForm"
import Spinner from "../components/Spinner";
import { Goal } from "../types/Alltypes";
import { deleteGoal, getGoal, getGoals, resetGoal, resetGoals } from "../features/goalSlide";
import { useNavigate } from "react-router-dom";


const DashBoard = () => {

  const { user } = useAppSelector((state:any) => state.auth);
  const { loading, goals } = useAppSelector((state:any) => state.goal);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {

    if(!user){
      navigate("/login");
    }
    dispatch(getGoals());

    return () => {
      dispatch(resetGoals());
    }
  },[]);

  const handleDeleteGoal = (id:string) => {
    dispatch(deleteGoal(id));
    setTimeout(() => {
      dispatch(resetGoal());
    }, 2000);
  }
  if(loading){
    return <Spinner/>
  }

  return (
    <div className="container">
      <section className='heading'>
        <h1>Welcome</h1>
        <p>Goals Dashboard</p>
      </section>
      
      <GoalForm/>

      <section className='content'>
        
        {
          goals.length > 0 ?
          goals.map((goal:Goal, index:any) =>
              <div className='goal' key={index}>
                  <div >{new Date(goal.createdAt).toLocaleString('en-US')}</div>
                  <h2 onClick={() => dispatch(getGoal(goal.id))}>{goal.title}</h2>
                  <p>{goal.description}</p>
                  <button onClick={() => handleDeleteGoal(goal.id)} className='close'>
                      X
                  </button>
              </div>
          )
          :
          <h3>You have not set any goals</h3>
        }
          
      </section>
    </div>
  )
}

export default DashBoard