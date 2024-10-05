/* 
This file acts as a replacement for the backend service, which should ideally be separately hosted as a server.

Important Note: 
Currently token restrictions and truncation of past messages in the session is not implemented in the prepareMessages function, since this is a demo project. This is imperative for production level deployments.
 */

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const prepareMessages = (chatHistory, newMessage) => {
  // Convert chatHistory to the format expected by OpenAI API
  const formattedHistory = chatHistory.map((msg) => ({
    role: msg.sender.toLowerCase() === 'you' ? 'user' : 'assistant',
    content: msg.message,
  }));

  // Add the new user message
  const formattedNewMessage = { role: 'user', content: newMessage };

  // Add a system prompt as the first message
  const systemPrompt = {
    role: 'system',
    content:
      'Your name is Blue Bot. You are built by Kirubaraj Manimathavan. You are a general purpose bot built for Question and Answer purposes.',
  };

  // Currently returning all messages without truncation
  // For later - Implement a token count based sliding window based on model used
  return [systemPrompt, ...formattedHistory, formattedNewMessage];
};

export const sendMessageToOpenAI = async (
  chatHistory,
  message,
  onStreamUpdate
) => {
  try {
    const preparedMessages = prepareMessages(chatHistory, message);

    const stream = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: preparedMessages,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        onStreamUpdate(content);
      }
    }

    // Signal the end of the stream
    onStreamUpdate(null);
  } catch (error) {
    console.error('Error:', error);
    throw new Error('An error occurred while fetching the response.');
  }
};
