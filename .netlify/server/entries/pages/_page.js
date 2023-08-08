import "../../chunks/index.js";
import { s as speckleStream } from "../../chunks/toolStore.js";
const _speckleStream = "aa043c36dd";
async function load({ fetch, params }) {
  speckleStream.set(_speckleStream);
  return { _speckleStream };
}
export {
  load
};
