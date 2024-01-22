import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createGoal, resetGoal, updateGoal } from "../features/goalSlide";

function GoalForm() {

  const { error, loading, success, message , goal } = useAppSelector((state:any) => state.goal);
  const dispatch = useAppDispatch();
  const [ goalData, setGoalData ] = useState({
    title:"",
    description:"",
  });

  const  { title, description } = goalData;
  useEffect(() => {
    if(Object.keys(goal).length > 0){
      setGoalData({
        title: goal.title,
        description: goal.description,
      })
    }else{
      setGoalData({
        title:"",
        description:"",
      });
    }
  },[goal])

  const _setGoal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoalData((prevState) => { return {...prevState, [e.target.name]: e.target.value}})
  }

  const handleSetGoal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(Object.keys(goal).length <= 0) {
      dispatch(createGoal(goalData))
    }else{
      let data = {...goal, ...goalData}
      dispatch(updateGoal(data));
    }
   
    setTimeout(() => {
      setGoalData({
        title:"",
        description:"",
      });
      dispatch(resetGoal());
    }, 2000);

  }

  return (
    <section className='form'>
      {
        success && <div className="success-message"><p>{message}</p></div>
      }
      {
        error && <div className="error-message"><p>{message}</p></div>
      }
     
      <form onSubmit={(e) => handleSetGoal(e)}>
        <div className='form-group'>
          <label htmlFor='text'>Goal Title</label>
          <input
            type='text'
            name='title'
            id='title'
            value={title}
            onChange = {(e) => _setGoal(e)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='text'>Goal Decription</label>
          <input
            type='text'
            name='description'
            id='description'
            value={description}
            onChange = {(e) => _setGoal(e)}
          />
        </div>
        <div className='form-group'>
          {
            Object.keys(goal).length <= 0 ?
            <button className='btn btn-block' type='submit'>
              {
                loading ?"Loading...": "Add Goal"
              }
            </button>
            :
            <button className='btn btn-block' type='submit'>
              {
                loading ?"Loading...": "Update Goal"
              }
            </button>
          }
          
        </div>
      </form>
      
    </section>
  )
}

export default GoalForm