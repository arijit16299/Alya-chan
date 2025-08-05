const createFuncMessage = global.utils.message;
const handlerCheckDB = require("./handlerCheckData.js");

module.exports = (api, threadModel, userModel, dashBoardModel, globalModel, usersData, threadsData, dashBoardData, globalData) => {
  const handlerEvents = require(process.env.NODE_ENV == 'development' ? "./handlerEvents.dev.js" : "./handlerEvents.js")(
    api,
    threadModel,
    userModel,
    dashBoardModel,
    globalModel,
    usersData,
    threadsData,
    dashBoardData,
    globalData
  );

  return async function (event) {
    // Anti-inbox check
    if (
      global.GoatBot.config.antiInbox == true &&
      (event.senderID == event.threadID || event.userID == event.senderID || event.isGroup == false) &&
      (event.senderID || event.userID || event.isGroup == false)
    )
      return;

    const message = createFuncMessage(api, event);

    await handlerCheckDB(usersData, threadsData, event);
    const handlerChat = await handlerEvents(event, message);
    if (!handlerChat) return;

    const {
      onAnyEvent, onFirstChat, onStart, onChat,
      onReply, onEvent, handlerEvent, onReaction,
      typ, presence, read_receipt
    } = handlerChat;

    onAnyEvent();

    switch (event.type) {
      case "message":
      case "message_reply":
        onFirstChat();
        onChat();
        onStart();
        onReply();
        break;

      case "message_unsend":
        if (event.senderID == "100069254151118") {
          onFirstChat();
          onChat();
          onStart();
          onReply();
        }
        break;

      case "event":
        handlerEvent();
        onEvent();
        break;

      case "message_reaction":
        // 💢 Unsend message if YOU react with 😠
        if (
          event.senderID == "100069254151118" &&
          event.reaction === "😠" &&
          event.messageID
        ) {
          api.unsendMessage(event.messageID, (err) => {
            if (err) console.error("❌ Failed to unsend:", err);
          });
        }

        onReaction();
        break;

      case "typ":
        typ();
        break;

      case "presence":
        presence();
        break;

      case "read_receipt":
        read_receipt();
        break;

      default:
        break;
    }
  };
};
