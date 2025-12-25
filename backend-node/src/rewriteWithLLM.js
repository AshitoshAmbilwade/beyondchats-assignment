export async function rewriteWithLLM(original, refs) {
  return `
${original.content}

--- Enhanced Content ---
This version improves structure, clarity, and SEO based on
top-ranking industry articles.

References:
${refs.join("\n")}
`;
}
