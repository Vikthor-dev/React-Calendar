import "./Home.css"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useEffect, useRef } from "react";
import { Button } from 'react-bootstrap';

const Home = () => {

    const calendarRef = useRef(null);
    const newEventModal = useRef(null);
    const deleteEventModal = useRef(null);
    const modalBackDrop = useRef(null);
    const eventTitleInput = useRef(null);



    let nav = 0;
    let clicked = null;
    let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

    const calendar = document.getElementById('calendar');
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


    function openModal(date) {
        clicked = date;

        const eventForDay = events.find(e => e.date === clicked);

        if (eventForDay) {
            document.getElementById('eventText').innerText = eventForDay.title;
            deleteEventModal.current.style.display = 'block';
        } else {
            newEventModal.current.style.display = 'block';
        }

        modalBackDrop.current.style.display = 'block';
    }

    function load() {
        const dt = new Date();

        if (nav !== 0) {
            dt.setMonth(new Date().getMonth() + nav);
        }

        const day = dt.getDate();
        const month = dt.getMonth();
        const year = dt.getFullYear();

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1);

        const dateString = firstDayOfMonth.toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        })

        const splitDateString = dateString.split(',');
        const dayName = splitDateString[0].trim();
        const paddingDays = weekdays.indexOf(dayName);

        document.getElementById('monthDisplay').innerText = `${dt.toLocaleDateString('en-GB', { month: 'long' })} ${year}`

        calendarRef.current.innerHTML = '';

        for (let i = 1; i <= paddingDays + daysInMonth; i++) {
            const daySquare = document.createElement('div');
            daySquare.classList.add('day');

            const dayString = `${month + 1}/${i - paddingDays}/${year}`;
            

            if (i > paddingDays) {
                daySquare.innerText = i - paddingDays;

                const eventForDay = events.find(e => e.date === dayString);

                if (eventForDay) {
                    const eventDiv = document.createElement('div');
                    eventDiv.classList.add('event');
                    eventDiv.innerText = eventForDay.title;
                    daySquare.appendChild(eventDiv);
                  }


                daySquare.addEventListener('click', () => openModal(dayString));
            } else {
                daySquare.classList.add('padding');
            }

            calendarRef.current.appendChild(daySquare);
        }
    }

    function nextButton() {
        nav++;
        load();
    }
    function backButton() {
        nav--;
        load();
    }
    function saveEvent() {
        if (eventTitleInput.current.value) {
          eventTitleInput.current.classList.remove('error');
      
          events.push({
            date: clicked,
            title: eventTitleInput.current.value,
          });
      
          localStorage.setItem('events', JSON.stringify(events));
          closeModal();
        } else {
          eventTitleInput.current.classList.add('error');
        }
      }
    
    function closeModal(){
        eventTitleInput.current.classList.remove('error');
        newEventModal.current.style.display = 'none';
        deleteEventModal.current.style.display = 'none';
        modalBackDrop.current.style.display = 'none';
        eventTitleInput.current.value = '';
        clicked = null;
        load();
    }

    function deleteEvent() {
        events = events.filter(e => e.date !== clicked);
        localStorage.setItem('events', JSON.stringify(events));
        closeModal();
      }


    useEffect(() => {
        load();
    }, [])


    return (
        <div className="Home">

            <Row>
                <Col></Col>
                <Col>
                    <div id="container">
                        <div id="header">
                            <div id="monthDisplay"></div>
                            <div>
                                <Button id="nextButton" onClick={backButton}>Back</Button>
                                <Button id="backButton" onClick={nextButton}>Next</Button>
                            </div>
                        </div>

                        <div id="weekdays">
                            <div>Monday</div>
                            <div>Tuesday</div>
                            <div>Wednesday</div>
                            <div>Thursday</div>
                            <div>Friday</div>
                            <div>Saturday</div>
                            <div>Sunday</div>
                        </div>

                        <div id="calendar" ref={calendarRef}></div>

                        <div ref={newEventModal} id="newEventModal">
                            <h2>New Event</h2>

                            <input ref={eventTitleInput} id="eventTitleInput" placeholder="Event Title" />

                            <Button onClick={saveEvent} variant="primary" id="saveButton">Save</Button>
                            <Button onClick={closeModal} variant="danger" id="cancelButton">Cancel</Button>
                        </div>

                        <div ref={deleteEventModal} id="deleteEventModal">
                            <h2>Event</h2>

                            <p id="eventText"></p>

                            <Button onClick={deleteEvent} variant="danger" id="deleteButton">Delete</Button>
                            <Button onClick={closeModal} variant="primary" id="closeButton">Close</Button>
                        </div>

                        <div ref={modalBackDrop} id="modalBackDrop"></div>
                    </div>
                </Col>
                <Col></Col>
            </Row>

        </div>
    )
}

export default Home;