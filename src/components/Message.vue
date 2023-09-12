<template>
  <div
    class="messageFlex"
    :class="{
      start: message.type == false,
      end: message.type == true,
    }"
  >
    <div
      class="message"
      :class="{
        incoming: message.type == false,
        outgoing: message.type == true,
      }"
    >
      <div class="container">
        {{ message.message }}
      </div>

      <small>{{ this.timeAgo }}</small>
    </div>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("hr");

export default {
  return() {
    message;
  },
  props: {
    message: Object,
  },
  computed: {
    timeAgo() {
      return moment(this.message.createdAt).fromNow();
    },
  },
};
</script>

<style>
.messageFlex {
  display: flex;
}

.start {
  justify-content: flex-start;
}

.end {
  justify-content: flex-end;
}

.message {
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  display: block;
  align-items: center;
}

small {
  font-size: 0.675em;
  font-style: italic;
}

.container {
  overflow-wrap: break-word;
}

.incoming {
  background-color: #365c81;
  max-width: 50%;
}

.outgoing {
  background-color: #10b981;
  max-width: 50%;
}
</style>
