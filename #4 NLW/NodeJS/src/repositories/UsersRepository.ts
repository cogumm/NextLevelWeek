import { EntityRepository, Repository } from "typeorm";

import User from "../models/User";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {}
