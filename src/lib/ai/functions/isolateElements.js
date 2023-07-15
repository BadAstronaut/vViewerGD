//usando LoteID para denominar los ides de los elementos. luego generalizar. 


export const viewerFunctions = [
    {
        "name": 'isolate-elements',
        "description": `La función se ejecutará únicamente cuando el usuario incluya la palabra 'filtrar' en su solicitud. El asistente generará una lista de IDs de acuerdo con los requisitos especificados por el usuario.`,
        "parameters": {
            "type": "object",
            "properties": {
                "elementIds": {
                    "type": 'array',
                    "items": {
                        "type": "string",
                        "description": "propiedad {id} de lotes"
                    }
                },
                "message": {
                    "type":"object",
                    "properties": {
                        "content": {
                            "type": "string",
                            "description": "mensaje de assistante al usuario sera siempre en el formato: Se ha Filtrado el lote {LoteID} en el visualizador... importante mencionar el visualizador"},
                        "role": {
                            "type": "string",
                            "description": "assistant"}
                    }
                }
            },
            "required": ["elementIds","message"]
        }
    }
]

// system prompt as additional guard rail for function call
export const viewerFunctions_system_prompt = `Si el usuario quiere filtrar lotes o elementos,
                                            el asistent ejecutara la funcion isolate-elements usando los ids de lotes consultados por el usuario.
                                            la funcion no se ejecutara si el usuario pregunta cuantos lotes, o cuales lotes`