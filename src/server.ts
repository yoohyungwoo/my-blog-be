import express from "express"
import session from "express-session"
import api from "./api"

const exp = express();

/*
* express.json()은 HTTP 요청의 본문을 JSON 형식으로 파싱하는 데 사용됩니다. 이는 클라이언트가 요청을 JSON 형식으로 보낸 경우 서버에서 해당 데이터를 쉽게 읽을 수 있도록합니다.
* */
exp.use(express.json())
/*
* express.urlencoded({ extended: true })는 HTTP 요청의 본문을 URL-encoded 데이터로 파싱하는 데 사용됩니다. 이는 HTML 폼에서 전송된 데이터를 읽을 때 유용합니다.
* */
exp.use(express.urlencoded({ extended: true }))

// exp.use((req: express.Request, res:express.Response, next:express.NextFunction) => {
//     res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
//     res.setHeader('Pragma', 'no-cache');
//     res.setHeader('Expires', '0');
//     next();
// });

exp.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: 'secret code',
    })
)
exp.use(api)
exp.listen(8080, () => {
    console.log('Server listening on port');
});