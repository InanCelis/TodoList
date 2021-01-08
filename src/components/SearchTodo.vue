<template>
    <div>
        <div class="search-wrapper">
            <input class="search-input" type="text" :value="value" @input="$emit('input', $event.target.value)" placeholder="Search..."/>
            <div class="box">
                <select @change="$emit('search-option', $event.target.value)">
                    <option selected disabled>Select to Categories</option>
                    <option value="id">ID</option>
                    <option value="title">Title</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"SearchTodo",
}
</script>

<style scoped>
    .search-wrapper {
        display: flex;
        justify-content: center;
    }

    .search-input {
        padding: 10px;
        width: 50%;
        border-radius: 10px 0 0 10px;
        font-size: 20px;
        border: 1px solid gray;
    }
    .box select{
        padding: 10px;
        border-radius: 0 10px 10px 0;
        font-size: 20px;
        color: white;
        background: #42b983;
        text-align-last:center;
        border: none;

    }
</style>