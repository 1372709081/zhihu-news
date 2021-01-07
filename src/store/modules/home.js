import { reqHomeList, reqOldList } from "../../utils/http";

let state = {
    list: [],
    banner: []
}
let mutations = {
    changeBanner(state, arr) {
        state.banner = arr
    },
    pushList(state, arr) {
        state.list.push(arr)
    }
}
let getters = {
    list(state) {
        return state.list;
    },
    banner(state) {
        return state.banner;
    }
}
let actions = {
    reqList(context) {
        reqHomeList().then(res => {
            if (res.status == 200) {
                context.commit("pushList", res.data.stories)
                context.commit("changeBanner", res.data.top_stories)
            }
        })
    },
    reqOld(context, time) {
        reqOldList(time).then(res => {
            if (res.status == 200) {
                context.commit("pushList", res.data.stories)
            }
        })
    }
}

export default {
    state,
    mutations,
    getters,
    actions,
    namespaced: true
}