export class User {
  id: number = 0;
  username: string = '';
  firstname: string = '';
  password: string = '';

  copy(): User {
    return Object.assign(new User(), this);
  }
}
