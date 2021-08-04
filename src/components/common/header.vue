<template>
    <a-layout-header  style="background: #fff; padding: 0 15px;display: flex;justify-content: space-between;">
        <a-icon
            class="trigger"
            :style="{ fontSize: '24px',padding: '20px 0', }"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapse()"
            />
        <h2>任务管理系统</h2>
        <div>
            <a-dropdown :trigger="['click']">
                <a-badge :count="2">
                    <a-avatar icon="user" />
                </a-badge>
                <a-menu slot="overlay">
                    <a-menu-item>
                        编辑信息
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item>
                        退出登录
                    </a-menu-item>
                </a-menu>
            </a-dropdown>
        </div>
    </a-layout-header>
</template>

<script>
export default({
    data() {
        return {
            
        }
    },
    props: {
        collapsed: Boolean
    },
    methods: {
        collapse() {
            // 传参给父组件
            this.$emit('showCollapsed', !this.collapsed);
        }
    }
})
</script>

<style scoped>

</style>
