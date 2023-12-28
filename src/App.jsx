import { useState, useEffect} from 'react'
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import './App.css'
const url = 'https://course-api.com/react-tabs-project'


function App() {
  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState([])
  const [value, setValue] = useState(0);

  const fetchJobs = async () => {
    const response = await fetch(url)
    const newJobs = await response.json()
    setJobs(newJobs);
    setLoading(false)
  }
  useEffect(()=>{
    fetchJobs();
  }, [])

  if(loading){
    return <h1>Loading...</h1>
  }
  const {company, dates, duties, title} = jobs[value]
  return (
    <>
      <section className="section">
        <div className='title'>
          <h2>Experience</h2>
          <div className='underline'></div>
        </div>
        <div className='jobs-center'>
          <div className='btn-container'>
            {jobs.map((item, index)=>{
              return (
                <button
                key={item.id} 
                onClick={()=> setValue(index)}
                className={`job-btn ${index === value && 'active-btn'} `}
                >{item.company}
                </button>
              )
            })}
          </div>
          <article className='job-info'>
            <h3>{title}</h3>
            <h4>{company}</h4>
            <p className='job-date'>{dates}</p>
            {duties.map((duty,index)=>{
              return <div key={index} className='job-desc'>
              <MdOutlineKeyboardDoubleArrowRight className="job-icon"/>
              <p>{duty}</p>
              </div>
            })}
          </article>
        </div>
        <button type="button" className="btn">
        more info
      </button>

        
      </section>
    </>
  )
}

export default App
