const express = require('express');
const router = express.Router();
const db = require('./model');
const bcrypt = require('bcrypt'); //密码加密
const uuid = require('node-uuid');

//添加课程
router.post("/api/add", (req, res) => {
    const newUser = {
        title: req.body.title,
        details: req.body.details,
        userId: req.body.userId
    };
    //存储数据
    db.Idea.find({
        title: req.body.title
    }, function (err, docs) {
        if (err) {
            console.log(err)
            return
        }

        if (docs.length > 0) {
            res.json({
                msg: '添加失败，该课程已存在'
            });
            return
        }

        db.Idea(newUser).save(function (errors) {
            if (errors) {
                res.status(500).send()
                return
            }
            res.send();
        });

    })


});

//获取课程信息
router.get('/api/card', function (req, res) {
    const oData = {
        userId:req.query.userId
    };
    db.Idea.find(oData,function (err, docs) {
        if (err) {
            console.error(err);
            return
        }
        res.json(docs)
    })

});

//删除课程信息
router.post('/api/deleteCurriculum', function (req, res) {
    db.Idea.remove({
        _id: req.body._id,
    }, function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.send();
    })
});

//修改课程信息
router.post('/api/editCurriculum', function (req, res) {
    let reqData = req.body;
    db.Idea.find({
        _id: reqData.id
    }, function (err, data) {
        if (err) {
            return false;
        }
        data[0].title = reqData.title;
        data[0].details = reqData.details;
        db.Idea(data[0].save(function (err) {
            if (err) {
                res.status(500).send();
                return
            }
            res.send();
        }))
    })
});

//注册
router.post('/api/users/register', function (req, res) {
    db.User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                res.json('用户已存在!');
                return false;
            } else {
                let userInfo = {
                    userName: req.body.userName,
                    email: req.body.email,
                    password: req.body.password,
                    userId: uuid.v4()
                };
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(userInfo.password, salt, function (err, hash) {
                        if (err) throw err;
                        userInfo.password = hash;
                        db.User(userInfo).save(function (err) {
                            if (err) {
                                res.status(500).send();
                                return
                            }
                            const data = {
                                msg: '注册成功!',
                                userId: userInfo.password
                            }
                            res.json(data);
                            res.send();
                        })
                    });
                });
            }
        })
});

// 登陆
router.post('/api/users/login', (req, res) => {
    db.User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (!user) {
                res.json({
                    msg: '用户不存在，请先注册',
                });
                return false;
            }
            // 密码验证
            bcrypt.compare(req.body.password, user.password, function (err, isMath) {
                if (err) throw err;

                if (isMath) {
                    res.json({
                        msg: '登陆成功',
                        userId: user.userId,
                        loginState: true
                    });
                } else {
                    res.json({
                        msg: '密码错误',
                    });
                }
            });
        })
})

// 退出登陆
router.get('/api/users/logout', (err, res) => {
    res.json('退出登陆成功');
});

module.exports = router;