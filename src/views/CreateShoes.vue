<template>
    <div class="create-shoes">
        <form>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>{{ newId }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Type</td>
                        <td><input type="text" v-model="shoes.type"></td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td><input type="text" v-model="shoes.name"></td>
                    </tr>
                    <tr>
                        <td>Last Sale</td>
                        <td><input type="number" v-model="shoes.LastSale"></td>
                    </tr>
                    <tr>
                        <td>Lowest Ask</td>
                        <td><input type="number" v-model="shoes.LowestAsk"></td>
                    </tr>
                    <tr>
                        <td>Highest Bid</td>
                        <td><input type="number" v-model="shoes.HighestBid"></td>
                    </tr>
                    <tr>
                        <td>Image</td>
                        <td><input type="text" v-model="shoes.image"></td>
                    </tr>
                    <tr>
                        <td>Brand</td>
                        <td>
                            <select v-model="shoes.brand_id">
                                <option v-for="brand in brands" :key="brand.id" :value="brand.id">{{ brand.name }}</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
        <button @click="valid" type="button">Submit</button>
    </div>
</template>

<script>
import firebase from '../components/firebaseInit';
import 'firebase/firestore';

export default {
    name: 'create-shoes',
    data() {
        return {
            newId: '',
            shoes: {
                'type': '',
                'name': '',
                'LastSale': '',
                'LowestAsk': '',
                'HighestBid': '',
                'brand_id': '',
                'image': ''
            },
            brands: []
        }
    },
    methods: {
        async valid() {
            await firebase.firestore().collection("model").doc(this.newId).set({
                type: this.shoes.type,
                name: this.shoes.name,
                LastSale: this.shoes.LastSale,
                LowestAsk: this.shoes.LowestAsk,
                HighestBid: this.shoes.HighestBid,
                brand_id: this.shoes.brand_id,
                image: this.shoes.image
            })
            
            window.location = "/shoes"
        }
    },
    mounted() {
        this.newId = firebase.firestore().collection('model').doc().id

        firebase.firestore().collection('brand').get().then(
            querySnaphot => {
                querySnaphot.forEach(doc => {
                    const data = {
                        'id': doc.id,
                        'name': doc.data().name
                    }

                    this.brands.push(data)
                })
            }
        )

    }
}
</script>

<style lang="scss">
.create-shoes {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 95%;
    margin: 25px 0;
    background-color: #F0F0F0;
    border-radius: 5px;

    table {
        border-spacing: 20px;
    }

    tr {
        height: 40px;
    }

    th {
        &:first-child{
            text-align: right;
        }

        &:last-child {
            text-align: left;
            padding: 0 10px;
            border-radius: 5px;
        }
    }

    td {
        font-size: 18px;

        &:first-child {
            text-align: right;
            font-weight: 600;
        }

        input, select {
            font-size: 18px;
            height: 35px;
            border: none;
            border-radius: 5px;
            padding: 0 10px;
            width: 230px;
        }
    }

    button {
        margin-bottom: 25px;
        width: 200px;
        height: 40px;
        border: none;
        border-radius: 5px;
        background-color: #5956E9;
        color: #FFFFFF;
        font-size: 16px;
        font-weight: 900;
        cursor: pointer;
        transition: all 400ms ease;

        &:hover {
            box-shadow: inset 0 0 10px 1px darken(#5956E9, 20%);
        }
    }
}
</style>