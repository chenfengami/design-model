//例子为微云上传模块开发，微云的文件上传功能虽然可以依照队列一个一个地排队上传，但也支持同时选择2000个文件。
//同时new2000个upload对象，结果可想而知，Chrome中还勉强支撑，IE直接进入假死状态

var id = 0;

window.startUpload = function (uploadType, files) { //uploadType区分是控件还是flash
    for (var i = 0, file; file = files[i++];) {
        var uploadObj = new Upload(uploadType, file.fileName, file.fileSize);
        uploadObj.init(id++); //给upload对象设置一个唯一的id
    }
};

//当用户选择完文件后，startUpload函数会遍历files数组来创建对应的upload对象。
//接下来定义Upload构造函数，它接受3个参数，分别是插件类型、文件名和文件大小。这些信息都已经被插件组装在files数组里返回，代码如下：

var Upload = function (uploadType, fileName, fileSize) {
    this.uploadType = uploadType;
    this.fileName = fileName;
    this.fileSize = fileSize;
    this.dom = null;
};

Upload.prototype.init = function (id) {
    var self = this;
    this.id = id;
    this.dom = document.createElement('div');
    this.dom.innerHTML =
        `
                    <span>文件名称：${ this.fileName}, 文件大小：${this.fileSize}</span>
                    <button class="delFile">删除</button>
                `;
    this.dom.querySelector('.delFile').onclick = function () {
        self.delFile();
    };
    document.body.appendChild(this.dom);
};

//为了简化示例，我们暂且去掉了upload对象的其它功能，只保留删除文件的功能。

Upload.prototype.delFile = function () {
    if (this.fileSize < 3000) {
        return this.dom.parentNode.removeChild(this.dom);
    }

    if (window.confirm('确定要删除该文件吗？' + this.fileName)) {
        return this.dom.parentNode.removeChild(this.dom);
    }
};

//接下来分别创建3个插件上传对象和3个Flash上传对象：
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