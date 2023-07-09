// @ts-nocheck
import { get } from 'svelte/store';
import { json } from '@sveltejs/kit';
import { OpenAI } from 'langchain/llms/openai';
import { loadSummarizationChain } from 'langchain/chains';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { AnalyzeDocumentChain } from 'langchain/chains';
import { speckleDatatree, viewerLotes, viewerProtos } from "/src/stores/toolStore";
import { Configuration, OpenAIApi } from 'openai';
//import { PDFLoader } from 'langchain/document_loaders';
//import { writeFile } from 'fs/promises';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY

const configuration = new Configuration({
    organization: "org-fu91iYma3t2mmGA6pyxrzkHR",
    apiKey: OPENAI_API_KEY,
});

// create a new instance of OpenAIApi by passing the configuration object.
const openai = new OpenAIApi(configuration);

//for the front end use https://svelte.dev/repl/ce61cb87ea604812a1d1639de66f7a5d?version=3.46.3 
//that has the components needed to generate the chat ui. but first we need to train the model with data json
//so we need to pass the data tree from the store to the model so we can ask questions later 
//we are using natural https://naturalnode.github.io/natural/ to vectorize the json data so lets create a function for that 
const systemBaseContet = "Hola soy BimBot, un asistente virtual que te ayudara a navegar la informacion de los lotes del centro tecnologico para la innovacion en la construccion CTEC."
export async function bimBotBasePromp(lotes) {
    const lotesBasePropn = bimBotDeconstructLotes(lotes);
    //console.log("lotesBaseProp----------------n", lotesBasePropn);
    let basePromp = `La informacion que se presenta a continuacion corresponde a los lotes con los que cuenta el centro tecnologico para la innovacion en la construccion CTEC\
                     para alquiler para propositos de prototipado. cada lote en el parque cuenta con parametros como LoteID, el cual representa el numero del lote, tambien existen\
                    parametros como Estado, el cual representa si un lote se encuentra disponible para alquilar, reservado, u ocupado.\
                    Por lo que si un usuario consulta cuales lotes estan disponibles la respuesta se generaria filtrando del listado los lotes que cumplan con estado disponible\
                    La respuesta incluiria el LoteID para transmitir al usuario cuales lotes estan disponibles\
                    Ademas existen parametros numericos como Area, el cual representa el area del lote en metros cuadrados. \
                    Por lo que si un usuario consulta cuales lotes tienen un area mayor a 100 metros cuadrados la respuesta se generaria filtrando del listado los lotes que cumplan con el area mayor a 100 metros cuadrados. \
                    La respuesta incluiria el LoteID para transmitir al usuario cuales lotes tienen un area mayor a 100 metros cuadrados, ademas se incluira el area total \
                    de los lostes que cumplan esa condicion. a continuacion se presenta el listado de lotes:\
                    ${lotesBasePropn}`;
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
function messageBuilder(basePromp, messages){
    let messagesToAnget = []
    messages.forEach(m => {
        if (m.sentByMe){
            messagesToAnget.push({ "role": "user", "content": m.message,  })
        } else
        {
            messagesToAnget.push({ "role": "system", "content": m.message,  })
        }
    });

    let messagesUpdated = []
    if(messagesToAnget.length <1){
        messagesUpdated = [
            { "role": "system", "content": basePromp },
            { "role": "system", "content": systemBaseContet },
            { "role": "user", "content": text,  },
        ]
    } else
    {
        messagesUpdated = [
            { "role": "system", "content": basePromp },
            { "role": "system", "content": systemBaseContet },
            ...messagesToAnget
        ]
    }
    //console.log("messagesUpdated-------", messagesUpdated)
    return messagesUpdated
}

export async function generateChatResponse(basePromp, chatMessages) {
    const _messageBuilder = messageBuilder(basePromp, chatMessages)
    console.log("messageBuilder-------", _messageBuilder)
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model:"gpt-3.5-turbo",
                messages:_messageBuilder
            }),
        });

        if (!response.ok) {
            throw new Error('Error generating chat response: ' + response.status);
        }

        const data = await response.json();
        //console.log(data, 'response///////////');

        return data;
    } catch (error) {
        console.error('Error generating chat response:', error);
    }

}

//create a function to decontruct the arrray of lotes and generate a list of string 
//detailing the loteID and parameters 
const bimBotDeconstructLotes = (viewerLotes) => {
    let lotesPrompBase = "";
    viewerLotes.forEach(element => {
        let subString = `El lote con LoteID: ${element.LoteID} tiene un area de ${element.Area.toFixed(2)} metros cuadrados\
         se encuentra con estado ${element.Estado} para alquilar, `;
        lotesPrompBase = lotesPrompBase + subString;
    });
    return lotesPrompBase;
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