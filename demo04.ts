import { ChatOpenAI } from "@langchain/openai";
import { BaseChatMessageHistory, BaseListChatMessageHistory, InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import 'dotenv/config'

// model
const model = new ChatOpenAI({model: "gpt-3.5-turbo"});

// message histories
const messageHistories: Record<string, InMemoryChatMessageHistory> = {};

// // prompt
const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `あなたは私が送ったメッセージをすべて覚えている親切なアシスタントです。`,
  ],
  ["placeholder", "{chat_history}"],
  // equivalent to the following code:
  // new MessagesPlaceholder("chat_history"),
  ["human", "{input}"],
]);

// chain
const chain = prompt.pipe(model);

const withMessageHistory = new RunnableWithMessageHistory({
  runnable: chain,
  getMessageHistory: async (sessionId) => {
    if (messageHistories[sessionId] === undefined) {
      messageHistories[sessionId] = new InMemoryChatMessageHistory();
    }
    return messageHistories[sessionId] as BaseChatMessageHistory | BaseListChatMessageHistory;
  },
  inputMessagesKey: "input",
  historyMessagesKey: "chat_history",
});

const configSession1 = {
  configurable: {
    sessionId: "abc2",
  },
};

const firstResponseOnSession1 = await withMessageHistory.invoke(
  {
    input: "こんにちは！私の名前は太郎といいます！",
  },
  configSession1
);

console.log(`session1`, firstResponseOnSession1.content)

const secondResponseOnSession1 = await withMessageHistory.invoke(
  {
    input: "私の名前を覚えていますか？",
  },
  configSession1
);

console.log(`session1`, secondResponseOnSession1.content)

const configSession2 = {
  configurable: {
    sessionId: "abc3",
  },
};

const firstResponseOnSession2 = await withMessageHistory.invoke(
  {
    input: "私の名前を覚えていますか？",
  },
  configSession2
);

console.log(`session2`, firstResponseOnSession2.content)

const thirdResponseOnSession1 = await withMessageHistory.invoke(
  {
    input: "私の名前を覚えていますか？",
  },
  configSession1
);

console.log(`session1`, thirdResponseOnSession1.content)

