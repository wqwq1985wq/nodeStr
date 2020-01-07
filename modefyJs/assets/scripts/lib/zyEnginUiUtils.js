/*
 * @Author: wangqiang 
 * @Date: 2020-01-07 16:48:09 
 * @Last Modified by: wangqiang
 * @Last Modified time: 2020-01-07 17:41:47
 */

/*************************
//UI 管理类
*************************/
function UiUtils() {
    this._uiMap = {};//prefab ui layer记录
    this._midLayer = null;//场景层级
    this._topLayer = null;
    this._textCache = {};
    this._isExit = false;//是否已经登出游戏
    this._loadPrefabs = {};//正在加载的prefab
    //正在加载的界面数量
    this._isLoadingNum = 0;
    //是否正在释放资源
    this._isReleasingNum = 0;
    //资源引用计数
    this.resCountMap = {};

    this.openPrefabView = function ({
        url="", isAddTop=false, 
        param=null, showMainEffect=false
        } = {}) {
        
        if (this._isExit)
            return;

        if (this._uiMap == null) {
            this._uiMap = {};
        }
        if (url == "") {
            cc.zy.alertUtil.alert("功能未开放");
            return;
        }
        url = cc.zy.zyConfig.skin + "/prefabs/ui/" + url;
        if (this._uiMap[url] != null) {
            this.setViewIndex(url);
        }
        else {
            this.loadPrefabView({url:url, isAddTop:isAddTop, 
                param:param, showMainEffect:showMainEffect});
        }
    };
    /**调整到顶部，而不是重新加载*/
    this.setViewIndex = function (url) {
        var viewNode = this._uiMap[url];
        if (viewNode && viewNode.parent) {
            viewNode.setSiblingIndex(viewNode.parent.childrenCount - 1);
        }
    };
    /**加载prefab */
    this.loadPrefabView = function ({
            url="", isAddTop=false,
            param=null, showMainEffect=false}={}) {
        console.log('loadPrefabView:',url);
        var self = this;
        //如果uimap内没东西则不做任何操作
        var showEffectflag = true;
        for (var key in this._uiMap) {
            showEffectflag = false;
            break;
        }
        showMainEffect = showEffectflag;
        

        if (this.isReleasing()) {
            return
        }
        if (this._loadPrefabs[url])
            return;
        this._loadPrefabs[url] = true;
        this._isLoadingNum = this._isLoadingNum + 1;

        //显示加载菊花
        facade.send("WAIT_SHOW");

        cc.loader.loadRes(url, function (err, prefab) {
            self._loadPrefabs[url] = false;
            self._isLoadingNum = self._isLoadingNum - 1;
            if (err == null && prefab) {
                facade.send("WAIT_HIDE");
                
                cc.zy.uiUtils.saveAssets(url);
                var node = cc.instantiate(prefab);
                if (node) {
                    node["__url"] = url;
                    node["openParam"] = param;
                    node["openTime"] = cc.sys.now();
                    node["show_main_effect"] = showMainEffect;
                    if(url.indexOf("ConfirmRetry") != -1 || url.indexOf("AlertItemShow") != -1 || url.indexOf("GuanView") != -1 || url.indexOf("AlertHeroView") != -1){//这个是常驻资源，不需要放入uimap  AlertItemShow会影响初始创建

                    }else{
                        self._uiMap[url] = node;
                    }
                    self.findTopLayer();
                    if (self._midLayer && !isAddTop) {
                        self._midLayer.addChild(node);
                    }
                    else if (isAddTop && self._topLayer) {
                        self._topLayer.addChild(node);
                    }

                    for (var key in self._uiMap) {//加载完，判断uimap有东西
                        showMainEffect = false;
                        break;
                    }

                    self.drawCallYouhuaHide(url,!showMainEffect);
                    //特殊处理，不需要打开效果的，返回
                    
                    self.showNodeEffect(node);
                }
            }
            else {
                cc.warn(err + " name load error!!!");
            }
        });
       
    }
    //显示节点上面动画
    this.showNodeEffect = function (node, index) {
        if (index === void 0) { index = 0; }
        if (node == null)
            return;
        var anima = node.getComponent(cc.Animation);
        if (anima) {
            var clips = anima.getClips();
            if (index == -1) {
                index = Math.floor(Math.random() * clips.length);
            }
            if (index != -1 && clips.length > 2 && clips.length % 2 == 0) {
                index = index + Math.floor(Math.random() * clips.length / 2) * 2;
            }
            var clip = clips[index];
            if (clip) {
                anima.play(clip.name);
            }
        }
    };
    this.isReleasing = function () {
        return this._isReleasingNum != 0;
    };
    /**保存资源引用情况 */
    this.saveAssets = function (url) {
        var deps = cc.loader.getDependsRecursively(url);
        if (deps != null) {
            for (var i = 0; i < deps.length; i++) {
                if (deps[i] == null || this.isMaterial(deps[i]))
                    continue;
                if (this.resCountMap[deps[i]]) {
                    this.resCountMap[deps[i]] = this.resCountMap[deps[i]] + 1;
                }else{
                    if (this._textCache[deps[i]]) {
                        delete this._textCache[deps[i]];
                    }
                    this.resCountMap[deps[i]] = 1
                }
            };
        }
    };
    /**找到场景_midLayer和_topLayer*/
    this.findTopLayer = function () {
        if (this._midLayer == null) {
            var canvas = cc.director.getScene().getChildByName("Canvas");
            if (canvas) {
                this._midLayer = canvas.getChildByName("midLayer");
                this._topLayer = canvas.getChildByName("topLayer");
            }
        }
    };
    /**关闭最上层view */
    this.closeTopView = function () {
        if (initializer.guideProxy.guideUI && !initializer.guideProxy.guideUI.isHideShow()) {
            return;
        }
        var node = null;
        if (this._topLayer != null && this._topLayer.childrenCount > 0) {
            node = this._topLayer.children[this._topLayer.childrenCount - 1];
        }
        if (node.name == "WaitHttp") {
            node = null;
        }
        if (node == null && this._midLayer != null && this._midLayer.childrenCount > 0) {
            node = this._midLayer.children[this._midLayer.childrenCount - 1];
        }
        if (node == null)
            return;
        var coms = node.getComponents(cc.Component);
        for (var i = 0; i < coms.length; i++) {
            cc.log(coms[i].name);
            if (coms[i].name.indexOf("StoryView") == 0)
                break;
            if (coms[i].name != "Widget" && coms[i].name != "Animation" && coms[i].name != "Button") {
                this.closeView(coms[i]);
                break;
            }
        }
    };
    /**关闭指定界面 */
    this.closeView = function (view, showEffect, mainsceneEffect) {
        console.log("pcp=closeView>", view.node["__url"]);
        if(!view.node["__url"]){ return false;}
        if (showEffect === void 0) { showEffect = false; }
        if (view.node['openTime'] && cc.sys.now() - view.node['openTime'] < 500)
            return false;
        if (view && view.node && view["is_Show_Hide_Effect"] == null) {
            var mainctyFlag = this.drawCallYouhuaShow(view,mainsceneEffect);
            view["is_Show_Hide_Effect"] = true;
            delete this._uiMap[view.node["__url"]];
            
            var showEffectflag = true;
            for (var key in this._uiMap) {
                showEffectflag = false;
                break;
            }

            if(showEffectflag && view.node["__url"].indexOf("AlertItemShow") != -1 || view.node["__url"].indexOf("GuanView") != -1 || view.node["__url"].indexOf("AlertHeroView") != -1){//AlertItemShow不往uimap内添加，也不做恢复动画
                showEffectflag = false;
            }
            if(showEffectflag && !mainctyFlag){// &&  (view.node["show_main_effect"] || mainsceneEffect)  
                facade.send("OPEN_PREFAB_MAINSCENE_SHOW");//显示隐藏的mainscene元素
            }

            var time = this.showEffect(view, 1);
            view.enabled = false;
            showEffect = showEffectflag;//  &&  (view.node["show_main_effect"] || mainsceneEffect)
            var fun = function () {
                if (view.node) {
                    if (cc.zy.zyConfig.DEBUG) {
                        cc.log(view.node["__url"] + " prefab destory !!!");
                    }
                    if (view.node["__url"].indexOf("StoryView") != -1) {
                        facade.send("STORY_VIEW_DESOTRY");
                    }
                    view.node.destroy();
                    view.node.removeFromParent(true);
                    cc.zy.zyUtils.releaseAssetPrefab(view.node["__url"]);
                }
                if (showEffect) {
                    facade.send("SHOW_OPEN_EFFECT");
                }
            };
            if (cc.director.getScene().name == "MainScene") {
                facade.send("TIME_RUN_FUN", { fun: fun, time: time });
            }
            else {
                fun();
            }
            return true;
        }
        return false;
    };

    //drawcall优化显示的逻辑
    this.drawCallYouhuaShow = function (view,mainsceneEffect) {
        //显示隐藏的maincity元素
        var maincityarray = ["qifu/QifuView","boss/BossView","dalishi/DalishiView","jiulou/JiulouView","book/BookView","kitchen/KitchenView","flower/FlowerView","union/UnionView","cell/CellView","wishingtree/WishingTreeView"];
        if (this._uiMap[config.Config.skin + "/prefabs/ui/main/MainCity"] != null && view.node["__url"].indexOf("main/MainCity") == -1){
            for (var i = 0; i < maincityarray.length; i++) {
                var name = maincityarray[i];
                if(name == null || view.node["__url"].indexOf(name) != -1){
                    facade.send("OPEN_PREFAB_MAINCITY_SHOW");
                }
            }
            return true;
        }else{
            // if(view.node["show_main_effect"] || mainsceneEffect){//  
            //     facade.send("OPEN_PREFAB_MAINSCENE_SHOW");//显示隐藏的mainscene元素
            // }
            return false;
        }
    };
    /**判断某个界面是否开着*/
    this.isOpenView = function (path) {
        path = cc.zy.zyConfig.skin + "/prefabs/ui/" + path;
        var node = this._uiMap[path];
        return node != null;
    };
    //如果是shader材质material不处理
    this.isMaterial = function(url) {
        if (url.indexOf("eca5d2f2-8ef6-41c2-bbe6-f9c79d09c432") != -1 ||
            url.indexOf("2874f8dd-416c-4440-81b7-555975426e93") != -1 ||
            url.indexOf("144c3297-af63-49e8-b8ef-1cfa29b3be28") != -1 ||
            url.indexOf("0e93aeaa-0b53-4e40-b8e0-6268b4e07bd7") != -1 ||
            url.indexOf("c0040c95-c57f-49cd-9cbc-12316b73d0d4") != -1 ||
            url.indexOf("6d91e591-4ce0-465c-809f-610ec95019c6") != -1 ||
            url.indexOf("79eafaef-b7ef-45d9-9c3f-591dc836fc7a") != -1 ||
            url.indexOf("6f801092-0c37-4f30-89ef-c8d960825b36") != -1 ||
            url.indexOf("3a7bb79f-32fd-422e-ada2-96f518fed422") != -1 ||
            url.indexOf("7afd064b-113f-480e-b793-8817d19f63c3") != -1 ||
            url.indexOf("cf7e0bb8-a81c-44a9-ad79-d28d43991032") != -1 ||
            url.indexOf("2a296057-247c-4a1c-bbeb-0548b6c98650") != -1 ||
            url.indexOf("a9f6a9c9-3339-4cc9-b0bb-0dea55527acf") != -1 ||
            url.indexOf("3c8cf882-6da3-4c5c-9507-8c4b6d85178a") != -1) {
            return true;
        }
        return false;
    };

    //noRelease 只减少计数，不释放资源
    this.releaseAsset = function (url,noRelease) {
        // if (PlatUtils.isWeb())
        //     return;
        // console.log('releaseAsset->begin')
        var deps = cc.loader.getDependsRecursively(url);
        // console.log(url,'releaseAsset1')
        // console.log(deps,'releaseAsset2');
        if (deps != null) {
            for (var i = 0; i < deps.length; i++) {
                if (deps[i] == null || this.isMaterial(deps[i]))
                    continue;
                var count = this.resCountMap[deps[i]];
                if (count) {
                    if (count <= 1) {
                        this._textCache[deps[i]] = 1;
                        delete this.resCountMap[deps[i]];
                    }else{
                        this.resCountMap[deps[i]] = count - 1;
                    }
                }else{
                    this._textCache[deps[i]] = 0;
                }
            };
        };

        if (noRelease) {
            return
        }
        if (this.isLoadingPage()) {
            this._isReleasingNum = this._isReleasingNum - 1;
            return;
        }

        this.releaseBgAsset();
    };
    //删除记录的没用的缓存文件
    this.releaseBgAsset = function () {
        for (var k in this._textCache) {
            if (this._textCache[k] == 1) {
                cc.loader.release(k);
            }
        }
        this._textCache = {};
        this._isReleasingNum = this._isReleasingNum - 1;
    };
    /*显示节点上面动画*/
    this.showNodeEffect = function (node, index) {
        if (index === void 0) { index = 0; }
        if (node == null)
            return;
        var anima = node.getComponent(cc.Animation);
        if (anima) {
            var clips = anima.getClips();
            if (index == -1) {
                index = Math.floor(Math.random() * clips.length);
            }
            if (index != -1 && clips.length > 2 && clips.length % 2 == 0) {
                index = index + Math.floor(Math.random() * clips.length / 2) * 2;
            }
            var clip = clips[index];
            if (clip) {
                anima.play(clip.name);
            }
        }
    };
    /*显示节点动画*/
    this.showEffect = function (view, index, hundler) {
        if(view.node.name.indexOf("homeview") != -1){
            if(this.indexFlag && (this.indexFlag == index)){
                if(hundler && view){
                    hundler.apply(view);
                }
                return 0;
            }else{
                this.indexFlag = index;
            }
        }
        if (view == null)
            return;
        var anima = view.node.getComponent(cc.Animation);
        var time = 0;
        if (anima) {
            var clip = anima.getClips()[index];
            if (clip) {
                anima.play(clip.name);
                time = clip.duration;
            }
        }
        if (hundler) {
            if (time > 0.05) {
                view.scheduleOnce(hundler, time - 0.05);
            }
            else {
                hundler.apply(view);
            }
        }
        return time;
    };

    //drawcall优化显示的逻辑
    this.drawCallYouhuaHide = function (url,showMainEffect) {
        var self = this;
        //隐藏mainscene界面
        if(showMainEffect){
            facade.send("OPEN_PREFAB_MAINSCENE_HIDE");
            facade.send("SHOW_CLOSE_EFFECT_HIDE");//用来预防动画播放时间错乱
        }
        //隐藏maincity元素
        if (self._uiMap[cc.zy.zyConfig.skin + "/prefabs/ui/main/MainCity"] != null){
            var maincityarray = ["qifu/QifuView","boss/BossView","dalishi/DalishiView","jiulou/JiulouView","book/BookView","kitchen/KitchenView","flower/FlowerView","union/UnionView","cell/CellView","wishingtree/WishingTreeView"];
            for (var i = 0; i < maincityarray.length; i++) {
                var name = maincityarray[i];
                if(name == null || url.indexOf(name) != -1){
                    facade.send("OPEN_PREFAB_MAINCITY_HIDE");
                }
            }
        }
    };
    
}

exports.UiUtils = UiUtils;
exports.uiUtils = new UiUtils();
