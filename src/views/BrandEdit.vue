<template>
    <div class="brands-edit">
        <form>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>{{ brand_id }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td><input type="text" v-model="brand.name"></td>
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
    name: 'brands-edit',
    data() {
        return {
            brand: {},
            brand_id: null
        }
    },
    methods: {
        async valid() {
            await firebase.firestore().collection("brand").doc(this.brand_id).set({
                name: this.brand.name
            })
            
            window.location = "/brands"
        }
    },
    async mounted() {
        const brandId = await this.$route.params.id
        this.brand_id = brandId

        await firebase.firestore().collection("brand").doc(brandId).get().then((doc) => {
            if (doc.exists) {
                this.brand = doc.data();
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })
    }
}
</script>

<style lang="scss">
.brands-edit {
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