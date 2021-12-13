import { getLogs, savelog } from './index';



test('getLogs should return a mocked result of {userId: 0, sessionId: "92836sbudas", requestId: "ahbdahd", logPath:  "r:auth-e:signUp/r:auth-e:signUp"}', () => {
    getLogs().then(result => {
        expect(result).toEqual({userId: 0, sessionId: "92836sbudas", requestId: "ahbdahd", logPath:  "r:auth-e:signUp/r:auth-e:signUp"})
    }
    )
})

test('inset to Savelog should return a mocked result of {userId: 0, sessionId: "92836sbudas", requestId: "ahbdahd", logPath:  "r:auth-e:signUp/r:auth-e:signUp"}', () => {
   
    savelog({"error": true, "sessionId": "92836sbudas", "requestId": "ahbdahd", "logPath": "r:auth-e:signUp/r:auth-e:signUp", "userId": 0}).then(result => {
        expect(result).toEqual({userId: 0, sessionId: "92836sbudas", requestId: "ahbdahd", logPath:  "r:auth-e:signUp/r:auth-e:signUp"})
    }
    )
})



