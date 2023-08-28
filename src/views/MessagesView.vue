<template>
  <div class="d-flex" style="height: 100%">
    <!-- Sidebar -->
    <div class="sidebar">
      <h2>Razgovori</h2>
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="conversation in conversations"
          :key="conversation.name"
          @click="selectConversation(conversation)"
        >
          {{ conversation.name }}
        </li>
      </ul>
    </div>

    <!-- Glavni prozor -->
    <div class="flex-grow-1">
      <div class="container chat-container">
        <div class="chat-area">
          <message
            v-for="(message, index) in selectedConversation.messages"
            :key="index"
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

export default {
  name: "MessagesView",
  data() {
    return {
      conversations: [
        {
          name: "Ivan1985",
          messages: [
            { text: "Bok", type: "outgoing" },
            { text: "Hej", type: "incoming" },
          ],
        },
        { name: "Tomo2223", messages: [{ text: "test", type: "outgoing" }] },
      ],
      selectedConversation: null,
      newMessage: "",
    };
  },
  created() {
    this.selectedConversation = this.conversations[0];
  },
  methods: {
    selectConversation(conversation) {
      this.selectedConversation = conversation;
    },
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        this.selectedConversation.messages.push({
          text: this.newMessage,
          type: "outgoing",
        });
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
