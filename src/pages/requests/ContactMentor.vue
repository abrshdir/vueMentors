<template>
    <section>
        <base-card>
            <h2>Contact a mentor now!</h2>
            <form @submit.prevent="submitForm">
                <div class="form-control" :class="{errors: !email.valid}">
                    <label for="email">Email</label>
                    <input
                            type="text"
                            id="email"
                            v-model.trim="email.val"
                            @blur="clearValidity('email')"
                    />
                    <p v-if="!email.valid">Email must not be empty and must be a valid format</p>
                </div>
                <div class="form-control" :class="{errors: !message.valid}">
                    <label for="message">Message</label>
                    <textarea
                            rows="3"
                            id="message"
                            v-model.trim="message.val"
                            @blur="clearValidity('message')"
                    ></textarea>
                    <p v-if="!message.valid">Message must not be empty.</p>
                </div>
                <p v-if="!formIsValid">Please fix the above errors and submit again.</p>
                <base-button>Register</base-button>
            </form>
        </base-card>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                email: {
                    val: '',
                    valid: true
                },
                message: {
                    val: '',
                    valid: true
                },
                formIsValid: true,
            }
        },
        methods: {
            clearValidity(input) {
                this[input].valid = true;
            },
            validateForm() {
                this.formIsValid = true;
                if (this.email.val === '' || !this.email.val.includes('@')) {
                    this.formIsValid = false;
                    this.email.valid = false;
                }
                if (this.message.val === '') {
                    this.formIsValid = false;
                    this.message.valid = false;
                }
            } ,
            submitForm() {
                this.validateForm();
                if (!this.formIsValid) {
                    return;
                }
                const formData = {
                    email: this.email.val,
                    message: this.message.val,
                }
                this.$store.dispatch('requests/contactMentor', {...formData, mentorId: this.$route.params.id})
                this.$router.replace('/mentors')
            },
        }
    }
</script>

<style scoped>
    form {
        margin: 1rem;
        border: 1px solid #ccc;
        border-radius: 12px;
        padding: 1rem;
    }

    .form-control {
        margin: 0.5rem 0;
    }

    label {
        font-weight: bold;
        margin-bottom: 0.5rem;
        display: block;
    }

    input,
    textarea {
        display: block;
        width: 100%;
        font: inherit;
        border: 1px solid #ccc;
        padding: 0.15rem;
    }

    input:focus,
    textarea:focus {
        border-color: #3d008d;
        background-color: #faf6ff;
        outline: none;
    }

    .errors {
        font-weight: bold;
        color: red;
    }

    .actions {
        text-align: center;
    }
</style>
