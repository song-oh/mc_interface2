/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module 'd3';
declare module '*.svelte' {
    export { SvelteComponentTyped as default } from 'svelte';
}
