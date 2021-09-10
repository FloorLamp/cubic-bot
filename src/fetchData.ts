import { DateTime } from "luxon";
import { cubic } from "./common";
import { Data } from "./types";

export async function fetchSummary(): Promise<Data> {
  const now = DateTime.utc().toISO();
  const results = await cubic.allSummary();
  return {
    now,
    data: await Promise.all(
      results.map(async ({ status, details, owner }, id) => {
        const history = await cubic.getHistory({
          projectId: BigInt(id),
          principal: [],
        });
        return {
          id,
          projectId: id.toString().padStart(3, "0"),
          details,
          status: { ...status, offerValue: Number(status.offerValue) / 1e12 },
          owner: owner[0] ? owner[0] : null,
          recentEvents: history.events.slice(0, 5),
        };
      })
    ),
  };
}
