<template>
    <div>
        <!-- .native 表示对一个组件绑定系统原生事件 .prevent 表示提交以后不刷新页面 -->
        <a-form-model ref="inlineForm" layout="inline" :model="getParam" @submit="handleSubmit" @submit.native.prevent>
            <a-form-model-item>
                <a-input v-model="getParam.info" placeholder="请输入任务名" style="width: 250px;"></a-input>
            </a-form-model-item>
            <a-form-model-item>
                <a-select v-model="getParam.chapter" style="width: 250px;">
                    <a-select-option v-for="item in chapterOption" :value="item.value" :key="item.value">
                        {{item.label}}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item>
                <a-select v-model="getParam.done" style="width: 150px;">
                    <a-select-option value="">
                        完成状态
                    </a-select-option>
                    <a-select-option value="true">
                        已完成
                    </a-select-option>
                    <a-select-option value="false">
                        未完成
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item>
                <a-button type="primary" html-type="submit">查询</a-button>
                <a-button @click="reset" style="margin-left: 10px;">重置</a-button>
                <!-- <a-button @click="showPostTask" style="margin-left: 10px;">添加</a-button> -->
            </a-form-model-item>
        </a-form-model>

        <a-table
            :columns='columns'
            :data-source='tableData'
            :loading='loading'
            :pagination='pagination'
            :row-key='record => record.id'
            @change="handleTableChange"
            style="margin-top: 20px;"
            :scroll="{ y: 325 }"
            >
            <span slot='chapter' slot-scope="record">
                第{{record}}章
            </span>
            <span slot='disk' slot-scope="record">
                <span v-if="record === 'null' || record === ''">无素材</span>
                <a-button v-else type="link" @click="goDownload(record)">前往下载</a-button>
            </span>
            <span slot='code' slot-scope="record">
                <span v-if="record === 'null' || record === ''">无素材</span>
                <span v-else>{{record}}</span>
            </span>
            <span slot='done' slot-scope="record">
                <span v-if="record === 'true'" style="color: green;">已完成</span>
                <span v-else style="color: red;">未完成</span>
            </span>
            <span slot='action' slot-scope="text, record">
                <a-popconfirm
                    title="确定改变任务完成状态吗？"
                    ok-text="确定"
                    cancel-text="返回"
                    @confirm="changeDone(record)">
                    <a-button type="link" style="color: #67C23A;">改变状态</a-button>
                </a-popconfirm>
                <!-- <a-button type="link" style="color: #F56C6C;" @click="deleteId(record)">删除</a-button> -->
            </span>
        </a-table>

        <!-- 添加任务表单 -->
        <a-modal
            title="添加任务"
            :visible="visible"
            :confirm-loading="confirmLoading"
            @ok="postTask"
            @cancel="returnTable">
            <a-form-model
                ref="postForm"
                :model="postParam"
                :rules="postRules"
                :label-col="{span: 4}"
                :wrapper-col="{span: 14}">
                <a-form-model-item label="任务名称" prop="info">
                    <a-input v-model="postParam.info"></a-input>
                </a-form-model-item>
                <a-form-model-item label="任务章节" prop="chapter">
                    <a-select v-model="postParam.chapter">
                        <a-select-option v-for="item in chapterOption" :value="item.value" :key="item.value">
                            {{item.label}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="网盘链接" prop="disk">
                    <a-input v-model="postParam.disk"></a-input>
                </a-form-model-item>
                <a-form-model-item label="提取码" prop="code">
                    <a-input v-model="postParam.code"></a-input>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
        <div style="margin-top: 15px;">
            PDF书籍：<span><b>网盘链接：</b><a href="https://pan.baidu.com/s/1CF5GSzfYbRY7bHOb_yZBgw" target="_blank">https://pan.baidu.com/s/1CF5GSzfYbRY7bHOb_yZBgw</a></span> <span><b>网盘提取码：</b>5h2i</span>
        </div>
    </div>
</template>

<script>
import { html } from '../../http/index'

export default({
    data() {
        return {
            tableData: [],  // 表格数据
            columns: [{
                title: '任务',
                dataIndex: 'info',
                key: 'info',
                width: 350,
                align: 'center',
            }, {
                title: '章节',
                dataIndex: 'chapter',
                key: 'chapter',
                scopedSlots: { customRender: 'chapter' },
                align: 'center',
            }, {
                title: '完成状态',
                dataIndex: 'done',
                key: 'done',
                scopedSlots: { customRender: 'done', },
                align: 'center',
            }, {
                title: '素材提取码',
                dataIndex: 'code',
                key: 'code',
                scopedSlots: { customRender: 'code' },
                align: 'center',
            }, {
                title: '任务素材',
                dataIndex: 'disk',
                key: 'disk',
                scopedSlots: { customRender: 'disk' },
                align: 'center',
            }, {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                scopedSlots: { customRender: 'action' },
                align: 'center',
            }],  // 表格列配置
            pagination: {
                current: 1,
                total: 0,
                pageSize: 5,
                showSizeChanger: true,
                pageSizeOptions: ['5', '10', '20', '30'],
                showTotal: total => `共有${total}条数据`
            },  // 表格分页配置
            loading: false,  // 表格是否加载中
            visible: false,  // 弹出框是否显示
            confirmLoading: false,  // 添加任务后加载中状态
            chapterOption: [{
                value: "",
                label: '请选择章节'
            }, {
                value: "1",
                label: '第1章初识HTML'
            }, {
                value: "2",
                label: '第2章使用CSS美化网页'
            }, {
                value: "3",
                label: '第3章列表、表格及表单'
            }, {
                value: "4",
                label: '第4章盒子模型的应用'
            }, {
                value: "5",
                label: '第5章网页中无处不在的浮动'
            }, {
                value: "6",
                label: '第6章CSS定位'
            }, {
                value: "7",
                label: '第7章项目实战---制作1号店网页'
            }],  // 章节数据
            getParam: {
                info: '',
                chapter: '',
                done: ''
            },  // get请求参数
            postParam: {
                info: '',
                disk: '',
                code: '',
                chapter: '',
                done: 'false',
            },  // post请求参数
            postRules: {
                info: [
                    { required: true, message: '请输入任务名称', trigger: 'blur' }
                ],
                chapter: [
                    { required: true, message: '请选择章节', trigger: 'change' }
                ],
            },  // 添加任务表单规则
            putParam: {
                id: 0,
                info: '',
                disk: '',
                code: '',
                chapter: '',
                done: '',
            },  // put请求参数
            searchColumn: '',
            searchText: '',
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        // 获取列表信息
        getData() {
            this.loading = true;
            html.get({
                'info': '%' + this.getParam.info + '%',
                'chapter': '%' + this.getParam.chapter + '%',
                'done': '%' + this.getParam.done + '%',
            }).then(res => {
                // console.log(res);
                this.tableData = res;
                this.pagination.total = res.length
                this.loading = false;
                this.$message.success('查询任务成功');
            }).catch(err => {
                // console.log(err);
                this.$message.error('查询任务失败');
                this.loading = false;
            })
        },
        // 添加任务
        postData() {
            html.post(this.postParam).then(res => {
                // console.log(res);
                this.confirmLoading = false;
                this.$message.success('添加任务成功');
                this.visible = false;
                this.$refs.postForm.resetFields();
                this.getData();
            }).catch(err => {
                // console.log(err);
                this.$message.error('添加任务失败')
            })
        },
        // 修改任务
        putData(record) {
            this.putParam.id = record.id;
            this.putParam.info = record.info;
            this.putParam.disk = record.disk;
            this.putParam.code = record.code;
            this.putParam.chapter = record.chapter;
            html.put(this.putParam).then(res => {
                // console.log(res);
                this.$message.success('修改任务成功');
                this.getData();
            }).catch(err => {
                // console.log(err);
                this.$message.error('修改任务失败');
            })
        },
        // 删除任务
        deleteData(recordId) {
            html.delete({
                id: recordId
            }).then(res => {
                // console.log(res);
                this.$message.success('删除任务成功');
                this.getData();
            }).catch(err => {
                // console.log(err);
                this.$message.error('删除任务失败');
            })
        },
        // 表格页码发生变化的函数
        handleTableChange(pagination, filters, sorter) {
            this.pagination.current = pagination.current;
            this.pagination.pageSize = pagination.pageSize
        },
        // 查询
        handleSubmit() {
            this.getData();
        },
        // 重置
        reset() {
            this.getParam = {
                info: '',
                chapter: '',
                done: ''
            };
            this.pagination.current = 1;
            this.pagination.pageSize = 5;
            this.getData();
        },
        // 打开添加任务表单
        showPostTask() {
            this.visible = true;
        },
        // 添加任务操作
        postTask() {
            this.$refs.postForm.validate(valid => {
                if(valid) {
                    this.confirmLoading = true;
                    this.postData();
                }
            })
        },
        // 改变任务状态
        changeDone(record) {
            console.log(record);
            if(record.done === 'true') {
                this.putParam.done = 'false';
            }else {
                this.putParam.done = 'true';
            }
            this.putData(record);
        },
        // 删除任务
        deleteId(record) {
            this.deleteData(record.id)
        },
        // 取消添加任务
        returnTable() {
            this.visible = false;
            this.$refs.postForm.resetFields();
        },
        // 前往下载素材
        goDownload(record) {
            this.$confirm({
                title: '确定前往百度网盘下载任务素材',
                onOk() {
                    window.open(record, '_blank');
                }
            })
        },
    }
})
</script>

<style scoped>
</style>
