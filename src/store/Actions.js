const req = require.context(".", true, /\.\/.+\/Action\.js$/);

let actionObj = {};

req.keys().forEach(key => {
  const actions = req(key);
  Object.keys(actions).forEach(name => {
    actionObj[name] = actions[name];
  });
});

export default actionObj;
