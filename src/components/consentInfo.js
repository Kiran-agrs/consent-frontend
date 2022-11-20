import { useEffect } from "react";
import React, {useState} from 'react';

const ConsentInfo = () => {
    let [ctaskData, setCTaskData] = useState({
        name:"",
        emailId:"",
        cTask:"",
        consentGiven:false
    });
    let [consent, setConsent] = useState(false);
    let [success, setSuccess] = useState(false);
    useEffect(() => {
        fetch("http://localhost:8087/v1/consent?cTask=2233")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setCTaskData({
                name:data.name,
                emailId:data.emailId,
                cTask:data.cTask,
                consentGiven:data.consentGiven
            });
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const answer = window.confirm("Are you sure?");
        if (answer) {
          // Save it!
          console.log(consent);
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cTask: ctaskData.cTask, consentGiven: consent})
        };
        fetch('http://localhost:8087/v1/consent/set', requestOptions)
            .then(data => {
                console.log(data.status);
                if(data.status) {
                    setSuccess(true);
                }
            });
          console.log("Was saved to the database.");
        } else {
          // Do nothing!
          console.log("Was not saved to the database.");
        }
      };

      const handleRadio = (e) => {
        const consent = e.currentTarget.value === 'true' ? true: false;
        console.log('handle', consent);
        setConsent(consent);
      }

    return (
    <div className="App">
        {success ? <h1>Success</h1> : <form onSubmit={handleSubmit}>
        <h1>{"cTaskId= " + ctaskData.cTask}</h1>
        <h2>{"name= "+ ctaskData.name}</h2>
        <h2>{"emailId= " + ctaskData.emailId}</h2>
        <p>Are you sure you want to give consent?</p>
        <div className="radio">
          <label>
            <input 
              type="radio" 
              name="consent" 
              value="true"
              checked={consent === true}
              onChange={handleRadio} />
            Yes
          </label>
       </div>
       <div className="radio">
         <label>
           <input 
             type="radio" 
             name="consent" 
             value="false"
             checked={consent === false}
             onChange={handleRadio} />
           No
         </label>
       </div>
        <button type="submit">Submit</button>
      </form>}
    </div>
    );
}

export default ConsentInfo;