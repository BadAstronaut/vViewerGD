// @ts-nocheck
import { get } from 'svelte/store';
import { json } from '@sveltejs/kit';
//import { OpenAI } from 'langchain/llms/openai';
//import { loadSummarizationChain } from 'langchain/chains';
//import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
//import { AnalyzeDocumentChain } from 'langchain/chains';
import { speckleDatatree, viewerLotes, viewerProtos } from "/src/stores/toolStore";
import { Configuration, OpenAIApi } from 'openai';
import { viewerFunctions, viewerFunctions_system_prompt } from "./functions/isolateElements";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY

const configuration = new Configuration({
    organization: "org-fu91iYma3t2mmGA6pyxrzkHR",
    apiKey: OPENAI_API_KEY,
});

// create a new instance of OpenAIApi by passing the configuration object.
const openai = new OpenAIApi(configuration);

let viewerFilterResult = [];
//for the front end use https://svelte.dev/repl/ce61cb87ea604812a1d1639de66f7a5d?version=3.46.3 
//that has the components needed to generate the chat ui. but first we need to train the model with data json
//so we need to pass the data tree from the store to the model so we can ask questions later 
//we are using natural https://naturalnode.github.io/natural/ to vectorize the json data so lets create a function for that 
const systemBaseContet = "Hola soy Cris, un asistente virtual que te ayudara a navegar la informacion de los lotes del centro tecnologico para la innovacion en la construccion CTEC."
function bimBotBasePromp() {
    //console.log("lotesBaseProp----------------n", lotesBasePropn);
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
    //console.log("data......", basePromp);
    //const embeding = getEmbedding(basePromp)
    //const chatResponse = generateChatResponse(embeding, "Cuales lotes estan disponibles?");

    return basePromp;
};

async function getEmbedding(text) {
    const createEmbeddingRequest = {
        model: 'text-embedding-ada-002',
        input: text,
    };

    try {
        const response = await fetch('https://api.openai.com/v1/embeddings', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(createEmbeddingRequest)
        });

        const data = await response.json();
        const embedding = data.data[0].embedding;
        //console.log(embedding);
        return embedding;
    } catch (error) {
        console.error('Error creating embedding:', error);
        return null;
    }
}
function messageBuilder(baseElements, messages) {
    let messagesToAnget = []
    const basePromp = bimBotBasePromp();
    const baseElementsPromp = bimBotDeconstructLotes(baseElements);
    const lotesSystemPrompData = baseElementsPromp.map((subList) => {
        return { "role": "system", "content": subList }
    });
    //console.log("lotesSystemPrompData-------", lotesSystemPrompData)

    messages.forEach(m => {
        if (m.sentByMe) {
            messagesToAnget.push({ "role": "user", "content": m.message, })
        } else {
            messagesToAnget.push({ "role": "system", "content": m.message, })
        }
    });
    //const _retreiveIdsByPromp = retriveIdsByPromps()
    const _loteConstrain = contrainLoteIDvsID()
    let messagesUpdated = [
        { "role": "system", "content": basePromp },
        { "role": "system", "content": viewerFunctions_system_prompt },
        { "role": "system", "content": _loteConstrain },
        { "role": "system", "content": systemBaseContet },
    ]
    //merge the messageUpdated with the lotesSystemPrompData
    messagesUpdated.push(...lotesSystemPrompData)
    //console.log( "cehccccc", basePromp ,systemBaseContet )
    //console.log("_retreiveIdsByPromp-------", _retreiveIdsByPromp)            //{ "role": "system", "content": _retreiveIdsByPromp },

    if (messagesToAnget.length < 1) {
        messagesUpdated.push({ "role": "user", "content": text })

    } else {
        messagesUpdated.push(...messagesToAnget)
    }
    //console.log("messagesUpdated-------", messagesUpdated)
    return messagesUpdated
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

export async function generateChatResponse(basePromp, chatMessages) {
    const _messageBuilder = messageBuilder(basePromp, chatMessages)
    //console.log("messageBuilder-------", _messageBuilder)
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: _messageBuilder,
                temperature: 0.5,
                functions: viewerFunctions
            }),
        });

        if (!response.ok) {
            console.log(response.body, 'response///////////');
            throw new Error('Error generating chat response: ' + response.status);
        }

        //const func_call = await response.json();
        //const func_args = func_call;
        //console.log(func_args, ' functional arguments response///////////');

        const data = await response.json();
        // resolve data prommise and console log 

        //console.log(data, 'response//dddd/////////');

        return data;
    } catch (error) {
        console.error('Error generating chat response:', error);
    }

}

