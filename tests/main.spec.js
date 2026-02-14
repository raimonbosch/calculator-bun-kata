const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

async function runCalculate(input = "") {
  try {
    const { stdout, stderr } = await exec(
        `./calculate "${input}"`
    );

    return {
      stdout: stdout.trim(),
      stderr: stderr.trim(),
      success: true,
    };
  } catch (error) {
    return {
      stdout: (error.stdout || "").trim(),
      stderr: (error.stderr || "").trim(),
      code: error.code,
      success: false,
    };
  }
}

describe("When input is empty", () => {
  it("should print 'empty input'", async () => {
    const result = await runCalculate();

    expect(result.stdout).toBe(
        "empty input"
    );
  });
});

describe("When number is out of range", () => {
  it.each([
    "1000",
    "-1",
    "one thousand",
    "minus one",
    "mil",
    "menos uno",
  ])("should fail with out-of-range error for input: %s", async (invalidInput) => {
    const result = await runCalculate(invalidInput);

    expect(result.stdout).toBe(
        "some number is out of range (0-999)"
    );
  });
});

describe("When input string is invalid", () => {
  it.each([
    "onehundred",
    "fortyfour",
    "cincuenta uno",
  ])("should fail with invalid string error for input: %s", async (invalidInput) => {
    const result = await runCalculate(invalidInput);

    expect(result.stdout).toBe("invalid string");
  });
});

describe("When input is valid", () => {
  it.each([
    { input: "5", expected: "5" },
    { input: "0 + 1", expected: "1" },
    { input: "five", expected: "five" },
    { input: "zero plus one", expected: "one" },
    {
      input: "nine hundred ninety-eight plus one",
      expected: "nine hundred ninety-nine",
    },
    { input: "cinco", expected: "cinco" },
    { input: "cero mas uno", expected: "uno" },
    {
      input: "novecientos noventa y ocho mas uno",
      expected: "novecientos noventa y nueve",
    },
  ])("should return correct result for input: %s", async ({ input, expected }) => {
    const result = await runCalculate(input);

    expect(result.stdout).toBe(expected);
  });
});