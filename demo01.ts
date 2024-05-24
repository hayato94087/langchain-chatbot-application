import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import 'dotenv/config'

// model
const model = new ChatOpenAI({model: "gpt-3.5-turbo"});

// result
const result = await model.invoke([new HumanMessage({content: "こんにちは！私の名前は太郎といいます！"})]);
console.log(result);