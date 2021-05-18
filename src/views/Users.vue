<template>
    <div class="shoes">
        {{users}}
        <table id="myTable" class="shoes-table">
            <thead>
                <tr>
                    <th @click="sortTable(0)">Id</th>
                    <th @click="sortTable(1)">Type</th>
                    <th @click="sortTable(2)">Name</th>
                    <th @click="sortTable(3)">Last Sale</th>
                    <th @click="sortTable(4)">Lowest Sale</th>
                    <th @click="sortTable(5)">Highest Bid</th>
                    <th @click="sortTable(6)">Brand Id</th>
                    <th class="edit">E</th>
                    <th class="delete">D</th>
                </tr>
            </thead>
            <tbody>
              <tr v-for="shoe in shoes" :key="shoe.id">
                <td>{{ shoe.id }}</td>
                <td>{{ shoe.type }}</td>
                <td>{{ shoe.name }}</td>
                <td>{{ shoe.LastSale }}€</td>
                <td>{{ shoe.LowestAsk }}€</td>
                <td>{{ shoe.HighestBid }}€</td>
                <td>{{ shoe.brand_id }}</td>
                <td><a :href="shoe.linkEdit"><i class="fas fa-edit"></i></a></td>
                <td><button @click="deleteBrand(shoe.id)" type="button"><i class="fas fa-trash"></i></button></td>
              </tr>
            </tbody>
        </table>
        <button class="add-shoes"><a href="/create/shoes">+ ADD</a></button>
    </div>
</template>

<script>
import db from '../components/firebaseInit'
import firebase from '../components/firebaseInit';
import 'firebase/firestore';
import 'firebase/auth'

export default {
  data() {
    return {
      users: []
    }
  },
  created() {
    firebase.auth().get().then(data => console.log('DATA: ', data))
  },
  methods: {
    async deleteBrand(id) {
      const c = confirm('Etes vous sur de vouloir supprimer: '+id)

      if(c === true) {
        await db.collection("model").doc(id).delete()
        location.reload()
      }
    },

    sortTable(column) {
      var table, rows, switching, i, x, y, shouldSwitch;
      table = document.getElementById("myTable");
      switching = true;
      while (switching) {
        switching = false;
        rows = table.rows;
        if(column >= 3 && column <= 5) {
          for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[column];
            y = rows[i + 1].getElementsByTagName("TD")[column];
            if (parseInt(x.innerHTML.substring(0, x.innerHTML.length - 1), 10) > y.innerHTML.substring(0, parseInt(y.innerHTML.length - 1), 10)) {
              console.log('fzefzefzefz')
              shouldSwitch = true;
              break;
            }
          }
        } else {
          for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[column];
            y = rows[i + 1].getElementsByTagName("TD")[column];
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
        }
      }
    }
  }
}
</script>

<style lang="scss">
.shoes {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 95%;
    margin: 25px 0;
    background-color: #F0F0F0;
    border-radius: 5px;

    .shoes-table {
        width: 95%;
        margin: 15px 0;
        border-spacing: 0px;

        thead tr {
            background-color: #FFFFFF;
            height: 45px;

            th {
              cursor: pointer;
            }
        }
        .edit, .delete {
            width: 50px;
        }

        td {
          text-align: center;
          height: 45px;
          border-bottom: solid 2px #000000;
          
          a {
            cursor: pointer;
            font-size: 18px;
            color: #5956E9;
          }

          button {
            border: none;
            color: #F23232;
            font-size: 18px;
            cursor: pointer;
          }
        }
    }

    .add-shoes {
        margin: 15px 0;
        width: 95%;
        height: 40px;
        border: none;
        border-radius: 5px;
        background-color: #49D246;
        transition: all 400ms ease;
        cursor: pointer;

        &:hover {
            box-shadow: inset 0 0 10px 1px grey;
        }

        a {
          color: #FFFFFF;
          font-weight: 900;
          font-size: 16px;
        }
    }
}
</style>