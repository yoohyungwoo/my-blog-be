import {getPrismaConnection, errorRes, resMessage, isPassword} from '../../lib'
import express from "express";

const prisma = getPrismaConnection()

export const createUser = async (req: any, res: express.Response, next: express.NextFunction) => {
    const { user_id, user_name, email, enabled, password } = req.body;

    try {
        // 필수 필드 확인
        if (!user_id || !user_name || !email || enabled === undefined || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (!isPassword(password)) {
            res
                .status(401)
                .json(
                    errorRes(
                        '비밀번호를 확인해 주세요.'
                    )
                )
            return
        }
        // user_id 중복 검사
        const existingUserById = await prisma.user.findUnique({
            where: { user_id },
        });

        if (existingUserById) {
            res.status(409).json(errorRes('User ID already exists'));
        }

        await prisma.user.create({
            data: {
                user_name,
                user_id,
                password,
                email,
                enabled
            },
        })
        res.status(200).json(resMessage('사용자가 등록되었습니다.'))
    } catch (e) {
        console.error(e)
        return next(e)
    }
}
export const getUserDetail = async (req: any, res: any, next: any) => {
    const { userId } = req.params
    try {
        const user = await prisma.user.findUnique({
            where: {
                user_id: userId,
            },
        })
        console.log(res.json())
        res.status(200).json(user)
    } catch (e) {
        console.error(e)
        return next(e)
    }
}
export const getUser = async (req: any, res: any, next: any) => {
    const { userId } = req.params
    try {
        const user = {
            test:'test'
        }
        console.log('>>>>>>')
        res.status(200).json(user)
    } catch (e) {
        console.error(e)
        return next(e)
    }
}