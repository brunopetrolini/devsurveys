/* eslint-disable no-unused-vars */
import { DbAddSurvey } from './db-add-survey';
import { AddSurveyModel, AddSurveyRepository, AddSurvey } from './db-add-survey-protocols';

const makeFakeSurvey = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer',
  }],
});

const makeAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add(survey: AddSurveyModel): Promise<void> {
      Promise.resolve();
    }
  }
  return new AddSurveyRepositoryStub();
};

type SutTypes = {
  sut: AddSurvey;
  addSurveyRepositoryStub: AddSurveyRepository;
}
const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = makeAddSurveyRepository();
  const sut = new DbAddSurvey(addSurveyRepositoryStub);
  return { sut, addSurveyRepositoryStub };
};

describe('DbAddSurvey UseCase', () => {
  it('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add');
    const fakeSurvey = makeFakeSurvey();
    await sut.add(fakeSurvey);
    expect(addSpy).toHaveBeenCalledWith(fakeSurvey);
  });
});
