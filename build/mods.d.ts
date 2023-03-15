import type { ExtendedEngineCore, InitializedEngineCore, PostInitializationCore } from "./engine";
export type ModDataResources<ImmutableResources extends object | undefined> = ImmutableResources extends undefined ? {} : {
    readonly resources: ImmutableResources;
};
export type ModMetadata = {
    canonicalUrl: string;
    resolvedUrl: string;
};
export type ModData<Alias extends string, ImmutableResources extends object | undefined, State extends object> = {
    readonly alias: Alias;
    readonly resources?: ImmutableResources;
    state?: (engineCore: InitializedEngineCore, metadata: ModMetadata) => State;
};
export type GenericModData = {
    readonly alias: string;
    readonly resources?: object;
    state?: (engineCore: InitializedEngineCore, metadata: ModMetadata) => object;
};
export type DependentMods = ReadonlyArray<GenericModData>;
export type DependenciesDeclaration<Dependencies extends DependentMods> = Dependencies extends [] ? {} : {
    readonly dependencies: {
        [index in keyof Dependencies]: Dependencies[index] extends {
            alias: string;
        } ? Dependencies[index]["alias"] : never;
    };
};
export type ModWrapperCore = (ModMetadata & {
    dependencies: string[];
    originalModule: GenericModModule;
});
export type ModWrapper<Alias extends string, ImmutableResources extends object | undefined, State extends object> = (ModWrapperCore & {
    readonly alias: Alias;
    readonly resources: ImmutableResources extends undefined ? {} : ImmutableResources;
    state: State;
});
export type GenericModWrapper = (ModWrapperCore & {
    readonly alias: string;
    readonly resources: object;
    state: object;
});
export interface ModView extends GenericModWrapper {
}
export type LinkedMods<EngineModules extends DependentMods> = ({
    [mod in EngineModules[number] as mod["alias"]]: (ModWrapper<mod["alias"], mod["resources"] extends undefined ? {} : {
        readonly [key in keyof NonNullable<mod["resources"]>]: string;
    }, mod["state"] extends undefined ? {} : ReturnType<NonNullable<mod["state"]>>>);
});
export type EngineLinkedMods<EngineModules extends DependentMods> = {
    mods: LinkedMods<EngineModules>;
};
export type ShaheenEngine<Dependencies extends DependentMods = []> = (EngineLinkedMods<Dependencies> & InitializedEngineCore);
export type EnginePrimitives = Partial<PostInitializationCore>;
export type ModLifeCycleEvents<Dependencies extends DependentMods, Alias extends string, ImmutableResources extends object | undefined, State extends object> = {
    onInit?: (engineCore: ExtendedEngineCore, metadata: ModMetadata) => Promise<EnginePrimitives | void> | EnginePrimitives | void;
    onBeforeGameLoop?: (engine: ShaheenEngine<[
        ...Dependencies,
        ModData<Alias, ImmutableResources, State>
    ]>) => Promise<void> | void;
    onExit?: (engine: ShaheenEngine<[
        ...Dependencies,
        ModData<Alias, ImmutableResources, State>
    ]>) => Promise<void> | void;
};
export type ModCore<Dependencies extends DependentMods, Alias extends string, ImmutableResources extends object | undefined, State extends object> = (DependenciesDeclaration<Dependencies> & ModData<Alias, ImmutableResources, State> & ModLifeCycleEvents<Dependencies, Alias, ImmutableResources, State>);
export interface ModExtensions {
}
export type Mod<Dependencies extends DependentMods, Alias extends string, ImmutableResources extends object | undefined, State extends object> = (ModCore<Dependencies, Alias, ImmutableResources, State> & ModExtensions);
export type EngineModules<T> = T extends Mod<infer Dep, infer Alias, infer ImmutableResources, infer State> ? [...Dep, ModData<Alias, ImmutableResources, State>] : never;
export type ModdedEngine<CurrentMod> = CurrentMod extends Mod<infer Dep, infer Alias, infer ImmutableResources, infer State> ? ShaheenEngine<[...Dep, ModData<Alias, ImmutableResources, State>]> : never;
export declare const mod: <Dependencies extends DependentMods = []>() => {
    create: <Alias extends string, ImmutableResources extends object | undefined, State extends object>(zMod: Mod<Dependencies, Alias, ImmutableResources, State>) => Mod<Dependencies, Alias, ImmutableResources, State>;
};
export type GenericMod = Mod<[
], string, object, object>;
export type ModModule<Alias extends string, ImmutableResources extends object | undefined, Dependencies extends DependentMods> = {
    default: Mod<Dependencies, Alias, ImmutableResources, object>;
};
export type GenericModModule = {
    default: GenericMod;
};
