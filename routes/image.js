/**
 * Created by ss on 2017-07-11.
 */
var express = require('express');
var router = express.Router();

var multiparty = require('multiparty');

router.post('/upload', function (req, res) {
    var form = new multiparty.Form({
        autoFiles: false,
        uploadDir: 'temp/',
        maxFilesSize: 1024 * 1024 * 5 // 허용 파일 사이즈 최대치
    });

    form.parse(req, function (error, fields, files) {
        // 파일 전송이 요청되면 이곳으로 온다.
        // 에러와 필드 정보, 파일 객체가 넘어온다.
        console.log(files);
        if(files !== null){
            var path = files.fileInput[0].path;
            path = path.substr(5, path.length);
            console.log(path);
            res.send(path); // 파일과 예외 처리를 한 뒤 브라우저로 응답해준다.
        }else{
            res.send('');
        }
    });
});

module.exports = router;
