const { alias } = require("react-app-rewire-alias");

module.exports = function override(config, env) {
  alias({
    "@components": "src/components",
    "@constants": "src/constants",
    "@hoc-helpers": "src/hoc-helpers",
    "@pages": "src/pages",
    "@services": "src/services",
    "@styles": "src/styles",
    "@utils": "src/utils",
    "@hooks": "src/hooks",
  })(config);

  return config;
};
