<template>
    <div>
        <section>
            <base-card>
                <h2>{{fullName}}</h2>
                <h3>${{selectedMentor.hourlyRate}}/hour</h3>
            </base-card>
        </section>
        <section>
            <base-card>
                <header>
                    <h2>Interested? Reach out now!</h2>
                    <base-button link :to="contactLink">Contact</base-button>
                    <contact-mentor></contact-mentor>
                </header>
                <router-view></router-view>
            </base-card>
        </section>
        <section>
            <base-card>
                <base-badge v-for="area in selectedMentor.areas" :key="area" :type="area" :title="area"></base-badge>
                <p>{{ selectedMentor.description }}</p>
            </base-card>
        </section>
    </div>

</template>

<script>
    export default {
        props: ["id"],
        data() {
            return {
                selectedMentor: null,
            };
        },
        computed: {
            fullName() {
                // const mentor = ;
                return this.selectedMentor.firstName + ' ' + this.selectedMentor.lastName
            },
            contactLink() {
                return '/mentors/' + this.id + '/contact'
            },
            description() {
                return this.selectedMentor.description;
            }
        },
        created() {
            this.selectedMentor = this.$store.getters['mentors/mentors'].find((mentor) => mentor.id === this.id);
        },
    }
</script>
