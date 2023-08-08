import { b as get_store_value, c as create_ssr_component, d as add_attribute, a as subscribe, v as validate_component, e as escape, f as each, n as null_to_empty } from "../../chunks/index2.js";
import { Matrix4, Ray, Sphere, Vector3, Vector2, Euler, Vector4, DoubleSide, BufferGeometry, Uint32BufferAttribute, Uint16BufferAttribute, Float32BufferAttribute, FrontSide, Box3, Mesh, DataTexture, RGBAFormat, FloatType, Box3Helper, Color, BackSide, Triangle, UniformsUtils, ShaderLib, PointsMaterial, InstancedInterleavedBuffer, InterleavedBufferAttribute, BufferAttribute, MeshStandardMaterial, MeshBasicMaterial, MeshDepthMaterial, MeshNormalMaterial } from "three";
import "@speckle/objectloader";
import Oe from "js-logger";
import "camera-controls";
import "hold-event";
import { MeshBVH, ExtendedTriangle, CENTER } from "three-mesh-bvh";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import "string-to-color";
import "tree-model";
import { a as speckleViewer, f as finishLoading, b as sidebar_show, v as viewerLotes, c as colorValueDisponibility, d as servicesSelected, e as currentSelection, g as chatMessages, h as currentProto, i as currentLote, j as servicesAvailable, s as speckleStream, p as parkOperationCalendarID } from "../../chunks/toolStore.js";
import { w as writable } from "../../chunks/index.js";
import { io } from "socket.io-client";
import { Chart, registerables } from "chart.js";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
const Re = "/_app/immutable/assets/sample-hdri~yYXmdDgx.30434853.png";
var tt;
!function(e) {
  e.TEXTURE_8BPP = "png", e.TEXTURE_HDR = "hdr", e.TEXTURE_EXR = "exr";
}(tt || (tt = {}));
({ showStats: false, verbose: false, keepGeometryData: false, environmentSrc: { src: Re, type: tt.TEXTURE_EXR } });
var nt;
!function(e) {
  e.ObjectClicked = "object-clicked", e.ObjectDoubleClicked = "object-doubleclicked", e.DownloadComplete = "download-complete", e.LoadComplete = "load-complete", e.LoadProgress = "load-progress", e.UnloadComplete = "unload-complete", e.LoadCancelled = "load-cancelled", e.UnloadAllComplete = "unload-all-complete", e.Busy = "busy", e.SectionBoxChanged = "section-box-changed", e.SectionBoxUpdated = "section-box-updated", e.FilteringStateSet = "filtering-state-set", e.LightConfigUpdated = "light-config-updated";
}(nt || (nt = {}));
let lt;
!function(e) {
  e[e.NONE = 0] = "NONE", e[e.ROTATE = 1] = "ROTATE", e[e.TRUCK = 2] = "TRUCK", e[e.OFFSET = 3] = "OFFSET", e[e.DOLLY = 4] = "DOLLY", e[e.ZOOM = 5] = "ZOOM", e[e.TOUCH_ROTATE = 6] = "TOUCH_ROTATE", e[e.TOUCH_TRUCK = 7] = "TOUCH_TRUCK", e[e.TOUCH_OFFSET = 8] = "TOUCH_OFFSET", e[e.TOUCH_DOLLY = 9] = "TOUCH_DOLLY", e[e.TOUCH_ZOOM = 10] = "TOUCH_ZOOM", e[e.TOUCH_DOLLY_TRUCK = 11] = "TOUCH_DOLLY_TRUCK", e[e.TOUCH_DOLLY_OFFSET = 12] = "TOUCH_DOLLY_OFFSET", e[e.TOUCH_ZOOM_TRUCK = 13] = "TOUCH_ZOOM_TRUCK", e[e.TOUCH_ZOOM_OFFSET = 14] = "TOUCH_ZOOM_OFFSET";
}(lt || (lt = {}));
var Tt;
!function(e) {
  e[e.MESH = 0] = "MESH", e[e.LINE = 1] = "LINE", e[e.POINT = 2] = "POINT", e[e.POINT_CLOUD = 3] = "POINT_CLOUD";
}(Tt || (Tt = {}));
var Mt;
!function(e) {
  e.POSITION = "POSITION", e.COLOR = "COLOR", e.NORMAL = "NORMAL", e.UV = "UV", e.TANGENT = "TANGENT", e.INDEX = "INDEX";
}(Mt || (Mt = {}));
class Rt {
  static updateRTEGeometry(e, t) {
    if ("BufferGeometry" === e.type || "PlaneGeometry" === e.type) {
      const i = new Float32Array(t.length), r = e.attributes.position.array;
      Rt.DoubleToHighLowBuffer(t, i, r), e.setAttribute("position_low", new Float32BufferAttribute(i, 3));
    } else if ("LineGeometry" === e.type || "LineSegmentsGeometry" === e.type) {
      const i = new Float32Array(t.length), n = e.attributes.instanceStart.array;
      Rt.DoubleToHighLowBuffer(t, i, n);
      const a = new InstancedInterleavedBuffer(new Float32Array(i), 6, 1);
      e.setAttribute("instanceStartLow", new InterleavedBufferAttribute(a, 3, 0)), e.setAttribute("instanceEndLow", new InterleavedBufferAttribute(a, 3, 3));
    }
  }
  static mergeGeometryAttribute(e, t) {
    let i = 0;
    for (let n = 0; n < e.length; n++)
      t.set(e[n], i), i += e[n].length;
    return t;
  }
  static mergeIndexAttribute(e, t) {
    let i = 0;
    const n = [];
    for (let r = 0; r < e.length; ++r) {
      const s = e[r];
      for (let e2 = 0; e2 < s.length; ++e2)
        n.push(s[e2] + i);
      i += t.length;
    }
    return n;
  }
  static mergeGeometryData(e) {
    const t = e[0].attributes, i = { attributes: {}, bakeTransform: null, transform: null };
    for (let t2 = 0; t2 < e.length; t2++)
      e[t2].bakeTransform && Rt.transformGeometryData(e[t2], e[t2].bakeTransform);
    if (t[Mt.INDEX]) {
      const t2 = e.map((e2) => e2.attributes[Mt.INDEX]), n = e.map((e2) => e2.attributes[Mt.POSITION]);
      i.attributes[Mt.INDEX] = Rt.mergeIndexAttribute(t2, n);
    }
    for (const n in t)
      if (n !== Mt.INDEX) {
        const t2 = e.map((e2) => e2.attributes[n]);
        i.attributes[n] = Rt.mergeGeometryAttribute(t2, n === Mt.POSITION ? new Float64Array(t2.reduce((e2, t3) => e2 + t3.length, 0)) : new Float32Array(t2.reduce((e2, t3) => e2 + t3.length, 0)));
      }
    return e.forEach((e2) => {
      for (const t2 in e2.attributes)
        delete e2.attributes[t2];
    }), i;
  }
  static transformGeometryData(e, t) {
    if (!e.attributes.POSITION)
      return;
    const i = t.elements;
    for (let t2 = 0; t2 < e.attributes.POSITION.length; t2 += 3) {
      const n = e.attributes.POSITION[t2], r = e.attributes.POSITION[t2 + 1], s = e.attributes.POSITION[t2 + 2], a = 1 / (i[3] * n + i[7] * r + i[11] * s + i[15]);
      e.attributes.POSITION[t2] = (i[0] * n + i[4] * r + i[8] * s + i[12]) * a, e.attributes.POSITION[t2 + 1] = (i[1] * n + i[5] * r + i[9] * s + i[13]) * a, e.attributes.POSITION[t2 + 2] = (i[2] * n + i[6] * r + i[10] * s + i[14]) * a;
    }
  }
  static unpackColors(e) {
    const t = new Array(3 * e.length);
    for (let i = 0; i < e.length; i++) {
      const n = e[i], r = n >> 16 & 255, s = n >> 8 & 255, a = 255 & n;
      t[3 * i] = r / 255, t[3 * i + 1] = s / 255, t[3 * i + 2] = a / 255;
    }
    return t;
  }
  static DoubleToHighLowVector(e, t, i) {
    let n = e.x;
    if (n >= 0) {
      this.floatArrayBuff[0] = n;
      const e2 = this.floatArrayBuff[0];
      i.x = e2, t.x = n - e2;
    } else {
      this.floatArrayBuff[0] = -n;
      const e2 = this.floatArrayBuff[0];
      i.x = -e2, t.x = n + e2;
    }
    if (n = e.y, n >= 0) {
      this.floatArrayBuff[0] = n;
      const e2 = this.floatArrayBuff[0];
      i.y = e2, t.y = n - e2;
    } else {
      this.floatArrayBuff[0] = -n;
      const e2 = this.floatArrayBuff[0];
      i.y = -e2, t.y = n + e2;
    }
    if (n = e.z, n >= 0) {
      this.floatArrayBuff[0] = n;
      const e2 = this.floatArrayBuff[0];
      i.z = e2, t.z = n - e2;
    } else {
      this.floatArrayBuff[0] = -n;
      const e2 = this.floatArrayBuff[0];
      i.z = -e2, t.z = n + e2;
    }
  }
  static DoubleToHighLowBuffer(e, t, i) {
    for (let n = 0; n < e.length; n++) {
      const r = e[n];
      if (r >= 0) {
        this.floatArrayBuff[0] = r;
        const e2 = this.floatArrayBuff[0];
        i[n] = e2, t[n] = r - e2;
      } else {
        this.floatArrayBuff[0] = -r;
        const e2 = this.floatArrayBuff[0];
        i[n] = -e2, t[n] = r + e2;
      }
    }
  }
  static computeVertexNormals(e, i) {
    const n = e.index, r = e.getAttribute("position");
    if (void 0 !== r) {
      let s = e.getAttribute("normal");
      if (void 0 === s)
        s = new BufferAttribute(new Float32Array(3 * r.count), 3), e.setAttribute("normal", s);
      else
        for (let e2 = 0, t = s.count; e2 < t; e2++)
          s.setXYZ(e2, 0, 0, 0);
      const o = new Vector3(), l = new Vector3(), h = new Vector3(), c = new Vector3(), d = new Vector3(), u = new Vector3(), p = new Vector3(), m = new Vector3();
      if (n)
        for (let e2 = 0, t = n.count; e2 < t; e2 += 3) {
          const t2 = n.getX(e2 + 0), r2 = n.getX(e2 + 1), a = n.getX(e2 + 2);
          o.fromArray(i, 3 * t2), l.fromArray(i, 3 * r2), h.fromArray(i, 3 * a), p.subVectors(h, l), m.subVectors(o, l), p.cross(m), c.fromBufferAttribute(s, t2), d.fromBufferAttribute(s, r2), u.fromBufferAttribute(s, a), c.add(p), d.add(p), u.add(p), s.setXYZ(t2, c.x, c.y, c.z), s.setXYZ(r2, d.x, d.y, d.z), s.setXYZ(a, u.x, u.y, u.z);
        }
      else
        for (let e2 = 0, t = r.count; e2 < t; e2 += 3)
          o.fromArray(i, 3 * e2), l.fromArray(i, 3 * e2 + 1), h.fromArray(i, 3 * e2 + 2), p.subVectors(h, l), m.subVectors(o, l), p.cross(m), s.setXYZ(e2 + 0, p.x, p.y, p.z), s.setXYZ(e2 + 1, p.x, p.y, p.z), s.setXYZ(e2 + 2, p.x, p.y, p.z);
      e.normalizeNormals(), s.needsUpdate = true;
    }
  }
}
Rt.floatArrayBuff = new Float32Array(1);
const Pt = { strategy: CENTER, maxDepth: 40, maxLeafTris: 10, verbose: true, useSharedArrayBuffer: false, setBoundingBox: false, onProgress: null, [Symbol("skip tree generation")]: false };
class Ot extends MeshBVH {
  static buildBVH(e, t, i = Pt) {
    const r = new BufferGeometry();
    let s = null;
    t.length >= 65535 || e.length >= 65535 ? (s = new Uint32Array(e.length), s.set(e, 0), r.setIndex(new Uint32BufferAttribute(s, 1))) : (s = new Uint16Array(e.length), s.set(e, 0), r.setIndex(new Uint16BufferAttribute(s, 1))), r.setAttribute("position", new Float32BufferAttribute(t, 3)), r.computeBoundingBox();
    return new Ot(r, i);
  }
  constructor(e, t = {}) {
    super(e, t);
  }
  raycast(e, t = FrontSide) {
    const i = super.raycast(this.transformInput(e), t);
    return i.forEach((e2) => {
      e2.point = this.transformOutput(e2.point);
    }), i;
  }
  raycastFirst(e, t = FrontSide) {
    const i = super.raycastFirst(this.transformInput(e), t);
    return i.point = this.transformOutput(i.point), i;
  }
  shapecast(e) {
    const t = new Box3(), i = new ExtendedTriangle(), n = /* @__PURE__ */ Object.create(null);
    return e.intersectsBounds && (n.intersectsBounds = (i2, n2, r, s, a) => (t.copy(i2), this.transformOutput(t), e.intersectsBounds(t, n2, r, s, a))), e.intersectsTriangle && (n.intersectsTriangle = (t2, n2, r, s) => (i.copy(t2), this.transformOutput(i.a), this.transformOutput(i.b), this.transformOutput(i.c), e.intersectsTriangle(i, n2, r, s))), n.intersectsRange = e.intersectsRange, n.traverseBoundsOrder = e.traverseBoundsOrder, super.shapecast(n);
  }
  transformInput(e) {
    return Ot.MatBuff.copy(this.inputOriginTransform).premultiply(this.inputTransform), e.applyMatrix4(Ot.MatBuff);
  }
  transformOutput(e) {
    return Ot.MatBuff.copy(this.outputOriginTransfom).multiply(this.outputTransform), e.applyMatrix4(Ot.MatBuff);
  }
  getBoundingBox(e) {
    return super.getBoundingBox(e), this.transformOutput(e);
  }
}
Ot.MatBuff = new Matrix4();
class Et {
  constructor(e) {
    this.batchObjects = [], this.bounds = new Box3(new Vector3(0, 0, 0), new Vector3(0, 0, 0)), this.boxHelpers = [], this.tas = null, this.lastRefitTime = 0, this.batchObjects = e, this.buildTAS(), this.getBoundingBox(this.bounds);
  }
  buildTAS() {
    const e = [], t = new Float32Array(3 * Et.CUBE_VERTS * this.batchObjects.length);
    let i = 0;
    for (let n = 0; n < this.batchObjects.length; n++) {
      const r = this.batchObjects[n].bvh.getBoundingBox(new Box3());
      if (this.updateVertArray(r, i, t), e.push(...Et.cubeIndices.map((e2) => e2 + i / 3)), this.batchObjects[n].tasVertIndexStart = i / 3, this.batchObjects[n].tasVertIndexEnd = i / 3 + Et.CUBE_VERTS, i += 3 * Et.CUBE_VERTS, Et.debugBoxes) {
        const e2 = new Box3Helper(r);
        e2.layers.set(Pn.PROPS), this.boxHelpers.push(e2);
      }
    }
    this.tas = Ot.buildBVH(e, t), this.tas.inputTransform = new Matrix4(), this.tas.outputTransform = new Matrix4(), this.tas.inputOriginTransform = new Matrix4(), this.tas.outputOriginTransfom = new Matrix4();
  }
  updateVertArray(e, t, i) {
    i[t] = e.min.x, i[t + 1] = e.min.y, i[t + 2] = e.max.z, i[t + 3] = e.max.x, i[t + 4] = e.min.y, i[t + 5] = e.max.z, i[t + 6] = e.max.x, i[t + 7] = e.max.y, i[t + 8] = e.max.z, i[t + 9] = e.min.x, i[t + 10] = e.max.y, i[t + 11] = e.max.z, i[t + 12] = e.min.x, i[t + 13] = e.min.y, i[t + 14] = e.min.z, i[t + 15] = e.max.x, i[t + 16] = e.min.y, i[t + 17] = e.min.z, i[t + 18] = e.max.x, i[t + 19] = e.max.y, i[t + 20] = e.min.z, i[t + 21] = e.min.x, i[t + 22] = e.max.y, i[t + 23] = e.min.z;
  }
  refit() {
    const e = performance.now(), t = this.tas.geometry.attributes.position.array, i = new Box3();
    for (let e2 = 0; e2 < this.batchObjects.length; e2++) {
      const n = this.batchObjects[e2].tasVertIndexStart, r = this.batchObjects[e2].bvh.getBoundingBox(i);
      this.updateVertArray(r, 3 * n, t), Et.debugBoxes && this.boxHelpers[e2].box.copy(r);
    }
    this.tas.refit(), this.lastRefitTime = performance.now() - e;
  }
  raycast(e, t = FrontSide) {
    const i = [], n = new Ray();
    n.copy(e);
    const r = this.tas.raycast(n, FrontSide);
    return r.length ? (r.forEach((r2) => {
      const s = this.tas.geometry.index.array[3 * r2.faceIndex], a = Math.trunc(s / Et.CUBE_VERTS);
      n.copy(e);
      const o = this.batchObjects[a].bvh.raycast(n, t);
      o.forEach((e2) => {
        e2.batchObject = this.batchObjects[a];
      }), i.push(...o);
    }), i) : i;
  }
  raycastFirst(e, t = FrontSide) {
    const i = new Ray();
    i.copy(e);
    const n = this.tas.raycastFirst(i, FrontSide);
    if (!n)
      return null;
    const r = this.tas.geometry.index.array[3 * n.faceIndex], s = Math.trunc(r / Et.CUBE_VERTS);
    i.copy(e);
    const a = this.batchObjects[s].bvh.raycast(i, t);
    a.forEach((e2) => {
      e2.batchObject = this.batchObjects[s];
    }), null.push(...a);
  }
  shapecast(e) {
    let t = false;
    return this.tas.shapecast({ intersectsBounds: (t2, i, n, r, s) => e.intersectsTAS(t2, i, n, r, s), intersectsRange: (i) => {
      const n = this.tas.geometry.index.array[3 * i], r = Math.trunc(n / Et.CUBE_VERTS);
      return t || (t = this.batchObjects[r].bvh.shapecast(((t2) => {
        const i2 = /* @__PURE__ */ Object.create(null);
        return e.intersectsBounds && (i2.intersectsBounds = e.intersectsBounds), e.intersectsTriangle && (i2.intersectsTriangle = (i3, n2, r2, s) => e.intersectsTriangle(i3, n2, r2, s, t2)), i2.intersectsRange = e.intersectsRange, i2.traverseBoundsOrder = e.traverseBoundsOrder, i2;
      })(this.batchObjects[r]))), false;
    } }), t;
  }
  getBoundingBox(e) {
    return this.tas.getBoundingBox(e), e;
  }
}
Et.debugBoxes = false, Et.cubeIndices = [0, 1, 2, 2, 3, 0, 1, 5, 6, 6, 2, 1, 7, 6, 5, 5, 4, 7, 4, 0, 3, 3, 7, 4, 4, 5, 1, 1, 0, 4, 3, 2, 6, 6, 7, 3], Et.CUBE_VERTS = 8;
const Dt = new Matrix4(), Ct = new Ray(), At = new Sphere(), Nt = new Vector3(), It = new Vector3(), Bt = new Vector3(), zt = new Vector3(), Ut = new Vector3(), Vt = new Vector3(), Lt = new Vector3(), Ht = new Vector3(), Ft = new Vector3(), kt = new Vector3(), Gt = new Vector2(), jt = new Vector2(), Wt = new Vector2(), Zt = new Vector3(), qt = new Vector3(), Xt = new Ray(), Yt = new Matrix4();
class Qt extends Mesh {
  get BVH() {
    return this.bvh;
  }
  get batchObjects() {
    return this._batchObjects;
  }
  constructor(e, t) {
    super(e, t), this.bvh = null, this.batchMaterial = null, this.materialCache = {}, this.materialStack = [], this.transformsBuffer = null, this.transformsDirty = true, this.transformsTextureUniform = null, this.transformsArrayUniforms = null, this.debugBatchBox = false, this.batchMaterial = t;
  }
  setBatchObjects(e, t) {
    this._batchObjects = e, this.transformStorage = t, this.transformStorage === Gi.VERTEX_TEXTURE ? (this.transformsBuffer = new Float32Array(4 * this._batchObjects.length * 4), this.transformsTextureUniform = new DataTexture(this.transformsBuffer, this.transformsBuffer.length / 4, 1, RGBAFormat, FloatType)) : this.transformStorage === Gi.UNIFORM_ARRAY && (this.transformsArrayUniforms = this._batchObjects.map(() => new Matrix4())), this.updateTransformsUniform();
  }
  setOverrideMaterial(e) {
    this.materialStack.push(this.material), this.materialCache[e.id] || (this.materialCache[e.id] = e.clone()), this.materialCache[e.id].copy(e), this.material = this.materialCache[e.id], this.material.needsUpdate = true;
  }
  getCachedMaterial(e) {
    return this.materialCache[e.id] ? this.materialCache[e.id].copy(e) : this.materialCache[e.id] = e.clone(), this.materialCache[e.id];
  }
  restoreMaterial() {
    this.materialStack.length > 0 && (this.material = this.materialStack.pop());
  }
  updateMaterialTransformsUniform(e) {
    e.defines.TRANSFORM_STORAGE = this.transformStorage, this.transformStorage === Gi.VERTEX_TEXTURE ? (e.userData.tTransforms.value = this.transformsTextureUniform, e.userData.objCount && (e.userData.objCount.value = this._batchObjects.length)) : this.transformStorage === Gi.UNIFORM_ARRAY && (e.defines.OBJ_COUNT && e.defines.OBJ_COUNT === this._batchObjects.length || (e.defines.OBJ_COUNT = this._batchObjects.length), e.userData.uTransforms.value = this.transformsArrayUniforms), e.needsUpdate = true;
  }
  updateTransformsUniform() {
    this.transformsDirty ? (this.transformStorage === Gi.VERTEX_TEXTURE ? (this._batchObjects.forEach((e) => {
      const t = 16 * e.batchIndex;
      this.transformsBuffer[t] = e.quaternion.x, this.transformsBuffer[t + 1] = e.quaternion.y, this.transformsBuffer[t + 2] = e.quaternion.z, this.transformsBuffer[t + 3] = e.quaternion.w, this.transformsBuffer[t + 4] = e.pivot_Low.x, this.transformsBuffer[t + 5] = e.pivot_Low.y, this.transformsBuffer[t + 6] = e.pivot_Low.z, this.transformsBuffer[t + 7] = e.scale.x, this.transformsBuffer[t + 8] = e.pivot_High.x, this.transformsBuffer[t + 9] = e.pivot_High.y, this.transformsBuffer[t + 10] = e.pivot_High.z, this.transformsBuffer[t + 11] = e.scale.y, this.transformsBuffer[t + 12] = e.translation.x, this.transformsBuffer[t + 13] = e.translation.y, this.transformsBuffer[t + 14] = e.translation.z, this.transformsBuffer[t + 15] = e.scale.z;
    }), this.transformsTextureUniform.needsUpdate = true) : this._batchObjects.forEach((e, t) => {
      this.transformsArrayUniforms[t].set(e.quaternion.x, e.pivot_Low.x, e.pivot_High.x, e.translation.x, e.quaternion.y, e.pivot_Low.y, e.pivot_High.y, e.translation.y, e.quaternion.z, e.pivot_Low.z, e.pivot_High.z, e.translation.z, e.quaternion.w, e.scale.x, e.scale.y, e.scale.z);
    }), this.bvh && (this.bvh.refit(), this.bvh.getBoundingBox(this.bvh.bounds), this.geometry.boundingBox.copy(this.bvh.bounds), this.geometry.boundingBox.getBoundingSphere(this.geometry.boundingSphere), !this.boxHelper && this.debugBatchBox && (this.boxHelper = new Box3Helper(this.bvh.bounds, new Color(16711680)), this.boxHelper.layers.set(Pn.PROPS), this.parent.add(this.boxHelper))), this.transformsDirty = false) : this.bvh && (this.bvh.lastRefitTime = 0);
  }
  buildBVH() {
    this.bvh = new Et(this.batchObjects), this.bvh.tas.refit();
  }
  getBatchObjectMaterial(e) {
    const t = e.renderView, i = this.geometry.groups.find((e2) => t.batchStart >= e2.start && t.batchStart + t.batchCount <= e2.count + e2.start);
    return Array.isArray(this.material) ? i ? this.material[i.materialIndex] : (Oe.warn(`Could not get material for ${e.renderView.renderData.id}`), null) : this.material;
  }
  convertRaycastIntersect(e, t, i) {
    return null === e ? null : (e.point.applyMatrix4(t.matrixWorld), e.distance = e.point.distanceTo(i.ray.origin), e.object = t, e.distance < i.near || e.distance > i.far ? null : e);
  }
  raycast(e, t) {
    if (this.bvh) {
      if (void 0 === this.batchMaterial)
        return;
      Yt.copy(this.matrixWorld).invert(), Xt.copy(e.ray).applyMatrix4(Yt);
      const i = this.bvh;
      if (true === e.firstHitOnly) {
        const n = this.convertRaycastIntersect(i.raycastFirst(Xt, this.batchMaterial), this, e);
        n && t.push(n);
      } else {
        const n = i.raycast(Xt, this.batchMaterial);
        for (let i2 = 0, r = n.length; i2 < r; i2++) {
          const r2 = this.convertRaycastIntersect(n[i2], this, e);
          r2 && t.push(r2);
        }
      }
    } else {
      const i = this.geometry, n = this.material, r = this.matrixWorld;
      if (void 0 === n)
        return;
      if (null === i.boundingSphere && i.computeBoundingSphere(), At.copy(i.boundingSphere), At.applyMatrix4(r), false === e.ray.intersectsSphere(At))
        return;
      if (Dt.copy(r).invert(), Ct.copy(e.ray).applyMatrix4(Dt), null !== i.boundingBox && false === Ct.intersectsBox(i.boundingBox))
        return;
      let s;
      const a = i.index, o = i.attributes.position, l = i.attributes.position_low, h = i.morphAttributes.position, c = i.morphTargetsRelative, d = i.attributes.uv, u = i.attributes.uv2, p = i.groups, m = i.drawRange;
      if (null !== a)
        if (Array.isArray(n))
          for (let i2 = 0, r2 = p.length; i2 < r2; i2++) {
            const r3 = p[i2], f = n[r3.materialIndex];
            for (let i3 = Math.max(r3.start, m.start), n2 = Math.min(a.count, Math.min(r3.start + r3.count, m.start + m.count)); i3 < n2; i3 += 3) {
              const n3 = a.getX(i3), p2 = a.getX(i3 + 1), m2 = a.getX(i3 + 2);
              s = Kt(this, f, e, Ct, l, o, h, c, d, u, n3, p2, m2), s && (s.faceIndex = Math.floor(i3 / 3), s.face.materialIndex = r3.materialIndex, t.push(s));
            }
          }
        else {
          for (let i2 = Math.max(0, m.start), r2 = Math.min(a.count, m.start + m.count); i2 < r2; i2 += 3) {
            const r3 = a.getX(i2), p2 = a.getX(i2 + 1), m2 = a.getX(i2 + 2);
            s = Kt(this, n, e, Ct, l, o, h, c, d, u, r3, p2, m2), s && (s.faceIndex = Math.floor(i2 / 3), t.push(s));
          }
        }
      else if (void 0 !== o)
        if (Array.isArray(n))
          for (let i2 = 0, r2 = p.length; i2 < r2; i2++) {
            const r3 = p[i2], a2 = n[r3.materialIndex];
            for (let i3 = Math.max(r3.start, m.start), n2 = Math.min(o.count, Math.min(r3.start + r3.count, m.start + m.count)); i3 < n2; i3 += 3) {
              s = Kt(this, a2, e, Ct, l, o, h, c, d, u, i3, i3 + 1, i3 + 2), s && (s.faceIndex = Math.floor(i3 / 3), s.face.materialIndex = r3.materialIndex, t.push(s));
            }
          }
        else {
          for (let i2 = Math.max(0, m.start), r2 = Math.min(o.count, m.start + m.count); i2 < r2; i2 += 3) {
            s = Kt(this, n, e, Ct, l, o, h, c, d, u, i2, i2 + 1, i2 + 2), s && (s.faceIndex = Math.floor(i2 / 3), t.push(s));
          }
        }
    }
  }
}
function Kt(e, i, n, r, s, a, o, l, h, c, d, u, p) {
  It.fromBufferAttribute(a, d), Bt.fromBufferAttribute(a, u), zt.fromBufferAttribute(a, p), s && (It.add(Nt.fromBufferAttribute(s, d)), Bt.add(Nt.fromBufferAttribute(s, u)), zt.add(Nt.fromBufferAttribute(s, p)));
  const m = e.morphTargetInfluences;
  if (o && m) {
    Ht.set(0, 0, 0), Ft.set(0, 0, 0), kt.set(0, 0, 0);
    for (let e2 = 0, t = o.length; e2 < t; e2++) {
      const t2 = m[e2], i2 = o[e2];
      0 !== t2 && (Ut.fromBufferAttribute(i2, d), Vt.fromBufferAttribute(i2, u), Lt.fromBufferAttribute(i2, p), l ? (Ht.addScaledVector(Ut, t2), Ft.addScaledVector(Vt, t2), kt.addScaledVector(Lt, t2)) : (Ht.addScaledVector(Ut.sub(It), t2), Ft.addScaledVector(Vt.sub(Bt), t2), kt.addScaledVector(Lt.sub(zt), t2)));
    }
    It.add(Ht), Bt.add(Ft), zt.add(kt);
  }
  e.isSkinnedMesh && (e.boneTransform(d, It), e.boneTransform(u, Bt), e.boneTransform(p, zt));
  const f = function(e2, t, i2, n2, r2, s2, a2, o2) {
    let l2;
    if (l2 = t.side === BackSide ? n2.intersectTriangle(a2, s2, r2, true, o2) : n2.intersectTriangle(r2, s2, a2, t.side !== DoubleSide, o2), null === l2)
      return null;
    qt.copy(o2), qt.applyMatrix4(e2.matrixWorld);
    const h2 = i2.ray.origin.distanceTo(qt);
    return h2 < i2.near || h2 > i2.far ? null : { distance: h2, point: qt.clone(), object: e2, uv: void 0, uv2: void 0, face: void 0 };
  }(e, i, n, r, It, Bt, zt, Zt);
  if (f) {
    h && (Gt.fromBufferAttribute(h, d), jt.fromBufferAttribute(h, u), Wt.fromBufferAttribute(h, p), f.uv = Triangle.getUV(Zt, It, Bt, zt, Gt, jt, Wt, new Vector2())), c && (Gt.fromBufferAttribute(c, d), jt.fromBufferAttribute(c, u), Wt.fromBufferAttribute(c, p), f.uv2 = Triangle.getUV(Zt, It, Bt, zt, Gt, jt, Wt, new Vector2()));
    const e2 = { a: d, b: u, c: p, normal: new Vector3(), materialIndex: 0 };
    Triangle.getNormal(It, Bt, zt, e2.normal), f.face = e2;
  }
  return f;
}
Qt.MeshBatchNumber = 0;
new Matrix4(), new Matrix4(), new Matrix4(), new Euler(), new Vector3(), new Vector3(), new Vector3();
var di;
!function(e) {
  e.View3D = "View3D", e.BlockInstance = "BlockInstance", e.Pointcloud = "Pointcloud", e.Brep = "Brep", e.Mesh = "Mesh", e.Point = "Point", e.Line = "Line", e.Polyline = "Polyline", e.Box = "Box", e.Polycurve = "Polycurve", e.Curve = "Curve", e.Circle = "Circle", e.Arc = "Arc", e.Ellipse = "Ellipse", e.RevitInstance = "RevitInstance", e.Unknown = "Unknown";
}(di || (di = {}));
[di.Pointcloud, di.Brep, di.Mesh, di.Point, di.Line, di.Polyline, di.Box, di.Polycurve, di.Curve, di.Circle, di.Arc, di.Ellipse];
var vi;
new Vector4();
class gi {
  static hashCode(e) {
    let t;
    for (let i = 0; i < e.length; i++)
      t = Math.imul(31, t) + e.charCodeAt(i) | 0;
    return t;
  }
  get renderData() {
    return this._renderData;
  }
  get renderMaterialHash() {
    return this._materialHash;
  }
  get hasGeometry() {
    return this._renderData.geometry && this._renderData.geometry.attributes;
  }
  get speckleType() {
    return this._renderData.speckleType;
  }
  get geometryType() {
    return this._geometryType;
  }
  get batchStart() {
    return this._batchIndexStart;
  }
  get batchEnd() {
    return this._batchIndexStart + this._batchIndexCount;
  }
  get batchCount() {
    return this._batchIndexCount;
  }
  get batchId() {
    return this._batchId;
  }
  get aabb() {
    return this._aabb;
  }
  get transparent() {
    return this._renderData.renderMaterial && this._renderData.renderMaterial.opacity < 1;
  }
  get vertStart() {
    return this._batchVertexStart;
  }
  get vertEnd() {
    return this._batchVertexEnd;
  }
  get needsSegmentConversion() {
    return this._renderData.speckleType === di.Curve || this._renderData.speckleType === di.Polyline || this._renderData.speckleType === di.Polycurve || this.renderData.speckleType === di.Arc || this.renderData.speckleType === di.Circle || this.renderData.speckleType === di.Ellipse;
  }
  get validGeometry() {
    return this._renderData.geometry.attributes.POSITION && this._renderData.geometry.attributes.POSITION.length > 0 && (this._geometryType !== Tt.MESH || this._renderData.geometry.attributes.INDEX && this._renderData.geometry.attributes.INDEX.length > 0);
  }
  constructor(e) {
    this._aabb = null, this._renderData = e, this._geometryType = this.getGeometryType(), this._materialHash = this.getMaterialHash(), this._batchId, this._batchIndexCount, this._batchIndexStart, this._batchVertexStart, this._batchVertexEnd;
  }
  setBatchData(e, t, i, n, r) {
    this._batchId = e, this._batchIndexStart = t, this._batchIndexCount = i, void 0 !== n && (this._batchVertexStart = n), void 0 !== r && (this._batchVertexEnd = r);
  }
  computeAABB() {
    this._aabb = new Box3().setFromArray(this._renderData.geometry.attributes.POSITION);
  }
  getGeometryType() {
    switch (this._renderData.speckleType) {
      case di.Mesh:
      case di.Brep:
        return Tt.MESH;
      case di.Point:
        return Tt.POINT;
      case di.Pointcloud:
        return Tt.POINT_CLOUD;
      default:
        return Tt.LINE;
    }
  }
  disposeGeometry() {
    for (const e in this._renderData.geometry.attributes)
      this._renderData.geometry.attributes[e] = [];
  }
  renderMaterialToString() {
    return this.renderData.renderMaterial.color.toString() + "/" + this.renderData.renderMaterial.opacity.toString() + "/" + this.renderData.renderMaterial.roughness.toString() + "/" + this.renderData.renderMaterial.metalness.toString();
  }
  displayStyleToString() {
    var e;
    return (null === (e = this.renderData.displayStyle.color) || void 0 === e ? void 0 : e.toString()) + "/" + this.renderData.displayStyle.lineWeight.toString();
  }
  getMaterialHash() {
    const e = !this.renderData.renderMaterial || this.geometryType !== Tt.MESH && this.geometryType !== Tt.POINT ? this.renderData.displayStyle && this.geometryType !== Tt.MESH && this.geometryType !== Tt.POINT ? this.displayStyleToString() : "" : this.renderMaterialToString();
    let t = "";
    this.renderData.geometry.attributes && (t = this.renderData.geometry.attributes.COLOR ? "vertexColors" : "");
    const i = this.geometryType.toString() + t + e;
    return gi.hashCode(i);
  }
}
vi = gi, gi.NullRenderMaterialHash = vi.hashCode(Tt.MESH.toString()), gi.NullRenderMaterialVertexColorsHash = vi.hashCode(Tt.MESH.toString() + "vertexColors"), gi.NullDisplayStyleHash = vi.hashCode(Tt.LINE.toString()), gi.NullPointMaterialHash = vi.hashCode(Tt.POINT.toString()), gi.NullPointCloudMaterialHash = vi.hashCode(Tt.POINT_CLOUD.toString()), gi.NullPointCloudVertexColorsMaterialHash = vi.hashCode(Tt.POINT_CLOUD.toString() + "vertexColors");
class wi extends LineMaterial {
  set pixelThreshold(e) {
    this.userData.pixelThreshold.value = e, this.needsUpdate = true;
  }
  constructor(e, i = []) {
    super(e), this.userData.uViewer_high = { value: new Vector3() }, this.userData.uViewer_low = { value: new Vector3() }, this.userData.pixelThreshold = { value: 0 }, this.vertProgram = "\n		#include <common>\n		#include <color_pars_vertex>\n		#include <fog_pars_vertex>\n		#include <logdepthbuf_pars_vertex>\n		#include <clipping_planes_pars_vertex>\n\n		uniform float linewidth;\n		uniform vec2 resolution;\n		uniform float pixelThreshold;\n\n		varying float vAlpha;\n\n		#define SEARCH_STEPS 10\n\n		attribute vec3 instanceStart;\n		attribute vec3 instanceEnd;\n\n		attribute vec4 instanceColorStart;\n		attribute vec4 instanceColorEnd;\n		// varying vec3 debugColor;\n\n		#ifdef WORLD_UNITS\n\n			varying vec4 worldPos;\n			varying vec3 worldStart;\n			varying vec3 worldEnd;\n			varying float correctedLineWidth;\n\n			#ifdef USE_DASH\n\n				varying vec2 vUv;\n\n			#endif\n\n		#else\n\n			varying vec2 vUv;\n\n		#endif\n\n		#ifdef USE_DASH\n\n			uniform float dashScale;\n			attribute float instanceDistanceStart;\n			attribute float instanceDistanceEnd;\n			varying float vLineDistance;\n\n		#endif\n\n        #ifdef USE_RTE\n			attribute vec3 instanceStartLow;\n			attribute vec3 instanceEndLow;\n            uniform vec3 uViewer_high;\n            uniform vec3 uViewer_low;\n        #endif\n\n		void trimSegment( const in vec4 start, inout vec4 end ) {\n\n			// trim end segment so it terminates between the camera plane and the near plane\n\n			// conservative estimate of the near plane\n			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column\n			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column\n			float nearEstimate = - 0.5 * b / a;\n\n			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );\n\n			end.xyz = mix( start.xyz, end.xyz, alpha );\n\n		}\n\n		float screenSpaceDistance(vec4 p0, vec4 p1) {\n			p0 = projectionMatrix * p0;\n			p0 /= p0.w;\n			p1 = projectionMatrix * p1;\n			p1 /= p1.w;\n			return length(p1.xy - p0.xy);\n		}\n\n		vec4 computeRelativePositionSeparate(in vec3 position_low, in vec3 position_high, in vec3 relativeTo_low, in vec3 relativeTo_high){\n			/* \n			Vector calculation for the high and low differences works on everything \n			*BESIDES* Apple Silicon (or whatever they call it) GPUs\n\n			It would seem that when this code gets compiled, vector types get a lower precision(?)\n			which completely brakes the 2 float -> double reconstructio. Doing it separately for each \n			vector component using floats works fine.\n			*/\n			vec3 highDifference;\n			vec3 lowDifference;\n			float t1 = position_low.x - relativeTo_low.x;\n			float e = t1 - position_low.x;\n			float t2 = ((-relativeTo_low.x - e) + (position_low.x - (t1 - e))) + position_high.x - relativeTo_high.x;\n			highDifference.x = t1 + t2;\n			lowDifference.x = t2 - (highDifference.x - t1);\n\n			t1 = position_low.y - relativeTo_low.y;\n			e = t1 - position_low.y;\n			t2 = ((-relativeTo_low.y - e) + (position_low.y - (t1 - e))) + position_high.y - relativeTo_high.y;\n			highDifference.y = t1 + t2;\n			lowDifference.y = t2 - (highDifference.y - t1);\n\n			t1 = position_low.z - relativeTo_low.z;\n			e = t1 - position_low.z;\n			t2 = ((-relativeTo_low.z - e) + (position_low.z - (t1 - e))) + position_high.z - relativeTo_high.z;\n			highDifference.z = t1 + t2;\n			lowDifference.z = t2 - (highDifference.z - t1);\n\n			vec3 position = highDifference.xyz + lowDifference.xyz;\n			return vec4(position, 1.);\n		}\n\n		vec4 computeRelativePosition(in vec3 position_low, in vec3 position_high, in vec3 relativeTo_low, in vec3 relativeTo_high){\n			/* \n			Source https://github.com/virtualglobebook/OpenGlobe/blob/master/Source/Examples/Chapter05/Jitter/GPURelativeToEyeDSFUN90/Shaders/VS.glsl \n			Note here, we're storing the high part of the position encoding inside three's default 'position' attribute buffer so we avoid redundancy \n			*/\n			vec3 t1 = position_low.xyz - relativeTo_low;\n			vec3 e = t1 - position_low.xyz;\n			vec3 t2 = ((-relativeTo_low - e) + (position_low.xyz - (t1 - e))) + position_high.xyz - relativeTo_high;\n			vec3 highDifference = t1 + t2;\n			vec3 lowDifference = t2 - (highDifference - t1);\n			\n			vec3 position = highDifference.xyz + lowDifference.xyz;\n			return vec4(position, 1.);\n		}\n\n		void main() {\n			if(instanceColorStart.w == 0.) {\n				gl_Position = vec4(0.);\n				return;\n			}\n			\n			vAlpha = instanceColorStart.w;\n\n            vec3 computedPosition = position;\n			#ifdef USE_COLOR\n\n				vColor.xyz = ( computedPosition.y < 0.5 ) ? instanceColorStart.xyz : instanceColorEnd.xyz;\n\n			#endif\n\n			#ifdef USE_DASH\n\n				vLineDistance = ( computedPosition.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;\n				vUv = uv;\n\n			#endif\n\n			float aspect = resolution.x / resolution.y;\n\n			// camera space\n            #ifdef USE_RTE\n			/** Source https://github.com/virtualglobebook/OpenGlobe/blob/master/Source/Examples/Chapter05/Jitter/GPURelativeToEyeDSFUN90/Shaders/VS.glsl */\n				// vec3 t1 = instanceStartLow.xyz - uViewer_low;\n				// vec3 e = t1 - instanceStartLow.xyz;\n				// vec3 t2 = ((-uViewer_low - e) + (instanceStartLow.xyz - (t1 - e))) + instanceStart.xyz - uViewer_high;\n				// vec3 highDifference = t1 + t2;\n				// vec3 lowDifference = t2 - (highDifference - t1);\n				// vec4 start = modelViewMatrix * vec4(highDifference.xyz + lowDifference.xyz , 1.);\n				vec4 start = modelViewMatrix * computeRelativePositionSeparate(instanceStartLow.xyz, instanceStart.xyz, uViewer_low, uViewer_high);\n				\n				// t1 = instanceEndLow.xyz - uViewer_low;\n				// e = t1 - instanceEndLow.xyz;\n				// t2 = ((-uViewer_low - e) + (instanceEndLow.xyz - (t1 - e))) + instanceEnd.xyz - uViewer_high;\n				// highDifference = t1 + t2;\n				// lowDifference = t2 - (highDifference - t1);\n				// vec4 end = modelViewMatrix * vec4(highDifference.xyz + lowDifference.xyz , 1.);\n				vec4 end = modelViewMatrix * computeRelativePositionSeparate(instanceEndLow.xyz, instanceEnd.xyz, uViewer_low, uViewer_high);\n            #else\n                vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );\n                vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );\n            #endif\n\n			#ifdef WORLD_UNITS\n\n				worldStart = start.xyz;\n				worldEnd = end.xyz;\n\n			#else\n\n				vUv = uv;\n\n			#endif\n\n			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane\n			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space\n			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly\n			// perhaps there is a more elegant solution -- WestLangley\n\n			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column\n\n			if ( perspective ) {\n\n				if ( start.z < 0.0 && end.z >= 0.0 ) {\n\n					trimSegment( start, end );\n\n				} else if ( end.z < 0.0 && start.z >= 0.0 ) {\n\n					trimSegment( end, start );\n\n				}\n\n			}\n\n			// clip space\n			vec4 clipStart = projectionMatrix * start;\n			vec4 clipEnd = projectionMatrix * end;\n\n			// ndc space\n			vec3 ndcStart = clipStart.xyz / clipStart.w;\n			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;\n\n			// direction\n			vec2 dir = ndcEnd.xy - ndcStart.xy;\n\n			// account for clip-space aspect ratio\n			dir.x *= aspect;\n			dir = normalize( dir );\n\n			#ifdef WORLD_UNITS\n\n				// get the offset direction as perpendicular to the view vector\n				vec3 worldDir = normalize( end.xyz - start.xyz );\n				vec3 offset;\n				if ( computedPosition.y < 0.5 ) {\n\n					offset = normalize( cross( start.xyz, worldDir ) );\n\n				} else {\n\n					offset = normalize( cross( end.xyz, worldDir ) );\n\n				}\n\n				// sign flip\n				if ( computedPosition.x < 0.0 ) offset *= - 1.0;\n\n				float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );\n\n				// don't extend the line if we're rendering dashes because we\n				// won't be rendering the endcaps\n				#ifndef USE_DASH\n\n					// extend the line bounds to encompass  endcaps\n					start.xyz += - worldDir * linewidth * 0.5;\n					end.xyz += worldDir * linewidth * 0.5;\n\n					// shift the position of the quad so it hugs the forward edge of the line\n					offset.xy -= dir * forwardOffset;\n					offset.z += 0.5;\n\n				#endif\n\n				// endcaps\n				if ( computedPosition.y > 1.0 || computedPosition.y < 0.0 ) {\n\n					offset.xy += dir * 2.0 * forwardOffset;\n\n				}\n\n				// debugColor = vec3(0., 0., 1.);\n				correctedLineWidth = linewidth;\n				vec3 cOffset = offset;\n				\n				// adjust for linewidth\n				offset *= linewidth * 0.5;\n\n				// set the world position\n				worldPos = ( computedPosition.y < 0.5 ) ? start : end;\n\n				/*\n				Not great, not terrible\n				*/\n				float pixelSize = length(vec2(pixelThreshold/resolution.x + pixelThreshold/resolution.y));\n				float offsetStep = linewidth;\n				float d = screenSpaceDistance(worldPos, worldPos + vec4(cOffset * offsetStep, 0.));\n				/* We're trying to start off with a step closer to the initial difference between SS distance and the pixel size we want\n				*/\n				// offsetStep += pixelSize - d;\n				vec3 move = offset;\n				\n				for(int i = 0; i < SEARCH_STEPS; i++){\n					move = cOffset * offsetStep;\n					d = screenSpaceDistance(worldPos, worldPos + vec4(move, 0.));\n					if(d > pixelSize) {\n						correctedLineWidth = offsetStep;\n						break;\n					}\n					offsetStep += offsetStep;\n				}\n\n				worldPos.xyz += move;\n\n				// project the worldpos\n				vec4 clip = projectionMatrix * worldPos;\n\n				// shift the depth of the projected points so the line\n				// segments overlap neatly\n				vec3 clipPose = ( computedPosition.y < 0.5 ) ? ndcStart : ndcEnd;\n				clip.z = clipPose.z * clip.w;\n\n			#else\n\n				vec2 offset = vec2( dir.y, - dir.x );\n				// undo aspect ratio adjustment\n				dir.x /= aspect;\n				offset.x /= aspect;\n\n				// sign flip\n				if ( computedPosition.x < 0.0 ) offset *= - 1.0;\n\n				// endcaps\n				if ( computedPosition.y < 0.0 ) {\n\n					offset += - dir;\n\n				} else if ( computedPosition.y > 1.0 ) {\n\n					offset += dir;\n\n				}\n\n				// adjust for linewidth\n				offset *= linewidth;\n\n				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...\n				offset /= resolution.y;\n\n				// select end\n				vec4 clip = ( computedPosition.y < 0.5 ) ? clipStart : clipEnd;\n\n				// back to clip space\n				offset *= clip.w;\n\n				clip.xy += offset;\n\n			#endif\n\n			gl_Position = clip;\n\n			vec4 mvPosition = ( computedPosition.y < 0.5 ) ? start : end; // this is an approximation\n\n			#include <logdepthbuf_vertex>\n			#include <clipping_planes_vertex>\n			#include <fog_vertex>\n\n		}\n		", this.fragProgram = "\n		uniform vec3 diffuse;\n		uniform float opacity;\n		uniform float linewidth;\n		varying float vAlpha;\n		// varying vec3 debugColor;\n\n		#ifdef USE_DASH\n\n			uniform float dashOffset;\n			uniform float dashSize;\n			uniform float gapSize;\n\n		#endif\n\n		varying float vLineDistance;\n\n		#ifdef WORLD_UNITS\n\n			varying vec4 worldPos;\n			varying vec3 worldStart;\n			varying vec3 worldEnd;\n			varying float correctedLineWidth;\n\n			#ifdef USE_DASH\n\n				varying vec2 vUv;\n\n			#endif\n\n		#else\n\n			varying vec2 vUv;\n\n		#endif\n\n		#include <common>\n		#include <color_pars_fragment>\n		#include <fog_pars_fragment>\n		#include <logdepthbuf_pars_fragment>\n		#include <clipping_planes_pars_fragment>\n\n		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {\n\n			float mua;\n			float mub;\n\n			vec3 p13 = p1 - p3;\n			vec3 p43 = p4 - p3;\n\n			vec3 p21 = p2 - p1;\n\n			float d1343 = dot( p13, p43 );\n			float d4321 = dot( p43, p21 );\n			float d1321 = dot( p13, p21 );\n			float d4343 = dot( p43, p43 );\n			float d2121 = dot( p21, p21 );\n\n			float denom = d2121 * d4343 - d4321 * d4321;\n\n			float numer = d1343 * d4321 - d1321 * d4343;\n\n			mua = numer / denom;\n			mua = clamp( mua, 0.0, 1.0 );\n			mub = ( d1343 + d4321 * ( mua ) ) / d4343;\n			mub = clamp( mub, 0.0, 1.0 );\n\n			return vec2( mua, mub );\n\n		}\n\n		void main() {\n\n			#include <clipping_planes_fragment>\n\n			#ifdef USE_DASH\n\n				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps\n\n				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX\n\n			#endif\n\n			float alpha = vAlpha;//opacity;\n\n\n			#ifdef WORLD_UNITS\n\n				// Find the closest points on the view ray and the line segment\n				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;\n				vec3 lineDir = worldEnd - worldStart;\n				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );\n\n				vec3 p1 = worldStart + lineDir * params.x;\n				vec3 p2 = rayEnd * params.y;\n				vec3 delta = p1 - p2;\n				float len = length( delta );\n				float norm = len / correctedLineWidth;\n\n				#ifndef USE_DASH\n\n					#ifdef USE_ALPHA_TO_COVERAGE\n\n						float dnorm = fwidth( norm );\n						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );\n\n					#else\n\n						if ( norm > 0.5 ) {\n\n							discard;\n\n						}\n\n					#endif\n\n				#endif\n\n			#else\n\n				#ifdef USE_ALPHA_TO_COVERAGE\n\n					// artifacts appear on some hardware if a derivative is taken within a conditional\n					float a = vUv.x;\n					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;\n					float len2 = a * a + b * b;\n					float dlen = fwidth( len2 );\n\n					if ( abs( vUv.y ) > 1.0 ) {\n\n						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );\n\n					}\n\n				#else\n\n					if ( abs( vUv.y ) > 1.0 ) {\n\n						float a = vUv.x;\n						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;\n						float len2 = a * a + b * b;\n\n						if ( len2 > 1.0 ) discard;\n\n					}\n\n				#endif\n\n			#endif\n\n			vec4 diffuseColor = vec4( diffuse, alpha );\n\n			#include <logdepthbuf_fragment>\n			// #include <color_fragment> COMMENTED CHUNK\n			#if defined( USE_COLOR_ALPHA )\n				diffuseColor *= vColor;\n			#elif defined( USE_COLOR )\n				diffuseColor.rgb = vColor;\n			#endif\n\n			gl_FragColor = vec4( diffuseColor.rgb, alpha );\n\n			#include <tonemapping_fragment>\n			#include <encodings_fragment>\n			#include <fog_fragment>\n			#include <premultiplied_alpha_fragment>\n\n		}\n		", this.uniforms = UniformsUtils.merge([ShaderLib.line.uniforms, { uViewer_high: { value: this.userData.uViewer_high.value }, uViewer_low: { value: this.userData.uViewer_low.value }, pixelThreshold: { value: this.userData.pixelThreshold } }]), this.onBeforeCompile = function(e2) {
      e2.uniforms.uViewer_high = this.userData.uViewer_high, e2.uniforms.uViewer_low = this.userData.uViewer_low, e2.uniforms.pixelThreshold = this.userData.pixelThreshold, e2.vertexShader = this.vertProgram, e2.fragmentShader = this.fragProgram;
    };
    for (let e2 = 0; e2 < i.length; e2++)
      this.defines[i[e2]] = " ";
  }
  copy(e) {
    return super.copy(e), this.userData = {}, this.userData.uViewer_high = { value: new Vector3() }, this.userData.uViewer_low = { value: new Vector3() }, this.userData.pixelThreshold = { value: e.userData.pixelThreshold.value }, this;
  }
  onBeforeRender(e, t, i, n, r, s) {
    wi.matBuff.copy(i.matrixWorldInverse), wi.matBuff.elements[12] = 0, wi.matBuff.elements[13] = 0, wi.matBuff.elements[14] = 0, wi.matBuff.multiply(r.matrixWorld), r.modelViewMatrix.copy(wi.matBuff), wi.vecBuff0.set(i.matrixWorld.elements[12], i.matrixWorld.elements[13], i.matrixWorld.elements[14]), Rt.DoubleToHighLowVector(wi.vecBuff0, wi.vecBuff1, wi.vecBuff2), this.userData.uViewer_low.value.copy(wi.vecBuff1), this.userData.uViewer_high.value.copy(wi.vecBuff2), this.needsUpdate = true;
  }
}
wi.matBuff = new Matrix4(), wi.vecBuff0 = new Vector3(), wi.vecBuff1 = new Vector3(), wi.vecBuff2 = new Vector3();
class _i {
  get vertexShader() {
    return "";
  }
  get fragmentShader() {
    return "";
  }
  get uniformsDef() {
    return { empty: "empty" };
  }
  get baseUniforms() {
    return { emptyBase: { value: "emptyBase" } };
  }
  init(e = []) {
    this.setUniforms(this.uniformsDef), this.setDefines(e), this.onBeforeCompile = this.onCompile;
  }
  setUniforms(e) {
    for (const t in e)
      this.userData[t] = { value: e[t] };
    this.uniforms = UniformsUtils.merge([this.baseUniforms, this.userData]);
  }
  setDefines(e = []) {
    if (e) {
      this.defines = {};
      for (let t = 0; t < e.length; t++)
        this.defines[e[t]] = " ";
    }
  }
  copyUniforms(e) {
    for (const t in e.userData)
      void 0 !== this.userData[t] && (this.userData[t].value = e.userData[t].value);
  }
  bindUniforms() {
    if (this._internalUniforms)
      for (const e in this.uniformsDef)
        this._internalUniforms.uniforms[e] = this.userData[e];
  }
  copyFrom(e) {
    this.userData = {}, this.setUniforms(this.uniformsDef), this.copyUniforms(e), this.bindUniforms(), Object.assign(this.defines, e.defines);
  }
  onCompile(e, t) {
    this._internalUniforms = e, this.bindUniforms(), e.vertexShader = this.vertexShader, e.fragmentShader = this.fragmentShader;
  }
}
class yi extends MeshStandardMaterial {
}
class xi extends MeshBasicMaterial {
}
class Ti extends MeshDepthMaterial {
}
class Si extends MeshNormalMaterial {
}
function bi(e, t) {
  t.forEach((t2) => {
    Object.getOwnPropertyNames(t2.prototype).forEach((i) => {
      Object.defineProperty(e.prototype, i, Object.getOwnPropertyDescriptor(t2.prototype, i) || /* @__PURE__ */ Object.create(null));
    });
  });
}
bi(yi, [_i]), bi(xi, [_i]), bi(Ti, [_i]), bi(Si, [_i]);
class Mi extends yi {
  get vertexShader() {
    return "\n#define STANDARD\n#ifdef USE_RTE\n    // The high component is stored as the default 'position' attribute buffer\n    attribute vec3 position_low;\n    uniform vec3 uViewer_high;\n    uniform vec3 uViewer_low;\n    uniform mat4 rteShadowMatrix;\n    uniform vec3 uShadowViewer_high;\n    uniform vec3 uShadowViewer_low;\n#endif\n\n#ifdef TRANSFORM_STORAGE\n    attribute float objIndex;\n\n    #if TRANSFORM_STORAGE == 0\n        #if __VERSION__ == 300\n            #define TRANSFORM_STRIDE 4\n        #else\n            #define TRANSFORM_STRIDE 4.\n        #endif\n        uniform sampler2D tTransforms;\n        uniform float objCount;\n    #elif TRANSFORM_STORAGE == 1\n        uniform mat4 uTransforms[OBJ_COUNT];\n    #endif\n#endif\n\nvarying vec3 vViewPosition;\n\n#ifdef USE_TRANSMISSION\n\n    varying vec3 vWorldPosition;\n\n#endif\n\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\n#ifdef TRANSFORM_STORAGE\n    void objectTransform(out vec4 quaternion, out vec4 pivotLow, out vec4 pivotHigh, out vec4 translation, out vec4 scale){\n        #if TRANSFORM_STORAGE == 0\n            #if __VERSION__ == 300\n                ivec2 uv = ivec2(int(objIndex) * TRANSFORM_STRIDE, 0); \n                vec4 v0 = texelFetch( tTransforms, uv, 0 );\n                vec4 v1 = texelFetch( tTransforms, uv + ivec2(1, 0), 0);\n                vec4 v2 = texelFetch( tTransforms, uv + ivec2(2, 0), 0);\n                vec4 v3 = texelFetch( tTransforms, uv + ivec2(3, 0), 0);\n                quaternion = v0;\n                pivotLow = vec4(v1.xyz, 1.);\n                pivotHigh = vec4(v2.xyz, 1.);\n                translation = vec4(v3.xyz, 1.);\n                scale = vec4(v1.w, v2.w, v3.w, 1.);\n            #elif\n                float size = objCount * TRANSFORM_STRIDE;\n                vec2 cUv = vec2(0.5/size, 0.5);\n                vec2 dUv = vec2(1./size, 0.);\n                \n                vec2 uv = vec2((objIndex * TRANSFORM_STRIDE)/size + cUv.x, cUv.y);\n                vec4 v0 = texture2D( tTransforms, uv);\n                vec4 v1 = texture2D( tTransforms, uv + dUv);\n                vec4 v2 = texture2D( tTransforms, uv + 2. * dUv);\n                vec4 v3 = texture2D( tTransforms, uv + 3. * dUv);\n                quaternion = v0;\n                pivotLow = vec4(v1.xyz, 1.);\n                pivotHigh = vec4(v2.xyz, 1.);\n                translation = vec4(v3.xyz, 1.);\n                scale = vec4(v1.w, v2.w, v3.w, 1.);\n            #endif\n        #elif TRANSFORM_STORAGE == 1\n            mat4 tMatrix = uTransforms[int(objIndex)];\n            quaternion = tMatrix[0];\n            pivotLow = vec4(tMatrix[1].xyz, 1.);\n            pivotHigh = vec4(tMatrix[2].xyz, 1.);\n            translation = vec4(tMatrix[3].xyz, 1.);\n            scale = vec4(tMatrix[1][3], tMatrix[2][3], tMatrix[3][3], 1.);\n        #endif\n    }\n\n    vec3 rotate_vertex_position(vec3 position, vec4 quat)\n    { \n        return position + 2.0 * cross(quat.xyz, cross(quat.xyz, position) + quat.w * position);\n    }\n#endif\n\n#ifdef USE_RTE\n    vec4 computeRelativePositionSeparate(in vec3 position_low, in vec3 position_high, in vec3 relativeTo_low, in vec3 relativeTo_high){\n        /* \n        Vector calculation for the high and low differences works on everything \n        *BESIDES* Apple Silicon (or whatever they call it) GPUs\n\n        It would seem that when this code gets compiled, vector types get a lower precision(?)\n        which completely brakes the 2 float -> double reconstructio. Doing it separately for each \n        vector component using floats works fine.\n        */\n        vec3 highDifference;\n        vec3 lowDifference;\n        float t1 = position_low.x - relativeTo_low.x;\n        float e = t1 - position_low.x;\n        float t2 = ((-relativeTo_low.x - e) + (position_low.x - (t1 - e))) + position_high.x - relativeTo_high.x;\n        highDifference.x = t1 + t2;\n        lowDifference.x = t2 - (highDifference.x - t1);\n\n        t1 = position_low.y - relativeTo_low.y;\n        e = t1 - position_low.y;\n        t2 = ((-relativeTo_low.y - e) + (position_low.y - (t1 - e))) + position_high.y - relativeTo_high.y;\n        highDifference.y = t1 + t2;\n        lowDifference.y = t2 - (highDifference.y - t1);\n\n        t1 = position_low.z - relativeTo_low.z;\n        e = t1 - position_low.z;\n        t2 = ((-relativeTo_low.z - e) + (position_low.z - (t1 - e))) + position_high.z - relativeTo_high.z;\n        highDifference.z = t1 + t2;\n        lowDifference.z = t2 - (highDifference.z - t1);\n\n        vec3 position = highDifference.xyz + lowDifference.xyz;\n        return vec4(position, 1.);\n    }\n\n    vec4 computeRelativePosition(in vec3 position_low, in vec3 position_high, in vec3 relativeTo_low, in vec3 relativeTo_high){\n        /* \n        Source https://github.com/virtualglobebook/OpenGlobe/blob/master/Source/Examples/Chapter05/Jitter/GPURelativeToEyeDSFUN90/Shaders/VS.glsl \n        Note here, we're storing the high part of the position encoding inside three's default 'position' attribute buffer so we avoid redundancy \n        */\n        vec3 t1 = position_low.xyz - relativeTo_low;\n        vec3 e = t1 - position_low.xyz;\n        vec3 t2 = ((-relativeTo_low - e) + (position_low.xyz - (t1 - e))) + position_high.xyz - relativeTo_high;\n        vec3 highDifference = t1 + t2;\n        vec3 lowDifference = t2 - (highDifference - t1);\n        \n        vec3 position = highDifference.xyz + lowDifference.xyz;\n        return vec4(position, 1.);\n    }\n#endif\n\n\n\nvoid main() {\n\n    #include <uv_vertex>\n    #include <uv2_vertex>\n    #include <color_vertex>\n    #include <morphcolor_vertex>\n    #include <beginnormal_vertex>\n    #include <morphnormal_vertex>\n    #include <skinbase_vertex>\n    #include <skinnormal_vertex>\n    #include <defaultnormal_vertex>\n    #include <normal_vertex>\n\n    #include <begin_vertex>\n    #include <morphtarget_vertex>\n    #include <skinning_vertex>\n    #include <displacementmap_vertex>\n    //#include <project_vertex> // EDITED CHUNK\n    \n    #ifdef TRANSFORM_STORAGE\n        vec4 tQuaternion, tPivotLow, tPivotHigh, tTranslation, tScale;\n        objectTransform(tQuaternion, tPivotLow, tPivotHigh, tTranslation, tScale);\n    #endif\n    #ifdef USE_RTE\n        vec4 position_lowT = vec4(position_low, 1.);\n        vec4 position_highT = vec4(position, 1.);\n        vec4 rteLocalPosition = computeRelativePositionSeparate(position_lowT.xyz, position_highT.xyz, uViewer_low, uViewer_high);\n        #ifdef TRANSFORM_STORAGE\n            vec4 rtePivot = computeRelativePositionSeparate(tPivotLow.xyz, tPivotHigh.xyz, uViewer_low, uViewer_high);\n            rteLocalPosition.xyz = rotate_vertex_position((rteLocalPosition - rtePivot).xyz, tQuaternion) * tScale.xyz + rtePivot.xyz + tTranslation.xyz;\n        #endif\n    #endif\n\n    #ifdef USE_RTE\n        vec4 mvPosition = rteLocalPosition;\n    #else\n        vec4 mvPosition = vec4( transformed, 1.0 );\n    #endif\n\n    #ifdef USE_INSTANCING\n        mvPosition = instanceMatrix * mvPosition;\n    #endif\n    \n    mvPosition = modelViewMatrix * mvPosition;\n\n    gl_Position = projectionMatrix * mvPosition;\n\n\n    #include <logdepthbuf_vertex>\n    #include <clipping_planes_vertex>\n\n    vViewPosition = - mvPosition.xyz;\n\n    #include <worldpos_vertex>\n    // #include <shadowmap_vertex> COMMENTED CHUNK!!!\n    #ifdef USE_SHADOWMAP\n	#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0\n		// Offsetting the position used for querying occlusion along the world normal can be used to reduce shadow acne.\n		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n		vec4 shadowWorldPosition;\n	#endif\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n        vec4 shadowPosition = vec4(transformed, 1.0);\n        mat4 shadowMatrix = directionalShadowMatrix[ i ];\n\n        #ifdef USE_RTE\n            shadowPosition = computeRelativePositionSeparate(position_low.xyz, position.xyz, uShadowViewer_low, uShadowViewer_high);\n            shadowMatrix = rteShadowMatrix;\n        #endif\n        #ifdef TRANSFORM_STORAGE\n            vec4 rtePivotShadow = computeRelativePositionSeparate(tPivotLow.xyz, tPivotHigh.xyz, uShadowViewer_low, uShadowViewer_high);\n            shadowPosition.xyz = rotate_vertex_position((shadowPosition - rtePivotShadow).xyz, tQuaternion) * tScale.xyz + rtePivotShadow.xyz + tTranslation.xyz;\n        #endif\n        shadowWorldPosition = modelMatrix * shadowPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n        vDirectionalShadowCoord[ i ] = shadowMatrix * shadowWorldPosition;\n	}\n    \n	#pragma unroll_loop_end\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias, 0 );\n		vSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * shadowWorldPosition;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n	}\n	#pragma unroll_loop_end\n	#endif\n	/*\n	#if NUM_RECT_AREA_LIGHTS > 0\n		// TODO (abelnation): update vAreaShadowCoord with area light info\n	#endif\n	*/\n    #endif\n\n    #include <fog_vertex>\n\n#ifdef USE_TRANSMISSION\n\n    vWorldPosition = worldPosition.xyz;\n\n#endif\n}\n";
  }
  get fragmentShader() {
    return "\n#define STANDARD\n\n#ifdef PHYSICAL\n    #define IOR\n    #define SPECULAR\n#endif\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n\n#ifdef IOR\n    uniform float ior;\n#endif\n\n#ifdef SPECULAR\n    uniform float specularIntensity;\n    uniform vec3 specularColor;\n\n    #ifdef USE_SPECULARINTENSITYMAP\n        uniform sampler2D specularIntensityMap;\n    #endif\n\n    #ifdef USE_SPECULARCOLORMAP\n        uniform sampler2D specularColorMap;\n    #endif\n#endif\n\n#ifdef USE_CLEARCOAT\n    uniform float clearcoat;\n    uniform float clearcoatRoughness;\n#endif\n\n#ifdef USE_SHEEN\n    uniform vec3 sheenColor;\n    uniform float sheenRoughness;\n\n    #ifdef USE_SHEENCOLORMAP\n        uniform sampler2D sheenColorMap;\n    #endif\n\n    #ifdef USE_SHEENROUGHNESSMAP\n        uniform sampler2D sheenRoughnessMap;\n    #endif\n#endif\n\nvarying vec3 vViewPosition;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n    #include <clipping_planes_fragment>\n\n    vec4 diffuseColor = vec4( diffuse, opacity );\n    ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n    vec3 totalEmissiveRadiance = emissive;\n\n    #include <logdepthbuf_fragment>\n    #include <map_fragment>\n    #include <color_fragment>\n    #include <alphamap_fragment>\n    #include <alphatest_fragment>\n    #include <roughnessmap_fragment>\n    #include <metalnessmap_fragment>\n    #include <normal_fragment_begin>\n    #include <normal_fragment_maps>\n    #include <clearcoat_normal_fragment_begin>\n    #include <clearcoat_normal_fragment_maps>\n    #include <emissivemap_fragment>\n\n    // accumulation\n    #include <lights_physical_fragment>\n    #include <lights_fragment_begin>\n    #include <lights_fragment_maps>\n    #include <lights_fragment_end>\n\n    // modulation\n    #include <aomap_fragment>\n\n    vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n    vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n\n    #include <transmission_fragment>\n\n    vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n\n    #ifdef USE_SHEEN\n\n        // Sheen energy compensation approximation calculation can be found at the end of\n        // https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing\n        float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );\n\n        outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;\n\n    #endif\n\n    #ifdef USE_CLEARCOAT\n\n        float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );\n\n        vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n\n        outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;\n\n    #endif\n\n    #include <output_fragment>\n    #include <tonemapping_fragment>\n    #include <encodings_fragment>\n    #include <fog_fragment>\n    #include <premultiplied_alpha_fragment>\n    #include <dithering_fragment>\n\n}\n";
  }
  get baseUniforms() {
    return ShaderLib.standard.uniforms;
  }
  get uniformsDef() {
    return { uViewer_high: new Vector3(), uViewer_low: new Vector3(), rteShadowMatrix: new Matrix4(), uShadowViewer_high: new Vector3(), uShadowViewer_low: new Vector3(), uTransforms: [new Matrix4()], tTransforms: null, objCount: 1 };
  }
  constructor(e, t = []) {
    super(e), this.init(t);
  }
  customProgramCacheKey() {
    return this.constructor.name;
  }
  copy(e) {
    return super.copy(e), this.copyFrom(e), this;
  }
  onBeforeRender(e, t, i, n, r, s) {
    Mi.matBuff.copy(i.matrixWorldInverse), Mi.matBuff.elements[12] = 0, Mi.matBuff.elements[13] = 0, Mi.matBuff.elements[14] = 0, r.modelViewMatrix.copy(Mi.matBuff), Mi.vecBuff0.set(i.matrixWorld.elements[12], i.matrixWorld.elements[13], i.matrixWorld.elements[14]), Rt.DoubleToHighLowVector(Mi.vecBuff0, Mi.vecBuff1, Mi.vecBuff2), this.userData.uViewer_low.value.copy(Mi.vecBuff1), this.userData.uViewer_high.value.copy(Mi.vecBuff2), r instanceof Qt && r.updateMaterialTransformsUniform(this), this.needsUpdate = true;
  }
}
Mi.matBuff = new Matrix4(), Mi.vecBuff0 = new Vector3(), Mi.vecBuff1 = new Vector3(), Mi.vecBuff2 = new Vector3();
class Ri extends PointsMaterial {
  constructor(e, i = []) {
    super(e), this.userData.uViewer_high = { value: new Vector3() }, this.userData.uViewer_low = { value: new Vector3() }, this.vertProgram = "\nuniform float size;\nuniform float scale;\n\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\n#ifdef USE_RTE\n    // The high component is stored as the default 'position' attribute buffer\n    attribute vec3 position_low;\n    uniform vec3 uViewer_high;\n    uniform vec3 uViewer_low;\n#endif\n\nvec4 computeRelativePositionSeparate(in vec3 position_low, in vec3 position_high, in vec3 relativeTo_low, in vec3 relativeTo_high){\n    /* \n    Vector calculation for the high and low differences works on everything \n    *BESIDES* Apple Silicon (or whatever they call it) GPUs\n\n    It would seem that when this code gets compiled, vector types get a lower precision(?)\n    which completely brakes the 2 float -> double reconstructio. Doing it separately for each \n    vector component using floats works fine.\n    */\n    vec3 highDifference;\n    vec3 lowDifference;\n    float t1 = position_low.x - relativeTo_low.x;\n    float e = t1 - position_low.x;\n    float t2 = ((-relativeTo_low.x - e) + (position_low.x - (t1 - e))) + position_high.x - relativeTo_high.x;\n    highDifference.x = t1 + t2;\n    lowDifference.x = t2 - (highDifference.x - t1);\n\n    t1 = position_low.y - relativeTo_low.y;\n    e = t1 - position_low.y;\n    t2 = ((-relativeTo_low.y - e) + (position_low.y - (t1 - e))) + position_high.y - relativeTo_high.y;\n    highDifference.y = t1 + t2;\n    lowDifference.y = t2 - (highDifference.y - t1);\n\n    t1 = position_low.z - relativeTo_low.z;\n    e = t1 - position_low.z;\n    t2 = ((-relativeTo_low.z - e) + (position_low.z - (t1 - e))) + position_high.z - relativeTo_high.z;\n    highDifference.z = t1 + t2;\n    lowDifference.z = t2 - (highDifference.z - t1);\n\n    vec3 position = highDifference.xyz + lowDifference.xyz;\n    return vec4(position, 1.);\n}\n\nvec4 computeRelativePosition(in vec3 position_low, in vec3 position_high, in vec3 relativeTo_low, in vec3 relativeTo_high){\n    /* \n    Source https://github.com/virtualglobebook/OpenGlobe/blob/master/Source/Examples/Chapter05/Jitter/GPURelativeToEyeDSFUN90/Shaders/VS.glsl \n    Note here, we're storing the high part of the position encoding inside three's default 'position' attribute buffer so we avoid redundancy \n    */\n    vec3 t1 = position_low.xyz - relativeTo_low;\n    vec3 e = t1 - position_low.xyz;\n    vec3 t2 = ((-relativeTo_low - e) + (position_low.xyz - (t1 - e))) + position_high.xyz - relativeTo_high;\n    vec3 highDifference = t1 + t2;\n    vec3 lowDifference = t2 - (highDifference - t1);\n    \n    vec3 position = highDifference.xyz + lowDifference.xyz;\n    return vec4(position, 1.);\n}\n\nvoid main() {\n\n	#include <color_vertex>\n	#include <morphcolor_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	// #include <project_vertex> COMMENTED CHUNK\n	#ifdef USE_RTE\n        vec4 mvPosition = computeRelativePositionSeparate(position_low.xyz, position.xyz, uViewer_low, uViewer_high);\n    #else\n        vec4 mvPosition = vec4( transformed, 1.0 );\n    #endif\n    \n    #ifdef USE_INSTANCING\n\n        mvPosition = instanceMatrix * mvPosition;\n\n    #endif\n    mvPosition = modelViewMatrix * mvPosition;\n\n    gl_Position = projectionMatrix * mvPosition;\n\n	gl_PointSize = size;\n\n	#ifdef USE_SIZEATTENUATION\n\n		bool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\n		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\n	#endif\n\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <fog_vertex>\n\n}\n", this.fragProgram = "\nuniform vec3 diffuse;\nuniform float opacity;\n\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n	#include <clipping_planes_fragment>\n\n	vec3 outgoingLight = vec3( 0.0 );\n	vec4 diffuseColor = vec4( diffuse, opacity );\n\n	#include <logdepthbuf_fragment>\n	#include <map_particle_fragment>\n	#include <color_fragment>\n	#include <alphatest_fragment>\n\n	outgoingLight = diffuseColor.rgb;\n\n	#include <output_fragment>\n	#include <tonemapping_fragment>\n	#include <encodings_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n\n}\n", this.uniforms = UniformsUtils.merge([ShaderLib.standard.uniforms, { uViewer_high: { value: this.userData.uViewer_high.value }, uViewer_low: { value: this.userData.uViewer_low.value } }]), this.onBeforeCompile = function(e2) {
      e2.uniforms.uViewer_high = this.userData.uViewer_high, e2.uniforms.uViewer_low = this.userData.uViewer_low, e2.vertexShader = this.vertProgram, e2.fragmentShader = this.fragProgram;
    }, i && (this.defines = {});
    for (let e2 = 0; e2 < i.length; e2++)
      this.defines[i[e2]] = " ";
  }
  copy(e) {
    return super.copy(e), this.userData = {}, this.userData.uViewer_high = { value: new Vector3() }, this.userData.uViewer_low = { value: new Vector3() }, this.defines.USE_RTE = " ", this;
  }
  onBeforeRender(e, t, i, n, r, s) {
    Ri.matBuff.copy(i.matrixWorldInverse), Ri.matBuff.elements[12] = 0, Ri.matBuff.elements[13] = 0, Ri.matBuff.elements[14] = 0, Ri.matBuff.multiply(r.matrixWorld), r.modelViewMatrix.copy(Ri.matBuff), Ri.vecBuff0.set(i.matrixWorld.elements[12], i.matrixWorld.elements[13], i.matrixWorld.elements[14]), Rt.DoubleToHighLowVector(Ri.vecBuff0, Ri.vecBuff1, Ri.vecBuff2), this.userData.uViewer_low.value.copy(Ri.vecBuff1), this.userData.uViewer_high.value.copy(Ri.vecBuff2), this.needsUpdate = true;
  }
}
Ri.matBuff = new Matrix4(), Ri.vecBuff0 = new Vector3(), Ri.vecBuff1 = new Vector3(), Ri.vecBuff2 = new Vector3();
var Oi, Ei;
(function(e) {
  e[e.SELECT = 0] = "SELECT", e[e.GHOST = 1] = "GHOST", e[e.GRADIENT = 2] = "GRADIENT", e[e.COLORED = 3] = "COLORED", e[e.OVERLAY = 4] = "OVERLAY", e[e.HIDDEN = 5] = "HIDDEN";
})(Oi || (Oi = {}));
!function(e) {
  e[e.HIDE = 10] = "HIDE", e[e.SHOW = 11] = "SHOW", e[e.ISOLATE = 20] = "ISOLATE", e[e.UNISOLATE = 21] = "UNISOLATE", e[e.NONE = 30] = "NONE";
}(Ei || (Ei = {}));
class Vi extends xi {
  get vertexShader() {
    return "\n#include <common>\n#ifdef USE_RTE\n    // The high component is stored as the default 'position' attribute buffer\n    attribute vec3 position_low;\n    uniform vec3 uViewer_high;\n    uniform vec3 uViewer_low;\n#endif\n\n#ifdef TRANSFORM_STORAGE\n    attribute float objIndex;\n\n    #if TRANSFORM_STORAGE == 0\n        #if __VERSION__ == 300\n            #define TRANSFORM_STRIDE 4\n        #else\n            #define TRANSFORM_STRIDE 4.\n        #endif\n        uniform sampler2D tTransforms;\n        uniform float objCount;\n    #elif TRANSFORM_STORAGE == 1\n        uniform mat4 uTransforms[OBJ_COUNT];\n    #endif\n#endif\n\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\n#ifdef USE_RTE\n    vec4 computeRelativePositionSeparate(in vec3 position_low, in vec3 position_high, in vec3 relativeTo_low, in vec3 relativeTo_high){\n        /* \n        Vector calculation for the high and low differences works on everything \n        *BESIDES* Apple Silicon (or whatever they call it) GPUs\n\n        It would seem that when this code gets compiled, vector types get a lower precision(?)\n        which completely brakes the 2 float -> double reconstructio. Doing it separately for each \n        vector component using floats works fine.\n        */\n        vec3 highDifference;\n        vec3 lowDifference;\n        float t1 = position_low.x - relativeTo_low.x;\n        float e = t1 - position_low.x;\n        float t2 = ((-relativeTo_low.x - e) + (position_low.x - (t1 - e))) + position_high.x - relativeTo_high.x;\n        highDifference.x = t1 + t2;\n        lowDifference.x = t2 - (highDifference.x - t1);\n\n        t1 = position_low.y - relativeTo_low.y;\n        e = t1 - position_low.y;\n        t2 = ((-relativeTo_low.y - e) + (position_low.y - (t1 - e))) + position_high.y - relativeTo_high.y;\n        highDifference.y = t1 + t2;\n        lowDifference.y = t2 - (highDifference.y - t1);\n\n        t1 = position_low.z - relativeTo_low.z;\n        e = t1 - position_low.z;\n        t2 = ((-relativeTo_low.z - e) + (position_low.z - (t1 - e))) + position_high.z - relativeTo_high.z;\n        highDifference.z = t1 + t2;\n        lowDifference.z = t2 - (highDifference.z - t1);\n\n        vec3 position = highDifference.xyz + lowDifference.xyz;\n        return vec4(position, 1.);\n    }\n\n    vec4 computeRelativePosition(in vec3 position_low, in vec3 position_high, in vec3 relativeTo_low, in vec3 relativeTo_high){\n        /* \n        Source https://github.com/virtualglobebook/OpenGlobe/blob/master/Source/Examples/Chapter05/Jitter/GPURelativeToEyeDSFUN90/Shaders/VS.glsl \n        Note here, we're storing the high part of the position encoding inside three's default 'position' attribute buffer so we avoid redundancy \n        */\n        vec3 t1 = position_low.xyz - relativeTo_low;\n        vec3 e = t1 - position_low.xyz;\n        vec3 t2 = ((-relativeTo_low - e) + (position_low.xyz - (t1 - e))) + position_high.xyz - relativeTo_high;\n        vec3 highDifference = t1 + t2;\n        vec3 lowDifference = t2 - (highDifference - t1);\n        \n        vec3 position = highDifference.xyz + lowDifference.xyz;\n        return vec4(position, 1.);\n    }\n#endif\n\n#ifdef TRANSFORM_STORAGE\n    void objectTransform(out vec4 quaternion, out vec4 pivotLow, out vec4 pivotHigh, out vec4 translation, out vec4 scale){\n        #if TRANSFORM_STORAGE == 0\n            #if __VERSION__ == 300\n                ivec2 uv = ivec2(int(objIndex) * TRANSFORM_STRIDE, 0); \n                vec4 v0 = texelFetch( tTransforms, uv, 0 );\n                vec4 v1 = texelFetch( tTransforms, uv + ivec2(1, 0), 0);\n                vec4 v2 = texelFetch( tTransforms, uv + ivec2(2, 0), 0);\n                vec4 v3 = texelFetch( tTransforms, uv + ivec2(3, 0), 0);\n                quaternion = v0;\n                pivotLow = vec4(v1.xyz, 1.);\n                pivotHigh = vec4(v2.xyz, 1.);\n                translation = vec4(v3.xyz, 1.);\n                scale = vec4(v1.w, v2.w, v3.w, 1.);\n            #elif\n                float size = objCount * TRANSFORM_STRIDE;\n                vec2 cUv = vec2(0.5/size, 0.5);\n                vec2 dUv = vec2(1./size, 0.);\n                \n                vec2 uv = vec2((objIndex * TRANSFORM_STRIDE)/size + cUv.x, cUv.y);\n                vec4 v0 = texture2D( tTransforms, uv);\n                vec4 v1 = texture2D( tTransforms, uv + dUv);\n                vec4 v2 = texture2D( tTransforms, uv + 2. * dUv);\n                vec4 v3 = texture2D( tTransforms, uv + 3. * dUv);\n                quaternion = v0;\n                pivotLow = vec4(v1.xyz, 1.);\n                pivotHigh = vec4(v2.xyz, 1.);\n                translation = vec4(v3.xyz, 1.);\n                scale = vec4(v1.w, v2.w, v3.w, 1.);\n            #endif\n        #elif TRANSFORM_STORAGE == 1\n            mat4 tMatrix = uTransforms[int(objIndex)];\n            quaternion = tMatrix[0];\n            pivotLow = vec4(tMatrix[1].xyz, 1.);\n            pivotHigh = vec4(tMatrix[2].xyz, 1.);\n            translation = vec4(tMatrix[3].xyz, 1.);\n            scale = vec4(tMatrix[1][3], tMatrix[2][3], tMatrix[3][3], 1.);\n        #endif\n    }\n\n    vec3 rotate_vertex_position(vec3 position, vec4 quat)\n    { \n        return position + 2.0 * cross(quat.xyz, cross(quat.xyz, position) + quat.w * position);\n    }\n#endif\n\n\n\nvoid main() {\n	#include <uv_vertex>\n	#include <uv2_vertex>\n	#include <color_vertex>\n	#include <morphcolor_vertex>\n	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinbase_vertex>\n		#include <skinnormal_vertex>\n		#include <defaultnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	// #include <project_vertex> COMMENTED CHUNK\n    #ifdef TRANSFORM_STORAGE\n        vec4 tQuaternion, tPivotLow, tPivotHigh, tTranslation, tScale;\n        objectTransform(tQuaternion, tPivotLow, tPivotHigh, tTranslation, tScale);\n    #endif\n    #ifdef USE_RTE\n        vec4 position_lowT = vec4(position_low, 1.);\n        vec4 position_highT = vec4(position, 1.);\n        vec4 rteLocalPosition = computeRelativePositionSeparate(position_lowT.xyz, position_highT.xyz, uViewer_low, uViewer_high);\n        #ifdef TRANSFORM_STORAGE\n            vec4 rtePivot = computeRelativePositionSeparate(tPivotLow.xyz, tPivotHigh.xyz, uViewer_low, uViewer_high);\n            rteLocalPosition.xyz = rotate_vertex_position((rteLocalPosition - rtePivot).xyz, tQuaternion) * tScale.xyz + rtePivot.xyz + tTranslation.xyz;\n        #endif\n    #endif\n\n    #ifdef USE_RTE\n        vec4 mvPosition = rteLocalPosition;\n    #else\n        vec4 mvPosition = vec4( transformed, 1.0 );\n    #endif\n\n    #ifdef USE_INSTANCING\n        mvPosition = instanceMatrix * mvPosition;\n    #endif\n    \n    mvPosition = modelViewMatrix * mvPosition;\n\n    gl_Position = projectionMatrix * mvPosition;\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <fog_vertex>\n}\n";
  }
  get fragmentShader() {
    return "\nuniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	#include <clipping_planes_fragment>\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <specularmap_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	// accumulation (baked indirect lighting only)\n	#ifdef USE_LIGHTMAP\n		vec4 lightMapTexel = texture2D( lightMap, vUv2 );\n		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;\n	#else\n		reflectedLight.indirectDiffuse += vec3( 1.0 );\n	#endif\n	// modulation\n	#include <aomap_fragment>\n	reflectedLight.indirectDiffuse *= diffuseColor.rgb;\n	vec3 outgoingLight = reflectedLight.indirectDiffuse;\n	#include <envmap_fragment>\n	#include <output_fragment>\n	#include <tonemapping_fragment>\n	#include <encodings_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}\n";
  }
  get baseUniforms() {
    return ShaderLib.basic.uniforms;
  }
  get uniformsDef() {
    return { uViewer_high: new Vector3(), uViewer_low: new Vector3(), uTransforms: [new Matrix4()], tTransforms: null, objCount: 1 };
  }
  constructor(e, t = []) {
    super(e), this.init(t);
  }
  customProgramCacheKey() {
    return this.constructor.name;
  }
  copy(e) {
    return super.copy(e), this.copyFrom(e), this;
  }
  onBeforeRender(e, t, i, n, r, s) {
    Vi.matBuff.copy(i.matrixWorldInverse), Vi.matBuff.elements[12] = 0, Vi.matBuff.elements[13] = 0, Vi.matBuff.elements[14] = 0, r.modelViewMatrix.copy(Vi.matBuff), Vi.vecBuff0.set(i.matrixWorld.elements[12], i.matrixWorld.elements[13], i.matrixWorld.elements[14]), Rt.DoubleToHighLowVector(Vi.vecBuff0, Vi.vecBuff1, Vi.vecBuff2), this.userData.uViewer_low.value.copy(Vi.vecBuff1), this.userData.uViewer_high.value.copy(Vi.vecBuff2), r instanceof Qt && r.updateMaterialTransformsUniform(this), this.needsUpdate = true;
  }
}
Vi.matBuff = new Matrix4(), Vi.vecBuff0 = new Vector3(), Vi.vecBuff1 = new Vector3(), Vi.vecBuff2 = new Vector3();
var Gi;
!function(e) {
  e[e.VERTEX_TEXTURE = 0] = "VERTEX_TEXTURE", e[e.UNIFORM_ARRAY = 1] = "UNIFORM_ARRAY";
}(Gi || (Gi = {}));
class Ki extends Ti {
  get vertexShader() {
    return "\n#include <common>\n#ifdef USE_RTE\n    // The high component is stored as the default 'position' attribute buffer\n    attribute vec3 position_low;\n    uniform vec3 uViewer_high;\n    uniform vec3 uViewer_low;\n    uniform mat4 rteModelViewMatrix;\n#endif\n\n#ifdef TRANSFORM_STORAGE\n    attribute float objIndex;\n\n    #if TRANSFORM_STORAGE == 0\n        #if __VERSION__ == 300\n            #define TRANSFORM_STRIDE 4\n        #else\n            #define TRANSFORM_STRIDE 4.\n        #endif\n        uniform sampler2D tTransforms;\n        uniform float objCount;\n    #elif TRANSFORM_STORAGE == 1\n        uniform mat4 uTransforms[OBJ_COUNT];\n    #endif\n#endif\n\n#ifdef LINEAR_DEPTH\n    varying vec4 vViewPosition;\n#endif\n\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n// This is used for computing an equivalent of gl_FragCoord.z that is as high precision as possible.\n// Some platforms compute gl_FragCoord at a lower precision which makes the manually computed value better for\n// depth-based postprocessing effects. Reproduced on iPad with A10 processor / iPadOS 13.3.1.\nvarying vec2 vHighPrecisionZW;\n\n#ifdef TRANSFORM_STORAGE\n    void objectTransform(out vec4 quaternion, out vec4 pivotLow, out vec4 pivotHigh, out vec4 translation, out vec4 scale){\n        #if TRANSFORM_STORAGE == 0\n            #if __VERSION__ == 300\n                ivec2 uv = ivec2(int(objIndex) * TRANSFORM_STRIDE, 0); \n                vec4 v0 = texelFetch( tTransforms, uv, 0 );\n                vec4 v1 = texelFetch( tTransforms, uv + ivec2(1, 0), 0);\n                vec4 v2 = texelFetch( tTransforms, uv + ivec2(2, 0), 0);\n                vec4 v3 = texelFetch( tTransforms, uv + ivec2(3, 0), 0);\n                quaternion = v0;\n                pivotLow = vec4(v1.xyz, 1.);\n                pivotHigh = vec4(v2.xyz, 1.);\n                translation = vec4(v3.xyz, 1.);\n                scale = vec4(v1.w, v2.w, v3.w, 1.);\n            #elif\n                float size = objCount * TRANSFORM_STRIDE;\n                vec2 cUv = vec2(0.5/size, 0.5);\n                vec2 dUv = vec2(1./size, 0.);\n                \n                vec2 uv = vec2((objIndex * TRANSFORM_STRIDE)/size + cUv.x, cUv.y);\n                vec4 v0 = texture2D( tTransforms, uv);\n                vec4 v1 = texture2D( tTransforms, uv + dUv);\n                vec4 v2 = texture2D( tTransforms, uv + 2. * dUv);\n                vec4 v3 = texture2D( tTransforms, uv + 3. * dUv);\n                quaternion = v0;\n                pivotLow = vec4(v1.xyz, 1.);\n                pivotHigh = vec4(v2.xyz, 1.);\n                translation = vec4(v3.xyz, 1.);\n                scale = vec4(v1.w, v2.w, v3.w, 1.);\n            #endif\n        #elif TRANSFORM_STORAGE == 1\n            mat4 tMatrix = uTransforms[int(objIndex)];\n            quaternion = tMatrix[0];\n            pivotLow = vec4(tMatrix[1].xyz, 1.);\n            pivotHigh = vec4(tMatrix[2].xyz, 1.);\n            translation = vec4(tMatrix[3].xyz, 1.);\n            scale = vec4(tMatrix[1][3], tMatrix[2][3], tMatrix[3][3], 1.);\n        #endif\n    }\n\n    vec3 rotate_vertex_position(vec3 position, vec4 quat)\n    { \n        return position + 2.0 * cross(quat.xyz, cross(quat.xyz, position) + quat.w * position);\n    }\n#endif\n\n#ifdef USE_RTE\n    vec4 computeRelativePositionSeparate(in vec3 position_low, in vec3 position_high, in vec3 relativeTo_low, in vec3 relativeTo_high){\n        /* \n        Vector calculation for the high and low differences works on everything \n        *BESIDES* Apple Silicon (or whatever they call it) GPUs\n\n        It would seem that when this code gets compiled, vector types get a lower precision(?)\n        which completely brakes the 2 float -> double reconstructio. Doing it separately for each \n        vector component using floats works fine.\n        */\n        vec3 highDifference;\n        vec3 lowDifference;\n        float t1 = position_low.x - relativeTo_low.x;\n        float e = t1 - position_low.x;\n        float t2 = ((-relativeTo_low.x - e) + (position_low.x - (t1 - e))) + position_high.x - relativeTo_high.x;\n        highDifference.x = t1 + t2;\n        lowDifference.x = t2 - (highDifference.x - t1);\n\n        t1 = position_low.y - relativeTo_low.y;\n        e = t1 - position_low.y;\n        t2 = ((-relativeTo_low.y - e) + (position_low.y - (t1 - e))) + position_high.y - relativeTo_high.y;\n        highDifference.y = t1 + t2;\n        lowDifference.y = t2 - (highDifference.y - t1);\n\n        t1 = position_low.z - relativeTo_low.z;\n        e = t1 - position_low.z;\n        t2 = ((-relativeTo_low.z - e) + (position_low.z - (t1 - e))) + position_high.z - relativeTo_high.z;\n        highDifference.z = t1 + t2;\n        lowDifference.z = t2 - (highDifference.z - t1);\n\n        vec3 position = highDifference.xyz + lowDifference.xyz;\n        return vec4(position, 1.);\n    }\n\n    vec4 computeRelativePosition(in vec3 position_low, in vec3 position_high, in vec3 relativeTo_low, in vec3 relativeTo_high){\n        /* \n        Source https://github.com/virtualglobebook/OpenGlobe/blob/master/Source/Examples/Chapter05/Jitter/GPURelativeToEyeDSFUN90/Shaders/VS.glsl \n        Note here, we're storing the high part of the position encoding inside three's default 'position' attribute buffer so we avoid redundancy \n        */\n        vec3 t1 = position_low.xyz - relativeTo_low;\n        vec3 e = t1 - position_low.xyz;\n        vec3 t2 = ((-relativeTo_low - e) + (position_low.xyz - (t1 - e))) + position_high.xyz - relativeTo_high;\n        vec3 highDifference = t1 + t2;\n        vec3 lowDifference = t2 - (highDifference - t1);\n        \n        vec3 position = highDifference.xyz + lowDifference.xyz;\n        return vec4(position, 1.);\n    }\n#endif\n\n\nvoid main() {\n	#include <uv_vertex>\n	#include <skinbase_vertex>\n	#ifdef USE_DISPLACEMENTMAP\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	//#include <project_vertex> // EDITED CHUNK\n    #ifdef TRANSFORM_STORAGE\n        vec4 tQuaternion, tPivotLow, tPivotHigh, tTranslation, tScale;\n        objectTransform(tQuaternion, tPivotLow, tPivotHigh, tTranslation, tScale);\n    #endif\n    #ifdef USE_RTE\n        vec4 position_lowT = vec4(position_low, 1.);\n        vec4 position_highT = vec4(position, 1.);\n        vec4 rteLocalPosition = computeRelativePositionSeparate(position_lowT.xyz, position_highT.xyz, uViewer_low, uViewer_high);\n        #ifdef TRANSFORM_STORAGE\n            vec4 rtePivot = computeRelativePositionSeparate(tPivotLow.xyz, tPivotHigh.xyz, uViewer_low, uViewer_high);\n            rteLocalPosition.xyz = rotate_vertex_position((rteLocalPosition - rtePivot).xyz, tQuaternion) * tScale.xyz + rtePivot.xyz + tTranslation.xyz;\n        #endif\n    #endif\n\n    #ifdef USE_RTE\n        vec4 mvPosition = rteLocalPosition;\n    #else\n        vec4 mvPosition = vec4( transformed, 1.0 );\n    #endif\n\n    #ifdef USE_INSTANCING\n        mvPosition = instanceMatrix * mvPosition;\n    #endif\n    \n    mvPosition = rteModelViewMatrix * mvPosition;\n\n    #ifdef LINEAR_DEPTH\n        vViewPosition = mvPosition;\n    #endif \n    \n    gl_Position = projectionMatrix * mvPosition;\n	#include <logdepthbuf_vertex>\n	// #include <clipping_planes_vertex>\n    #if NUM_CLIPPING_PLANES > 0\n	    vClipPosition = - mvPosition.xyz;\n    #endif\n	vHighPrecisionZW = gl_Position.zw;\n}\n";
  }
  get fragmentShader() {
    return "\n#if DEPTH_PACKING == 3200\n	uniform float opacity;\n#endif\n#ifdef LINEAR_DEPTH\n    varying vec4 vViewPosition;\n	uniform float near;\n	uniform float far;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\n\nvoid main() {\n	#include <clipping_planes_fragment>\n	vec4 diffuseColor = vec4( 1.0 );\n	#if DEPTH_PACKING == 3200\n		diffuseColor.a = opacity;\n	#endif\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	// #include <alphatest_fragment>\n	#ifdef USE_ALPHATEST\n		if ( diffuseColor.a < alphaTest ) discard;\n		/** This is a workaround for rejecting shadows for certain materials, since three.js gave me no choice*/\n		#ifdef ALPHATEST_REJECTION\n			if (alphaTest > 0. ) discard;\n		#endif\n	#endif\n	#include <logdepthbuf_fragment>\n	// Higher precision equivalent of gl_FragCoord.z. This assumes depthRange has been left to its default values.\n	#ifdef LINEAR_DEPTH\n		/** View z is negative moving away from the camera */\n		gl_FragColor = packDepthToRGBA((vViewPosition.z + near) / (near - far));\n	#else\n		float fragCoordZ = (0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5);\n		#if DEPTH_PACKING == 3200\n			gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n		#elif DEPTH_PACKING == 3201\n			gl_FragColor = packDepthToRGBA( fragCoordZ );\n		#endif\n	#endif\n}\n";
  }
  get baseUniforms() {
    return ShaderLib.depth.uniforms;
  }
  get uniformsDef() {
    return { uViewer_high: new Vector3(), uViewer_low: new Vector3(), rteModelViewMatrix: new Matrix4(), near: 0, far: 0, uTransforms: [new Matrix4()], tTransforms: null, objCount: 1 };
  }
  constructor(e, t = []) {
    super(e), this.init(t);
  }
  customProgramCacheKey() {
    return this.constructor.name;
  }
  copy(e) {
    return super.copy(e), this.copyFrom(e), this;
  }
  onBeforeRender(e, t, i, n, r, s) {
    Ki.matBuff.copy(i.matrixWorldInverse), Ki.matBuff.elements[12] = 0, Ki.matBuff.elements[13] = 0, Ki.matBuff.elements[14] = 0, r.modelViewMatrix.copy(Ki.matBuff), Ki.vecBuff0.set(i.matrixWorld.elements[12], i.matrixWorld.elements[13], i.matrixWorld.elements[14]), Rt.DoubleToHighLowVector(Ki.vecBuff0, Ki.vecBuff1, Ki.vecBuff2), this.userData.uViewer_low.value.copy(Ki.vecBuff1), this.userData.uViewer_high.value.copy(Ki.vecBuff2), this.userData.rteModelViewMatrix.value.copy(r.modelViewMatrix), r instanceof Qt && r.updateMaterialTransformsUniform(this), this.needsUpdate = true;
  }
}
Ki.matBuff = new Matrix4(), Ki.vecBuff0 = new Vector3(), Ki.vecBuff1 = new Vector3(), Ki.vecBuff2 = new Vector3();
var tn, nn;
!function(e) {
  e[e.PERSPECTIVE_DEPTH = 0] = "PERSPECTIVE_DEPTH", e[e.LINEAR_DEPTH = 1] = "LINEAR_DEPTH";
}(tn || (tn = {})), function(e) {
  e[e.FULL = 0] = "FULL", e[e.HALF = 1] = "HALF";
}(nn || (nn = {}));
class sn extends Si {
  get vertexShader() {
    return "\n#define NORMAL\n#ifdef USE_RTE\n    // The high component is stored as the default 'position' attribute buffer\n    attribute vec3 position_low;\n    uniform vec3 uViewer_high;\n    uniform vec3 uViewer_low;\n#endif\n\n#ifdef TRANSFORM_STORAGE\n    attribute float objIndex;\n\n    #if TRANSFORM_STORAGE == 0\n        #if __VERSION__ == 300\n            #define TRANSFORM_STRIDE 4\n        #else\n            #define TRANSFORM_STRIDE 4.\n        #endif\n        uniform sampler2D tTransforms;\n        uniform float objCount;\n    #elif TRANSFORM_STORAGE == 1\n        uniform mat4 uTransforms[OBJ_COUNT];\n    #endif\n#endif\n\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n	varying vec3 vViewPosition;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\n#ifdef USE_RTE\n    vec4 computeRelativePositionSeparate(in vec3 position_low, in vec3 position_high, in vec3 relativeTo_low, in vec3 relativeTo_high){\n        /* \n        Vector calculation for the high and low differences works on everything \n        *BESIDES* Apple Silicon (or whatever they call it) GPUs\n\n        It would seem that when this code gets compiled, vector types get a lower precision(?)\n        which completely brakes the 2 float -> double reconstructio. Doing it separately for each \n        vector component using floats works fine.\n        */\n        vec3 highDifference;\n        vec3 lowDifference;\n        float t1 = position_low.x - relativeTo_low.x;\n        float e = t1 - position_low.x;\n        float t2 = ((-relativeTo_low.x - e) + (position_low.x - (t1 - e))) + position_high.x - relativeTo_high.x;\n        highDifference.x = t1 + t2;\n        lowDifference.x = t2 - (highDifference.x - t1);\n\n        t1 = position_low.y - relativeTo_low.y;\n        e = t1 - position_low.y;\n        t2 = ((-relativeTo_low.y - e) + (position_low.y - (t1 - e))) + position_high.y - relativeTo_high.y;\n        highDifference.y = t1 + t2;\n        lowDifference.y = t2 - (highDifference.y - t1);\n\n        t1 = position_low.z - relativeTo_low.z;\n        e = t1 - position_low.z;\n        t2 = ((-relativeTo_low.z - e) + (position_low.z - (t1 - e))) + position_high.z - relativeTo_high.z;\n        highDifference.z = t1 + t2;\n        lowDifference.z = t2 - (highDifference.z - t1);\n\n        vec3 position = highDifference.xyz + lowDifference.xyz;\n        return vec4(position, 1.);\n    }\n\n    vec4 computeRelativePosition(in vec3 position_low, in vec3 position_high, in vec3 relativeTo_low, in vec3 relativeTo_high){\n        /* \n        Source https://github.com/virtualglobebook/OpenGlobe/blob/master/Source/Examples/Chapter05/Jitter/GPURelativeToEyeDSFUN90/Shaders/VS.glsl \n        Note here, we're storing the high part of the position encoding inside three's default 'position' attribute buffer so we avoid redundancy \n        */\n        vec3 t1 = position_low.xyz - relativeTo_low;\n        vec3 e = t1 - position_low.xyz;\n        vec3 t2 = ((-relativeTo_low - e) + (position_low.xyz - (t1 - e))) + position_high.xyz - relativeTo_high;\n        vec3 highDifference = t1 + t2;\n        vec3 lowDifference = t2 - (highDifference - t1);\n        \n        vec3 position = highDifference.xyz + lowDifference.xyz;\n        return vec4(position, 1.);\n    }\n#endif\n\n#ifdef TRANSFORM_STORAGE\n    void objectTransform(out vec4 quaternion, out vec4 pivotLow, out vec4 pivotHigh, out vec4 translation, out vec4 scale){\n        #if TRANSFORM_STORAGE == 0\n            #if __VERSION__ == 300\n                ivec2 uv = ivec2(int(objIndex) * TRANSFORM_STRIDE, 0); \n                vec4 v0 = texelFetch( tTransforms, uv, 0 );\n                vec4 v1 = texelFetch( tTransforms, uv + ivec2(1, 0), 0);\n                vec4 v2 = texelFetch( tTransforms, uv + ivec2(2, 0), 0);\n                vec4 v3 = texelFetch( tTransforms, uv + ivec2(3, 0), 0);\n                quaternion = v0;\n                pivotLow = vec4(v1.xyz, 1.);\n                pivotHigh = vec4(v2.xyz, 1.);\n                translation = vec4(v3.xyz, 1.);\n                scale = vec4(v1.w, v2.w, v3.w, 1.);\n            #elif\n                float size = objCount * TRANSFORM_STRIDE;\n                vec2 cUv = vec2(0.5/size, 0.5);\n                vec2 dUv = vec2(1./size, 0.);\n                \n                vec2 uv = vec2((objIndex * TRANSFORM_STRIDE)/size + cUv.x, cUv.y);\n                vec4 v0 = texture2D( tTransforms, uv);\n                vec4 v1 = texture2D( tTransforms, uv + dUv);\n                vec4 v2 = texture2D( tTransforms, uv + 2. * dUv);\n                vec4 v3 = texture2D( tTransforms, uv + 3. * dUv);\n                quaternion = v0;\n                pivotLow = vec4(v1.xyz, 1.);\n                pivotHigh = vec4(v2.xyz, 1.);\n                translation = vec4(v3.xyz, 1.);\n                scale = vec4(v1.w, v2.w, v3.w, 1.);\n            #endif\n        #elif TRANSFORM_STORAGE == 1\n            mat4 tMatrix = uTransforms[int(objIndex)];\n            quaternion = tMatrix[0];\n            pivotLow = vec4(tMatrix[1].xyz, 1.);\n            pivotHigh = vec4(tMatrix[2].xyz, 1.);\n            translation = vec4(tMatrix[3].xyz, 1.);\n            scale = vec4(tMatrix[1][3], tMatrix[2][3], tMatrix[3][3], 1.);\n        #endif\n    }\n\n    vec3 rotate_vertex_position(vec3 position, vec4 quat)\n    { \n        return position + 2.0 * cross(quat.xyz, cross(quat.xyz, position) + quat.w * position);\n    }\n#endif\n\nvoid main() {\n	#include <uv_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n    //#include <project_vertex> // EDITED CHUNK\n   #ifdef TRANSFORM_STORAGE\n        vec4 tQuaternion, tPivotLow, tPivotHigh, tTranslation, tScale;\n        objectTransform(tQuaternion, tPivotLow, tPivotHigh, tTranslation, tScale);\n    #endif\n    #ifdef USE_RTE\n        vec4 position_lowT = vec4(position_low, 1.);\n        vec4 position_highT = vec4(position, 1.);\n        vec4 rteLocalPosition = computeRelativePositionSeparate(position_lowT.xyz, position_highT.xyz, uViewer_low, uViewer_high);\n        #ifdef TRANSFORM_STORAGE\n            vec4 rtePivot = computeRelativePositionSeparate(tPivotLow.xyz, tPivotHigh.xyz, uViewer_low, uViewer_high);\n            rteLocalPosition.xyz = rotate_vertex_position((rteLocalPosition - rtePivot).xyz, tQuaternion) * tScale.xyz + rtePivot.xyz + tTranslation.xyz;\n        #endif\n    #endif\n\n    #ifdef USE_RTE\n        vec4 mvPosition = rteLocalPosition;\n    #else\n        vec4 mvPosition = vec4( transformed, 1.0 );\n    #endif\n\n    #ifdef USE_INSTANCING\n        mvPosition = instanceMatrix * mvPosition;\n    #endif\n\n    mvPosition = modelViewMatrix * mvPosition;\n\n    gl_Position = projectionMatrix * mvPosition;\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n    #if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n	    vViewPosition = - mvPosition.xyz;\n    #endif\n}\n";
  }
  get fragmentShader() {
    return "\n#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n	varying vec3 vViewPosition;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n	#ifdef OPAQUE\n		gl_FragColor.a = 1.0;\n	#endif\n}\n";
  }
  get baseUniforms() {
    return ShaderLib.normal.uniforms;
  }
  get uniformsDef() {
    return { uViewer_high: new Vector3(), uViewer_low: new Vector3(), uTransforms: [new Matrix4()], tTransforms: null };
  }
  constructor(e, t = []) {
    super(e), this.init(t);
  }
  customProgramCacheKey() {
    return this.constructor.name;
  }
  copy(e) {
    return super.copy(e), this.copyFrom(e), this;
  }
  onBeforeRender(e, t, i, n, r, s) {
    sn.matBuff.copy(i.matrixWorldInverse), sn.matBuff.elements[12] = 0, sn.matBuff.elements[13] = 0, sn.matBuff.elements[14] = 0, r.modelViewMatrix.copy(sn.matBuff), sn.vecBuff0.set(i.matrixWorld.elements[12], i.matrixWorld.elements[13], i.matrixWorld.elements[14]), Rt.DoubleToHighLowVector(sn.vecBuff0, sn.vecBuff1, sn.vecBuff2), this.userData.uViewer_low.value.copy(sn.vecBuff1), this.userData.uViewer_high.value.copy(sn.vecBuff2), r instanceof Qt && r.updateMaterialTransformsUniform(this), this.needsUpdate = true;
  }
}
sn.matBuff = new Matrix4(), sn.vecBuff0 = new Vector3(), sn.vecBuff1 = new Vector3(), sn.vecBuff2 = new Vector3();
var on, ln;
!function(e) {
  e[e.DEFAULT = 0] = "DEFAULT", e[e.IMPROVED = 1] = "IMPROVED", e[e.ACCURATE = 2] = "ACCURATE";
}(on || (on = {})), function(e) {
  e[e.RECONSTRUCTED_NORMALS = 0] = "RECONSTRUCTED_NORMALS", e[e.AO = 1] = "AO", e[e.AO_BLURRED = 2] = "AO_BLURRED";
}(ln || (ln = {}));
const hn = { intensity: 1.5, scale: 0, kernelRadius: 5, bias: 0.2, normalsType: on.ACCURATE, blurEnabled: true, blurRadius: 2, blurStdDev: 4, blurDepthCutoff: 7e-3 };
const dn = { intensity: 1, kernelRadius: 30, kernelSize: 16, bias: 0.01, minDistance: 0, maxDistance: 8e-3 };
var gn, wn;
!function(e) {
  e[e.NORMAL = 0] = "NORMAL", e[e.ACCUMULATION = 1] = "ACCUMULATION";
}(gn || (gn = {})), function(e) {
  e[e.DEPTH_RGBA = 0] = "DEPTH_RGBA", e[e.DEPTH = 1] = "DEPTH", e[e.COLOR = 2] = "COLOR", e[e.GEOMETRY_NORMALS = 3] = "GEOMETRY_NORMALS", e[e.RECONSTRUCTED_NORMALS = 4] = "RECONSTRUCTED_NORMALS", e[e.DYNAMIC_AO = 5] = "DYNAMIC_AO", e[e.DYNAMIC_AO_BLURED = 6] = "DYNAMIC_AO_BLURED", e[e.PROGRESSIVE_AO = 7] = "PROGRESSIVE_AO", e[e.FINAL = 8] = "FINAL";
}(wn || (wn = {}));
({ pipelineOutput: wn.FINAL, accumulationFrames: 16, dynamicAoEnabled: true, dynamicAoParams: hn, staticAoEnabled: true, staticAoParams: dn, depthSide: DoubleSide });
var xn;
(function(e) {
  e.POSITIVE_X = "POSITIVE_X", e.POSITIVE_Y = "POSITIVE_Y", e.POSITIVE_Z = "POSITIVE_Z", e.NEGATIVE_X = "NEGATIVE_X", e.NEGATIVE_Y = "NEGATIVE_Y", e.NEGATIVE_Z = "NEGATIVE_Z";
})(xn || (xn = {}));
var Pn;
(function(e) {
  e[e.STREAM_CONTENT_MESH = 10] = "STREAM_CONTENT_MESH", e[e.STREAM_CONTENT_LINE = 11] = "STREAM_CONTENT_LINE", e[e.STREAM_CONTENT_POINT = 12] = "STREAM_CONTENT_POINT", e[e.STREAM_CONTENT = 1] = "STREAM_CONTENT", e[e.PROPS = 2] = "PROPS", e[e.SHADOWCATCHER = 3] = "SHADOWCATCHER";
})(Pn || (Pn = {}));
var Hn;
new class {
  constructor() {
    this.vecBuff0 = new Vector3(), this.vecBuff1 = new Vector3();
  }
  setContext(e) {
    this.renderer = e;
  }
  solve(e) {
    switch (e.operation) {
      case "Occlusion":
        return this.solveOcclusion(e);
      case "Pick":
        return this.solvePick(e);
      default:
        Oe.error("Malformed query");
    }
  }
  solveOcclusion(e) {
    const t = this.vecBuff0.set(e.point.x, e.point.y, e.point.z), i = this.vecBuff1.copy(t).sub(this.renderer.camera.position);
    i.normalize();
    const n = new Ray(this.renderer.camera.position, i), r = this.renderer.intersections.intersectRay(this.renderer.scene, this.renderer.camera, n, true, this.renderer.currentSectionBox, [Pn.STREAM_CONTENT_MESH]);
    if (!r || 0 === r.length)
      return { objects: null };
    const s = this.renderer.queryHitIds(r);
    if (!s)
      return { objects: null };
    let a = this.renderer.camera.position.distanceTo(t);
    return a -= e.tolerance, a < r[0].distance ? { objects: null } : { objects: [{ guid: s[0].nodeId, point: s[0].point }] };
  }
  solvePick(e) {
    const t = this.renderer.intersections.intersect(this.renderer.scene, this.renderer.camera, new Vector2(e.point.x, e.point.y), true, this.renderer.currentSectionBox);
    if (!t)
      return null;
    return { objects: this.renderer.queryHits(t).map((e2) => ({ guid: e2.node.model.id, object: e2.node.model.raw, point: e2.point })) };
  }
}(), function(e) {
  e[e.PLAIN = 0] = "PLAIN", e[e.COLORED = 1] = "COLORED";
}(Hn || (Hn = {}));
async function resetViewerFilters() {
  const v = get_store_value(speckleViewer).speckleViewer;
  if (v !== null) {
    await v.resetFilters();
    v.requestRender();
  }
}
const SpeckleViewer_svelte_svelte_type_style_lang = "";
const css$b = {
  code: ".viewer.svelte-xa7knc{border-radius:5px;opacity:0.9;box-shadow:rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;min-height:100%;min-width:100%}",
  map: null
};
const SpeckleViewer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { speckleStream: speckleStream2 } = $$props;
  let viewerVal;
  const socket = io();
  socket.on("eventFromServer", (message) => {
    console.log(message);
  });
  if ($$props.speckleStream === void 0 && $$bindings.speckleStream && speckleStream2 !== void 0)
    $$bindings.speckleStream(speckleStream2);
  $$result.css.add(css$b);
  return `<div class="viewer svelte-xa7knc"${add_attribute("this", viewerVal, 0)}></div>`;
});
const styles = "";
const light = "";
const tippy = "";
const ToolBarButton_svelte_svelte_type_style_lang = "";
const css$a = {
  code: ".tooltip{font-size:0.8rem;background-color:transparent;border:none}.tool-bar-button.svelte-mcojfy{position:relative;border-radius:50%;border-width:0px;padding:1px;margin:1px;width:2.2em;height:2.2em;font-size:18px;display:flex;justify-content:center;align-items:center;flex-direction:column;cursor:pointer}.active.svelte-mcojfy{background-color:lightblue}",
  map: null
};
const ToolBarButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { icon: icon2 } = $$props;
  let { toExecute } = $$props;
  let { active } = $$props;
  let { commandName } = $$props;
  let expanded;
  let htmlbutton;
  finishLoading.subscribe((v) => {
    expanded = v;
  });
  if ($$props.icon === void 0 && $$bindings.icon && icon2 !== void 0)
    $$bindings.icon(icon2);
  if ($$props.toExecute === void 0 && $$bindings.toExecute && toExecute !== void 0)
    $$bindings.toExecute(toExecute);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.commandName === void 0 && $$bindings.commandName && commandName !== void 0)
    $$bindings.commandName(commandName);
  $$result.css.add(css$a);
  return `<button id="toolbarButton"${add_attribute("aria-expanded", expanded, 0)} aria-haspopup="true" class="${[
    "tool-bar-button neomorfic-div neomorfic-div-hover svelte-mcojfy",
    ""
  ].join(" ").trim()}"${add_attribute("this", htmlbutton, 0)}><img class="button-icon"${add_attribute("src", icon2, 0)} alt="">
</button>`;
});
const UtilityBar_svelte_svelte_type_style_lang = "";
const css$9 = {
  code: ".utility-bar.svelte-9b9uqz{position:absolute;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;z-index:3;border-radius:5px;background:rgba(255, 255, 255, 0.7);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);width:3em;height:100%;top:3rem;gap:5px}",
  map: null
};
let setTopView = "/icons/top.svg";
let colorBySector = "/icons/brand-google-maps.svg";
let homeView = "/icons/home-2.svg";
let services = "/icons/bolt.svg";
let chatIcon = "/icons/robot.svg";
let colorByProperty = "/icons/traffic-lights.svg";
let filterOff = "/icons/filter-off.svg";
const UtilityBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $sidebar_show, $$unsubscribe_sidebar_show;
  $$unsubscribe_sidebar_show = subscribe(sidebar_show, (value) => $sidebar_show = value);
  function setTop() {
    const activeV = get_store_value(speckleViewer);
    console.log("activeV", activeV);
    console.log(activeV, get_store_value(finishLoading), "cosonle log ");
    if (activeV.speckleViewer && get_store_value(finishLoading)) {
      activeV.speckleViewer.setView("top", true);
      activeV.speckleViewer.zoom([], 0.75);
    }
  }
  function setHome() {
    const activeV = get_store_value(speckleViewer);
    console.log(activeV, get_store_value(finishLoading), "cosonle log ");
    if (activeV.speckleViewer && get_store_value(finishLoading)) {
      activeV.speckleViewer.setView("3D", true);
      activeV.speckleViewer.zoom([], 0.5);
    }
  }
  function colorByPropertyAvailability() {
    const activeV = get_store_value(speckleViewer).speckleViewer;
    const disponibles = [];
    const ocupados = [];
    const reservados = [];
    if (activeV && get_store_value(finishLoading)) {
      const lotes = get_store_value(viewerLotes);
      lotes.forEach((lote) => {
        if (lote.Estado == "Disponible") {
          disponibles.push(lote.id);
        } else if (lote.Estado == "Ocupado") {
          ocupados.push(lote.id);
        } else if (lote.Estado == "Reservado") {
          reservados.push(lote.id);
        }
      });
      const colors = get_store_value(colorValueDisponibility);
      const dispQueryObject = {
        objectIds: disponibles,
        color: colors.Disponible
      };
      const ocupQueryObject = {
        objectIds: ocupados,
        color: colors.Ocupado
      };
      ({
        objectIds: reservados,
        color: colors.Reservado
      });
      console.log("states of color disponible and ocupado", disponibles, ocupados);
      activeV.setUserObjectColors([ocupQueryObject, dispQueryObject]);
    }
  }
  function removeFilterViewer() {
    resetViewerFilters();
  }
  function colorByPropertySector() {
    const activeV = get_store_value(speckleViewer).speckleViewer;
    const sector1 = [];
    const sector2 = [];
    const sector3 = [];
    const sector4 = [];
    const sector5 = [];
    if (activeV && get_store_value(finishLoading)) {
      const lotes = get_store_value(viewerLotes);
      lotes.forEach((lote) => {
        if (lote.Sector == 1) {
          sector1.push(lote.id);
        } else if (lote.Sector == 2) {
          sector2.push(lote.id);
        } else if (lote.Sector == 3) {
          sector3.push(lote.id);
        } else if (lote.Sector == 4) {
          sector4.push(lote.id);
        } else if (lote.Sector == 5) {
          sector5.push(lote.id);
        }
      });
      const sector1QueryObject = { objectIds: sector1, color: 8105982 };
      const sector2QueryObject = { objectIds: sector2, color: 9662425 };
      const sector3QueryObject = { objectIds: sector3, color: 16700979 };
      const sector4QueryObject = { objectIds: sector4, color: 3593106 };
      const sector5QueryObject = { objectIds: sector5, color: 3514061 };
      activeV.setUserObjectColors([
        sector1QueryObject,
        sector2QueryObject,
        sector3QueryObject,
        sector4QueryObject,
        sector5QueryObject
      ]);
    }
  }
  function filterByService(service) {
    const _sidebar_show = get_store_value(sidebar_show);
    if (_sidebar_show) {
      console.log("filter by service", service);
      sidebar_show.set(false);
      servicesSelected.set([]);
      currentSelection.set([]);
    } else {
      sidebar_show.set(true);
      servicesSelected.set([]);
    }
  }
  function resetSidebar() {
    if ($sidebar_show) {
      sidebar_show.set(false);
      servicesSelected.set([]);
      currentSelection.set([]);
    } else {
      sidebar_show.set(true);
      servicesSelected.set([]);
      currentSelection.set([]);
    }
  }
  function getBimbotResponse() {
    if ($sidebar_show) {
      resetSidebar();
    } else {
      sidebar_show.set(true);
    }
    console.log("chatMessages elssseee", chatMessages);
    const welcomM = [
      {
        messageId: 420,
        message: "Hola! soy CrisBot! te ayudo con info de lotes del parque CTEC :)",
        timestamp: 1587139349155217e-3,
        sentByMe: false,
        timeRead: 1587139359024353e-3
      }
    ];
    chatMessages.set(welcomM);
  }
  $$result.css.add(css$9);
  $$unsubscribe_sidebar_show();
  return `<div class="utility-bar svelte-9b9uqz">${validate_component(ToolBarButton, "ToolBarButton").$$render(
    $$result,
    {
      icon: setTopView,
      toExecute: setTop,
      active: false,
      commandName: "Set Top View"
    },
    {},
    {}
  )}
	${validate_component(ToolBarButton, "ToolBarButton").$$render(
    $$result,
    {
      icon: homeView,
      toExecute: setHome,
      active: false,
      commandName: "Set Home View"
    },
    {},
    {}
  )}
	${validate_component(ToolBarButton, "ToolBarButton").$$render(
    $$result,
    {
      icon: colorByProperty,
      toExecute: colorByPropertyAvailability,
      active: false,
      commandName: "Color por Ocupado, Disponible Reservado"
    },
    {},
    {}
  )}
	${validate_component(ToolBarButton, "ToolBarButton").$$render(
    $$result,
    {
      icon: colorBySector,
      toExecute: colorByPropertySector,
      active: false,
      commandName: "Color por Sectores"
    },
    {},
    {}
  )}
	${validate_component(ToolBarButton, "ToolBarButton").$$render(
    $$result,
    {
      icon: services,
      toExecute: filterByService,
      active: false,
      commandName: "Filter Reset"
    },
    {},
    {}
  )}
	${validate_component(ToolBarButton, "ToolBarButton").$$render(
    $$result,
    {
      icon: filterOff,
      toExecute: removeFilterViewer,
      active: false,
      commandName: "Filter Reset"
    },
    {},
    {}
  )}
	${validate_component(ToolBarButton, "ToolBarButton").$$render(
    $$result,
    {
      icon: chatIcon,
      toExecute: getBimbotResponse,
      active: false,
      commandName: "Chat Bot"
    },
    {},
    {}
  )}
</div>`;
});
const DonoutKpiChart_svelte_svelte_type_style_lang = "";
const css$8 = {
  code: ".donut-inner.svelte-ojor0y{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);padding:10px}canvas.svelte-ojor0y{z-index:3;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);width:100%;height:100%}.canvas-holder.svelte-ojor0y{display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;height:100%;margin-top:2rem}.donout-kpi-holder.svelte-ojor0y{height:12em;position:absolute;left:2em;bottom:1.5em;width:12em;margin:0.4em;display:flex;flex-direction:column;justify-content:start;align-items:center;gap:0.5em}p.svelte-ojor0y{margin:0;padding:0}.inner-value.svelte-ojor0y{font-weight:600;font-size:2.5em;margin:0;padding:0}.title.svelte-ojor0y{font-weight:600;font-size:1em;text-align:center}",
  map: null
};
const DonoutKpiChart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  Chart.register(...registerables);
  let { dataProp } = $$props;
  let dataList;
  let { tittle } = $$props;
  let chartValues = [];
  let chartLabels = [];
  let chartCanvas;
  let disponibleValue = "";
  viewerLotes.subscribe((v) => {
    dataList = v;
    const chartData = getChartArray();
    if (chartData.length > 0) {
      chartData.forEach((item) => {
        chartLabels.push(item.label);
        chartValues.push(item.value);
      });
      let disponibleIndex = chartData.findIndex((obj) => obj.label === "Disponible");
      disponibleValue = chartData[disponibleIndex].value;
    }
  });
  function getChartArray() {
    let chartUi = { label: "", value: "", ids: [] };
    let chartArray = [];
    if (dataList && dataList.length > 0) {
      dataList.forEach((item) => {
        if (item[dataProp] != null) {
          let index = chartArray.findIndex((obj) => obj.label === item[dataProp]);
          if (index === -1) {
            chartUi.label = item[dataProp];
            chartUi.value = 1;
            chartUi.ids.push(item.id);
            chartArray.push(chartUi);
            chartUi = { label: "", value: "", ids: [] };
          } else {
            chartArray[index].value += 1;
            chartArray[index].ids.push(item.id);
          }
        }
      });
    }
    chartArray.sort((a, b) => a.value > b.value ? -1 : 1);
    return chartArray;
  }
  if ($$props.dataProp === void 0 && $$bindings.dataProp && dataProp !== void 0)
    $$bindings.dataProp(dataProp);
  if ($$props.tittle === void 0 && $$bindings.tittle && tittle !== void 0)
    $$bindings.tittle(tittle);
  $$result.css.add(css$8);
  return `<div class="donout-kpi-holder svelte-ojor0y"><p class="title svelte-ojor0y">${escape(tittle)}</p>
	<div class="canvas-holder svelte-ojor0y"><canvas class="svelte-ojor0y"${add_attribute("this", chartCanvas, 0)}></canvas>
		<div class="donut-inner svelte-ojor0y"><p class="inner-value svelte-ojor0y">${escape(disponibleValue)}</p></div></div>
</div>`;
});
const SideBarRow_svelte_svelte_type_style_lang = "";
const css$7 = {
  code: ".row-container.svelte-1ytoj0t{display:flex;flex-direction:row;align-items:start;justify-content:flex-start;width:100%;height:0.9em;border-radius:5px;margin:0;padding:0.7em}.prop-style.svelte-1ytoj0t{font-size:0.9em;font-weight:300;line-height:1.2em}span.svelte-1ytoj0t{font-size:0.9em;font-weight:500;line-height:1.2em;align-self:self-start}",
  map: null
};
let icon = "/icons/arrow-badge-right.svg";
function truncateString(str, maxLength) {
  let truncatedString = "";
  if (str.length <= maxLength) {
    truncatedString = str;
  } else {
    if (typeof str === "string") {
      truncatedString = str.substring(0, maxLength) + "...";
    } else {
      truncatedString = str;
    }
  }
  return truncatedString;
}
const SideBarRow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { propName = "" } = $$props;
  let { propValue = "" } = $$props;
  if ($$props.propName === void 0 && $$bindings.propName && propName !== void 0)
    $$bindings.propName(propName);
  if ($$props.propValue === void 0 && $$bindings.propValue && propValue !== void 0)
    $$bindings.propValue(propValue);
  $$result.css.add(css$7);
  return `<li class="row-container svelte-1ytoj0t"><img${add_attribute("src", icon, 0)} alt="-">
	<span class="prop-style svelte-1ytoj0t">${escape(propName)} : </span>
	${`<p class="prop-style svelte-1ytoj0t">${escape(truncateString(propValue, 20))}</p>`}
</li>`;
});
const MultiSelect_svelte_svelte_type_style_lang = "";
const css$6 = {
  code: '.multiselect.svelte-z0m4zf.svelte-z0m4zf{background-color:transparent;border-bottom:1px solid hsl(0, 0%, 70%);position:relative;z-index:10}.multiselect.svelte-z0m4zf.svelte-z0m4zf:not(.readonly):hover{border-bottom-color:hsl(0, 0%, 50%)}.tokens.svelte-z0m4zf.svelte-z0m4zf{align-items:center;display:flex;flex-wrap:wrap;position:relative}.tokens.svelte-z0m4zf.svelte-z0m4zf::after{background:none repeat scroll 0 0 transparent;bottom:-1px;content:"";display:block;height:2px;left:50%;position:absolute;background:hsl(45, 100%, 51%);transition:width 0.3s ease 0s, left 0.3s ease 0s;width:0}.tokens.showOptions.svelte-z0m4zf.svelte-z0m4zf::after{width:100%;left:0}.token.svelte-z0m4zf.svelte-z0m4zf{align-items:center;background-color:hsl(214, 17%, 92%);border-radius:1.25rem;display:flex;margin:.25rem .5rem .25rem 0;max-height:1.3rem;padding:.25rem .5rem .25rem .5rem;transition:background-color .3s;white-space:nowrap}.token.svelte-z0m4zf.svelte-z0m4zf:hover{background-color:hsl(214, 15%, 88%)}.readonly.svelte-z0m4zf .token.svelte-z0m4zf{color:hsl(0, 0%, 40%)}.token-remove.svelte-z0m4zf.svelte-z0m4zf,.remove-all.svelte-z0m4zf.svelte-z0m4zf{align-items:center;background-color:hsl(214, 15%, 55%);border-radius:50%;color:hsl(214, 17%, 92%);display:flex;justify-content:center;height:1.25rem;margin-left:.25rem;min-width:1.25rem}.token-remove.svelte-z0m4zf.svelte-z0m4zf:hover,.remove-all.svelte-z0m4zf.svelte-z0m4zf:hover{background-color:hsl(215, 21%, 43%);cursor:pointer}.actions.svelte-z0m4zf.svelte-z0m4zf{align-items:center;display:flex;flex:1;min-width:15rem}input.svelte-z0m4zf.svelte-z0m4zf{border:none;font-size:1.5rem;line-height:1.5rem;margin:0;outline:none;padding:0;width:100%}.dropdown-arrow.svelte-z0m4zf path.svelte-z0m4zf{fill:hsl(0, 0%, 70%)}.multiselect.svelte-z0m4zf:hover .dropdown-arrow path.svelte-z0m4zf{fill:hsl(0, 0%, 50%)}.icon-clear.svelte-z0m4zf path.svelte-z0m4zf{fill:white}.options.svelte-z0m4zf.svelte-z0m4zf{box-shadow:0px 2px 4px rgba(0,0,0,.1), 0px -2px 4px rgba(0,0,0,.1);left:0;list-style:none;margin-block-end:0;margin-block-start:0;max-height:70vh;overflow:auto;padding-inline-start:0;position:absolute;top:calc(100% + 1px);width:100%}li.svelte-z0m4zf.svelte-z0m4zf{background-color:white;cursor:pointer;padding:.5rem}li.svelte-z0m4zf.svelte-z0m4zf:last-child{border-bottom-left-radius:.2rem;border-bottom-right-radius:.2rem}li.svelte-z0m4zf.svelte-z0m4zf:not(.selected):hover{background-color:hsl(214, 17%, 92%)}li.selected.svelte-z0m4zf.svelte-z0m4zf{background-color:0xa2a2a2;color:gray}li.selected.svelte-z0m4zf.svelte-z0m4zf:nth-child(even){background-color:0xa2a2a2;color:gray}li.active.svelte-z0m4zf.svelte-z0m4zf{background-color:hsl(214, 17%, 88%)}li.selected.active.svelte-z0m4zf.svelte-z0m4zf,li.selected.svelte-z0m4zf.svelte-z0m4zf:hover{background-color:0xa2a2a2}.hidden.svelte-z0m4zf.svelte-z0m4zf{display:none}',
  map: null
};
const iconClearPath = "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z";
const MultiSelect = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id = "" } = $$props;
  let { value = [] } = $$props;
  let { readonly = false } = $$props;
  let { placeholder = "" } = $$props;
  let { onChange } = $$props;
  let input, inputValue, selected = {}, slot;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0)
    $$bindings.readonly(readonly);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.onChange === void 0 && $$bindings.onChange && onChange !== void 0)
    $$bindings.onChange(onChange);
  $$result.css.add(css$6);
  {
    onChange(selected);
  }
  return `<div class="${["multiselect svelte-z0m4zf", readonly ? "readonly" : ""].join(" ").trim()}"><div class="${["tokens svelte-z0m4zf", ""].join(" ").trim()}">${each(Object.values(selected), (s) => {
    return `<div class="token svelte-z0m4zf"${add_attribute("data-id", s.value, 0)}><span>${escape(s.name)}</span>
          ${!readonly ? `<div class="token-remove svelte-z0m4zf" title="${"Remove " + escape(s.name, true)}"><svg class="icon-clear svelte-z0m4zf" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path${add_attribute("d", iconClearPath, 0)} class="svelte-z0m4zf"></path></svg>
            </div>` : ``}
        </div>`;
  })}
      <div class="actions svelte-z0m4zf">${!readonly ? `<input${add_attribute("id", id, 0)} autocomplete="off"${add_attribute("placeholder", placeholder, 0)} class="svelte-z0m4zf"${add_attribute("value", inputValue, 0)}${add_attribute("this", input, 0)}>
          <div class="${["remove-all svelte-z0m4zf", !Object.keys(selected).length ? "hidden" : ""].join(" ").trim()}" title="Remove All"><svg class="icon-clear svelte-z0m4zf" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path${add_attribute("d", iconClearPath, 0)} class="svelte-z0m4zf"></path></svg></div>
          <svg class="dropdown-arrow svelte-z0m4zf" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M5 8l4 4 4-4z" class="svelte-z0m4zf"></path></svg>` : ``}</div></div>
  
    <select type="multiple" class="hidden svelte-z0m4zf"${add_attribute("this", slot, 0)}>${slots.default ? slots.default({}) : ``}</select>
    
    ${``}</div>`;
});
const parseNumber = parseFloat;
function joinCss(obj, separator = ";") {
  let texts;
  if (Array.isArray(obj)) {
    texts = obj.filter((text) => text);
  } else {
    texts = [];
    for (const prop in obj) {
      if (obj[prop]) {
        texts.push(`${prop}:${obj[prop]}`);
      }
    }
  }
  return texts.join(separator);
}
function getStyles(style, size, pull, fw) {
  let float;
  let width;
  const height = "1em";
  let lineHeight;
  let fontSize;
  let textAlign;
  let verticalAlign = "-.125em";
  const overflow = "visible";
  if (fw) {
    textAlign = "center";
    width = "1.25em";
  }
  if (pull) {
    float = pull;
  }
  if (size) {
    if (size == "lg") {
      fontSize = "1.33333em";
      lineHeight = ".75em";
      verticalAlign = "-.225em";
    } else if (size == "xs") {
      fontSize = ".75em";
    } else if (size == "sm") {
      fontSize = ".875em";
    } else {
      fontSize = size.replace("x", "em");
    }
  }
  return joinCss([
    joinCss({
      float,
      width,
      height,
      "line-height": lineHeight,
      "font-size": fontSize,
      "text-align": textAlign,
      "vertical-align": verticalAlign,
      "transform-origin": "center",
      overflow
    }),
    style
  ]);
}
function getTransform(scale, translateX, translateY, rotate, flip, translateTimes = 1, translateUnit = "", rotateUnit = "") {
  let flipX = 1;
  let flipY = 1;
  if (flip) {
    if (flip == "horizontal") {
      flipX = -1;
    } else if (flip == "vertical") {
      flipY = -1;
    } else {
      flipX = flipY = -1;
    }
  }
  return joinCss(
    [
      `translate(${parseNumber(translateX) * translateTimes}${translateUnit},${parseNumber(translateY) * translateTimes}${translateUnit})`,
      `scale(${flipX * parseNumber(scale)},${flipY * parseNumber(scale)})`,
      rotate && `rotate(${rotate}${rotateUnit})`
    ],
    " "
  );
}
const fa_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: ".spin.svelte-1cj2gr0{animation:svelte-1cj2gr0-spin 2s 0s infinite linear}.pulse.svelte-1cj2gr0{animation:svelte-1cj2gr0-spin 1s infinite steps(8)}@keyframes svelte-1cj2gr0-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}",
  map: null
};
const Fa = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { class: clazz = "" } = $$props;
  let { id = "" } = $$props;
  let { style = "" } = $$props;
  let { icon: icon2 } = $$props;
  let { size = "" } = $$props;
  let { color = "" } = $$props;
  let { fw = false } = $$props;
  let { pull = "" } = $$props;
  let { scale = 1 } = $$props;
  let { translateX = 0 } = $$props;
  let { translateY = 0 } = $$props;
  let { rotate = "" } = $$props;
  let { flip = false } = $$props;
  let { spin = false } = $$props;
  let { pulse = false } = $$props;
  let { primaryColor = "" } = $$props;
  let { secondaryColor = "" } = $$props;
  let { primaryOpacity = 1 } = $$props;
  let { secondaryOpacity = 0.4 } = $$props;
  let { swapOpacity = false } = $$props;
  let i;
  let s;
  let transform;
  if ($$props.class === void 0 && $$bindings.class && clazz !== void 0)
    $$bindings.class(clazz);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.icon === void 0 && $$bindings.icon && icon2 !== void 0)
    $$bindings.icon(icon2);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.fw === void 0 && $$bindings.fw && fw !== void 0)
    $$bindings.fw(fw);
  if ($$props.pull === void 0 && $$bindings.pull && pull !== void 0)
    $$bindings.pull(pull);
  if ($$props.scale === void 0 && $$bindings.scale && scale !== void 0)
    $$bindings.scale(scale);
  if ($$props.translateX === void 0 && $$bindings.translateX && translateX !== void 0)
    $$bindings.translateX(translateX);
  if ($$props.translateY === void 0 && $$bindings.translateY && translateY !== void 0)
    $$bindings.translateY(translateY);
  if ($$props.rotate === void 0 && $$bindings.rotate && rotate !== void 0)
    $$bindings.rotate(rotate);
  if ($$props.flip === void 0 && $$bindings.flip && flip !== void 0)
    $$bindings.flip(flip);
  if ($$props.spin === void 0 && $$bindings.spin && spin !== void 0)
    $$bindings.spin(spin);
  if ($$props.pulse === void 0 && $$bindings.pulse && pulse !== void 0)
    $$bindings.pulse(pulse);
  if ($$props.primaryColor === void 0 && $$bindings.primaryColor && primaryColor !== void 0)
    $$bindings.primaryColor(primaryColor);
  if ($$props.secondaryColor === void 0 && $$bindings.secondaryColor && secondaryColor !== void 0)
    $$bindings.secondaryColor(secondaryColor);
  if ($$props.primaryOpacity === void 0 && $$bindings.primaryOpacity && primaryOpacity !== void 0)
    $$bindings.primaryOpacity(primaryOpacity);
  if ($$props.secondaryOpacity === void 0 && $$bindings.secondaryOpacity && secondaryOpacity !== void 0)
    $$bindings.secondaryOpacity(secondaryOpacity);
  if ($$props.swapOpacity === void 0 && $$bindings.swapOpacity && swapOpacity !== void 0)
    $$bindings.swapOpacity(swapOpacity);
  $$result.css.add(css$5);
  i = icon2 && icon2.icon || [0, 0, "", [], ""];
  s = getStyles(style, size, pull, fw);
  transform = getTransform(scale, translateX, translateY, rotate, flip, 512);
  return `${i[4] ? `<svg${add_attribute("id", id || void 0, 0)} class="${[
    "svelte-fa " + escape(clazz, true) + " svelte-1cj2gr0",
    (pulse ? "pulse" : "") + " " + (spin ? "spin" : "")
  ].join(" ").trim()}"${add_attribute("style", s, 0)} viewBox="${"0 0 " + escape(i[0], true) + " " + escape(i[1], true)}" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg"><g transform="${"translate(" + escape(i[0] / 2, true) + " " + escape(i[1] / 2, true) + ")"}" transform-origin="${escape(i[0] / 4, true) + " 0"}"><g${add_attribute("transform", transform, 0)}>${typeof i[4] == "string" ? `<path${add_attribute("d", i[4], 0)}${add_attribute("fill", color || primaryColor || "currentColor", 0)} transform="${"translate(" + escape(i[0] / -2, true) + " " + escape(i[1] / -2, true) + ")"}"></path>` : `
          <path${add_attribute("d", i[4][0], 0)}${add_attribute("fill", secondaryColor || color || "currentColor", 0)}${add_attribute("fill-opacity", swapOpacity != false ? primaryOpacity : secondaryOpacity, 0)} transform="${"translate(" + escape(i[0] / -2, true) + " " + escape(i[1] / -2, true) + ")"}"></path>
          <path${add_attribute("d", i[4][1], 0)}${add_attribute("fill", primaryColor || color || "currentColor", 0)}${add_attribute("fill-opacity", swapOpacity != false ? secondaryOpacity : primaryOpacity, 0)} transform="${"translate(" + escape(i[0] / -2, true) + " " + escape(i[1] / -2, true) + ")"}"></path>`}</g></g></svg>` : ``}`;
});
const ChatMessage_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: ".direct-chat-msg.svelte-n85of4.svelte-n85of4,.direct-chat-text.svelte-n85of4.svelte-n85of4{display:block}.direct-chat-msg.svelte-n85of4.svelte-n85of4{margin-bottom:10px}.direct-chat-msg.svelte-n85of4.svelte-n85of4:before,.direct-chat-msg.svelte-n85of4.svelte-n85of4:after{content:' ';display:table}.direct-chat-msg.svelte-n85of4.svelte-n85of4:after{clear:both}.direct-chat-text.svelte-n85of4.svelte-n85of4{border-radius:5px;position:relative;padding:5px 10px;background:#d2d6de;border:1px solid #d2d6de;margin:2px 0 5px 50px;color:#444;margin-right:50px;font-size:0.7rem}.direct-chat-text.svelte-n85of4.svelte-n85of4:after,.direct-chat-text.svelte-n85of4.svelte-n85of4:before{position:absolute;right:100%;top:15px;border:solid transparent;border-right-color:#d2d6de;content:' ';height:0;width:0;pointer-events:none}.direct-chat-text.svelte-n85of4.svelte-n85of4:after{border-width:5px;margin-top:-5px}.direct-chat-text.svelte-n85of4.svelte-n85of4:before{border-width:6px;margin-top:-6px}.right.svelte-n85of4 .direct-chat-text.svelte-n85of4{margin-right:50px;margin-left:50px}.right.svelte-n85of4 .direct-chat-text.svelte-n85of4:after,.right.svelte-n85of4 .direct-chat-text.svelte-n85of4:before{right:auto;left:100%;border-right-color:transparent;border-left-color:#d2d6de}img.svelte-n85of4.svelte-n85of4{border-radius:50%;float:left;width:40px;height:40px}.right.svelte-n85of4 img.svelte-n85of4{float:right}.direct-chat-infos.svelte-n85of4.svelte-n85of4{font-size:0.6rem}.direct-chat-name.svelte-n85of4.svelte-n85of4{font-weight:600}.direct-chat-timestamp.svelte-n85of4.svelte-n85of4{margin-left:50px;margin-right:50px;color:#999;margin-bottom:0}.read-icon.svelte-n85of4.svelte-n85of4{color:#007bff}.un-read-icon.svelte-n85of4.svelte-n85of4{color:#8f8f8f8f}",
  map: null
};
const ChatMessage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { sentByMe } = $$props;
  let { nameChatPartner: nameChatPartner2 } = $$props;
  let { profilePicChatPartner: profilePicChatPartner2 } = $$props;
  let { nameMe: nameMe2 } = $$props;
  let { profilePicMe: profilePicMe2 } = $$props;
  let { message } = $$props;
  let { timestamp } = $$props;
  let { timeRead } = $$props;
  let { isToday } = $$props;
  if ($$props.sentByMe === void 0 && $$bindings.sentByMe && sentByMe !== void 0)
    $$bindings.sentByMe(sentByMe);
  if ($$props.nameChatPartner === void 0 && $$bindings.nameChatPartner && nameChatPartner2 !== void 0)
    $$bindings.nameChatPartner(nameChatPartner2);
  if ($$props.profilePicChatPartner === void 0 && $$bindings.profilePicChatPartner && profilePicChatPartner2 !== void 0)
    $$bindings.profilePicChatPartner(profilePicChatPartner2);
  if ($$props.nameMe === void 0 && $$bindings.nameMe && nameMe2 !== void 0)
    $$bindings.nameMe(nameMe2);
  if ($$props.profilePicMe === void 0 && $$bindings.profilePicMe && profilePicMe2 !== void 0)
    $$bindings.profilePicMe(profilePicMe2);
  if ($$props.message === void 0 && $$bindings.message && message !== void 0)
    $$bindings.message(message);
  if ($$props.timestamp === void 0 && $$bindings.timestamp && timestamp !== void 0)
    $$bindings.timestamp(timestamp);
  if ($$props.timeRead === void 0 && $$bindings.timeRead && timeRead !== void 0)
    $$bindings.timeRead(timeRead);
  if ($$props.isToday === void 0 && $$bindings.isToday && isToday !== void 0)
    $$bindings.isToday(isToday);
  $$result.css.add(css$4);
  return `<div class="${[
    "direct-chat-msg svelte-n85of4",
    (sentByMe ? "right" : "") + " " + (!sentByMe ? "left" : "")
  ].join(" ").trim()}"><div class="direct-chat-infos clearfix svelte-n85of4">
		

		<span class="${[
    "direct-chat-timestamp svelte-n85of4",
    (sentByMe ? "float-left" : "") + " " + (!sentByMe ? "float-right" : "")
  ].join(" ").trim()}">${isToday ? `${escape(new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))}` : `${escape(new Date(timestamp).toLocaleString([], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }))}`}

			${sentByMe === true ? `<span class="${escape(null_to_empty((timeRead === 0 ? "un-" : "") + "read-icon"), true) + " svelte-n85of4"}">${validate_component(Fa, "Fa").$$render($$result, { icon: faCheckDouble }, {}, {})}</span>` : ``}</span></div>
	<img class="direct-chat-img svelte-n85of4"${add_attribute("src", sentByMe == true ? profilePicMe2 : profilePicChatPartner2, 0)} alt="pic">
	<div class="direct-chat-text svelte-n85of4"><div class="d-flex"><span class="mr-auto">${escape(message)}</span></div></div>
