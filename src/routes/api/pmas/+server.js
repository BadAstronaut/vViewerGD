import { json } from '@sveltejs/kit';
import { speckleStream} from "/src/stores/toolStore.js";
import {io} from "/vite.config.js";
import {emit} from "src/lib/socket.js";

export async function POST(event) {
    const body = await event.request.json();
    //console.log(body, 'body............');
    try {
        const { speckleUrl, passports } = body;
        if (speckleUrl && passports) {
            //const response = await generateChatResponse(lotes, messages);
            //speckleStream.set(speckleUrl);
            emit('eventFromServer', speckleUrl);
            return new Response(JSON.stringify({ message: speckleUrl }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } else {
            return new Response(JSON.stringify({ error: 'bad passportid or speckle url' }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    } catch (error) {
        console.error('Error processing request:', error);

        return new Response(JSON.stringify({ error: 'An error occurred' }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}