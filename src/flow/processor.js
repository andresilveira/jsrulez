/*
  The processor function generator receives a Flow and yields each rule it
  evaluates. A Flow is an array of Rules. Each Rule has the following format:
    {
      id: 1,
      title: "First Rule",
      body: "true",
      idIfTrue: 2,
      idIfFalse: null
    }
  The process function is a recursive function that starts by evaluating the
  body of the first Rule in the Flow array. If the evaluated body returns true
  it processes the Rule with the id equals to idIfTrue of the current Rule.
  Alternatively, if the evaluated body returns false it then processes the Rule
  with the id equals to idIfFalse of the current Rule. Finally, if any of the
  ids to be fallowed (idIfTrue or idIfFalse) is null, the execution is finished.
*/

export default function* process(flow) {
  if(invalidFlow(flow)) { return; }

  yield* runForestRun(flow, flow[0]);
}

function* runForestRun(flow, currentRule) {
  if(currentRule === null) { return; }

  const passed = executeBody(currentRule.body);

  yield({ currentRule, passed });
  yield* runForestRun(flow, nextRule(flow, currentRule, passed));
}

const nextRule = (flow, currentRule, passed) =>
  findRule(flow, pickId(currentRule, passed))

const pickId = (rule, passed) => passed ? rule.idIfTrue : rule.idIfFalse;

const findRule = (flow, id) => flow.find(rule => rule.id === id) || null;

const executeBody = (body) => eval(body);

const invalidFlow = (flow) => !Array.isArray(flow) || flow.length === 0;
