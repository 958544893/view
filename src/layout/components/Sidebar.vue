 <template>
    <div class='Sidebar'>
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
    </div>
</template>