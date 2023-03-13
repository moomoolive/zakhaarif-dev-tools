export type ShaheenCore = {
    getRootCanvas: () => HTMLCanvasElement;
};
export type ShaheenEngine<Extensions extends object = object> = (ShaheenCore & Extensions);
export type ZakhaarifModCore<EngineExtensions extends object = object> = {
    init: (engine: ShaheenEngine<EngineExtensions>) => unknown;
};
export type ZakhaarifMod<EngineExtensions extends object = object, ModExtensions extends object = object> = (ZakhaarifModCore<EngineExtensions> & ModExtensions);
export type ZakhaarifModEsModule<EngineExtensions extends object = object, ModExtensions extends object = object> = {
    default: ZakhaarifMod<EngineExtensions, ModExtensions>;
};
