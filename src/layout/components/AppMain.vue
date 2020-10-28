<template>
	<div class="app-main">
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
                 :current-page="page"
                 :page-sizes="[2,4,8,10]"
                 :page-size="limit"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="total"
                 >
                </el-pagination>
            </div>
        </template>

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
export default {
    name:"AppMain",	
    data() {
        return {
        	dialogVisible:false,
        	formLabelWidth: '120px',
            dialogFormVisible:false,
            count:0,  
            arrByZM:[], 
            data:[],
        	total:null,
        	page:1,
        	limit:4,
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
            formInline: {
                value1: '',
                value2: '',
                value3: '',
                value4: 'ID Ascending',
                region:'',
                checked: true,
            },
            
        }
    },
    create(){
    	getList();
    },
    methods:{
    	handleDelete(index,row){
            this.count++;
            row.splice(index,1);
            console.log(this.count)
        },
		handleServer() {
	        this.page = 1
	        this.getList()
        },
   		pageList(){
   			this.data=this.tableData
   			this.getList()
   		},
        getList(){
        	let arrByZM=this.data.filter((item, index) =>
                    item.value.includes(this.formInline.value3)
                )
        	this.tableData = arrByZM.filter((item, index) =>
                    index < this.page * this.limit && index >= this.limit * (this.page - 1)
                )
                this.total = arrByZM.length
            },
        handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.limit = val
                this.getList()
        },
            // 当当前页改变
        handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page = val
                this.getList()
        },
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
    },
}
</script>
