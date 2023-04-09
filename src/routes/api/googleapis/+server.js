import {transformCalendar} from './transformGoogleApis.js';
import { google } from 'googleapis';
import fs from 'fs';

//let googleClientSecrete= import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
//let daluxKey = import.meta.env.VITE_DALUX_KEY;
//https://stackoverflow.com/questions/70472978/sveltekit-proxy-api-to-avoid-cors
//useful but still getting 404 error
/** @type {import('./$types').RequestHandler} */
export async function GET({url}) {

    const auth = new google.auth.GoogleAuth({
        keyFile: "src/routes/api/googleapis/client_secret.json" ,
        scopes: ['https://www.googleapis.com/auth/calendar'],
      });
      const calendar = google.calendar({ version: 'v3', auth });
    
    const { data: { items } } = await calendar.events.list({
        calendarId: 'primary', // replace with your desired calendar ID
        timeMin: (new Date()).toISOString(), // retrieve events starting from today
        maxResults: 10, // retrieve a maximum of 10 events
        singleEvents: true,
        orderBy: 'startTime',
      });

    const appointments = items.map(({ summary, start, end }) => ({
        title: summary,
        start: start.dateTime,
        end: end.dateTime,
      }));

    return new Response({
        body: appointments,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    //return  new Response(JSON.stringify(data))
  }