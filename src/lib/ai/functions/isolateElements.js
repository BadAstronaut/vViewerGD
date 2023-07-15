//usando LoteID para denominar los ides de los elementos. luego generalizar. 


export const viewerFunctions = [
    {
        "name": 'isolate-elements',
        "description": 'filtra los elements del modelo por id de elementos. el agente genera lista de ids segun requerimientos de usuario',
        "parameters": {
            "type": "object",
            "properties": {
                "elementIds": {
                    "type": 'array',
                    "items": {
                        "type": "string",
                        "description": "id de elementos en el modelo "
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
                                            el asistente ejecutara la funcion isolate-elements usando los ids de LotesIds consultados por el usuario.`