<template>
  <div class="minusplusnumber">
    <div class="mpbtn minus" v-on:click="mpminus()">
      -
    </div>
    <div id="field_container" class="w-minus">
      <input type="number" v-model="newValue" disabled />
    </div>
    <div class="mpbtn plus" v-on:click="mpplus()">
      +
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: 0,
      type: Number
    },
    min: {
      default: 0,
      type: Number
    },
    max: {
      default: undefined,
      type: Number
    },
    data: { 
      type: Object
    },
  },

  data() {
    return {
      newValue: 0
    }
  },

  methods: {
    getNotificationClass(notification) {
      return `alert alert-${notification.type}`
    },
    mpplus: function () {
      if (this.max === undefined || (this.newValue < this.max)) {
        this.newValue++;
        if(!this.existAdd()){
          this.$root.$refs.segment.listOrder.push(this.data);
          this.$root.$refs.segment.listOrder[this.$root.$refs.segment.listOrder.length-1].quantity=1;
        }
        this.$root.$refs.segment.updateAmount(true,this.data.price);
        this.$emit('input', this.newValue)
      }
    },
    existAdd: function(){
      for (const key in this.$root.$refs.segment.listOrder) {
        if(this.$root.$refs.segment.listOrder[key].id == this.data.id){
          this.$root.$refs.segment.listOrder[key].quantity++;
          return true;
        }
      }
      return false;
    },
    existDel: function(){
      for (const key in this.$root.$refs.segment.listOrder) {
        if(this.$root.$refs.segment.listOrder[key].id == this.data.id){
          this.$root.$refs.segment.listOrder[key].quantity--;
          if(this.$root.$refs.segment.listOrder[key].quantity == 0){
            this.$root.$refs.segment.listOrder.splice(key, 1);
          }
          break;
        }
      }
    },
    mpminus: function () {
      if ((this.newValue) > this.min) {
        this.newValue--;
        if(this.$root.$refs.segment.listOrder.length != 0){
          this.existDel();
        }
        this.$root.$refs.segment.updateAmount(false,this.data.price);
        this.$emit('input', this.newValue)
      }
    }
  },
  watch: {
    value: {
      handler: function (newVal, oldVal) {
        this.newValue = newVal
      }
    }
  },
  created: function () {
    this.newValue = this.value
  }
}
</script>