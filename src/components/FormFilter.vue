<!-- *************************************************************************************************************** -->

<script setup>

/*--------------------------------------------------------------------------------------------------------------------*/

defineEmits([
    'updateSearch'
]);

/*--------------------------------------------------------------------------------------------------------------------*/

</script>

<!-- *************************************************************************************************************** -->

<template>
    <div class="inner-addon right-addon w-25">
        <i class="bi bi-search"></i><input class="form-control rounded-4" type="text" placeholder="Filter" @input="(e) => $emit('updateSearch', e.target.value)" />
    </div>
</template>

<!-- *************************************************************************************************************** -->

<style scoped>

/* enable absolute positioning */
.inner-addon {
    position: relative;
}

/* style icon */
.inner-addon .bi {
    position: absolute;
    padding: 0.5rem 0.75rem;
    pointer-events: none;
}

/* align icon */
.left-addon .bi  {
    left: 0;
}
.right-addon .bi {
    right: 0;
}

/* add padding  */
.left-addon input {
    padding-left: 2.0rem;
}
.right-addon input {
    padding-right: 2.0rem;
}

</style>

<!-- *************************************************************************************************************** -->
