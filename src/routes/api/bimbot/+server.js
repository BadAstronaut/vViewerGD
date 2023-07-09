import { json } from '@sveltejs/kit';
import { bimBotBasePromp, generateChatResponse } from "$lib/ai/bimBot.js";

export async function POST(event) {
  try {
    const body = await event.request.json();
    const { lotes, messages } = body;
    //console.log(messages, 'loaading responses');
    //check if the last value of the message array sentByMe is true if so get the value 
    const lastMessage = messages[messages.length - 1];
    console.log(lastMessage.sentByMe, 'last message');
    if (lastMessage.sentByMe) {
      const response = await generateChatResponse(lotes, messages);
      //console.log(response);
      return new Response(JSON.stringify({ message: response }), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      return new Response(JSON.stringify({ error: 'no message' }), {
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
