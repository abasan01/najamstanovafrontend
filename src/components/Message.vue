<template>
  <div
    class="message"
    :class="{
      incoming: message.type === 'incoming',
      outgoing: message.type === 'outgoing',
    }"
  >
    {{ message.text }}
  </div>
</template>

<script>
export default {
  props: {
    message: Object,
  },
};
</script>

<style>
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
