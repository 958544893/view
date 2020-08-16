<template>
    <div id="app">
        <div id='add'>
            <el-row :gutter="10" 
            align="center"
            style='margin-right: 0px;margin-left:0px;margin-bottom: 0px'>
                <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                    <div class="grid-content bg-purple" style="height: 50px"v-model="isCollapse"@click='handleRetract()'>
                        <el-button type='text'v-model="isCollapse">
                            <i class="el-icon-s-operation" style='padding-top: 5px; padding-bottom: 0px;font-size:25px'></i>
                        </el-button>
                    </div>
                </el-col>
                <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
                    <div class="grid-content bg-purple-light" >
                        <el-breadcrumb separator="/" style='padding-top: 20px; padding-bottom: 4px;'>
                            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item><a href="/">Table</a></el-breadcrumb-item>
                            <el-breadcrumb-item>综合Table</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                </el-col>
            </el-row>
            <div  style='box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04) '>
                <el-input 
                 class="input-new-tag" 
                 v-if="inputVisible" 
                 v-model="inputValue"
                 ref="saveTagInput"
                 size="small"
                 @keyup.enter.native="handleInputConfirm"
                 @blur="handleInputConfirm">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">首页
                </el-button>
                <el-input class="input-new-tag"
                 v-if="inputVisible"
                 v-model="inputValue"
                 ref="saveTagInput"
                 size="small"
                 @keyup.enter.native="handleInputConfirm"
                 @blur="handleInputConfirm">
                </el-input>
                <el-button v-else class="button-new1-tag" size="small" @click="showInput">文档</el-button>
                <el-tag
                 :key="tag"
                 v-for="tag in dynamicTags"
                 closable
                 :disable-transitions="false"
                 @close="handleClose(tag)">
                {{tag}}
                </el-tag>
            </div>
        </div>
        <div id='idd'>
            <el-form :inline="true" :model="formInline" class="demo-form-inline" style='margin-top:10px;margin-left: 20px'>
                <el-form-item style='margin:0px;padding-bottom:0px'>
                    <el-input v-model="formInline.value1" placeholder="标题"></el-input>
                </el-form-item>
                <el-select v-model="formInline.value2" placeholder="重要性" style='margin:0px;padding-bottom:0px;width: 6%'>
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                    <el-option label="3" value="3"></el-option>
                </el-select>
                <el-select v-model="formInline.value3" placeholder="类型" style='margin:0px;padding-bottom:0px;width: 9%'>
                    <el-option label="China(CN)" value="China"></el-option>
                    <el-option label="USA(US)" value="USA"></el-option>
                    <el-option label="Japan(JP)" value="Japan"></el-option>
                    <el-option label="Eurozone(EU)" value="Eurozone"></el-option>
                </el-select>
                <el-select v-model="formInline.value4" style='margin:0px;padding-bottom:0px;width: 10%;'>
                    <el-option label="ID Ascending" value="ID Ascending"></el-option>
                    <el-option label="ID Descending" value="ID Descending"></el-option>
                </el-select>
                <el-form-item style='margin:0px;padding-bottom:0px'>
                    <el-button type="primary" @click="handleServer()"><i class='el-icon-search'>查询</i></el-button>
                    <el-button type="primary" @click="onSubmit"><i class='el-icon-edit'>添加</i></el-button>
                    <el-button type="primary" @click='onSubmit'><i class='el-icon-download'>导出</i></el-button>
                </el-form-item>
                <template>
                    <el-checkbox v-model="checked" style="margin-left:20px">审核人</el-checkbox>
                </template>
            </el-form>
            <template>
                <el-table
                 border
                 :data="tableData"
                 style="width:100%;margin-left:20px;margin-right:20px;margin-top:30px; overflow-x: hidden;"
                 max-height="850"
                 :default-sort = "{prop:'date', order: 'descending'}">
                    <el-table-column
                     fixed
                     sortable
                     prop='num'
                     label="序号"
                     width="120"
                     align="center">
                    </el-table-column>
                    <el-table-column
                     label="时间"
                     width="170"
                     align="center">
                    <template slot-scope='scope'>
                        <span>{{ scope.row.time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                     prop='url'
                     label="标题"
                     width="620"
                     :resizable='false'
                     align="center">
                        <template slot-scope='scope'>
                            <el-button type='text' :url="scope.row.url" @click="handleEdit(scope.$index, scope.row)">
                                <span style="color:#338dd0">{{scope.row.url}}
                                </span>
                            </el-button>
                            <el-tag :value='scope.row.value'>{{scope.row.value}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                     prop='author'
                     label="作者"
                     width="120"
                     align="center">
                    </el-table-column>
                    <el-table-column
                     prop='important'
                     label="重要性"
                     width="100"
                     align="center">
                    </el-table-column>
                    <el-table-column
                     label="阅读数"
                     width="120"
                     align="center">
                        <template slot-scope='scope'>
                             <el-button type='text' :read="scope.row.read" @click="dialogVisible = true">      
                                <span style="color:#338dd0">{{scope.row.read}}</span>
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                     prop="tag"
                     label="状态"
                     width="120"
                     align="center"
                     :filters="[{ text: 'published', value: 'published' }, { text: 'draft', value: 'draft' }]"
                     :filter-method="filterTag"
                     filter-placement="bottom-end">
                        <template slot-scope="scope">
                            <el-tag
                             :type="scope.row.tag === 'published' ? 'success' : 'info'"
                             disable-transitions>{{scope.row.tag}}</el-tag>
                        </template>
                    </el-table-column >
                    <el-table-column prop="operate" label="操作" width='248'align="center"
                     :filters="[{ text: '草稿', value: '草稿' }, { text: '发布', value: '发布' }]"
                     :filter-method="filteroperate"
                     filter-placement="bottom-end">
                        <template slot-scope="scope">
                            <el-button  type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button  size="mini" :type="scope.row.tag === 'published' ? '' : 'success'" @click='open2(scope.$index, scope.row)' disable-transitions>{{scope.row.operate}}</el-button>
                            <el-button size="mini" type="danger" @click.native.prevent="handleDelete(scope.$index, tableData)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <template>
                <div class="block" style="margin-top:70px;margin-left: 40px">
                    <el-pagination
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage4"
                     :page-sizes="[10,50,100,200,]"
                     :page-size="10"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="100"
                     >
                    </el-pagination>
                </div>
            </template>
        </div>
        <el-row class="tac">
            <el-menu
             default-active="1-5-1"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             background-color="#2c3e50"
             text-color="#fff"
             active-text-color="#409eff"
             :collapse="isCollapse">
                <el-menu-item index="1">
                    <i class="el-icon-s-operation"></i>
                    <span slot='title'>首页</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <i class="el-icon-document"></i>
                    <span slot="title">文档</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <i class="el-icon-s-promotion"></i>
                    <span slot="title">引导页</span>
                </el-menu-item>
                <el-submenu index="4">
                    <template slot='title'>
                        <i class="el-icon-lock"></i>
                        <span>权限测试页</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1"> 页面权限</el-menu-item>
                        <el-menu-item index="1-2"> 指令权限</el-menu-item>
                        <el-menu-item index="1-3"> 角色权限</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="5">
                    <i class="el-icon-postcard"></i>
                    <span slot="title">图标</span>
                </el-menu-item>
                <el-submenu  index="6">
                    <template slot='title'>
                        <i class="el-icon-menu"></i>
                        <span>组件</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1"> 富文本编译器</el-menu-item>
                        <el-menu-item index="2-2"> Markdown</el-menu-item>
                        <el-menu-item index="2-3"> JSON编译器</el-menu-item>
                        <el-menu-item index="2-4"> Splitpane</el-menu-item>
                        <el-menu-item index="2-5"> 头像上传</el-menu-item>
                        <el-menu-item index="2-6"> Dropzone</el-menu-item>
                        <el-menu-item index="2-7"> Splitpane</el-menu-item>
                        <el-menu-item index="2-8"> 头像上传</el-menu-item>
                        <el-menu-item index="2-9"> Dropzone</el-menu-item>
                        <el-menu-item index="2-10"> Sticky</el-menu-item>
                        <el-menu-item index="2-11"> Count To</el-menu-item>
                        <el-menu-item index="2-12"> 小组件</el-menu-item>
                        <el-menu-item index="2-13"> 返回顶部</el-menu-item>
                        <el-menu-item index="2-14"> 列表拖拽 </el-menu-item>
                        <el-menu-item index="2-15"> 可拖拽看板</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="7">
                    <template slot='title'>
                        <i class="el-icon-pie-chart"></i>
                        <span>图表</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1"> 键盘图表</el-menu-item>
                        <el-menu-item index="2-2"> 拆线图</el-menu-item>
                        <el-menu-item index="2-3"> 混合图表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="8">
                    <template slot='title'>
                        <i class="el-icon-s-grid"></i>
                        <span >路由嵌套</span>
                    </template>
                    <el-menu-item-group>
                        <el-submenu index="3-1">
                            <template slot="title">菜单1</template>
                                <el-menu-item index="3-1-1">菜单1-1</el-menu-item>
                                <el-submenu index="3-1-2">
                                    <template slot="title">菜单1-2</template>
                                            <el-menu-item index="3-1-2-1">菜单1-2-1</el-menu-item>
                                            <el-menu-item index="3-1-2-1">菜单1-2-2</el-menu-item>
                                </el-submenu>
                                <el-menu-item index="3-1-3">菜单1-3</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="3-2"> 菜单2</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="9">
                    <template slot='title'>
                        <i class="el-icon-notebook-2"></i>
                        <span>Table</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="4-1">动态Table</el-menu-item>
                        <el-menu-item index="4-2"> 拖拽Table</el-menu-item>
                        <el-menu-item index="4-3"> Table 内编辑</el-menu-item>
                        <el-menu-item index="4-3"> 综合 Table </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="10">
                    <template slot='title'>
                        <i class="el-icon-bangzhu"></i>
                        <span >综合实例</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="5-1"><i class="el-icon-edit-outline"></i>创建文章</el-menu-item>
                        <el-menu-item index="5-2"> <i class="el-icon-collection"></i>文章列表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="11">
                    <i class="el-icon-edit"></i>
                    <span slot="title">Tab</span>
                </el-menu-item>
                <el-submenu index="12">
                    <template slot="title">
                        <i class="el-icon-warning-outline"></i>
                        <span>错误页面</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="5-1">401</el-menu-item>
                        <el-menu-item index="5-2">404</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="13">
                    <i class="el-icon-question"></i>
                    <span slot="title">错误日志</span>
                </el-menu-item>
                <el-submenu index="14">
                    <template slot="title">
                        <i class="el-icon-reading"></i>
                        <span>Excel</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="6-1">导出 Excel</el-menu-item>
                        <el-menu-item index="6-2"> 导出 已选择项</el-menu-item>
                        <el-menu-item index="6-3"> 导出 多级表头</el-menu-item>
                        <el-menu-item index="6-3"> 上传 Excel </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="15">
                    <template slot="title">
                        <i class="el-icon-coin"></i>
                        <span>Zip</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="7-1">Export zip</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="16">
                    <i class="el-icon-printer"></i>
                    <span slot="title">PDF</span>
                </el-menu-item>
                <el-menu-item index="17">
                    <i class="el-icon-document-copy"></i>
                    <span slot="title">换肤</span>
                </el-menu-item>
                <el-menu-item index="18">
                    <i class="el-icon-magic-stick"></i>
                    <span slot="title">Clipboard</span>
                </el-menu-item>
                <el-menu-item index="19">
                    <i class="el-icon-star-off"></i>
                    <span slot="title">国际化</span>
                </el-menu-item>
                <el-menu-item index="20">
                    <i class="el-icon-paperclip"></i>
                    <span slot="title">外链</span>
                </el-menu-item>
                <el-menu-item index="21">
                    <i class="el-icon-loading"></i>
                    <span slot="title">打赏</span>
                </el-menu-item>
            </el-menu>
        </el-row>
        <el-dialog title="Edit" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="类型" required>
                    <el-select v-model="ruleForm.value">
                        <el-option label="China" value="China"></el-option>
                        <el-option label="USA" value="USA"></el-option>
                        <el-option label="Japan" value="Japan"></el-option>
                        <el-option label="Eurozone" value="Eurozone"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间" required>
                    <el-col :span="11">
                        <el-form-item prop="date">
                            <el-date-picker
                             v-model="ruleForm.time"
                             type="datetime"
                             placeholder="选择日期时间"
                             style='float: left'>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="标题" style="width: 50%;"required>
                    <el-input v-model="ruleForm.url"></el-input>
                </el-form-item>
                <el-form-item label="状态" >
                    <el-select v-model="ruleForm.tag">
                        <el-option label="published" value="published"></el-option>
                        <el-option label="draft" value="draft"></el-option>
                        <el-option label="deleted" value="deleted"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="重要性" >
                    <el-rate
                     v-model="ruleForm.important"
                     :colors="colors"
                     :max="3"
                     style='margin-top: 10px;margin-left: 5px'>
                    </el-rate>
                </el-form-item>
                <el-form-item label="点评" prop="desc"style="width: 40%;">
                    <el-input type="textarea" v-model="ruleForm.desc" placeholder="请评价"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleFormSave">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="Edit" :visible.sync="dialogVisible">
            <table  
             style='width: 909px;
             height:300px;
             border: 1px solid #dfe6ec;
             text-align: center;'
             border="0" 
             cellpadding="0" 
             cellspacing="0"> 
                <tr>
                    <th rowspan='1' colspan="1"style="border: 1px solid #dfe6ec;">Channel</th> 
                     <th owspan='1' colspan="1"style="border: 1px solid #dfe6ec;">Pv</th>
                </tr>
                <tr>
                    <td rowspan='1' colspan="1"style="border: 1px solid #dfe6ec;">mobile</td>  
                    <td rowspan='1' colspan="1"style="border: 1px solid #dfe6ec;">1024</td>   
                </tr>
                <tr>
                    <td rowspan='1' colspan="1"style="border: 1px solid #dfe6ec;">ios</td>  
                    <td rowspan='1' colspan="1"style="border: 1px solid #dfe6ec;">1024</td>   
                </tr>
                <tr>
                    <td rowspan='1' colspan="1"style="border: 1px solid #dfe6ec;">android</td>  
                    <td rowspan='1' colspan="1"style="border: 1px solid #dfe6ec;">1024</td>   
                </tr>
            </table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {parseTime} from './components/date.js';
    export default {
    name:"#App",
    data() {
        return {
            isCollapse:false,
            dialogVisible:false,
            value2: null,
            colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
            ruleForm: {
                num: '',
                value: '',
                time:new Date(),
                url: '',
                tag:'',
                important:'',
                desc:'',
                operate:''
            },
            rules: {
                value: [
                { type: 'array', required: true, message: '', trigger: 'change' },
              ],
                time: [
                { type: 'date', required: true, message: '', trigger: 'change' }
              ],
                url: [
                { required: true, message: '', trigger: 'change' }
              ],
                tag: [
                { type: 'array', required: true, message: '', trigger: 'change' }
              ],
                important: [
                {  required: true, message: '', trigger: 'change' }
              ],
                desc: [
                {  message: '请填写活动形式', trigger: 'blur' }
              ]
            },
            tableData: [
                {
                    num:'1',
                    time: '1974-01-27 18:26',
                    url:'Icwbwj Nlmsu Mysr Qhfxfn Kwgc Upxh Tkdcagvt Nvoqromj Ynebgnplt Exsqq',
                    value:'China',
                    author: 'Shirley',
                    important:'★',
                    read: '1488',
                    tag:'published',
                    operate:'草稿',
                }, 
                {
                    num:'2',
                    time: '1990-10-15 22:38',
                    url:'Idc Ntbxmpswk Bhsoivgpsi Rlpdyyksp Iwv Tpms Fszsis Avrvw Ecybkv Fqskng',
                    value:'USA',
                    author: 'Richard',
                    important:'★',
                    read: '4750',
                    tag:'draft',
                    operate:'发布'
                },
                {
                    num:'3',
                    time: '1981-07-05 23:35',
                    url:'Ahmfht Uuyjuriz Lsqmzn Cgomk Yqxq Dqoegdd Ymticzzer Mbpplw Kohuyyh',
                    value:'Japan',
                    author: 'Joseph',
                    important:'★',
                    read: '1434',
                    tag:'draft',
                    operate:'发布'
                }, 
                {
                    num:'4',
                    time: '2004-02-13 01:05',
                    url:'Hcwnxy Eqkq Jjde Ntblnk Vuqis Bwvf Nvaul Sghqswca Kaix',
                    author: 'William',
                    value:'China',
                    important:'★★',
                    read: '1973',
                    tag:'draft',
                    operate:'发布'
                }, 
                {
                    num:'5',
                    time: '1973-01-11 00:58',
                    url:'Vldpcbjc Whuqln Bbzqhf Bkckbigsvr Qdhuuquw Wyztuhdn Zmxpmqp Bvtync',
                    value:'USA',
                    author: 'Steven',
                    important:'★★',
                    read: '3016',
                    tag:'published',
                    operate:'草稿'
                }, 
                {
                    num:'6',
                    time: '2002-05-10 08:22',
                    url:'Ngkicmy Kvxldojhg Nbawkdjs Bsjitvi Wuonxtkc',
                    value:'Japan',
                    author: 'Amy',
                    important:'★★★',
                    read: '3904',
                    tag:'draft',
                    operate:'发布'
                }, 
                {
                    num:'7',
                    time: '2002-11-15 10:16',
                    url:'Zbprvpj Ogkyvf Flr Ijeujwz Hosp',
                    value:'Japan',
                    author: 'Steven',
                    important:'★★★',
                    read: '3878',
                    tag:'draft',
                    operate:'发布'
                },
                {
                    num:'8',
                    time: '1984-03-29 06:05',
                    url:'Flmiccc Khjq Ymeuaxlop Ivkpfa Pldpvf Ljuuruskss Uhxhbatn',
                    value:'USA',
                    author: 'Lisa',
                    important:'★★★',
                    read: '963',
                    tag:'draft',
                    operate:'发布'
                },
                {
                    num:'9',
                    time: '2008-10-16 15:23',
                    url:'Ixx Xizwd Ggxhc Nnchkwucvy Nittjf Dulfuhk',
                    value:'China',
                    author: 'Mark',
                    important:'★★',
                    read: '639',
                    tag:'published',
                    operate:'草稿'
                },
                {
                    num:'10',
                    time: '2015-07-03 00:36',
                    url:'Yhdnrbwrx Shoucvnq Glehwaw Qpetlrr Edqlwly',
                    value:'Eurozone',
                    author: 'Mary',
                    important:'★',
                    read: '1285',
                    tag:'draft',
                    operate:'发布'
                },
                {
                    num:'11',
                    time: '2015-03-06 11:04',
                    url:'Mtaw Dpyktxyfe Vxtxgo Xij Wndzl Lgsm',
                    value:'Eurozone',
                    author: 'Donald',
                    important:'★',
                    read: '4921',
                    tag:'draft',
                    operate:'发布'
                },
                {
                    num:'12',
                    time: '2122-09-25 13:14',
                    url:'Qvyvyful Vowvwwt Iklbmw Rnc Flzc Wkqefegq Nsz Irptpqyq',
                    value:'China',
                    author: 'Scott',
                    important:'★★',
                    read: '4056',
                    tag:'draft',
                    operate:'发布'
                },
                {
                    num:'13',
                    time: '1985-01-26 04:41',
                    url:'Otwkruv Weagn Owb Hlee Vehl Cbmnxq Uhc Kmveb Hwfvhu',
                    value:'USA',
                    author: 'Christopher',
                    important:'★',
                    read: '1939',
                    tag:'draft',
                    operate:'发布'
                },
                {
                    num:'14',
                    time: '1971-08-19 15:54',
                    url:'Vpci Vib Xwrv Bgbdjv Djaigwtnnj Rxqduymgd',
                    value:'Japan',
                    author: 'Maria',
                    important:'★',
                    read: '4695',
                    tag:'draft',
                    operate:'发布'
                },
                {
                    num:'15',
                    time: '1992-12-28 18:59',
                    url:'Kvfoq Puwii Dfso Yocp Eairsddqg Hcdhu Fgnkozeprp Ifiwnzsulk Uriaxd',
                    value:'Japan',
                    author: 'Eric',
                    important:'★',
                    read: '1649',
                    tag:'published',
                    operate:'草稿'
                },
                {
                    num:'16',
                    time: '1975-02-27 20:22',
                    url:'Qiywdcwv Hrenvb Oldenk Qdsbmeuxr Oivjticjl Cbwtl',
                    value:'China',
                    author: 'Kimberly',
                    important:'★★',
                    read: '891',
                    tag:'published',
                    operate:'草稿'
                },
                {
                    num:'17',
                    time: '1997-03-08 15:37',
                    url:'Nppmjtvdu Iodctbsukh Bxdu Yfaxuihng Pwquxlm Swfxd Mqjwzts',
                    value:'Eurozone',
                    author: 'Edward',
                    important:'★★',
                    read: '687',
                    tag:'draft',
                    operate:'发布'
                },
                {
                    num:'18',
                    time: '2007-03-02 05:22',
                    url:'Vetxu Exauk Fxldglxuk Phjwvq Kehrxwwl Pxlyibjik Ddeb Xtvvx Fjqhswwh Mzdkmhxjbq',
                    value:'China',
                    author: 'Margaret',
                    important:'★★★',
                    read: '3818',
                    tag:'draft',
                    operate:'发布'
                },
                {
                    num:'19',
                    time: '2020-04-17 17:18',
                    url:'Mviyxwgsp Vtyudprfxe Jkhhfycku Zoqr Ljjuuqqy Xfsd',
                    value:'Japan',
                    author: 'George',
                    important:'★★',
                    read: '3207',
                    tag:'draft',
                    operate:'发布'
                },
                {
                    num:'20',
                    time: '1995-08-09 08:54',
                    url:'Ojppcmr Eax Lusscje Dhlofpy Inoqk',
                    value:'Japan',
                    author: 'Laura',
                    important:'★★',
                    read: '583',
                    tag:'published',
                    operate:'草稿'
                },
            ],
            dynamicTags: ['综合Table', 'Table 内编辑'],
            inputVisible: false,
            inputValue:'',
            formInline: {
                value1: '',
                value2: '',
                value3: '',
                value4: 'ID Ascending',
                region:'',
                checked: true,
            },
            formLabelWidth: '120px',
            dialogFormVisible:false,
            count:0,   
        }
    },
   methods:{
        handleServer(){
            const d=this.tableData
            var arrByZM = []
            for(var i=0;i<this.tableData.length;i++){
                if(this.tableData[i].value.search(this.formInline.value3)!= -1){
                arrByZM.push(this.tableData[i])  
                console.log(this.arrByZM) 
            }
        }},
        handleRetract(){
            this.isCollapse = !this.isCollapse;
            console.log(this.isCollapse)
        },
        handleFormSave() {
            this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success'
            });
            this.dialogFormVisible = false;
            this.tableData[this.ruleForm.num - (this.count+1)].url = this.ruleForm.url;
             this.tableData[this.ruleForm.num - (this.count+1)].tag = this.ruleForm.tag;
            this.tableData[this.ruleForm.num - (this.count+1)].value = this.ruleForm.value;
            this.tableData[this.ruleForm.num - (this.count+1)].important = this.ruleForm.important;
            if(this.tableData[this.ruleForm.num - (this.count+1)].tag ==='draft'){
                console.log(this.tableData[this.ruleForm.num - (this.count+1)].operate='发布') 
            }else if(this.tableData[this.ruleForm.num - (this.count+1)].tag ==='published'){
                console.log(this.tableData[this.ruleForm.num - (this.count+1)].operate='草稿') 
            }else{
                console.log(this.tableData[this.ruleForm.num - (this.count+1)].operate='发布')
            }
            this.tableData[this.ruleForm.num - (this.count+1)].time =this.ruleForm.time.getFullYear()+'-'+(this.ruleForm.time.getMonth()+1)+'-'+this.ruleForm.time.getDate()+' '+this.ruleForm.time.getHours()+':'+this.ruleForm.time.getMinutes();
            console.log(this.count)
            console.log(this.tableData[this.ruleForm.num - (this.count+1)].operate)
        },
        handleEdit(index, rowData) {
            console.log(index, rowData);
            this.ruleForm.value = rowData.value;
            this.ruleForm.time = rowData.time;
            this.ruleForm.url = rowData.url;
            this.ruleForm.tag = rowData.tag;
            this.ruleForm.important = rowData.important;
            this.ruleForm.num=rowData.num;
            this.ruleForm.operate=rowData.operate;
            this.dialogFormVisible = true;

        },
        open2(index,row) {
            this.$message({
              message: '操作成功',
              type: 'success',
            });
            this.tableData[index].operate=row.operate;
            if(this.tableData[index].operate ==="发布"){
              console.log(this.tableData[index].operate='草稿');
              console.log(this.tableData[index].tag='published');
            }else{
              console.log(this.tableData[index].operate='发布');
              console.log(this.tableData[index].tag='draft');
          }
      },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                alert('submit!');
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
        resetForm(formName) {
            this.$refs[formName].resetFields();
          },
        filterTag(value, row) {
          return row.tag === value;
        },
        filteroperate(value, row) {
          return row.tag === value;
        },
        formatter(row, column) {
          return row.address;
        },
        deleteRow(index, rows) {
          rows.splice(index, 1);
        },
        handleClose(tag) {
          this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },

        showInput() {
          
        },
        getFlag(important){
          return scope.row.editeFlag=this.important;
        },
        onSubmit() {
          console.log('onSubmit!');
        },
        handleDelete(index,row){
            this.count++;
            row.splice(index,1);
            console.log(this.count)
        },
        handleInputConfirm() {
          let inputValue = this.inputValue;
          if (inputValue) {
            this.dynamicTags.push(inputValue);
          }
          this.inputVisible = false;
          this.inputValue = '';
        }
      }
    }     
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin:0px auto;
}
.tac {
  height:100%;
    width:200px;
}
#add {
  width: 1699px;
  height: 100px;
  background-color: white;
  float: right;
}
#idd {
  width: 87%;
  height:100px;
  background-color:white;
  float: right;
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;

    }
}
.el-col {
    border-radius: 4px;
    text-align: center;
    vertical-align: middle;
}
.bg-purple-dark {
    background: #fff;
}
.bg-purple {
    background: #fff;
}
.bg-purple-light {
    background: #fff
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}

</style>
