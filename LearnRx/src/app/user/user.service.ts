export class UserService {
    currentUser: Subject<User> = new BehaviorSubject<User>(null);

    /**
     * setCurrentUser
     */
    public setCurrentUser(newUser: User): void {
        this.currentUser.next(newUser);
    }
}