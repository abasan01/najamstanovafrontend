<template>
  <div class="d-flex" style="height: 100%">
    <!-- Sidebar -->
    <div class="sidebar">
      <h2>Razgovori</h2>
      <ul class="list-group" v-if="this.selectedConversation">
        <li
          class="list-group-item"
          v-for="conversation in conversations"
          :key="conversation._id"
          @click="selectConversation(conversation)"
        >
          {{ conversation.email }}
        </li>
      </ul>
    </div>

    <!-- Glavni prozor -->
    <div class="flex-grow-1">
      <div class="container chat-container">
        <div
          class="chat-area"
          ref="scrollContainer"
          v-if="this.selectedConversation"
        >
          <message
            v-for="message in messages"
            :key="message.id"
            :message="message"
          />
        </div>

        <!-- input -->
        <div class="input-group mt-3">
          <input
            type="text"
            class="form-control"
            placeholder="Upišite poruku..."
            v-model="newMessage"
            @keyup.enter="sendMessage"
          />
          <div class="input-group-append">
            <button class="btn btn-primary" @click="sendMessage">
              Pošalji
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import message from "@/components/Message.vue";
import { messages, users, host } from "@/services";
import SocketioService from "@/services/socket";
import { eventBus } from "../main";

export default {
  name: "MessagesView",
  data() {
    return {
      conversations: [],
      selectedConversation: null,
      messages: [],
      currentUser: "",
      newMessage: "",
    };
  },
  async mounted() {
    const response = await messages.getConversations();
    response.conversations.forEach((item) => {
      this.conversations.push(item);
    });
    this.currentUser = response._id;
    console.log(this.currentUser);
    SocketioService.setupSocketConnection(this.currentUser);
    this.selectConversation(this.conversations[0]);
  },
  created() {
    eventBus.$on("message-received", (data) => {
      this.messages.push({ type: false, message: data.message });
    });
  },
  beforeDestroy() {
    eventBus.$off("message-received");
  },
  updated() {
    this.$refs.scrollContainer.scrollTop =
      this.$refs.scrollContainer.scrollHeight;
  },
  beforeUnmount() {
    SocketioService.disconnect();
  },
  methods: {
    async selectConversation(conversation) {
      this.selectedConversation = conversation;
      const params = {
        from: this.currentUser,
        to: this.selectedConversation._id,
      };
      const messagesArray = await messages.getMessages(params);
      console.log(messagesArray);
      this.messages = messagesArray;
    },
    async sendMessage() {
      if (this.newMessage.trim() !== "") {
        this.messages.push({
          text: this.newMessage,
          type: "outgoing",
        });
        const body = {
          message: this.newMessage,
          from: this.currentUser,
          to: this.selectedConversation._id,
        };
        SocketioService.sendMessage(body);
        this.messages.push({ type: true, message: this.newMessage });
        const response = await messages.addMessage(body);
        console.log(response);
        this.newMessage = "";
      }
    },
  },
  components: {
    message,
  },
};
</script>

<style>
.sidebar {
  width: 25%;
  background-color: #f2f2f2;
  padding: 20px;
  border-right: 1px solid #ccc;
}

.chat-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chat-area {
  border: 1px solid #ccc;
  padding: 10px;
  height: 70vh;
  overflow-y: scroll;
}

.message {
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
}

.incoming {
  background-color: #f2f2f2;
}

.outgoing {
  background-color: #e2f7fb;
}
</style>
