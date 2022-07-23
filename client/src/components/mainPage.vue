<template>
  <div class="mainpage">
    <div class="mainpage__editor">
      <input type="text" placeholder="Уникальный код" v-model="form.aircraft_code">
      <input type="text" placeholder="Модель" v-model="form.model">
      <input type="number" placeholder="Дальность полета" v-model="form.range">
      <button @click="createAircraft">Создать</button>
      <button @click="editAircraft">Изменить</button>
      <button @click="deleteAircraft">Удалить</button>
    </div>
    <div class="mainpage__list">
      <div class="mainpage__list-card"
           v-for="item in aircrafts"
           :key="item.aircraft_code"
           @click="onSelect(item)"
      >
        <AircraftCard @select="onSelect" :aircraft="item"/>
      </div>
    </div>
  </div>
</template>

<script>
import AircraftCard from '@/components/aircraftCard.vue';
export default {
  name: 'MainPage',
  components: {
    AircraftCard,
  },
  props: {

  },
  data() {
    return {
      aircrafts: [],
      form:{
        aircraft_code: "",
        model: "",
        range: null,
      }
    }
  },
  methods: {
    onSelect(aircraft) {
      this.form = {...aircraft};
    },
    async getAircrafts() {
      const response = await fetch ('http://localhost:3001/aircrafts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      this.aircrafts = await response.json();
    },

    createAircraft() {
      let data = JSON.stringify(this.form);
      fetch('http://localhost:3001/aircrafts', {
        method: 'POST',
        body: data,
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(function(response) {
        if (response.status !== 200) {
          throw new Error(response.status);
        } else {
          return response.json()
        }
      })
      .catch(function(error){
        alert ('Ошибка сервера ' + error);
      })
      .then(() => {
        alert('Добавлен самолет '+ this.form.model );
        this.getAircrafts();
        this.form = {};
      })
    },
    editAircraft() {
      let changeData = JSON.stringify (this.form);
      fetch('http://localhost:3001/aircrafts', {
        method: 'PUT',
        body: changeData,
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Статус не 200');
        } else {
          this.form = {};
          this.getAircrafts();
          return response.json();
        }
      })
      .catch(() => {
        alert ('Нет такого самолета');
      })
    },
    deleteAircraft() {
      let url = 'http://localhost:3001/aircrafts/id?code=' + this.form.aircraft_code;
      fetch(url, {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Статус не 200');
        } else {
          return response.json();
        }
      })
      .then(() => {
        alert(`Удален самолет ${this.form.model}`)
        this.getAircrafts();
        this.form = {};
      })
      .catch(() => {
        alert ('Нет такого самолета');
      })
    }
  },
  mounted() {
    this.getAircrafts();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.mainpage {
  display: flex;
}
.mainpage__editor {
  min-width: 300px;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  margin-top: 10px;
}
.mainpage__editor input,
.mainpage__editor button{
  margin-bottom: 20px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 0 10px;
}
.mainpage__editor button {
  margin-bottom: 10px;
  background-color: beige;
  cursor: pointer;
}
.mainpage__list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.mainpage__list-card {
  width: 200px;
  border: 1px solid #000;
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  cursor: pointer;
}
.mainpage__list-card p {
  text-align: left;
}
</style>
