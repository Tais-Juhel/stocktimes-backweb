<template>
    <div class="brands">
        <table class="brands-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th class="edit">E</th>
                    <th class="delete">D</th>
                </tr>
            </thead>
            <tbody>
              <tr v-for="brand in brands" :key="brand.id">
                <td>{{ brand.id }}</td>
                <td>{{ brand.name }}</td>
                <td><a :href="brand.linkEdit">E</a></td>
                <td><button>D</button></td>
              </tr>
            </tbody>
        </table>
        <button class="add-brands">+ ADD</button>
    </div>
</template>

<script>
import db from '../components/firebaseInit'

export default {
  data() {
    return {
      brands: []
    }
  },
  created() {
    db.collection('brand').get().then(
      querySnaphot => {
        querySnaphot.forEach(doc => {
          const data = {
            'id': doc.id,
            'name': doc.data().name,
            'linkEdit': '/brands/'+doc.id
          }

          this.brands.push(data)
        })
      }
    )
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
        color: #FFFFFF;
        font-weight: 900;
        font-size: 16px;
        cursor: pointer;
        transition: all 400ms ease;

        &:hover {
            box-shadow: inset 0 0 10px 1px grey;
        }
    }
}
</style>