import axios from "axios";

export default {
    contactMentor(context, payload) {
        const formData = {
            email: payload.email,
            message: payload.message
        }
        const url = context.rootGetters.rootUrl;

        axios.post(`${url}/requests/${payload.mentorId}.json`,
            JSON.stringify(formData)
        ).then(
            (response) => {
                formData.id = response.name;
                formData.mentorId = payload.mentorId;
                console.log(response)
                context.commit('contactMentor', formData);
            }
        ).catch(function (error) {
            const err = new Error(error.message || 'Failed to fetch!');
            throw err;
        })
    },
    fetchRequests(context) {
        const userID = context.rootGetters.userId;
        const url = context.rootGetters.rootUrl;
        const token = context.rootGetters.token;
        const requests = [];
        console.log(userID, url)
        axios.get(`${url}/requests/${userID}.json?auth=` + token).then(
            (response) => {
                const responseData = response.data;
                for (let key in responseData) {
                    const request = {
                        id: key,
                        email: responseData[key].email,
                        message: responseData[key].message,
                        mentorId: userID,
                    };
                    requests.push(request);
                }
                // formData.mentorId = payload.mentorId;
                // console.log(response)
                context.commit('setRequest', requests);
            }
        ).catch(function (error) {
            const err = new Error(error.message || 'Failed to fetch!');
            throw err;
        })
    }
};
