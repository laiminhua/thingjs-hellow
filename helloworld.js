var app = new THING.App({
    // 引用场景
    url: '/api/scene/20210616095248956300069',  // 场景地址
    skyBox: 'BlueSky', // 天空盒
    resourceLibraryUrl: "./"
});

app.on('load', function () {
    // 创建模型
    let obj = app.create({
        type: 'Thing',
        name: '宇航员',
        url: '/api/models/7bfb3321557a40fead822d7285ac5324/0/gltf/',
        position: [0, 0, 0],
        angle: 45
    });

    obj.playAnimation({
        name: '_defaultAnim_',
        loopType: THING.LoopType.Repeat,
    });
});

// 引用效果模板组件脚本
THING.Utils.dynamicLoad([
    './static/plugins/thing.effect.min/1.5.6/EffectThemeControl.min.js',
    "/static/resource/ThingJS/697/frame.js"
], function () {
    app.on('load', function (ev) {
        app.level.change(ev.campus);
        //关闭，进到室内自动切换天空盒  
        app.level.options['autoChangeBackground'] = false;
        //初始化
        var control = new THING.EffectThemeControl();
        app.addControl(control, '效果模板控制器');
        //获取模板控制器
        var ctrl = app.getControl('效果模板控制器');
        //注册模板,data是模板数据。如果是本地效果模板包，必须填第三个参数，该参数是模板包相对于该片代码的路径
        ctrl.registerTheme('default_parkbusiness', data, '/static/resource/ThingJS/697');
        //获取园区
        c = app.query('.Campus')[0];
        //应用效果模板
        c.applyTheme('default_parkbusiness');
        ctrl.applyEffectTheme('default_parkbusiness', c);
        ctrl.applyThemeEnvironment('default_parkbusiness', c);
    })
})