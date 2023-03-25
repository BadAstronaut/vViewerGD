export function ProcessSafetyData(rawData) {
    console.log(rawData, 'rawData from dalux');
    const items = rawData.items;
    //we will iterate over the items and filter out the ones with type = 'safety'
    const safetyData = items.filter(item => item.type === 'safety');
    const outObject = {
        safetyData: safetyData,
        processed: true,
        cumplimiento: 0,
        noCumplimiento: 0,
        total: 0,
        abiertas:0,
    }
    return outObject;
}