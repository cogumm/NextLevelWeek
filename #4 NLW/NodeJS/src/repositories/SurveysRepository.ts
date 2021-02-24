import { EntityRepository, Repository } from "typeorm";

import Survey from "../models/Survey";

@EntityRepository(Survey)
export class SurveysRepository extends Repository<Survey> {}
