import { SNAPSHOT_PATH } from "./common";
import { JsonData } from "./types";
import { formatNumber, shortPrincipal } from "./utils";

export const formatResponse = () => {
  const data: JsonData = require(SNAPSHOT_PATH);
  const maxLength =
    data.data.reduce(
      (max, { details }) => Math.max(details.name.length, max),
      0
    ) +
    data.data.reduce(
      (max, { status: { offerValue } }) =>
        Math.max(formatNumber(offerValue).length, max),
      0
    );

  return `*Current Prices*

${data.data
  .map(({ id, projectId, details, status }) => {
    const priceStr = formatNumber(status.offerValue);
    const padding = "".padStart(
      maxLength - details.name.length - priceStr.length,
      " "
    );

    return `\`\`\`text
${projectId} - ${details.name}: ${padding}${priceStr} 🧊 CUBE by ${
      status.isForeclosed ? "FORECLOSED" : shortPrincipal(status.owner)
    } \`\`\` ([View](https://cubic.place/p/${id}))
    `;
  })
  .join("\n")}
  `;
};
