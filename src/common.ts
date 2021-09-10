import { ActorSubclass, HttpAgent } from "@dfinity/agent";
import "dotenv/config";
import fetch from "node-fetch";
import Cubic from "./Cubic/Cubic.did";
import { createActor } from "./Cubic/index";
(global as any).fetch = fetch;
export type CubicService = ActorSubclass<Cubic._SERVICE>;

export const HOST =
  process.env.DFX_NETWORK === "local"
    ? "http://localhost:8000"
    : "https://ic0.app";

export const defaultAgent = new HttpAgent({
  host: HOST,
});
console.log(`DFX_NETWORK=${process.env.DFX_NETWORK || "ic"}`);

export const CUBIC_CANISTER_ID =
  process.env.DFX_NETWORK === "local"
    ? process.env.CUBIC_CANISTER_ID
    : "bxhqr-vyaaa-aaaah-aaqza-cai";
console.log(`CUBIC_CANISTER_ID=${CUBIC_CANISTER_ID}`);

export const cubic = createActor(CUBIC_CANISTER_ID, defaultAgent);

export const SNAPSHOT_PATH = `${__dirname}/../data/snapshots.json`;
