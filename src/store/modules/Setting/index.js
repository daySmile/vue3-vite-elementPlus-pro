import defaultSetting from '../../../config';

const {
    title, fixedHeader, sideBarLogo, showSettings,
} = defaultSetting.default;

// create a new Store Modules.
const settingsModule = {
    namespaced: true,
    state: {
        title,
        fixedHeader,
        sideBarLogo,
        showSettings,
        tableHeight: 600, // 表格宽度
        hideHeader: false,
        lang: '/zh-CN',
        collapse: true

    },
    mutations: {
        setTableHeight: (state, height) => {
            state.tableHeight = height;
        },
        toggleHeader: (state) => {
            state.hideHeader = !state.hideHeader
        },
        toggleFixedHeader: (state) => {
            state.fixedHeader = !state.fixedHeader
        },
        toggleSidebarLogo: (state) => {
            state.sideBarLogo = !state.sideBarLogo
        },
        toggleLang: (state, payload) => {
            state.lang = payload.lang
        },
        toggleCollapse: (state) => {
            state.collapse = !state.collapse
        },
    },
    actions: {
        toToggleHeader({commit}) {
            commit('toggleHeader');
        },
        toToggleFixedHeader({commit}) {
            commit('toggleFixedHeader');
        },
        toToggleSidebarLogo({commit}) {
            commit('toggleSidebarLogo');
        },
        toToggleLang({commit}, payload) {
            commit('toggleLang', payload);
        },
        toToggleCollapse({commit}) {
            commit('toggleCollapse');
        },
    },
    getters: {
        getHideHeaderState(state) {
            return state.hideHeader
        },
        getFixedHeaderState(state) {
            return state.fixedHeader
        },
        getSidebarLogoState(state) {
            return state.sideBarLogo
        },
        getLangState(state) {
            return state.lang
        },
        getCollapseState(state) {
            return state.collapse
        },
    },
};
export default settingsModule;
