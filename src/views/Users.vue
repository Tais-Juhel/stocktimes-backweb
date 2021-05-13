<template>
    <div class="user">
        <table class="users-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Firstname</th>
                    <th>Familyname</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Roles</th>
                    <th class="edit">E</th>
                    <th class="delete">D</th>
                </tr>
            </thead>
        </table>
        <button class="add-user">+ ADD</button>
    </div>
</template>

<style lang="scss">
.user {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 95%;
    height: 90vh;
    background-color: #F0F0F0;
    border-radius: 5px;

    .users-table {
        width: 95%;
        height: 90%;
        margin: 15px 0;
        border-spacing: 0px;

        tr {
            background-color: #FFFFFF;
            height: 45px;
        }
        .edit, .delete {
            width: 50px;
        }
    }

    .add-user {
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