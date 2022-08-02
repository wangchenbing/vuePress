---
title: 获取文件的MD5值
date: 2022-8-1
---

- 安装
npm install --save spark-md5
- 引入
import SparkMD5 from 'spark-md5'
- 使用
```js
export default function List() {
  const [md5data, setmd5data] = useState('')
  // 获取文件的md5值,无需更改
  const getFileMd5 = (file) => {
    return new Promise((resolve) => {
      var tmp_md5;
      var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
        chunkSize = 8097152, // Read in chunks of 2MB
        chunks = Math.ceil(file.size / chunkSize),
        currentChunk = 0,
        spark = new SparkMD5.ArrayBuffer(),
        fileReader = new FileReader();
      fileReader.onload = function (e) {
        spark.append(e.target.result);
        currentChunk++;
        var md5_progress = Math.floor((currentChunk / chunks) * 100);
        console.log(file.name + "  正在处理，请稍等," + "已完成" + md5_progress + "%");
        if (currentChunk < chunks) {
          loadNext();
        } else {
          tmp_md5 = spark.end();
          console.log(file.name + "的MD5值是：" + tmp_md5)
          resolve(tmp_md5);
        }
      };
      fileReader.onerror = function () {
        console.warn('oops, something went wrong.');
      };
      function loadNext() {
        var start = currentChunk * chunkSize,
          end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
      }
      loadNext();
    })
  }

  const props = {
    //同过beforeUpload方法获取file文件对象格式
    beforeUpload: async (file) => {
      console.log(file);
      //async await伪同步化getFileMd5函数
      let md5 = await getFileMd5(file);
      //返回值就是文件的md5格式
      console.log(md5);
      setmd5data(md5)
    },
  }

  return (
    <div style={{ width: '90%' }}>
      <Upload {...props} >
        <p>文件的md5值:{md5data}</p>
        <Button >上传文件</Button>
      </Upload >
    </div >
  )
}
```