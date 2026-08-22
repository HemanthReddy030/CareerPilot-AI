/**
 * Clean and parse JSON from LLM response robustly.
 * Handles markdown formatting, thinking blocks, trailing commas, and malformed strings.
 * If standard parsing fails, falls back to regex-based schema extraction.
 * 
 * @param {string} str The raw string response from LLM
 * @param {object} [schema] Optional schema object containing expected keys and default values
 * @returns {object} Parsed JSON object
 */
function parseCleanJSON(str, schema = null) {
  if (str === undefined || str === null) {
    throw new SyntaxError("Input is null or undefined");
  }
  if (typeof str !== "string") {
    throw new SyntaxError(`Input is not a string (type: ${typeof str})`);
  }
  if (str.trim() === "") {
    throw new SyntaxError("Input is an empty string");
  }

  // 1. Remove thinking blocks (including unclosed ones)
  let cleanStr = str;
  if (cleanStr.toLowerCase().includes("</think>")) {
    cleanStr = cleanStr.replace(/<think>[\s\S]*?<\/think>/gi, "");
  } else if (cleanStr.toLowerCase().includes("<think>")) {
    const thinkIndex = cleanStr.toLowerCase().indexOf("<think>");
    const braceIndex = cleanStr.indexOf("{");
    if (braceIndex !== -1 && braceIndex > thinkIndex) {
      cleanStr = cleanStr.slice(braceIndex);
    } else {
      cleanStr = "";
    }
  }
  cleanStr = cleanStr.trim();

  // 2. Remove markdown code block delimiters
  cleanStr = cleanStr
    .replace(/```json/gi, "")
    .replace(/```/gi, "")
    .trim();

  // 3. Find the outermost JSON object bounds
  const firstBrace = cleanStr.indexOf("{");
  const lastBrace = cleanStr.lastIndexOf("}");

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleanStr = cleanStr.slice(firstBrace, lastBrace + 1);
  }

  // 4. Try standard JSON.parse first
  try {
    return JSON.parse(cleanStr);
  } catch (err) {
    console.warn("Direct JSON parse failed, attempting cleanup. Error:", err.message);
  }

  // 5. Try to clean trailing commas and parse again
  // Regex removes commas directly followed by a closing brace or bracket
  let processed = cleanStr.replace(/,\s*([\]}])/g, "$1");
  try {
    return JSON.parse(processed);
  } catch (err) {
    console.warn("Cleaned JSON parse failed, attempting fallback. Error:", err.message);
  }

  // 6. If schema is provided, perform regex-based key-value extraction as a fallback
  if (schema && typeof schema === "object") {
    const recovered = {};
    for (const key of Object.keys(schema)) {
      if (Array.isArray(schema[key])) {
        // Look for "key": [ ... ]
        const arrayRegex = new RegExp(`"${key}"\\s*:\\s*\\[([\\s\\S]*?)\\]`, "i");
        const match = processed.match(arrayRegex);
        if (match) {
          // Split by comma, strip quotes and whitespace
          const itemsRaw = match[1].split(",");
          recovered[key] = itemsRaw
            .map(item => item.trim().replace(/^["']|["']$/g, "").trim())
            .filter(item => item.length > 0);
        } else {
          recovered[key] = [...schema[key]];
        }
      } else {
        // Look for "key": "value"
        // Captures string content inside double quotes, handling escaped quotes
        const stringRegex = new RegExp(`"${key}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`, "i");
        const match = processed.match(stringRegex);
        if (match) {
          recovered[key] = match[1];
        } else {
          // Relaxed fallback: capture single quotes or unquoted value up to comma/brace
          const relaxedRegex = new RegExp(`"${key}"\\s*:\\s*['"]?([^'",}]+)['"]?`, "i");
          const relaxedMatch = processed.match(relaxedRegex);
          if (relaxedMatch) {
            recovered[key] = relaxedMatch[1].trim();
          } else {
            recovered[key] = schema[key];
          }
        }
      }
    }

    // Verify if we successfully recovered any useful data
    const hasRecoveredData = Object.keys(recovered).some(k => {
      if (Array.isArray(recovered[k])) return recovered[k].length > 0;
      return recovered[k] !== schema[k];
    });

    if (hasRecoveredData) {
      console.log("Successfully recovered partial JSON via regex schema fallback.");
      return recovered;
    }
  }

  // If all else fails, throw the original syntax error
  throw new SyntaxError("Failed to parse JSON response from LLM even after cleanup and recovery.");
}

module.exports = {
  parseCleanJSON,
};
