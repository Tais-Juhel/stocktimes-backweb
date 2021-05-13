<template>
    <div class="shoes">
        <table class="shoes-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Last Sale</th>
                    <th>Lowest Sale</th>
                    <th>Highest Bid</th>
                    <th>Brand Id</th>
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
                <td><a :href="shoe.linkEdit">E</a></td>
                <td><button>D</button></td>
              </tr>
            </tbody>
        </table>
        <button class="add-shoes">+ ADD</button>
    </div>
</template>

<script>
import db from '../components/firebaseInit'

export default {
  data() {
    return {
      shoes: []
    }
  },
  created() {
    db.collection('model').get().then(
      querySnaphot => {
        querySnaphot.forEach(doc => {

          db.collection('brand').get().then(
            querySnaphot => {
              querySnaphot.forEach(docB => {
                let brand_id;
                if(docB.id === doc.data().brand_id){
                  brand_id = docB.data().name;

                  const data = {
                      'id': doc.id,
                      'HighestBid': doc.data().HighestBid,
                      'LastSale': doc.data().LastSale,
                      'LowestAsk': doc.data().LowestAsk,
                      'brand_id': brand_id,
                      'name': doc.data().name,
                      'type': doc.data().type,
                      'linkEdit': '/shoes/'+doc.id
                  }

                  this.shoes.push(data)
                }
              })
            }
          )
        })
      }
    )
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

    .add-shoes {
        margin: 15px 0;
        width: 95%;
        height: 40px;
        border: none;
        border-radius: 5px;
        background-color: #49D246;
        color: #FFFFFF;
        font-weight: 900;
        font-size: 16px;
        transition: all 400ms ease;
        cursor: pointer;

        &:hover {
            box-shadow: inset 0 0 10px 1px grey;
        }
    }
}
</style>