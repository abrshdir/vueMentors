import axios from "axios";

export default {
    registerMentor(context, payload) {
        const url = context.rootGetters.rootUrl;
        const mentorData = {
            // commented out for the backend
            // id: context.rootGetters.userId,
            firstName: payload.first,
            lastName: payload.last,
            description: payload.desc,
            hourlyRate: payload.rate,
            areas: payload.areas,
        }
        const token = context.rootGetters.token;
        axios.put(`${url}/mentor/${context.rootGetters.userId}.json?auth=` + token,
            JSON.stringify(mentorData)
        ).then(
            function (response) {
                console.log(response);
                context.commit('registerMentor', {...mentorData, id: context.rootGetters.userId});
            }
        ).catch(function (error) {
            console.log(error)
        })
    },
    loadMentors(context) {
        const url = context.rootGetters.rootUrl;
        const token = context.rootGetters.token;
        const mentors = [];
        axios.get(`${url}/mentor.json?auth=` + token).then(
            (response) => {
                console.log(response)
                const responseData = response.data
                // if(!response.ok){
                //     const err = new Error(responseData.message || 'Failed to fetch!');
                //     throw err;
                // }
                for (let key in responseData) {
                    const mentor = {
                        id: key,
                        firstName: responseData[key].firstName,
                        lastName: responseData[key].lastName,
                        description: responseData[key].description,
                        hourlyRate: responseData[key].hourlyRate,
                        areas: responseData[key].areas,
                    };
                    mentors.push(mentor);
                }
                context.commit('setMentors', mentors);
                context.commit('setFetchTimestamp');
            }
        ).catch(function (error) {
            const err = new Error(error.message || 'Failed to fetch!');
            throw err;
        })
    }
};
