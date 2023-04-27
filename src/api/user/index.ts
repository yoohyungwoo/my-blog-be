import express from 'express'
import * as userCtrl from './user.ctrl'

const user = express.Router()

// 사용자 등록
user.post('/', userCtrl.createUser)

user.get('/users', userCtrl.getUser)

user.get('/:userId', userCtrl.getUserDetail)

export default user



