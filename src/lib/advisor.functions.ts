import { createServerFn } from "@tanstack/react-start";
import { advisorInput, ADVISOR_INSTRUCTIONS } from "./advisor-policy";

export const askAdvisor = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => advisorInput.parse(input))
  .handler(async ({ data }) => {
    const { generateResponse, GatewayError } = await import("@lovable.dev/ai-gateway");
    const { websiteKnowledge } = await import("./advisor-knowledge.server");
    try {
      const response = await generateResponse({
        model: "openai/gpt-6-astra",
        instructions: `${ADVISOR_INSTRUCTIONS}\nWEBSITE KNOWLEDGE:\n${websiteKnowledge()}`,
        input: data.messages.map((message) => ({ role: message.role, content: message.content })),
        reasoning: { effort: "low" },
      });
      const text = response.output.flatMap((item) => item.type === "message"
        ? item.content.map((part) => part.type === "output_text" ? part.text : part.refusal)
        : []).join("\n").trim();
      if (!text) return { text: "", error: "I couldn't complete that answer. Please call Levy at 615.227.1645." };
      return { text, error: null };
    } catch (error) {
      console.error("Advisor request failed", error instanceof GatewayError ? { code: error.code, ids: error.ids } : "Application error");
      return { text: "", error: "The advisor is temporarily unavailable. Your message hasn't been sent to Levy. Please call 615.227.1645 or visit the contact page." };
    }
  });