</div>`;
});
const TodayDivider_svelte_svelte_type_style_lang = "";
const Circle_svelte_svelte_type_style_lang = "";
const Circle2_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".circle.svelte-1w4sjib{width:var(--size);height:var(--size);box-sizing:border-box;position:relative;border:3px solid transparent;border-top-color:var(--colorOuter);border-radius:50%;animation:svelte-1w4sjib-circleSpin var(--durationOuter) linear infinite}.circle.svelte-1w4sjib::before,.circle.svelte-1w4sjib::after{content:'';box-sizing:border-box;position:absolute;border:3px solid transparent;border-radius:50%}.circle.svelte-1w4sjib::after{border-top-color:var(--colorInner);top:9px;left:9px;right:9px;bottom:9px;animation:svelte-1w4sjib-circleSpin var(--durationInner) linear infinite}.circle.svelte-1w4sjib::before{border-top-color:var(--colorCenter);top:3px;left:3px;right:3px;bottom:3px;animation:svelte-1w4sjib-circleSpin var(--durationCenter) linear infinite}.pause-animation.svelte-1w4sjib,.pause-animation.svelte-1w4sjib::after,.pause-animation.svelte-1w4sjib::before{animation-play-state:paused}@keyframes svelte-1w4sjib-circleSpin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}",
  map: null
};
const Circle2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = "60" } = $$props;
  let { unit = "px" } = $$props;
  let { pause = false } = $$props;
  let { colorOuter = "#FF3E00" } = $$props;
  let { colorCenter = "#40B3FF" } = $$props;
  let { colorInner = "#676778" } = $$props;
  let { durationMultiplier = 1 } = $$props;
  let { durationOuter = `${durationMultiplier * 2}s` } = $$props;
  let { durationInner = `${durationMultiplier * 1.5}s` } = $$props;
  let { durationCenter = `${durationMultiplier * 3}s` } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.unit === void 0 && $$bindings.unit && unit !== void 0)
    $$bindings.unit(unit);
  if ($$props.pause === void 0 && $$bindings.pause && pause !== void 0)
    $$bindings.pause(pause);
  if ($$props.colorOuter === void 0 && $$bindings.colorOuter && colorOuter !== void 0)
    $$bindings.colorOuter(colorOuter);
  if ($$props.colorCenter === void 0 && $$bindings.colorCenter && colorCenter !== void 0)
    $$bindings.colorCenter(colorCenter);
  if ($$props.colorInner === void 0 && $$bindings.colorInner && colorInner !== void 0)
    $$bindings.colorInner(colorInner);
  if ($$props.durationMultiplier === void 0 && $$bindings.durationMultiplier && durationMultiplier !== void 0)
    $$bindings.durationMultiplier(durationMultiplier);
  if ($$props.durationOuter === void 0 && $$bindings.durationOuter && durationOuter !== void 0)
    $$bindings.durationOuter(durationOuter);
  if ($$props.durationInner === void 0 && $$bindings.durationInner && durationInner !== void 0)
    $$bindings.durationInner(durationInner);
  if ($$props.durationCenter === void 0 && $$bindings.durationCenter && durationCenter !== void 0)
    $$bindings.durationCenter(durationCenter);
  $$result.css.add(css$3);
  return `<div class="${["circle svelte-1w4sjib", pause ? "pause-animation" : ""].join(" ").trim()}" style="${"--size: " + escape(size, true) + escape(unit, true) + "; --colorInner: " + escape(colorInner, true) + "; --colorCenter: " + escape(colorCenter, true) + "; --colorOuter: " + escape(colorOuter, true) + "; --durationInner: " + escape(durationInner, true) + "; --durationCenter: " + escape(durationCenter, true) + "; --durationOuter: " + escape(durationOuter, true) + ";"}"></div>`;
});
const Circle3_svelte_svelte_type_style_lang = "";
const DoubleBounce_svelte_svelte_type_style_lang = "";
const GoogleSpin_svelte_svelte_type_style_lang = "";
const ScaleOut_svelte_svelte_type_style_lang = "";
const SpinLine_svelte_svelte_type_style_lang = "";
const Stretch_svelte_svelte_type_style_lang = "";
const BarLoader_svelte_svelte_type_style_lang = "";
const Jumper_svelte_svelte_type_style_lang = "";
const RingLoader_svelte_svelte_type_style_lang = "";
const SyncLoader_svelte_svelte_type_style_lang = "";
const Rainbow_svelte_svelte_type_style_lang = "";
const Firework_svelte_svelte_type_style_lang = "";
const Pulse_svelte_svelte_type_style_lang = "";
const Jellyfish_svelte_svelte_type_style_lang = "";
const Chasing_svelte_svelte_type_style_lang = "";
const Square_svelte_svelte_type_style_lang = "";
const Shadow_svelte_svelte_type_style_lang = "";
const Moon_svelte_svelte_type_style_lang = "";
const Plane_svelte_svelte_type_style_lang = "";
const Diamonds_svelte_svelte_type_style_lang = "";
const Clock_svelte_svelte_type_style_lang = "";
const Wave_svelte_svelte_type_style_lang = "";
const Puff_svelte_svelte_type_style_lang = "";
const ArrowDown_svelte_svelte_type_style_lang = "";
const ArrowUp_svelte_svelte_type_style_lang = "";
const ChatUi_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".card-container.svelte-1vypox8{border-radius:0.25rem;margin-bottom:1rem;width:100%;height:auto;max-height:80%}.card-body.svelte-1vypox8{padding:0;position:relative;overflow-x:hidden}.direct-chat-messages.svelte-1vypox8{transform:translate(0, 0);height:400px;overflow:auto;padding:10px;transition:transform 0.5s ease-in-out}.card-footer.svelte-1vypox8{padding:0.75rem 1.25rem;background-color:#f8f9fa;border-top:1px solid #dee2e6}.form-control.svelte-1vypox8{display:block;width:100%;height:calc(1.5em + 0.75rem + 2px);padding:0.375rem 0.75rem;font-weight:400;line-height:1.5;font-size:0.7rem;color:#495057;background-color:#fff;background-clip:padding-box;border:1px solid #ced4da;border-radius:0.25rem;transition:border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out}.btn-primary.svelte-1vypox8{color:#fff;font-size:0.7rem}",
  map: null
};
let nameMe = "Me";
let profilePicMe = "/icons/user.svg";
let nameChatPartner = "Cris";
let profilePicChatPartner = "/icons/robot.svg";
const ChatUi = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_colorValueDisponibility;
  let $chatMessages, $$unsubscribe_chatMessages;
  let $$unsubscribe_viewerLotes;
  $$unsubscribe_colorValueDisponibility = subscribe(colorValueDisponibility, (value) => value);
  $$unsubscribe_chatMessages = subscribe(chatMessages, (value) => $chatMessages = value);
  $$unsubscribe_viewerLotes = subscribe(viewerLotes, (value) => value);
  let currentInput = "";
  let loadinMessage = writable(true);
  let chatContainer;
  setInterval(
    () => {
      if (loadinMessage)
        loadinMessage.set(false);
      else
        loadinMessage.set(true);
    },
    4500
  );
  $$result.css.add(css$2);
  $$unsubscribe_colorValueDisponibility();
  $$unsubscribe_chatMessages();
  $$unsubscribe_viewerLotes();
  return `<div class="card-container svelte-1vypox8"><div class="card-body svelte-1vypox8"><div class="direct-chat-messages svelte-1vypox8"${add_attribute("this", chatContainer, 0)}>${each($chatMessages, (message) => {
    return `${validate_component(ChatMessage, "ChatMessage").$$render(
      $$result,
      {
        nameMe,
        profilePicMe,
        nameChatPartner,
        profilePicChatPartner,
        message: message.message,
        timestamp: message.timestamp,
        sentByMe: message.sentByMe,
        timeRead: message.timeRead
      },
      {},
      {}
    )}`;
  })}
			<div class="loading-wrapper" duration="5s"></div></div></div>
	<div class="card-footer svelte-1vypox8"><div class="input-group"><input type="text" placeholder="Type Message ..." class="form-control svelte-1vypox8"${add_attribute("this", currentInput, 0)}>
			<span class="input-group-append"><button type="button" class="btn-primary svelte-1vypox8">Send</button></span></div></div>
