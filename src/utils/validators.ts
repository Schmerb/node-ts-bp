/**
 * validators
 *
 *
 */

export const checkForFields = (body: any, fields: string[]) => {
  const requiredFields = fields || [
    'firstName',
    'lastName',
    'email',
    'password',
  ];
  const missingField = requiredFields.find((field: string) => !(field in body));
  if (missingField) {
    return {
      code: 422,
      reason: 'ValidationError',
      message: 'Missing required field',
      location: missingField,
    };
  }
};

export const checkForValidType = (body: any, fields: string[], type: string) => {
  const stringFields = fields;
  const nonStringField = stringFields.find(
    // eslint-disable-next-line valid-typeof
    field => field in body && typeof body[field] !== type,
  );

  if (nonStringField) {
    return {
      code: 422,
      reason: 'ValidationError',
      message: `Incorrect field type: expected '${type}', actual '${typeof body[
        nonStringField
      ]}'`,
      location: nonStringField,
    };
  }
};

export const checkForValidStrings = (body: any, fields: string[]) => {
  const stringFields = fields || [
    'email',
    'username',
    'password',
    'firstName',
    'lastName',
  ];
  const nonStringField = stringFields.find(
    field => field in body && typeof body[field] !== 'string',
  );

  if (nonStringField) {
    return {
      code: 422,
      reason: 'ValidationError',
      message: `Incorrect field type: expected 'string', actual '${typeof body[
        nonStringField
      ]}'`,
      location: nonStringField,
    };
  }
};

export const checkForValidInteger = (body: any, fields: string[]) => {
  const integerFields = fields;
  const nonIntegerField = integerFields.find(
    field =>
      field in body &&
      (typeof body[field] !== 'number' || !Number.isInteger(body[field])),
  );

  if (nonIntegerField) {
    return {
      code: 422,
      reason: 'ValidationError',
      message: `Incorrect field type: expected 'integer', actual '${typeof body[
        nonIntegerField
      ]}'`,
      location: nonIntegerField,
    };
  }
};

// other static types to avoid having to provide extra type argument
export const checkForValidNumber = (body: any, fields: string[]) =>
  checkForValidType(body, fields, 'number');
export const checkForValidBoolean = (body: any, fields: string[]) =>
  checkForValidType(body, fields, 'boolean');

export const checkForSizedFields = (body: any, _sizedFields: any) => {
  const sizedFields = _sizedFields || {
    username: {
      min: 1,
    },
    password: {
      min: 10,
      // bcrypt truncates after 72 characters, so let's not give the illusion
      // of security by storing extra (unused) info
      max: 72,
    },
  };
  const tooSmallField = Object.keys(sizedFields).find(
    field =>
      'min' in sizedFields[field] &&
      body[field].trim().length < sizedFields[field].min,
  );
  const tooLargeField = Object.keys(sizedFields).find(
    field =>
      'max' in sizedFields[field] &&
      body[field].trim().length > sizedFields[field].max,
  );

  if (tooSmallField || tooLargeField) {
    return {
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField
        ? `Must be at least ${sizedFields[tooSmallField].min} characters long`
        : `Must be at most ${sizedFields[tooLargeField].max} characters long`,
      location: tooSmallField || tooLargeField,
    };
  }
};

export const checkIfNotFound = (doc: any, name = 'Document') => {
  if (!doc) {
    const error = {
      code: 400,
      reason: 'Not Found',
      message: `${name} you are attempting to access does not exist.`,
    };
    return error;
  }
};

export const checkIfAuthorized = (
  doc: any,
  userId: string,
  action = 'access',
  name = 'document'
) => {
  // make sure user is authorized to update/write document
  if (doc._creator.toString() !== userId) {
    const error = {
      code: 401,
      reason: 'Authorization',
      message: `You are not authorized to ${action} this ${name}.`,
    };
    return error;
  }
};