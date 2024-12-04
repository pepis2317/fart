const functions = require("firebase-functions");
const axios = require("axios");

exports.createChatEngineUser = functions.auth.user().onCreate((user) => {
    axios.post(
        "https://api.chatengine.io/users/",
        {
          username: user.email,
          secret: user.uid,
          email: user.email,
          first_name: user.displayName,
        },
        { headers: { "Private-Key": "a2e560b8-7591-4ee8-b822-301fc8a39eb7" } }
      );
});

exports.deleteChatEngineUser = functions.auth.user().onDelete((user) => {
    axios.delete("https://api.chatengine.io/users/me/", {
        headers: {
          "Project-ID": "303fe57d-18bd-4776-8ecf-4f9deb3e1b2c",
          "User-Name": user.email,
          "User-Secret": user.uid,
        },
      });
});