<template>
  <div class="aircraft-card">
    <p>Уникальный код: {{aircraft.aircraft_code}}</p>
    <p>Модель: {{aircraft.model}}</p>
    <p>Дальность полета: {{aircraft.range}}</p>
  </div>
</template>

<script>
export default {
  name: 'AircraftCard',
  props: {
    aircraft: Object,
  },
  data() {
    return {

    }
  },
  methods: {

  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.aircraft-card p{
  text-align: left;
}
</style>
