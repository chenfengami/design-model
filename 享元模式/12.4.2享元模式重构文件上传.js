/**
 * 1、首先要划分内部状态和外部状态。划分有以下几点
 * --内部状态储存于对象内部。
 * --内部状态可以被一些对象共享。
 * --内部状态独立于具体的场景，通常不会变化。
 * --外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享。
 */



//12.4.3剥离外部状态
//明确了uploadType作为内部状态之后，我们再把其它的外部状态从构造函数中抽离出来，Upload构造函数中只保留uploadType参数：
var Upload = function (uploadType) {
    this.uploadType = uploadType;
};

Upload.prototype.delFile = function (id) {
    uploadManager.setExternalState(id, this);

    if (this.fileSize < 3000) {
        return this.dom.parentNode.removeChild(this.dom);
    }

    if (window.confirm('确定要删除该文件吗？' + this.fileName)) {
        return this.dom.parentNode.removeChild(this.dom);
    }
};

//12.4.4工厂进行对象实例化
//接下来定义一个工厂来创建upload对象，如果某种内部状态对应的共享对象已经被创建过，那么直接返回这个对象，否则新创建一个对象。
var UploadFactory = (function () {
    var createdFlyWeightObjs = {};

    return {
        create: function (uploadType) {
            if (createdFlyWeightObjs[uploadType]) {
                return createdFlyWeightObjs[uploadType]
            }

            return createdFlyWeightObjs[uploadType] = new Upload(uploadType);
        }
    }
})();

//12.4.5管理器封装外部状态
//现在我们来完善前面提到的uploadManager对象，它负责向UploadFactory提交创建对象的请求，并用一个uploadDatabase对象保存所有upload对象的外部状态，以便在程序运行过程中给upload共享对象设置外部状态。
var uploadManager = (function () {
    var uploadDatabase = {};

    return {
        add: function (id, uploadType, fileName, fileSize) {
            var flyWeightObj = UploadFactory.create(uploadType);

            var dom = document.createElement('div');
            dom.innerHTML =
                `
                        <span>文件名称：${ this.fileName}, 文件大小：${this.fileSize}</span>
                        <button class="delFile">删除</button>
                    `;
            dom.querySelector('.delFile').onclick = function () {
                flyWeightObj.delFile(id);
            };

            document.body.appendChild(dom);

            uploadDatabase[id] = {
                fileName: fileName,
                fileSize: fileSize,
                dom: dom
            };

            return flyWeightObj;
        },
        setExternalState: function (id, flyWeightObj) {
            var uploadData = uploadDatabase[id];
            for (var i in uploadData) {
                flyWeightObj[i] = uploadData[i];
            }
        }
    };
})();

//然后是开始触发上传动作的startUpload函数：

var id = 0;

window.startUpload = function (uploadType, files) {
    for (var i = 0, file; file = files[i++];) {
        var uploadObj = uploadManager.add(++id, uploadType, file.fileName, file.fileSize);
    }
};

startUpload('plugin', [
    {
        fileName: '1.txt',
        fileSize: 1000
    },
    {
        fileName: '2.html',
        fileSize: 3000
    },
    {
        fileName: '3.txt',
        fileSize: 5000
    }
]);

startUpload('flash', [
    {
        fileName: '4.txt',
        fileSize: 1000
    },
    {
        fileName: '5.html',
        fileSize: 3000
    },
    {
        fileName: '6.txt',
        fileSize: 5000
    }
]);