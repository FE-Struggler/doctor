import type { Root, SchemaLike } from '@umijs/utils/compiled/@hapi/joi';

function getCommonSchemas(): Record<string, (Joi: Root) => any> {
  return {
    tools: (Joi) => Joi.object().pattern(Joi.string(), Joi.string()).optional(),
  };
}

function getCommonSchemasJoi(Joi: Root) {
  const schemas = getCommonSchemas();

  return Object.keys(schemas).reduce((jois, key) => {
    jois[key] = schemas[key](Joi);

    return jois;
  }, {} as Record<string, SchemaLike | SchemaLike[]>);
}


export function getSchemas(): Record<string, (Joi: Root) => any> {
  return {
    ...getCommonSchemas(),
  };
}
