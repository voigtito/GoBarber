import UserToken from '../../infra/typeorm/entities/UserToken';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import iCreateUserDTO from '@modules/users/dtos/iCreateUserDTO'
import { uuid } from 'uuidv4';

class FakeUserTokenRepository implements IUserTokenRepository {
    private userTokens: UserToken[] = [];

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = new UserToken();

        Object.assign(userToken, {
            id: uuid(),
            token: uuid(),
            user_id
        });

        this.userTokens.push(userToken)

        return userToken;
    }
}

export default FakeUserTokenRepository;