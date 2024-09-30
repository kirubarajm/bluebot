/*
 * Important Note:
 * Currently token restrictions and truncation of past messages in the session
 * is not implemented, since this is a sample PromiseRejectionEvent.
 * This is imperative for production level deployments.
 */

export const prepareMessages = (chatHistory, newMessage) => {
  // Convert chatHistory to the format expected by OpenAI API
  const formattedHistory = chatHistory.map((msg) => ({
    role: msg.sender.toLowerCase() === 'you' ? 'user' : 'assistant',
    content: msg.message,
  }));

  // Add the new user message
  const formattedNewMessage = { role: 'user', content: newMessage };

  // Currently returning all messages without truncation
  // For later - Implement a token count based sliding window based on model used
  return [...formattedHistory, formattedNewMessage];
};
