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
  mounted() {
    console.log(moment(this.message.createdAt).fromNow());
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
  display: flex;
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
  background-color: #f2f2f2;
  width: 50%;
  justify-content: flex-start;
}

.outgoing {
  background-color: #e2f7fb;
  width: 50%;
  justify-content: flex-end;
}
</style>
