import { EntityRepository, Repository } from "typeorm";

import SurveyUser from "../models/SurveyUser";

@EntityRepository(SurveyUser)
export class SurveysUsersRepository extends Repository<SurveyUser> {}
