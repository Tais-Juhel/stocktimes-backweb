<template>
    <div class="brands">
        <table id="myTable" class="brands-table">
            <thead>
                <tr>
                    <th @click="sortTable(0)">Id</th>
                    <th @click="sortTable(1)">Image</th>
                    <th @click="sortTable(2)">Name</th>
                    <th class="edit">E</th>
                    <th class="delete">D</th>
                </tr>
            </thead>
            <tbody>
              <tr v-for="brand in brands" :key="brand.id">
                <td>{{ brand.id }}</td>
                <td><img :src="brand.image" :alt="brand.id"></td>
                <td>{{ brand.name }}</td>
                <td><a :href="brand.linkEdit"><i class="fas fa-edit"></i></a></td>
                <td><button @click="deleteBrand(brand.id)" type="button"><i class="fas fa-trash"></i></button></td>
              </tr>
            </tbody>
        </table>
        <button class="add-brands"><a href="/create/brand">+ ADD</a></button>
    </div>
</template>

<script>
import firebase from '../components/firebaseInit';
import 'firebase/firestore';

export default {
  data() {
    return {
      brands: []
    }
  },
  created() {
    firebase.firestore().collection('brand').get().then(
      querySnaphot => {
        querySnaphot.forEach(doc => {
          const data = {
            'id': doc.id,
            'name': doc.data().name,
            'image': doc.data().image,
            'linkEdit': '/brands/'+doc.id
          }

          this.brands.push(data)
        })
      }
    )
  },
  methods: {
    async deleteBrand(id) {
      const c = confirm('Etes vous sur de vouloir supprimer: '+id)

      if(c === true) {
        await firebase.firestore().collection("brand").doc(id).delete()
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
        for (i = 1; i < (rows.length - 1); i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("TD")[column];
          y = rows[i + 1].getElementsByTagName("TD")[column];
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
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
.brands {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 95%;
    margin: 25px 0;
    background-color: #F0F0F0;
    border-radius: 5px;

    .brands-table {
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

    .add-brands {
        margin: 15px 0;
        width: 95%;
        height: 40px;
        border: none;
        border-radius: 5px;
        background-color: #49D246;
        cursor: pointer;
        transition: all 400ms ease;

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
img {
  width: 50px;
}
</style>