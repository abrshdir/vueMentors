<template>
    <div>
        <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
            {{error}}
        </base-dialog>
        <base-card>
            <header><h3>Requests Received</h3></header>
            <!--        <p>{{receivedRequests}}</p>-->
            <base-spinner v-if="isLoading"></base-spinner>
            <ul v-else-if="!isLoading && receivedRequests.length > 0">
                <ul v-for="req in receivedRequests" :key="req">
                    <li>
                        <div>
                            <a :href="'mailto:' + req.email">{{ req.email }}</a>
                        </div>
                        <p>{{ req.message }}</p>
                    </li>
                </ul>
            </ul>
            <ul v-else>No requests received yet</ul>
        </base-card>
    </div>

</template>

<script>
    export default {
        data(){
            return {
                isLoading: false,
                error: null
            }
        },
        computed: {
            receivedRequests(){
                return this.$store.getters['requests/requests'];
            },
        },
        created() {
            this.loadRequests();
        },
        methods: {
            async loadRequests() {
                this.isLoading = true
                try {
                    await this.$store.dispatch('requests/fetchRequests');
                } catch (e) {
                    this.error = e.message || 'something failed'
                }
                this.isLoading = false
            },

            handleError() {
                this.error = null;
            }
        },
    }
</script>

<style scoped>
    header {
        text-align: center;
    }

    ul {
        list-style: none;
        margin: 2rem auto;
        padding: 0;
        max-width: 30rem;
    }

    h3 {
        text-align: center;
    }
    li {
        margin: 1rem 0;
        border: 1px solid #ccc;
        padding: 1rem;
        text-decoration: none;
    }
    a {
        color: #3d008d;
        text-decoration: none;
        font-weight: bold;
    }

    a:hover,
    a:active {
        color: #8d007a;
    }

    p {
        margin: 0.5rem 0 0 0;
    }
</style>
