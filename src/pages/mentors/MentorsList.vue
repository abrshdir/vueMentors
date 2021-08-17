<template>
    <div>
        <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
            {{error}}
        </base-dialog>
        <section>
            <mentor-filter @change-filter="setFilters"></mentor-filter>
        </section>
        <section>
            <base-card>
                <div class="controls">
                    <base-button mode="outline" @click="loadMentors">Refresh</base-button>
                    <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">Login to Register as Mentor</base-button>
                    <base-button v-if="isLoggedIn && !isMentor && !isLoading" link to="/register">Register as Mentor</base-button>
                </div>
                <base-spinner v-if="isLoading"></base-spinner>
                <ul v-else-if="hasMentors">
                    <mentor-item v-for="mentor in filteredMentors"
                                 :key="mentor.id"
                                 :id="mentor.id"
                                 :first-name="mentor.firstName"
                                 :last-name="mentor.lastName"
                                 :areas="mentor.areas"
                                 :rate="mentor.hourlyRate"
                    ></mentor-item>
                </ul>
                <ul v-else>
                    <li>Sorry nothing found</li>
                </ul>
            </base-card>
        </section>
    </div>

</template>


<script>
    import mentorItem from "../../components/mentors/MentorItem";
    import MentorFilter from "../../components/mentors/MentorFilter";

    export default {
        components: {mentorItem, MentorFilter},
        computed: {
            isLoggedIn() {
                return this.$store.getters.isAuthenticated;
            },
            isMentor() {
                return this.$store.getters['mentors/isMentor'];
            },
            filteredMentors() {
                const mentors = this.$store.getters['mentors/mentors'];
                return mentors.filter(mentor => {
                    if (this.activeFilters.backend && mentor.areas.includes('backend')) {
                        return true;
                    }
                    if (this.activeFilters.frontend && mentor.areas.includes('frontend')) {
                        return true;
                    }
                    if (this.activeFilters.career && mentor.areas.includes('career')) {
                        return true;
                    }
                    return false;
                })
            },
            hasMentors() {
                return !this.isLoading && this.$store.getters['mentors/hasMentors']
            }
        },
        data() {
            return {
                error: null,
                activeFilters: {
                    frontend: true,
                    backend: true,
                    career: true
                },
                isLoading: false
            }
        },
        methods: {
            setFilters(updatedFilters) {
                this.activeFilters = updatedFilters;
            },
            async loadMentors() {
                this.isLoading = true;
                try {
                    await this.$store.dispatch('mentors/loadMentors');
                } catch (error) {
                    this.error = error.message || 'Something went wrong!';
                }
                this.isLoading = false;
            },
            handleError() {
                this.error = null;
            }
        },
        created() {
            this.loadMentors();
        },
    }
</script>

<style>
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .controls {
        display: flex;
        justify-content: space-between;
    }
</style>
