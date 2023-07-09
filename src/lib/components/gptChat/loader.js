import { Circle2 } from 'svelte-loading-spinners';
//size="60" color="#FF3E00" unit="px" duration="1.5s"
export const loader = (node, loading) => {
	let Spin, loadingValue;
	const unsubscribe = loading.subscribe(loading => {
		if(loading){
			Spin = new Circle2({
				target: node,
				intro: true,
                props: {
                    size: 30,
                    unit: "px",
                    duration: "1.5s"
                }

			})
            //console.log("Spin", Spin)
		} else {
			if(Spin){
				Spin?.$destroy?.()
				Spin = undefined;
			}
		}
	})
}