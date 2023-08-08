import "../../../../chunks/index.js";
import "../../../../chunks/toolStore.js";
import { Configuration, OpenAIApi } from "openai";
const viewerFunctions = [
  {
    "name": "filter-by-conditions",
    "description": `La función se ejecutará únicamente cuando el usuario desee 'filtrar' en su prompt. El asistente generara los inputs categoryName, propertyName, propertyValue, condition para ejecutar la funcion.`,
    "parameters": {
      "type": "object",
      "properties": {
        "filterConditions": {
          "type": "object",
          "properties": {
            "categoryName": {
              "type": "string",
              "description": "representa la categoria de los elementos que se quiere filtrar. Ejemplos; {category: 'LoteID'}, {category: 'Muros'}, {category: 'Puertas'}"
            },
            "propertyName": {
              "type": "string",
              "description": "mensaje de assistante al usuario sera siempre en el formato: Se ha Filtrado el lote {LoteID} en el visualizador... importante mencionar el visualizador"
            },
            "propertyValue": {
              "type": "string",
              "description": "representa el valor de la propiedad que se quiere filtrar. Ejemplos; {propertyName: 'LoteID', propertyValue: 'Lote 1'}, {propertyName: 'LoteID', propertyValue: 'Lote 2'}, en case de solicitar el mas grande usar max, en caseo de prompt mas pequeño o menor usar min"
            },
            "condition": {
              "type": "string",
              "description": " Considera solo uno de los siguientes valores como condicional la funcion filtre data: ['equal', 'notEqual', 'greater', 'less', 'greaterThanOrEqual', 'lessThanOrEqual', 'includes', 'notIncludes', 'startsWith', 'endsWith']"
            }
          }
        },
        "message": {
          "type": "object",
          "properties": {
            "content": {
              "type": "string",
              "description": "mensaje de assistante al usuario sera siempre en el formato: Se ha Filtrado el lote {LoteID} en el visualizador... importante mencionar el visualizador"
            },
            "role": {
              "type": "string",
              "description": "assistant"
            }
          }
        }
      },
      "required": ["filterConditions", "message"]
    }
  },
  {
    "name": "control-camera",
    "description": `La función se ejecutará únicamente cuando el usuario solicite cambiar la vista actual. El asistente identificara una de las siguientes opciones: 'front', 'back', 'up', 'top', 'down', 'bottom', 'right', 'left', '3d'`,
    "parameters": {
      "type": "object",
      "properties": {
        "view": {
          "type": "string",
          "description": ` El asistente identificara una de las siguientes opciones segun el prompt del usuario: 'front', 'back', 'up', 'top', 'down', 'bottom', 'right', 'left', '3d'. Esta opcion sera pasada como imput a la funcion`
        },
        "message": {
          "type": "object",
          "properties": {
            "content": {
              "type": "string",
              "description": "mensaje de assistante al usuario sera siempre en el formato: cambiando a vista {view}"
            },
            "role": {
              "type": "string",
              "description": "assistant"
            }
          }
        }
      },
      "required": ["view", "message"]
    }
  }
];
const OPENAI_API_KEY = "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";
const configuration = new Configuration({
  organization: "org-fu91iYma3t2mmGA6pyxrzkHR",
  apiKey: OPENAI_API_KEY
});
new OpenAIApi(configuration);
const systemBaseContet = "Hola soy Cris, un asistente virtual que te ayudara a navegar la informacion de los lotes y prototipos del centro tecnologico para la innovacion en la construccion CTEC ubicado en Laguna Caren Santiago, Chile.";
function bimBotBasePromp() {
  let basePromp = `La siguiente información corresponde a los lotes disponibles para alquiler en el Centro Tecnológico para la Innovación en la Construcción (CTEC). Cada lote en el parque tiene parámetros como LoteID, 
    que representa el número del lote, así como parámetros como Estado, que indica si un lote está disponible para alquiler, reservado u ocupado.
    Por lo tanto, si un usuario solicita información sobre los lotes disponibles, la respuesta se generará mediante la filtración de la lista de lotes que tengan el estado "disponible". La respuesta incluirá el LoteID para transmitir qué lotes están disponibles.
    Además, existen parámetros numéricos como Área, que representa el área del lote en metros cuadrados. Entonces, 
    si un usuario pregunta sobre los lotes con un área mayor a 100 metros cuadrados, 
    la respuesta se generará mediante la filtración de la lista de lotes que cumplan con la condición de tener un área mayor a 100 metros cuadrados. La respuesta incluirá el 
    LoteID para informar al usuario sobre los lotes con un área mayor a 100 metros cuadrados, y también proporcionará el área total de los 
    lotes que cumplan esta condición. A continuación se muestra la lista de lotes:
    Finalmente existen parametros de identificacion unicos en cada lote el cual es el lote id y sera utilizado para cualquier funcion que utilice el agente
    si alguien te pregunta cual es el lote con mas area responderas validando el id y loteID de la lista de lotes               `;
  return basePromp;
}
function messageBuilder(baseElements, messages) {
  let messagesToAnget = [];
  const basePromp = bimBotBasePromp();
  const baseElementsPromp = bimBotDeconstructLotes(baseElements);
  const lotesSystemPrompData = baseElementsPromp.map((subList) => {
    return { "role": "system", "content": subList };
  });
  messages.forEach((m) => {
    if (m.sentByMe) {
      messagesToAnget.push({ "role": "user", "content": m.message });
    } else {
      messagesToAnget.push({ "role": "system", "content": m.message });
    }
  });
  const _loteConstrain = contrainLoteIDvsID();
  let messagesUpdated = [
    { "role": "system", "content": basePromp },
    // { "role": "system", "content": viewerFunctions_system_prompt },
    { "role": "system", "content": _loteConstrain },
    { "role": "system", "content": systemBaseContet }
  ];
  messagesUpdated.push(...lotesSystemPrompData);
  if (messagesToAnget.length < 1) {
    messagesUpdated.push({ "role": "user", "content": text });
  } else {
    messagesUpdated.push(...messagesToAnget);
  }
  return messagesUpdated;
}
function chunkString(str, chunkSize) {
  const chunks = [];
  let index = 0;
  while (index < str.length) {
    chunks.push(str.substr(index, chunkSize));
    index += chunkSize;
  }
  return chunks;
}
async function generateChatResponse(basePromp, chatMessages) {
  const _messageBuilder = messageBuilder(basePromp, chatMessages);
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: _messageBuilder,
        temperature: 0.5,
        functions: viewerFunctions
      })
    });
    if (!response.ok) {
      console.log(response.body, "response///////////");
      throw new Error("Error generating chat response: " + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error generating chat response:", error);
  }
}
const contrainLoteIDvsID = () => {
  return `los lotes tienen una propiedad LoteID que representa el numero del lote. LoteID no es el id unico. El id unico es la propiedad{id}. {id} sera utilizada para operaciones de filtrado del asistent`;
};
const bimBotDeconstructLotes = (viewerLotes) => {
  const baseDescriptiveProp = `El lote Numero: {LoteID} tiene un area de {Area} metros cuadrados                                se encuentra con estado {Estado} para alquilar, esto significa que un lote Ocupado no puede ser alquilado a otro cliente                                y un lote Reservado no puede ser alquilado a otro cliente hasta que el cliente que lo reservo lo alquile o lo libere.                                El lote cuenta con un parametro llamado Sector, {Sector} el cual representa la ubicacion del lote dentro del parque.                                El lote tambien cuenta con un parametro llamado Servicios, {Servicios} el cual representa los servicios que se encuentran disponibles en el lote.                                por ejemplo si un lote tiene Agua y Electricidad esos valores apareceran en servicios separados por ,.                                tambien existe una propiedad denominada {id} la cual es importante ya que permite interactural con el visualizador                                cuando el usuario solicite que se muestre, aisle, coloree o enseñe la ubicacion de un lote este parametro sera de interes;                                a continuacion un listado de todos los lotes del parque:
`;
  let lotesPrompBase = "";
  viewerLotes.forEach((element) => {
    let subString = `identificador unico id:${element.id}, numero de lote:  LoteID: ${element.LoteID}, Area: ${element.Area.toFixed(2)}, Estado: ${element.Estado}, Sector: ${element.Sector}, Servicios: ${element.Servicios}, 
`;
    lotesPrompBase = lotesPrompBase + subString;
  });
  const _chucks = chunkString(baseDescriptiveProp + lotesPrompBase, 4e3);
  return _chucks;
};
async function POST(event) {
  try {
    const body = await event.request.json();
    const { lotes, messages } = body;
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.sentByMe) {
      const response = await generateChatResponse(lotes, messages);
      return new Response(JSON.stringify({ message: response }), {
        headers: {
          "Content-Type": "application/json"
        }
      });
    } else {
      return new Response(JSON.stringify({ error: "no message" }), {
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
