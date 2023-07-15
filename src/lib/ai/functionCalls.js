//here we will create class that takes the name of the function that needs to execute 
//and calls it based on its name. all the functions will be in this file 

//and will be called from here.
export function functionOrchestrator(data) {
    console.log(data, 'functionName from orchestrator');
    try {
        const functionName= data.message.choices[0].message.function_call.name;
        const { elementIds, message } = JSON.parse(data.message.choices[0].message.function_call.arguments);
        switch (functionName) {
            case 'isolate-elements':
                return isolateElements(elementIds, message.content);
            default:
                return 'no function found';
        }
    }
    catch (error) {
        console.log(error, 'error in function orchestrator');
        return 'Profavor repite la pregunta de forma distinta...';
    }

    
}

//functions 
function isolateElements(elementIds, message ) {
    //const { elementIds, message } = parameters;
    console.log(elementIds, 'no way this runs .... elementIds');
   // return filteredElements;
    return message;
}
