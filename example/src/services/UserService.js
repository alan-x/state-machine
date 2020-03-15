class UserService {
    static login() {
        return Promise.resolve(Date.now() % 3)
    }

    static bind() {
        return Promise.resolve(Date.now() / 2)
    }
}
export default UserService
