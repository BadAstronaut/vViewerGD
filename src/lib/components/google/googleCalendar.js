import {googleCalendarEventsByDay} from "/src/stores/toolStore";
import {get} from 'svelte/store';
export async function fetchGoogleCalendarByID(calendarId) {
    try {
        const apiKey = import.meta.env.VITE_GOOGLE_API_KEY; // Replace with your Google Calendar API key

        const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`);
        const data = await response.json();
        const events = data.items; // List of events
        //console.log("events from calendar",events);
        const calendarEvents = processGoogleCalendarEvents(events);
        const groupEvents = groupEventsByDay(calendarEvents);
        googleCalendarEventsByDay.set(groupEvents)
        console.log("groupEvents", get(googleCalendarEventsByDay));
        // Use the events in your SvelteKit application
        // ...
    } catch (error) {
        console.error('Error fetching calendar events:', error);
    }
}

function processGoogleCalendarEvents(events) {
    //get the start date, organizer displaynameand eventType to an array of objects
    let baseCalendarArray = [];
    const eventsProcessed = events.map(event => {
        //console.log("event.......", event);
        if (event.start) {
            const baseCalendarObject = {
                start: new Date(event.start.dateTime),
                end: new Date(event.end.dateTime),
                eventName: event.summary,
                eventType: event.eventType,
                eventSpace: event.description
            }
            //console.log("event.start", baseCalendarObject);
            baseCalendarArray.push(baseCalendarObject)
        }
        return baseCalendarArray;
    })
    //console.log("eventsProcessed", eventsProcessed);
    return baseCalendarArray;
    //console.log("eventsProcessed", eventsProcessed);

}

//create a function that takes the array of objects and group the events by day from today and to the next 7 days
function groupEventsByDay(events) {
    //get the current date
    const today = new Date();
    //get the next 7 days
    const next7Days = new Date(today);
    next7Days.setDate(next7Days.getDate() + 7);
    //filter the events that are between today and the next 7 days
    console.log("events", events);
    const eventsFiltered = events.filter(event => {
        return event.start >= today && event.start <= next7Days;
    })
    console.log("eventsFiltered", eventsFiltered);
    //group the events by day
    const eventsGroupedByDay = eventsFiltered.reduce((groups, event) => {
        //console.log("event", event);
        const date = event.start.toDateString();
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(event);
        return groups;
    }, {});
    console.log("eventsGroupedByDay", eventsGroupedByDay);
    return eventsGroupedByDay;
}