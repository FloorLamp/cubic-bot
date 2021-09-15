import fs from "fs";
import { SNAPSHOT_PATH } from "./common";
import { fetchSummary } from "./fetchData";
import { bot, CHAT_ID } from "./telegram";
import { Data, JsonData } from "./types";
import { formatNumber, shortPrincipal, stringify } from "./utils";

export async function runTasks() {
  let data: Data;
  try {
    data = await fetchSummary();
  } catch (error) {
    console.error(error);
    return;
  }

  let cached: JsonData;
  try {
    delete require.cache[require.resolve(SNAPSHOT_PATH)];
    cached = require(SNAPSHOT_PATH);
  } catch (error) {}
  fs.writeFileSync(SNAPSHOT_PATH, stringify(data));
  console.log(`snapshot saved at ${data.now}`);

  data.data.forEach((d, i) => {
    const prev = cached?.data[i];
    if (!prev) {
      return;
    }
    for (const event of d.recentEvents) {
      if (prev.recentEvents.find(({ id }) => id === event.id.toString())) {
        return;
      }

      console.log(
        "New event found",
        d.projectId,
        event.id,
        event.timestamp,
        event.data
      );

      const name = `${d.projectId} - ${d.details.name}`;
      if ("Transfer" in event.data) {
        bot.telegram.sendMessage(
          CHAT_ID,
          `${name} was bought by ${shortPrincipal(
            event.data.Transfer.to
          )} for ${formatNumber(
            Number(event.data.Transfer.value) / 1e12
          )} 🧊! New offer price is ${formatNumber(d.status.offerValue)} 🧊`
        );
      } else {
        bot.telegram.sendMessage(
          CHAT_ID,
          `${name} changed offer price from ${formatNumber(
            Number(event.data.PriceChange.from) / 1e12
          )} 🧊 to ${formatNumber(Number(event.data.PriceChange.to) / 1e12)} 🧊`
        );
      }
    }
  });
}
