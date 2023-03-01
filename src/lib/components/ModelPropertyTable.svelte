<script>
    import { get, writable } from 'svelte/store';
    import { onMount } from 'svelte';
    import { selectionPropertiesOfInterest, currentSelection } from '../../stores/toolStore';

	let columns = ['Property', 'Value'];
    //read values from selectionPropertiesOfInterest
    let propertiesToRender = get(selectionPropertiesOfInterest);
    //get the name value of the propertiesToRender array of objects
    let propertiesToRenderNames = propertiesToRender.map((property) => property.name);

    let bimRows = [];

    //listen to changes tin currentSelection only if the currentSelection is not null
    currentSelection.subscribe((data) => {
        console.log('data..............', data);
        if (data != null && data.length > 0) {
            //get the first element of the array of objects
            let selectedElement = data[0];
            //filter the first element of array of objects based on the propertiesToRender array of objects
            let filteredData = filterData(selectedElement);
            console.log('filteredData', [filteredData]);
            
            bimRows = filteredData;
        }
        else
        {
            bimRows = [];
        }
    });



    

	let data = [
		['John', 'john@example.com'],
		['Mark', 'mark@gmail.com'],
		['Eoin', 'eoin@gmail.com'],
		['Sarah', 'sarahcdd@gmail.com'],
		['Afshin', 'afshin@mail.com']
	];
	let newRow = [];

	function addRow() {
		data = [...data, [...newRow]];
		newRow = columns;
	}

	function deleteRow(rowToBeDeleted) {
		data = data.filter((row) => row != rowToBeDeleted);
	}
    
    //create a function that filter the first element of array of objects based on the propertiesToRender array of objects
    function filterData(selectedElement) {
        console.log('selectedElement', selectedElement);
        let propValPairs = [];
        //loop through the propertiesToRenderNames array of strings
        propertiesToRenderNames.forEach((property) => {
            //get the value of the property from the selectedElement object
            let propertyValue = selectedElement[property];
            //push the property name and value to the propValPairs array of objects
            propValPairs.push([property, propertyValue ]);
        });

        return propValPairs;
        
    }
</script>

<table>
	<tr>
		{#each columns as column}
			<th>{column}</th>
		{/each}
	</tr>

	{#each bimRows as row}
		<tr>
			{#each row as cell}
				<td contenteditable="false" bind:innerHTML={cell} />
			{/each}
			<!-- <button on:click={() => deleteRow(row)}>
				X
			</button> -->
		</tr>
	{/each}

	<tr class="new">
		{#each newRow as column}
			<td contenteditable="true" bind:innerHTML={column} />
		{/each}
		<!-- <button on:click={addRow}>
	add
</button> -->
	</tr>
</table>

<style>
    table {
        border-collapse: collapse; /* collapse borders */
        width: 100%; /* set table width to 100% */
        border: 1px solid #ccc; /* add border color #ccc */
        font-family: arial, sans-serif; /* set font for table */
    }
    th {
        border: none; /* remove table row border */
		height: 32px; /* set row height */
		font-size: 16px; /* set font size */
    }
	tr {
		border: none; /* remove table row border */
		height: 32px; /* set row height */
		font-size: 14px; /* set font size */
        max-height: 32px;
	}

	/* Set different background colors for even and odd rows */
	tr:nth-child(even) {
		background-color: #f5f5f5;
	}

	/* Add hover effect */
	tr:hover {
		background-color: #e0e0e0;
	}
</style>
