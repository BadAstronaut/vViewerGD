<script>
import './../../../css/styles.css'
import { onMount } from 'svelte';
import { get } from 'svelte/store';
import {daluxSafetyDataActiveProject} from '../../../stores/toolStore';
//table import 
import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
import Tooltip, { Wrapper } from '@smui/tooltip';


//implent on mount 
let data = false
daluxSafetyDataActiveProject.subscribe((v) => {
  data = v;
  console.log('data from dalux api test', data);
});

const colorMap = {
  'Green': '#a7d69f',
  'Yellow': '#f5f591',
  'Red': '#f2635b',
}
onMount(async () => {
  // const response = fetch('/api/dalux/safetyDataForms')
  //                 .then((res) => console.log(res, 'res from dalux api test'))
  //                 //.then((data) => console.log(data, 'data from dalux api test'));
  data = await fetchData();
  //console.log(data.summaryTableObjects[0].items, 'data from dalux api test');
  daluxSafetyDataActiveProject.set(data);
  
});
//implement a function to fetch data from the api using the fetch api
async function fetchData () {
   const r =await fetch(`/api/dalux/safetyDataForms/?buildingName=Eterna`)
  .then(response => response.json())

  return r
}

function processColumnStringLength (string) {
  if (string.length > 5) {
    return string.substring(0, 7) + '...'
  } else {
    return string
  }
}

function mapColorPerRow(row) {
  let color = '#a7d69f';
  
  let marker = `<div id="marker" class="marker" />`
  if (row == 'Green') {
    color= '#a7d69f'
  } else if (row == 'Yellow') {
    color= '#f5f591'
  } else if (row == 'Red') {
    color= '#f2635b'
  } else if (row == 'Transparent') {
    color= '#ebf7f5'
  }
  console.log(marker, 'row from map color')
  return color
}

</script>
<div class="table neomorfic-div">
  <DataTable table$aria-label="People list" style="max-width: 100%; opacity:0.8">
    <Head>
      <Row class='safety-row'>
        <Cell class='header-cell'>Building</Cell>
        <Cell class='header-cell'>Status</Cell>
        <!-- here we create programatically more elements fo each test -->
        {#if data}
            {#each data.summaryTableObjects[0].items as vals}
              <Cell class='header-cell'>{processColumnStringLength(vals[0])}</Cell>
            {/each}
        {/if} 
      </Row>
    </Head>
    <Body>
      
        {#if data}
          {#each data.summaryTableObjects as objectArray}
          <Row class='safety-row'>
            <Cell class='row-cell'>{objectArray.building}</Cell>
            <Cell class='row-cell'>{objectArray.status}</Cell>
            {#each objectArray.items as vals}
            <Wrapper>
              <Cell class='row-cell'>
                <div  id="marker" class="marker" style="background-color:{mapColorPerRow(vals[1])}"/>
                <Tooltip>{vals[0]}</Tooltip>
              </Cell>
            </Wrapper>
            {/each}
          </Row>
          {/each}
        {/if} 
    </Body>
  </DataTable>
</div>


<style>
  :global(.safety-row){
    padding: 2px;
    margin: 0px;
    height: 5px;
  }
  :global(.header-cell) {
    font-weight: bold;
    font-size: 0.5em;
    padding: 2px;
    margin: 0px;
  }
  :global(.row-cell) {
    font-size: 0.5em;
    padding: 2px;
    margin: 0px;
  }
  :global(.cell-rotated) {
    transform-origin: 0 0;
    transform: rotate(-90deg);
    min-height: 50px;
  }
  .table {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    margin-left: 5px;
  }
  .marker {
    width: 10px;
    height: 10px;
    background-color: green;
    opacity: 0.5;
    border-radius: 50%;
    z-index: 1;
  }
</style>