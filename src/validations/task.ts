import { celebrate, Joi, Segments } from 'celebrate';

const taskValidation = {
  createTask: celebrate({
    [Segments.BODY]: Joi.object().keys({
      subject: Joi.string().min(2).max(100).required(),
      message: Joi.string().min(5).required(),
    }),
  }),

  takeInWork: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
  }),

  completeTask: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      resolutionText: Joi.string().min(5).required(),
    }),
  }),

  cancelTask: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      cancelReason: Joi.string().min(5).required(),
    }),
  }),

  getTasks: celebrate({
    [Segments.QUERY]: Joi.object().keys({
      date: Joi.date().iso(),
      dateFrom: Joi.date().iso(),
      dateTo: Joi.date().iso(),
    }),
  }),
};

export default taskValidation;
