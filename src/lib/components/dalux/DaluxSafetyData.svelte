<script>
import { onMount } from 'svelte';

//implent on mount 
onMount(async () => {
  const response = fetch('/api/dalux/safetyDataForms')
                  .then((res) => console.log(res, 'res from dalux api test'))
                  //.then((data) => console.log(data, 'data from dalux api test'));
  //let data = await fetchData();
  console.log(response, 'data from dalux api test');
  
});
//implement a function to fetch data from the api using the fetch api
function fetchData () {
   fetch("https://field.dalux.com/service/api/1.1/7852287459/forms", {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'X-API-KEY': "a88d758-878e-43f1-8132-25855ff7b183"
        }
    })
  .then(response => response.json())
  .then(data => console.log(data, 'data from dalux api test'));
}

</script>