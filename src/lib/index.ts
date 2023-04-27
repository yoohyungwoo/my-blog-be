import {PrismaClient} from '@prisma/client'

let prismaConnection: any = null
export const getPrismaConnection = ()  => {
    if (prismaConnection) {
        return prismaConnection
    } else {
        prismaConnection = new PrismaClient()
        return prismaConnection
    }
}

export const commonRes = (data: any | undefined, totalCount: number | null) => {
    return {
        httpStatusCode: 200,
        code: '20000000',
        message: '정상 처리 되었습니다.',
        totalCount,
        body: {
            data,
        },
    }
}

export const resMessage = (message: string) => {
    return message
}

export function errorRes(msg: string) {
    return {
        httpStatusCode: 500,
        code: '50000000',
        message: msg,
        body: {
            data: null,
        },
    }
}
export const isPassword = (password: string) => {
    const reg = /^[A-Za-z0-9~!@#$%<>^&*()]{8,16}$/
    const regEn = /[A-Za-z]/g
    const regNum = /[0-9]/g
    const regCh = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g
    return (reg.test(password) && regEn.test(password) && regNum.test(password) && regCh.test(password))
}