</div>`;
});
const Sidebar_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".side-container.svelte-apk9a4{display:flex;flex-direction:column;align-items:start;border:1px solid rgba(0, 0, 0, 0.1);border-radius:5px;padding:1rem;padding-bottom:2rem;justify-content:flex-start;gap:5px;height:auto;width:100%}.side-service-filter.svelte-apk9a4{display:flex;flex-direction:column;align-items:start;border:1px solid rgba(0, 0, 0, 0.1);border-radius:5px;padding:10px;justify-content:flex-start;gap:5px;height:auto;width:100%}.side-bar.svelte-apk9a4{position:fixed;right:0;top:3rem;height:auto;max-height:90vh;min-height:50vh;padding:2rem 1rem 1rem;margin-right:1rem;box-shadow:0 10px 10px rgba(0, 0, 0, 0.1);overflow-y:auto;width:20em;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-start;gap:1rem;z-index:5;border-radius:5px;background:rgba(255, 255, 255, 0.7);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px)}",
  map: null
};
const Sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $chatMessages, $$unsubscribe_chatMessages;
  let $$unsubscribe_servicesSelected;
  $$unsubscribe_chatMessages = subscribe(chatMessages, (value) => $chatMessages = value);
  $$unsubscribe_servicesSelected = subscribe(servicesSelected, (value) => value);
  let { show = false } = $$props;
  let proto = get_store_value(currentProto);
  let lote = get_store_value(currentLote);
  let filterService = false;
  let chatUi = $chatMessages;
  currentLote.subscribe((v) => {
    if (v) {
      lote = v;
      proto = null;
    }
  });
  currentProto.subscribe((v) => {
    if (v) {
      const loteId = v?.LoteID;
      const _lote = get_store_value(viewerLotes).find((item) => item.LoteID === loteId);
      const lote2 = _lote ? _lote : null;
      console.log("-------", lote2);
      proto = v;
    }
  });
  servicesSelected.subscribe((v) => {
    if (v.length != 0) {
      filterService = true;
    } else {
      filterService = false;
    }
  });
  function viewerFilterByServices(selectedArray) {
    const selectedArrayKeys = Object.keys(selectedArray);
    const colors = get_store_value(colorValueDisponibility);
    const activeV = get_store_value(speckleViewer).speckleViewer;
    const _viewerLotes = get_store_value(viewerLotes);
    if (selectedArrayKeys.length != 0 && get_store_value(finishLoading)) {
      const filteredLotes = _viewerLotes.filter((lote2) => {
        const hasSelectedServices = selectedArrayKeys.every((selectedService) => {
          return lote2.Servicios.includes(selectedService);
        });
        return hasSelectedServices;
      });
      const filteredLotesIds = filteredLotes.map((lote2) => lote2.id);
      const dispQueryObject = {
        objectIds: filteredLotesIds,
        color: colors.Disponible
      };
      activeV.setUserObjectColors([dispQueryObject]);
    } else {
      resetViewerFilters();
    }
  }
  if ($$props.show === void 0 && $$bindings.show && show !== void 0)
    $$bindings.show(show);
  $$result.css.add(css$1);
  $$unsubscribe_chatMessages();
  $$unsubscribe_servicesSelected();
  return `${show ? `<nav class="side-bar svelte-apk9a4">${filterService ? `<span>Filtro por Servicio:</span>
			<div class="side-service-filter svelte-apk9a4">${validate_component(MultiSelect, "MultiSelect").$$render(
    $$result,
    {
      id: "lang",
      onChange: (selectedArray) => viewerFilterByServices(selectedArray)
    },
    {},
    {
      default: () => {
        return `${each(get_store_value(servicesAvailable), (service) => {
          return `<option${add_attribute("value", service, 0)}>${escape(service)}</option>`;
        })}`;
      }
    }
  )}</div>` : ``}
		${lote ? `<span>Info Lote: ${escape(lote.LoteID)}</span>
			<ol class="side-container svelte-apk9a4">${each(Object.entries(lote), ([propName, propValue]) => {
    return `${validate_component(SideBarRow, "SideBarRow").$$render($$result, { propName, propValue }, {}, {})}`;
  })}</ol>` : ``}

		${proto ? `<span>Info Proto: ${escape(proto.Nombre)}</span>
			<div class="side-container svelte-apk9a4">${each(Object.entries(proto), ([propName, propValue]) => {
    return `${validate_component(SideBarRow, "SideBarRow").$$render($$result, { propName, propValue }, {}, {})}`;
  })}</div>` : ``}
		${chatUi ? `<span>GPT Chat:</span>
			${validate_component(ChatUi, "ChatUi").$$render($$result, {}, {}, {})}` : ``}</nav>` : ``}`;
});
const GoogleCalendarInfoCard_svelte_svelte_type_style_lang = "";
const GoogleCalendarInfoContainer_svelte_svelte_type_style_lang = "";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".center-loader.svelte-n84s63{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%)}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $finishLoading, $$unsubscribe_finishLoading;
  let $speckleStream, $$unsubscribe_speckleStream;
  $$unsubscribe_finishLoading = subscribe(finishLoading, (value) => $finishLoading = value);
  $$unsubscribe_speckleStream = subscribe(speckleStream, (value) => $speckleStream = value);
  let { data } = $$props;
  let loadCompleted = $finishLoading;
  let _sidebar_show = get_store_value(sidebar_show);
  get_store_value(parkOperationCalendarID);
  finishLoading.subscribe((v) => {
    console.log("finishLoading", v);
    if (v) {
      loadCompleted = true;
    } else {
      loadCompleted = false;
    }
  });
  sidebar_show.subscribe((v) => {
    console.log("sidebar_show", v);
    _sidebar_show = v;
  });
  speckleStream.subscribe((speckleS) => {
    console.log("speckleStream........", speckleS);
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(SpeckleViewer, "SpeckleViewer").$$render($$result, { speckleStream: $speckleStream }, {}, {})}

${loadCompleted ? `${validate_component(UtilityBar, "UtilityBar").$$render($$result, {}, {}, {})}
	
	${validate_component(DonoutKpiChart, "DonoutKpiChart").$$render(
      $$result,
      {
        dataProp: "Estado",
        tittle: "Disponibilidad:"
      },
      {},
      {}
    )}
	${validate_component(Sidebar, "Sidebar").$$render(
      $$result,
      { show: _sidebar_show },
      {
        show: ($$value) => {
          _sidebar_show = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : `<div class="center-loader svelte-n84s63">${validate_component(Circle2, "Circle2").$$render(
      $$result,
      {
        size: "60",
        color: "#FF3E00",
        unit: "px",
        duration: "1.5s"
      },
      {},
      {}
    )}</div>`}`;
  } while (!$$settled);
  $$unsubscribe_finishLoading();
  $$unsubscribe_speckleStream();
  return $$rendered;
});
export {
  Page as default
};
