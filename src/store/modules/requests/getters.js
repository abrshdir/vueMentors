export default {
    requests(state, getters, rootState, rootGetters){
        return state.requests.filter(req => req.mentorId === rootGetters.userId);
    }
};
