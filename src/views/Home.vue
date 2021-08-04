<template>
    <div id="components-layout-demo-custom-trigger">
        <a-layout>
            <dome-sider :collapsed=collapsed></dome-sider>
            <a-layout>
                <dome-header :collapsed=collapsed @showCollapsed="showCollapsed"></dome-header>
                <a-layout-content :style="{ margin: '24px 16px', overflow: 'initial' }">
                    <div style="padding: 24px; background: #fff; height: 100%; overflow: auto;">
                        <router-view></router-view>
                    </div>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </div>
</template>

<script>
import domeHeader from '../components/common/header.vue'
import domeSider from '../components/common/sider.vue'

export default {
    data() {
        return {
            collapsed: false,  // 负责导航栏的缩放
        }
    },
    components: {
        domeHeader,
        domeSider,
    },
    methods: {
        // 改变 collapsed 值，
        showCollapsed(data) {
            this.collapsed = data;
        }
    }
}
</script>

<style scoped>
#components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
}
</style>
