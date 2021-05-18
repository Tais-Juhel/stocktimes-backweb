<template>
    <div class="shoes-edit">
        <form>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>{{ shoe_id }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Type</td>
                        <td><input type="text" v-model="shoe.type"></td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td><input type="text" v-model="shoe.name"></td>
                    </tr>
                    <tr>
                        <td>Last Sale</td>
                        <td><input type="number" v-model="shoe.LastSale"></td>
                    </tr>
                    <tr>
                        <td>Lowest Ask</td>
                        <td><input type="number" v-model="shoe.LowestAsk"></td>
                    </tr>
                    <tr>
                        <td>Highest Bid</td>
                        <td><input type="number" v-model="shoe.HighestBid"></td>
                    </tr>
                    <tr>
                        <td>Brand</td>
                        <td>
                            <select v-model="shoe.brand_id">
                                <option :value='brandSelect.id' selected>{{ brandSelect.name }}</option>
                                <option v-for="brand in brands" :key="brand.id" value="brand.id">{{ brand.name }}</option>
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
    name: 'shoes-edit',
    data() {
        return {
            shoe: {},
            shoe_id: null,
            brands: [],
            brandSelect: {}
        }
    },
    methods: {
        async valid() {
            await firebase.firestore().collection("model").doc(this.shoe_id).set({
                type: this.shoe.type,
                name: this.shoe.name,
                LastSale: this.shoe.LastSale,
                LowestAsk: this.shoe.LowestAsk,
                HighestBid: this.shoe.HighestBid,
                brand_id: this.shoe.brand_id,
            })
            
            window.location = "/shoes"
        }
    },
    async mounted() {
        const shoeId = await this.$route.params.id
        this.shoe_id = shoeId

        await firebase.firestore().collection("model").doc(shoeId).get().then((doc) => {
            if (doc.exists) {
                this.shoe = doc.data();
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })

        await firebase.firestore().collection("brand").get().then(
            querySnaphot => {
                querySnaphot.forEach(doc => {
                    if(doc.id === this.shoe.brand_id) {
                        this.brandSelect = {
                            'id': doc.id,
                            'name': doc.data().name
                        }
                    } else {
                        this.brands.push({
                            'id': doc.id,
                            'name': doc.data().name
                        })
                    }
                })
            }
        )
    }
}
</script>

<style lang="scss">
.shoes-edit {
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

        input {
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