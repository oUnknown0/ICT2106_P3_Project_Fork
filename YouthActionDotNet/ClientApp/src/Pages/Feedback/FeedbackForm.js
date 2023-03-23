import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function FeedbackForm() {
  const [projectName, setProjectName] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [satisfaction, setSatisfaction] = useState('');
  const [recommend, setRecommend] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleFeedbackTextChange = (event) => {
    setFeedbackText(event.target.value);
  };

  const handleSatisfactionChange = (event) => {
    setSatisfaction(event.target.value);
  };

  const handleRecommendChange = (event) => {
    setRecommend(event.target.value === "true");
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Form validation
    if (!projectName || !satisfaction || !phoneNumber || !feedbackText) {
      alert('Please answer all questions');
      return;
    }
    if (phoneNumber.length !== 8 || isNaN(phoneNumber)) {
      alert('Please enter a valid 8-digit phone number');
      return;
    }
    // Send feedback data to server
    const data = {
      projectName,
      satisfaction,
      recommend,
      feedbackText,
      phoneNumber
    };
    fetch("https://localhost:5001/api/Feedback/Create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Feedback saved successfully');
        // Clear the form fields
        setProjectName('');
        setSatisfaction('');
        setRecommend(false);
        setFeedbackText('');
        setPhoneNumber('');
      })
      .catch(error => {
        console.error('There was a problem saving the feedback:', error);
      });
  };

  return (
    <div className='App'>
    <div className='justify-content-center align-items-center' >
      <Form className='rounded' onSubmit={handleSubmit} style={{padding:"10rem"}}>
        
        <Form.Group controlId="formProjectName" >
          <Form.Label>What was the project name you were involved in?</Form.Label>
          <Form.Control type="text" placeholder="Enter project name" value={projectName} onChange={handleProjectNameChange} />
        </Form.Group>
        

        <Form.Group controlId="formSatisfaction">
          <Form.Label>How satisfied were you with the project?</Form.Label>
          <Form.Control as="select" value={satisfaction} onChange={handleSatisfactionChange}>
            <option value="">-- Select --</option>
            <option value="1">1 - Very unsatisfied</option>
            <option value="2">2 - Somewhat unsatisfied</option>
            <option value="3">3 - Neutral</option>
            <option value="4">4 - Somewhat satisfied</option>
            <option value="5">5 - Very satisfied</option>
          </Form.Control>
        </Form.Group>
        

        <Form.Group controlId="formRecommend">
          <Form.Label>Would you recommend the experience to your friends?</Form.Label>
          <Form.Check
            type="radio"
            name="recommend"
            value="true"
            label="Yes"
            checked={recommend}
            onChange={handleRecommendChange}
          />
          <Form.Check
            type="radio"
            name="recommend"
            value="false"
            label="No"
            checked={recommend}
            onChange={handleRecommendChange}
          />
        </Form.Group>

        <Form.Group controlId='formPhoneNumber'>
          <Form.Label>Phone Number (8 digits)</Form.Label>
          <Form.Control type='tel' value={phoneNumber} onChange={handlePhoneNumberChange} pattern="[0-9]{8}" required />
        </Form.Group>
        <Form.Group controlId='formFeedbackText'>
          <Form.Label>Any Other Feedback?</Form.Label>
          <Form.Control as='textarea' value={feedbackText} onChange={handleFeedbackTextChange} />
        </Form.Group>
        <Button type='submit'>Submit Feedback</Button>
      </Form>
    </div>
    </div>
  );
}

export default FeedbackForm;