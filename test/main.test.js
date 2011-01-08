var assert = require("assert"),
    form = require("../index"),
    filter = form.filter,
    validate = form.validator;

module.exports = {

  'validate : isEmail': function() {
    // Skip validating empty values
    var request = { body: {} };
    var formValidator = form(validate("field").isEmail());
    formValidator(request, {});
    assert.equal(request.form.errors, undefined);
    
    // Failure.
    var request = { body: { field: "fail" }};
    var formValidator = form(validate("field").isEmail());
    formValidator(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "Invalid email");

    // Failure w/ custom message.
    var request = { body: { field: "fail" }};
    var formValidator = form(validate("field").isEmail("!!! %s !!!"));
    formValidator(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "me@dandean.com" }};
    var formValidator = form(validate("field").isEmail());
    formValidator(request, {});
    assert.equal(request.form.errors, undefined);
  },

  'validate : isUrl': function() {
    // Failure.
    var request = { body: { field: "fail" }};
    var formValidator = form(validate("field").isUrl());
    formValidator(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "Invalid URL");

    // Failure w/ custom message.
    var request = { body: { field: "fail" }};
    var formValidator = form(validate("field").isUrl("!!! %s !!!"));
    formValidator(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "http://www.google.com" }};
    var formValidator = form(validate("field").isUrl());
    formValidator(request, {});
    assert.equal(request.form.errors, undefined);
  },

  'validate : isIP': function() {
    // Failure.
    var request = { body: { field: "fail" }};
    var formValidator = form(validate("field").isIP());
    formValidator(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "Invalid IP");

    // Failure w/ custom message.
    var request = { body: { field: "fail" }};
    var formValidator = form(validate("field").isIP("!!! %s !!!"));
    formValidator(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "0.0.0.0" }};
    var formValidator = form(validate("field").isIP());
    formValidator(request, {});
    assert.equal(request.form.errors, undefined);
  },

  'validate : isAlpha': function() {
    // Failure.
    var request = { body: { field: "123456" }};
    var formValidator = form(validate("field").isAlpha());
    formValidator(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "Invalid characters");

    // Failure w/ custom message.
    var request = { body: { field: "123456" }};
    var formValidator = form(validate("field").isAlpha("!!! %s !!!"));
    formValidator(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "abcde" }};
    var formValidator = form(validate("field").isAlpha());
    formValidator(request, {});
    assert.equal(request.form.errors, undefined);
  },

  'validate : isAlphanumeric': function() {
    // Failure.
    var request = { body: { field: "------" }};
    var formValidator = form(validate("field").isAlphanumeric());
    formValidator(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "Invalid characters");

    // Failure w/ custom message.
    var request = { body: { field: "------" }};
    var formValidator = form(validate("field").isAlphanumeric("!!! %s !!!"));
    formValidator(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "abc123" }};
    var formValidator = form(validate("field").isAlphanumeric());
    formValidator(request, {});
    assert.equal(request.form.errors, undefined);
  },

  'validate : isNumeric': function() {
    // Failure.
    var request = { body: { field: "------" }};
    var formValidator = form(validate("field").isNumeric());
    formValidator(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "Invalid number");

    // Failure w/ custom message.
    var request = { body: { field: "------" }};
    var formValidator = form(validate("field").isNumeric("!!! %s !!!"));
    formValidator(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success Int
    var request = { body: {
      integer: "123456",
      floating: "123456.45",
      negative: "-123456.45",
      positive: "+123456.45",
      padded: "000045.343"
    }};
    var formValidator = form(
      validate("integer").isNumeric(),
      validate("floating").isNumeric(),
      validate("negative").isNumeric(),
      validate("positive").isNumeric(),
      validate("padded").isNumeric()
    );
    formValidator(request, {});
    assert.equal(request.form.errors, undefined);
  },

  'validate : isInt': function() {
    // Failure.
    var request = { body: { field: "------" }};
    var formValidator = form(validate("field").isInt());
    formValidator(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "Invalid integer");

    // Failure w/ custom message.
    var request = { body: { field: "------" }};
    var formValidator = form(validate("field").isInt("!!! %s !!!"));
    formValidator(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "50" }};
    var formValidator = form(validate("field").isInt());
    formValidator(request, {});
    assert.equal(request.form.errors, undefined);
  },

  'validate : isLowercase': function() {
    // Failure.
    var request = { body: { field: "FAIL" }};
    var formValidator = form(validate("field").isLowercase());
    formValidator(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "Invalid characters");

    // Failure w/ custom message.
    var request = { body: { field: "FAIL" }};
    var formValidator = form(validate("field").isInt("!!! %s !!!"));
    formValidator(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "win" }};
    var formValidator = form(validate("field").isLowercase());
    formValidator(request, {});
    assert.equal(request.form.errors, undefined);
  },

  'validate : isUppercase': function() {
    // Failure.
    var request = { body: { field: "fail" }};
    var formValidator = form(validate("field").isUppercase());
    formValidator(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "Invalid characters");

    // Failure w/ custom message.
    var request = { body: { field: "fail" }};
    var formValidator = form(validate("field").isUppercase("!!! %s !!!"));
    formValidator(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "WIN" }};
    var formValidator = form(validate("field").isUppercase());
    formValidator(request, {});
    assert.equal(request.form.errors, undefined);
  },

  'validate : isFloat': function() {
    // Failure.
    var request = { body: { field: "5000" }};
    var formValidator = form(validate("field").isFloat());
    formValidator(request, {});
    assert.ok(Array.isArray(request.form.errors));
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "Invalid decimal");

    // Failure w/ custom message.
    var request = { body: { field: "5000" }};
    var formValidator = form(validate("field").isFloat("!!! %s !!!"));
    formValidator(request, {});
    assert.ok(Array.isArray(request.form.errors));
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "5000.00" }};
    var formValidator = form(validate("field").isFloat());
    formValidator(request, {});
    assert.equal(request.form.errors, undefined);
  },

  'validate : notNull': function() {
    // Failure.
    var request = { body: { field: "" }};
    var formValidator = form(validate("field").notNull());
    formValidator(request, {});
    assert.ok(Array.isArray(request.form.errors));
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "Invalid characters");

    // Failure w/ custom message.
    var request = { body: { field: "" }};
    var formValidator = form(validate("field").notNull("!!! %s !!!"));
    formValidator(request, {});
    assert.ok(Array.isArray(request.form.errors));
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "win" }};
    var formValidator = form(validate("field").notNull());
    formValidator(request, {});
    assert.equal(request.form.errors, undefined);
  },

  'validate : isNull': function() {
    // Failure.
    var request = { body: { field: "fail" }};
    var formValidator = form(validate("field").isNull());
    formValidator(request, {});
    assert.ok(Array.isArray(request.form.errors));
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "Invalid characters");

    // Failure w/ custom message.
    var request = { body: { field: "fail" }};
    var formValidator = form(validate("field").isNull("!!! %s !!!"));
    formValidator(request, {});
    assert.ok(Array.isArray(request.form.errors));
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "" }};
    var formValidator = form(validate("field").isNull());
    formValidator(request, {});
    assert.equal(request.form.errors, undefined);
  },

  'validate : notEmpty': function() {
    // Failure.
    var request = { body: { field: "  \t" }};
    var formValidator = form(validate("field").notEmpty());
    formValidator(request, {});
    assert.ok(Array.isArray(request.form.errors));
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "Invalid characters");

    // Failure w/ custom message.
    var request = { body: { field: "  \t" }};
    var formValidator = form(validate("field").notEmpty("!!! %s !!!"));
    formValidator(request, {});
    assert.ok(Array.isArray(request.form.errors));
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! field !!!");

    // Success
    var request = { body: { field: "" }};
    var formValidator = form(validate("field").notEmpty());
    formValidator(request, {});
    assert.equal(request.form.errors, undefined);
  },





  'validation : required': function() {
    // Failure
    var request = { body: {}};
    var formValidator = form(validate("a_number").required());
    formValidator(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "a_number is a required field");
    
    // Failure w/ custom message and placeholder value.
    var request = { body: { a_number: "a_value" }};
    var formValidator = form(validate("a_number").required("a_value", "!!! %s !!!"));
    formValidator(request, {});
    assert.equal(request.form.errors.length, 1);
    assert.equal(request.form.errors[0], "!!! a_number !!!");

    // Success
    var request = { body: { a_number: "5000" }};
    var formValidator = form(validate("a_number").required("a_value", "!!! %s !!!"));
    formValidator(request, {});
    assert.equal(request.form.errors, undefined);
  },

  '1. configuration': function() {
  },
  
  '2. list users': function() {
  },
  
  '3. create user': function() {
  },
  
  '4. get user': function() {
  },
  
  '5. modify user': function() {
  }
};