//here we will create class that takes the name of the function that needs to execute 
//and calls it based on its name. all the functions will be in this file 
import { colorById, lookTopView, resetViewerFilters, lookView, filterByPromptConditions } from '$lib/speckle/speckleHandler.js';
//and will be called from here.
export function functionOrchestrator(data) {
    console.log(data, 'functionName from orchestrator');
    try {
        const functionName = data.message.choices[0].message.function_call.name;
        const functionArguments = JSON.parse(data.message.choices[0].message.function_call.arguments);
        switch (functionName) {
            case 'filter-by-conditions':
                console.log(functionArguments, 'isolate orchestration oooonnnnnnn');
                let elementIds =  filterByConditions(functionArguments.filterConditions.categoryName, functionArguments.filterConditions.propertyName, functionArguments.filterConditions.propertyValue, functionArguments.filterConditions.condition);
                return functionArguments.message.content
            case 'control-camera':
                //console.log(funtionArguments, 'arguments view from orchestration');
                return controlCamera(functionArguments.view, functionArguments.message.content);
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
// function isolateElements(elementIds, message) {
//     //const { elementIds, message } = parameters;
//     console.log(elementIds, 'elements ids from orchestration elementIds');
//     colorById(elementIds, 0xff0000);
//     lookTopView();
//     // return filteredElements;
//     return message;
// }

export function controlCamera(view, message) {
    console.log(view, 'view from orchestration  control view.......view');
    const viewName =
        lookView(view);
    return message;
}
//this function will take the function calll condition and execute the filter isolation based on this input. 
function filterByConditions(categoryName, propertyName, propertyValue, condition) {
    const validCategory = validateCategory(categoryName);
    const validParameter = validateParameter(propertyName);
    console.log(validCategory, validParameter, 'valid category from filter by conditions');
    if (!validCategory) {
        return 'no category found';
    }
    else{ 
        const filteredElements =  filterByPromptConditions(validCategory, validParameter, propertyValue, condition);
        return filteredElements;
    }
}

function validateCategory(categoryName) {
    //extract to an interface or something later on . 
    const categories = [{"Emplazamiento":["lotes", "lote", "emplazamiento"]}, {"Muro":["muro"]}];

    //console.log(categoryName, 'category name from validate category');
    let foundCategory = null;

    categories.some(category => {
        const key = Object.keys(category)[0];  // get the key
        const values = category[key];  // get the array of values

        // check if the categoryName is included in the values
        if(values.includes(categoryName.toLowerCase())) {
            foundCategory = key;
            return true;  // stop the iteration
        }
    });

    return foundCategory;
}

function validateParameter(parameterName) {
    //extract to an interface or something later on . 
    const parameters = [{"LoteID":["loteid","id","numero"]} , {"Servicios":["servicios","servicio"]}];

    //console.log(categoryName, 'category name from validate category');
    let foundParameter = null;

    parameters.some(parameter => {
        const key = Object.keys(parameter)[0];  // get the key
        const values = parameter[key];  // get the array of values

        // check if the categoryName is included in the values
        if(values.includes(parameterName.toLowerCase())) {
            foundParameter = key;
            return true;  // stop the iteration
        }
    });

    return foundParameter;
}