//
function retriveIdsByPromps() {
    return `Solo cuando el usuario solicite: Muestrame, Filtra, aisla lotes que cumplan \
            la condicion establecida por el usuario se debera generara una respuesta siempre en formato de array \
            este array contendra en el indice 0 una lista de los ids de lotes que cumplen con la condicion consultada por el usuario\
            en el indice 1 se entregara la respuesta, comentando al final que se han aislado los elementos en el visualizador\
            ejemplo:pregunta:"muestra el lote mas grande", respuesta:"[['b31eb9758679dcd52034f345bfde1152'], 'El LoteID 12 + Se han aislado los elementos en el visualizador']" \
            tu respuesta siempre tendra el formato "[[ids], respuesta]"\
            el contenido de tu respuesta debera ser solo esta infomracion sin complemetar nada adicional por parte del agente`
}


const contrainLoteIDvsID = () => {
    return `los lotes tienen una propiedad LoteID que representa el numero del lote. LoteID no es el id unico. El id unico es la propiedad{id}. {id} sera utilizada para operaciones de filtrado del asistent`
}
//create a function to decontruct the arrray of lotes and generate a list of string 
//detailing the loteID and parameters 
const bimBotDeconstructLotes = (viewerLotes) => {
    const baseDescriptiveProp = `El lote Numero: {LoteID} tiene un area de {Area} metros cuadrados\
                                se encuentra con estado {Estado} para alquilar, esto significa que un lote Ocupado no puede ser alquilado a otro cliente\
                                y un lote Reservado no puede ser alquilado a otro cliente hasta que el cliente que lo reservo lo alquile o lo libere.\
                                El lote cuenta con un parametro llamado Sector, {Sector} el cual representa la ubicacion del lote dentro del parque.\
                                El lote tambien cuenta con un parametro llamado Servicios, {Servicios} el cual representa los servicios que se encuentran disponibles en el lote.\
                                por ejemplo si un lote tiene Agua y Electricidad esos valores apareceran en servicios separados por ,.\
                                tambien existe una propiedad denominada {id} la cual es importante ya que permite interactural con el visualizador\
                                cuando el usuario solicite que se muestre, aisle, coloree o enseñe la ubicacion de un lote este parametro sera de interes;\
                                a continuacion un listado de todos los lotes del parque:\n`

    let lotesPrompBase = "";
    //console.log("viewerLotes", viewerLotes);
    viewerLotes.forEach(element => {
        let subString = `identificador unico id:${element.id}, numero de lote:  LoteID: ${element.LoteID}, Area: ${element.Area.toFixed(2)}, Estado: ${element.Estado}, Sector: ${element.Sector}, Servicios: ${element.Servicios}, \n`
        lotesPrompBase = lotesPrompBase + subString;
    });
    const _chucks = chunkString(baseDescriptiveProp + lotesPrompBase, 4000)
    //console.log("lotesPrompBase", _chucks);

    return _chucks;
};




export const bimBotactions = {
    summarize: async ({ request }) => {
        console.log(request);
        // Initialize the Model
        const model = new OpenAI({ temperature: 0, openAIApiKey: OPENAI_API_KEY });

        // Load and store the file
        // const form = await request.formData();
        // const file = form.get('file') as File;
        // await writeFile(`static/files/${file.name}`, file.stream());

        // Convert the file to a Document
        // const loader = new PDFLoader(`static/files/${file.name}`);
        // const docs: Document[] = await loader.load();
        // console.log(docs);

        // const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
        // const chunks = await splitter.splitDocuments(docs);
        // console.log(chunks);

        // Load the summarization chain
        const chain = loadSummarizationChain(model);
        // the analyzedocschain is used to summarize a single piece of text instead of chunks of text
        const res = await chain.call({
            input_documents: chunks
        });

        return { success: true, summary: res.text };
    }
} 