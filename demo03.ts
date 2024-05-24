import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import 'dotenv/config'

// model
const model = new ChatOpenAI({model: "gpt-3.5-turbo"});

// messages
const messages = [
  new HumanMessage({content: "こんにちは！私の名前は太郎といいます！"}),
  new AIMessage({content: "こんにちは太郎さん！元気ですか？何かお手伝いできることはありますか？"}),
  new HumanMessage({content: "私の名前を覚えていますか？"}),
]

// result
const result = await model.invoke(messages);
console.log(result);