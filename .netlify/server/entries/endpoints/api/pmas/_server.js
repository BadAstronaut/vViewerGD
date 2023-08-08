import "../../../../chunks/index.js";
import { s as speckleStream } from "../../../../chunks/toolStore.js";
async function POST(event) {
  const body = await event.request.json();
  try {
    const { speckleUrl, passports } = body;
    if (speckleUrl && passports) {
      speckleStream.set(speckleUrl);
      return new Response(JSON.stringify({ message: speckleUrl }), {
        headers: {
          "Content-Type": "application/json"
        }
      });
    } else {
      return new Response(JSON.stringify({ error: "bad passportid or speckle url" }), {
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
export {
  POST
};
