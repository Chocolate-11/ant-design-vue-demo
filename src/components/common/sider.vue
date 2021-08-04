<template>
    <a-layout-sider
        :style="{ overflow: 'auto', height: '100vh' }"
        v-model="collapsed"
        :trigger="null"
        collapsible
        >
        <div class="logo" style="height: 32px;background: rgba(255, 255, 255, 0.2);margin: 16px;"/>
        <a-menu
            mode="inline"
            :default-open-keys="openKeys"
            :default-selected-keys="defaultSelectedKeys"
            theme="dark"
            @openChange="onOpenChange"
            @click="menuClick"
            >
            <a-sub-menu key="sub1">
                <span slot="title">
                    <icon-js type="icon-renwu"/>
                    <span>任务模块</span>
                </span>
                <a-menu-item key="/html"><icon-js type="icon-html"/> 网页设计与开发 </a-menu-item>
            </a-sub-menu>
        </a-menu>
    </a-layout-sider>
</template>

<script>
import { IconJs } from '../icon/icon'
export default {
    components: {
        IconJs
    },
    data() {
        return {
            openKeys: ['sub1'],
            defaultSelectedKeys: ['/sub1-1']
        }
    },
    props: {
        collapsed: Boolean
    },
    methods: {
        onOpenChange(openKeys) {
            console.log(openKeys);
        },
        menuClick(item) {
            if(this.$route.path !== item.key) {
                this.$router.push(item.key)
            }
        },
    }
};
</script>

<style scoped>
</style>
