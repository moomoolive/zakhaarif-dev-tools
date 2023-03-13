export type ShaheenCore = {
    getRootCanvas: () => HTMLCanvasElement;
};
export interface ShaheenEngineExtensions {
}
export type ShaheenEngine = ShaheenCore & ShaheenEngineExtensions;
export type ZakhaarifModCore = {
    init: (engine: ShaheenEngine) => unknown;
};
export interface ZakhaarifModExtensions {
}
export type ZakhaarifMod = (ZakhaarifModCore & ZakhaarifModExtensions);
export type ZakhaarifModEsModule = {
    default: ZakhaarifMod;
};
