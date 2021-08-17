export default {
    contactMentor(state, payload) {
        state.requests.push(payload);
    },
    setRequest(state, payload){
        state.requests = payload;
    }
};
