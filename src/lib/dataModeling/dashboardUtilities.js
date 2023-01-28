

export function getKPIVariation(kpiValue){
    //if kpi value is negative 
    const kpiVariation = {
        kpiVariationDirection: kpiValue < 0 ? 'down' : 'up',
        kpiPercentage: (kpiValue * 100).toString()+'%',
        kpiDescription: 'Semana Previa',
        kpiIcon: ''
    }
    if (kpiValue < 0) {
        kpiVariation.kpiIcon = '/icons/kpis/down.svg'
    }
    else{
        kpiVariation.kpiIcon = '/icons/kpis/up.svg'
    }
    return kpiVariation

}