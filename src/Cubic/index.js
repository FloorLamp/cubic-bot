import { Actor } from "@dfinity/agent";
import { idlFactory } from "./Cubic.did.js";

/**
 * @param {string} [canisterId]
 * @param {import("@dfinity/agent").HttpAgent} [agent]
 * @return {import("@dfinity/agent").ActorSubclass<import("./Cubic.did.js")._SERVICE>}
 */
export const createActor = (canisterId, agent) => {
  // Fetch root key for certificate validation during development
  if (process.env.NEXT_PUBLIC_DFX_NETWORK === "local") {
    agent.fetchRootKey();
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });
};
