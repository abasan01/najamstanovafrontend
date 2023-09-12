<template>
  <div class="container" style="height: 100%">
    <div class="row">
      <!-- sidebar-messages -->
      <div class="sidebar-messages col-3 rounded">
        <h2>Razgovori</h2>
        <ul class="list-group" v-if="this.selectedConversation">
          <li
            class="list-group-item clickable"
            v-for="conversation in conversations"
            :key="conversation._id"
            :class="{
              active: selectedConversation._id == conversation._id,
            }"
            @click="selectConversation(conversation)"
          >
            {{ conversation.email }}
          </li>
        </ul>
      </div>

      <!-- Glavni prozor -->
      <div class="col-9">
        <div class="container chat-container rounded">
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
          <div class="input-group mt-3 row">
            <div class="col-11">
              <input
                type="text"
                class="form-control"
                placeholder="Upišite poruku..."
                v-model="newMessage"
                @keyup.enter="sendMessage"
              />
            </div>
            <div class="input-group-append col-1">
              <button class="btn btn-primary" @click="sendMessage">
                Pošalji
              </button>
            </div>
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

    if (!this.conversations) {
      await alert("Nemate otvorene razgovore!");
      this.$router.push({ name: "home" });
    } else {
      this.currentUser = response._id;
      SocketioService.setupSocketConnection(this.currentUser);

      if (this.$route.params.id) {
        this.selectConversation(this.$route.params.id);
      } else {
        this.selectConversation(this.conversations[0]);
      }
    }
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
      console.log(conversation);
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
        const body = {
          message: this.newMessage,
          from: this.currentUser,
          to: this.selectedConversation._id,
        };
        SocketioService.sendMessage(body);
        const response = await messages.addMessage(body);
        this.messages.push({ type: true, message: this.newMessage });
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

<style lang="scss" scoped>
.sidebar-messages {
  padding: 20px;
  color: #f5f5f5;
  background-color: #2c3e50;
  border: 1px solid #acabab;
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
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

.message {
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.list-group-item {
  color: #f5f5f5;
  background-color: #1d2a36;
  border: 1px solid #acabab;
  margin-bottom: 5px;
}

.active {
  background-color: #10b981 !important;
  border: 1px solid #0d835b !important;
}
</style>
