//usando LoteID para denominar los ides de los elementos. luego generalizar. 


export const viewerFunctions = [
    {
        "name": 'filter-by-conditions',
        "description": `La función se ejecutará únicamente cuando el usuario desee 'filtrar' en su prompt. El asistente generara los inputs categoryName, propertyName, propertyValue, condition para ejecutar la funcion.`,
        "parameters": {
            "type": "object",
            "properties": {
                "filterConditions": {
                    "type": 'object',
                    "properties": {
                        "categoryName": {
                            "type": "string",
                            "description": "representa la categoria de los elementos que se quiere filtrar. Ejemplos; {category: 'LoteID'}, {category: 'Muros'}, {category: 'Puertas'}"},
                        "propertyName": {
                            "type": "string",
                            "description": "mensaje de assistante al usuario sera siempre en el formato: Se ha Filtrado el lote {LoteID} en el visualizador... importante mencionar el visualizador"},
                        "propertyValue": {
                            "type": "string",
                            "description": "representa el valor de la propiedad que se quiere filtrar. Ejemplos; {propertyName: 'LoteID', propertyValue: 'Lote 1'}, {propertyName: 'LoteID', propertyValue: 'Lote 2'}, en case de solicitar el mas grande usar max, en caseo de prompt mas pequeño o menor usar min"},
                        "condition": {  
                            "type": "string",
                            "description": " Considera solo uno de los siguientes valores como condicional la funcion filtre data: ['equal', 'notEqual', 'greater', 'less', 'greaterThanOrEqual', 'lessThanOrEqual', 'includes', 'notIncludes', 'startsWith', 'endsWith']"}
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
            "required": ["filterConditions","message"]
        }
    },
    {
        "name": 'control-camera',
        "description": `La función se ejecutará únicamente cuando el usuario solicite cambiar la vista actual. El asistente identificara una de las siguientes opciones: 'front', 'back', 'up', 'top', 'down', 'bottom', 'right', 'left', '3d'`,
        "parameters": {
            "type": "object",
            "properties": {
                "view": {
                    "type": 'string',
                    "description": ` El asistente identificara una de las siguientes opciones segun el prompt del usuario: 'front', 'back', 'up', 'top', 'down', 'bottom', 'right', 'left', '3d'. Esta opcion sera pasada como imput a la funcion`
                },
                "message": {
                    "type":"object",
                    "properties": {
                        "content": {
                            "type": "string",
                            "description": "mensaje de assistante al usuario sera siempre en el formato: cambiando a vista {view}"},
                        "role": {
                            "type": "string",
                            "description": "assistant"}
                    }
                }
            },
            "required": ["view","message"]
        }
    }
]

// system prompt as additional guard rail for function call
//this function will need to be change to not recive elements ids but parameters , values and condtions to filter elements
export const viewerFunctions_system_prompt = `Si el usuario quiere filtrar lotes o elementos,
                                            el asistent ejecutara la funcion isolate-elements usando los ids de lotes consultados por el usuario.
                                            la funcion no se ejecutara si el usuario pregunta cuantos lotes, o cuales lotes`

// system prompt as additional guard rail for function call
export const viewerView_system_prompt = `Si el usuario requiere cambiar la vista del visualizador. ejemplos: {user: "cambiar a vista frontal", assistant: "cambiando a vista frontal {view}=front"}, {user: "cambiar a vista superior", assistant: "cambiando a vista superior {view}=top", {user: "cambiar a vista 3d", assistant: "cambiando a vista 3d {view}=3d", {user: "cambiar a vista de abajo", assistant: "cambiando a vista de abajo {view}=bottom"}`
