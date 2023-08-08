import { w as writable, r as readable } from "./index.js";
const speckleViewer = writable({
  speckleViewer: null
});
const finishLoading = writable(false);
const speckleStream = writable("xxxx");
const currentSelection = writable(null);
readable([
  {
    name: "family",
    value: true
  },
  {
    name: "units",
    value: true
  }
]);
const viewerLotes = writable([]);
const currentLote = writable(null);
const currentProto = writable(null);
const sidebar_show = writable(false);
const colorValueDisponibility = writable({
  Disponible: 7323750,
  Ocupado: 12609135,
  Reservado: 6713280
});
const servicesAvailable = readable(["Agua", "Electricidad", "Red Sanitaria"]);
const servicesSelected = writable(["Agua"]);
const parkOperationCalendarID = readable("c_aaf71807274436569a51ea7e5cd5ba450cf11c70c083ac632a68cc4b9ff60dfc@group.calendar.google.com");
const chatMessages = writable([]);
export {
  speckleViewer as a,
  sidebar_show as b,
  colorValueDisponibility as c,
  servicesSelected as d,
  currentSelection as e,
  finishLoading as f,
  chatMessages as g,
  currentProto as h,
  currentLote as i,
  servicesAvailable as j,
  parkOperationCalendarID as p,
  speckleStream as s,
  viewerLotes as v
};
